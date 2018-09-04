Ext.ns('Ext.ux.grid');

Ext.ux.grid.GridSummary = function(config) {
	Ext.apply(this, config);
};

Ext.extend(Ext.ux.grid.GridSummary, Ext.util.Observable, {
	
//	summaryTitle : 'Summary',
	
    init : function(grid) {
        this.grid = grid;
        this.cm = grid.getColumnModel();
        this.view = grid.getView();

        var v = this.view;

        // override GridView's onLayout() method
        v.onLayout = this.onLayout;

        v.afterMethod('render', this.refreshSummary, this);
        v.afterMethod('refresh', this.refreshSummary, this);
        v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
        v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
        v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);

        // update summary row on store's add/remove/clear/update events
        grid.store.on({
            add: this.refreshSummary,
            remove: this.refreshSummary,
            clear: this.refreshSummary,
            update: this.refreshSummary,
            scope: this
        });

        if (!this.rowTpl) {
        	var tableId = 'summary_table_'
        	if(subMainId){
        		tableId = tableId + subMainId;
        	}
            this.rowTpl = new Ext.Template(
                '<div class="x-grid3-summary-row x-grid3-gridsummary-row-offset">',
                    '<table id='+tableId+' class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                        '<tbody><tr>{cells}</tr><tr>{totalCells}</tr></tbody>',
                    '</table>',
                '</div>'
            );
            this.rowTpl.disableFormats = true;
        }
        this.rowTpl.compile();

        if (!this.cellTpl) {
            this.cellTpl = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                    '<div class="x-grid3-cell-inner-summary x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
                "</td>"
            );
            this.cellTpl.disableFormats = true;
        }
        this.cellTpl.compile();
    },

    calculate : function(rs, cm) {
        var data = {}, cfg = cm.config;
        for (var i = 0, len = cfg.length; i < len; i++) { // loop through all columns in ColumnModel
            var cf = cfg[i], // get column's configuration
                cname = cf.dataIndex; // get column dataIndex

            // initialise grid summary row data for
            // the current column being worked on
            if(cf.summaryType=='min'){
				data[cname] =Number.MAX_VALUE;
			}else if(cf.summaryType=='max'){
				data[cname] = Number.MIN_VALUE;
			}else{
				data[cname] = 0;
			}
			
            if (cf.summaryRenderer){
            	if(!cf.summaryType) {
	            	cf.summaryType = 'sum';	// default to Sum, you can define 'count', 'max', 'min', 'average' in the Column defination 
	            }
	            for (var j = 0, jlen = rs.length; j < jlen; j++) {
	                var r = rs[j]; // get a single Record
	                data[cname] = Ext.ux.grid.GridSummary.Calculations[cf.summaryType](r.get(cname), r, cname, data, j);
	            }
            }            
        }

        return data;
    },

    onLayout : function(vw, vh) {
        if (Ext.type(vh) != 'number') { // handles grid's height:'auto' config
            return;
        }
        // note: this method is scoped to the GridView
        if (!this.grid.getGridEl().hasClass('x-grid-hide-gridsummary')) {
            // readjust gridview's height only if grid summary row is visible
            this.scroller.setHeight(vh - this.summary.getHeight());
            if(this.lockedScroller){
                this.lockedScroller.setHeight(vh - this.summary.getHeight());
            }
        }
        this.summary.setStyle('width', this.scroller.getStyle('width'));
    },

    onLayoutWhenDoWidth : function() {
        if (!this.grid.getGridEl().hasClass('x-grid-hide-gridsummary')) {
            // readjust gridview's height only if grid summary row is visible
            this.view.scroller.setHeight(this.view.scroller.getHeight() - this.view.summary.getHeight());
            if(this.view.lockedScroller){
                this.view.lockedScroller.setHeight(this.view.lockedScroller.getHeight() - this.view.summary.getHeight());
            }
        }
        this.view.summary.setStyle('width', this.view.scroller.getStyle('width'));
    },

    doWidth : function(col, w, tw) {
        try{
            var s = this.view.summary.dom;

            var isLocked = false;
            var lockedCount = 0;
            var cs = this.view.getColumnData();
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i];
                if(!c.locked) {
                    break;
                }
                if(c.locked) {
                    isLocked = true;
                    lockedCount=lockedCount+1;
                }
            }
            if(isLocked){
                if(col >= lockedCount){
                    s.firstChild.style.width = tw;
                    s.firstChild.rows[0].childNodes[col - lockedCount].style.width = w;
                }
                this.onLayoutWhenDoWidth();
            }else{
                s.firstChild.style.width = tw;
                s.firstChild.rows[0].childNodes[col].style.width = w;
                if(this.view.lockedScroller){
                    this.view.lockedScroller.setHeight(this.view.lockedScroller.getHeight() - this.view.summary.getHeight());
                }
            }
        }catch(e){
        }
    },

    doAllWidths : function(ws, tw) {
        var s = this.view.summary.dom, wlen = ws.length;

        s.firstChild.style.width = tw;

        var cells = s.firstChild.rows[0].childNodes;

        for (var j = 0; j < wlen; j++) {
            cells[j].style.width = ws[j];
        }
    },

    doHidden : function(col, hidden, tw) {
        var s = this.view.summary.dom,
            display = hidden ? 'none' : '';

        s.firstChild.style.width = tw;
        s.firstChild.rows[0].childNodes[col].style.display = display;
    },

    renderSummary : function(o, cs, cm) {
        cs = cs || this.view.getColumnData();
        cm = this.view.cm || cm;
        var cfg = cm.config,
            buf = [],
            totalBuf = [],
            last = cs.length - 1;

        for (var i = 0, len = cs.length; i < len; i++) {
            var c = cs[i], cf = cfg[i], p = {};

            p.id = c.id;
            p.style = c.style;
            p.style = p.style.replace('center', 'right');
            p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
            
            p.value = '';
            if(!c.locked) {
                totalBuf[totalBuf.length] = this.cellTpl.apply(p);
            }
            if (cf.summaryType || cf.summaryRenderer) {
                p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o);
            } else {
                p.value = '';
            }
            //此处设置默认不显示时用什么符号标记
            if (p.value == undefined || p.value === ''){
	            //"本页合计："这个title默认放置在第一列，也可以在配置项【summaryTitleColumn】中指定
	            if((cf.dataIndex === this.summaryTitleColumn) || (!this.summaryTitleColumn && i === 1)){
	            	p.value = this.summaryTitle;
	            }else{
	            	p.value = '';
	            }
            }
            if(!c.locked){
                buf[buf.length] = this.cellTpl.apply(p);
            }
        }

        return this.rowTpl.apply({
            tstyle: 'width:' + this.view.getTotalWidth() + ';',
            cells: buf.join(''),
            totalCells: totalBuf.join('')
        });
    },

    refreshSummary : function() {
    	var invisible = false;
    	var el = this.grid.getGridEl();

        if (el) {
           invisible = el.hasClass('x-grid-hide-gridsummary');
        }
        // 隐藏时不刷新合计
        if(!invisible){
        	var g = this.grid, ds = g.store,
        	cs = this.view.getColumnData(),
        	cm = this.view.cm || this.cm,
        	rs = ds.getRange(),
        	data = this.calculate(rs, cm),
        	buf = this.renderSummary({data: data}, cs, cm);
        	
        	if (!this.view.summaryWrap) {
        		this.view.summaryWrap = Ext.DomHelper.insertAfter(this.view.scroller, {
        			tag: 'div',
        			cls: 'x-grid3-gridsummary-row-inner'
        		}, true);
        	}
        	this.view.summary = this.view.summaryWrap.update(buf).first();

        	this.view.scroller.setStyle('overflow-x', 'hidden');
        	var gridView= this.view;
        	this.view.summary.setStyle('overflow-x', 'scroll');
            this.view.summary.setStyle('width', this.view.scroller.getStyle('width'));
        	this.view.summary.on("scroll", function(){
        		gridView.scroller.scrollTo('Left', gridView.summary.getScroll().left);
        	});
        }
	},

    toggleSummary : function(visible) { // true to display summary row
        var el = this.grid.getGridEl();

        if (el) {
            if (visible === undefined) {
                visible = el.hasClass('x-grid-hide-gridsummary');
            }
            el[visible ? 'removeClass' : 'addClass']('x-grid-hide-gridsummary');

            this.view.layout(); // readjust gridview height
        }
    },

    getSummaryNode : function() {
        return this.view.summary
    }
});
Ext.reg('gridsummary', Ext.ux.grid.GridSummary);

/*
 * all Calculation methods are called on each Record in the Store
 * with the following 5 parameters:
 *
 * v - cell value
 * record - reference to the current Record
 * colName - column name (i.e. the ColumnModel's dataIndex)
 * data - the cumulative data for the current column + summaryType up to the current Record
 * rowIdx - current row index
 */
Ext.ux.grid.GridSummary.Calculations = {
    sum : function(v, record, colName, data, rowIdx) {
        return data[colName] + Ext.num(v, 0);
    },

    count : function(v, record, colName, data, rowIdx) {
        return rowIdx + 1;
    },

    max : function(v, record, colName, data, rowIdx) {
        return Math.max(Ext.num(v, 0), data[colName]);
    },

    min : function(v, record, colName, data, rowIdx) {
        return Math.min(Ext.num(v, 0), data[colName]);
    },

    average : function(v, record, colName, data, rowIdx) {
        var t = data[colName] + Ext.num(v, 0), count = record.store.getCount();
        return rowIdx == count - 1 ? (t / count) : t;
    }
}