Ext.namespace('Ext.ui.plugins');

Ext.ui.plugins.SliderPageSize = function(config) {
    Ext.apply(this, config);
};

Ext.extend(Ext.ui.plugins.SliderPageSize, Ext.util.Observable, {
    pageSizes: [5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 500, 1000, 2000, 5000],
    tipText: '每页{0}条',
    addToItem: true,    //true添加到items中去，配合index；false则直接添加到最后
    index: 10,           //在items中的位置
    init: function(pagingToolbar) {

        var ps = this.pageSizes;
        var sv = 0;
        Ext.each(this.pageSizes, function(ps, i) {
            if (ps == pagingToolbar.pageSize) {
                sv = i;
                return;
            }
        });
        var tt = this.tipText;
        var slider = new Ext.Slider({
            width: 115,
            value: sv,
            minValue: 0,
            maxValue: ps.length - 1,
            plugins: new Ext.ux.SliderTip({
                getText: function(slider) { return String.format(tt, ps[slider.value]); }
            }),
            listeners: {
                changecomplete: function(s, v) {
                    pagingToolbar.pageSize = ps[v];
                    var rowIndex = 0;
                    var gp = pagingToolbar.findParentBy(
                function(ct, cmp) { return (ct instanceof Ext.grid.GridPanel) ? true : false; }
              );
                    var sm = gp.getSelectionModel();
                    if (undefined != sm && sm.hasSelection()) {
                        if (sm instanceof Ext.grid.RowSelectionModel) {
                            rowIndex = gp.store.indexOf(sm.getSelected());
                        } else if (sm instanceof Ext.grid.CellSelectionModel) {
                            rowIndex = sm.getSelectedCell()[0];
                        }
                    }
                    rowIndex += pagingToolbar.cursor;
                    pagingToolbar.doLoad(Math.floor(rowIndex / pagingToolbar.pageSize) * pagingToolbar.pageSize);
                }
            }
        });
        //
        if (this.addToItem) {
            var inputIndex = this.index;
            if (inputIndex > pagingToolbar.items.length) inputIndex = pagingToolbar.items.length;
            pagingToolbar.insert(++inputIndex, '-');
            pagingToolbar.insert(++inputIndex, slider);
        }
        else {
            pagingToolbar.add('-');
            pagingToolbar.add(slider);            
        }
        //
        pagingToolbar.on({
            beforedestroy: function() {
                slider.destroy();
            },
            change: function() {
                for (var i = 0; i < ps.length; i++) {
                    if (ps[i] == pagingToolbar.pageSize) {
                        slider.setValue(i);
                    }
                }
            }
        });

    }
});