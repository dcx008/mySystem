if ('function' !== typeof RegExp.escape) {
    RegExp.escape = function(s) {
        if ('string' !== typeof s) {
            return s
        }
        return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
    }
}

Ext.ns('Ext.ux.form');
Ext.ux.form.LovTreeCombo = Ext.extend(Ext.form.ComboBox, {
    checkField		: 'checked',
    displayField	: "name",
    valueField		: "id",
    hiddenValueField: null,
    parentField		: "parentId",
    dataRoot		: "data",
    separator		: ",",
    rootText		: "",
    rootValue		: 0,
    rootVisible		: false,
    triggerAction	: "all",
    //lazyInit		: false,
    /** @selectNodeModel
     * all : 所有结点都可选中
     * exceptRoot ： 除根结点，其它结点都可选
     * folder : 只有目录（非叶子和非根结点）可选
     * leaf ：只有叶子结点可选
     */
    selectNodeModel	: 'all',
    //mode			: "local",
    editable		: false,
    emptyText		: '请选择...',
    constructor : function(){
        Ext.ux.form.LovTreeCombo.superclass.constructor.apply(this, arguments);
        this.maxHeight = this.maxHeight || this.height;
        if(!this.store){
            this.store = new Ext.data.JsonStore({
                autoLoad	: true,
                url			: this.url,
                root		: this.dataRoot,
                fields		: this.hiddenValueField?[
                                {name : this.displayField},
                                {name : this.valueField},
                                {name : this.parentField},
                                {name : this.hiddenValueField}
                            ]:[
                                {name : this.displayField},
                                {name : this.valueField},
                                {name : this.parentField}
                            ]
            });
        }
        this.store.on({
            scope : this,
            load : function(store){
                this.getValue()&&this.setValue(this.getValue());
                if(this.tree){
                    this.loadData();
                }
            }
        })
    },
    getMaxLength:function (len,node,typeFlag,iconLength) {//typeFlag true  获取整个树，所有打开节点中最大的宽度，false,获取node下子节点的最大宽度
        var me=this;
        if( node && node.childNodes && node.childNodes.length > 0){
            node.childNodes.forEach(function (val,index,array) {
                var node_index=0;
                var flag=true;
                var temp_node=node;
                while (flag){
                    node_index+=1;
                    if(temp_node.parentNode){
                        temp_node=temp_node.parentNode;
                    }else{
                        flag=false;
                    }
                }
                var w_1=(node_index+1)*(iconLength?iconLength:16)+20;//16：小图标宽度，20 冗余宽度
                var w=val.text.toString().getCssLength()+w_1;
                if(len<w){
                    len=w;
                }
                if(typeFlag && val.childNodes && val.childNodes.length > 0 && val.expanded){
                    len=me.getMaxLength(len,val,true,iconLength);
                }
            })
        }
        return len;
    },
    initList : function(){
        if(!this.list){
            var cls = 'x-combo-list';

            this.list = new Ext.Layer({
                parentEl	: this.getListParent(),
                shadow		: this.shadow,
                cls			: [cls, this.listClass].join(' '),
                constrain	: false
            });

            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            var lw = 600;


            this.list.setSize(lw, 0);
            this.assetHeight = 0;
            if(this.syncFont !== false){
                this.list.setStyle('font-size', this.el.getStyle('font-size'));
            }

            this.innerList = this.list.createChild({cls:cls+'-inner'});
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

            if(!this.tree){
                this.tree = new Ext.tree.TreePanel({
                    root	: new Ext.tree.TreeNode({
                        text	: this.rootText,
                        id		: this.rootValue,
                        expanded: true
                    }),
                    selectNodeModel	: this.selectNodeModel,
                    border			: false,
                    rootVisible		: this.rootVisible,
                    autoHeight		: true,
                    renderTo		: this.innerList
                });

                this.tree.on({
                    scope : this,
                    checkchange : this.onCheckChange,
                    expandnode : function(nodep){
                        this.expandNode(nodep);
                    },

                    // 取消双击事件
                    beforedblclick  : function(){
                        return false;
                    }
                })
                this.on('expand', function() {
                    if(this.tree.getRootNode().childNodes.length>0){
                        this.fireEvent("onDoResize",this);
                    }
                });
                this.on('onDoResize',this.onDoResize,this);
                // if(this.store.getCount()>0){
                //     this.loadData();
                // }
            }
            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,{
                    pinned : true,
                    handles:'se'
                });
                this.mon(this.resizer, 'resize', function(r, w, h){
                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                    this.listWidth = w;
                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                    this.restrictHeight();
                }, this);

                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
            }
        }
    },

    expandNode: function (nodep) {
        this.tree.suspendEvents();
        var values = this.getCheckedValue().split(this.separator);
        nodep.cascade(function(node){
            node.getUI().toggleCheck(false);
            node.attributes.checked=false;
            for(var i = 0 ; i < values.length;i++){
                if("" + node.attributes[this.valueField] === values[i]){
                    node.getUI().toggleCheck(true);
                    node.attributes.checked=true;
                    break;
                }
            }
        },this);
        this.tree.resumeEvents();
        this.restrictHeight();
    },

    onCheckChange : function(node,checked) {
        var isRoot = (node == this.tree.getRootNode());
        var selModel = this.selectNodeModel;
        var isLeaf = node.isLeaf();
        if (isRoot && selModel != 'all') {
            return;
        } else if (selModel == 'folder' && isLeaf) {
            return;
        } else if (selModel == 'leaf' && !isLeaf) {
            return;
        }
        var r = this.findRecord(this.valueField, node.attributes[this.valueField]);
        if(r){
            r["data"][this.checkField] = checked;
        }
        this.setValue(this.getCheckedValue());
    },

    onDoResize : function(){
        var showName=this.displayField;
        if(ByUtil.isUE(showName)){
            return;
        }
        if(ByUtil.isUE(this.maxCssLength)){
            var maxLength=this.getMaxLength(this.width,this.tree.getRootNode(),true,30) || this.width;
            this.maxCssLength=maxLength;
            this.doResize(maxLength);
        }else{
            this.doResize(this.maxCssLength);
        }
    },
    expand: function() {
        if (this.isExpanded() || !this.hasFocus) {
            return;
        }
        this.assetHeight = 0;
        // if (this.bufferSize) {
            // this.doResize(this.bufferSize);
            // this.onDoResize();
            // delete this.bufferSize;
        // }
        this.restrictHeight();
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));
        this.list.setZIndex(this.getZIndex());
        this.list.show();
        if (Ext.isGecko2) {
            this.innerList.setOverflow('auto');
        }
        this.mon(Ext.getDoc(), {
            scope: this,
            mousewheel: this.collapseIf,
            mousedown: this.collapseIf
        });
        this.fireEvent('expand', this);
    },

    loadData : function(){
        var data = [];
        this.store.each(function(item,index){
            /**此处进行数据复制*/
            data.push(Ext.apply({},item.data));
        },this);
        var treedata = this.formatData(data);
        if(this.tree){
            this.tree.getRootNode().appendChild(treedata);
            this.tree.getRootNode().expandChildNodes();
        }
        this.fireEvent('expand', this);
    },

    formatData : function (data){
        var valueIsCode = false;
        var len = data.length;
        var r = [], b = {},
            p = this.parentField,
            v = this.valueField,
            d = this.displayField,
            s = this.rootValue,h = this.hiddenValueField;
        if(data[0][p] != this.rootValue){
            s = data[0][p];
        }
        if(v.indexOf('Code') > - 1 || v.indexOf('gsdm') > -1){
            valueIsCode = true;
        }
        for(var i = 0; i < len; i ++){
            var item = data[i];
            var id = item[v];
            if(valueIsCode){
                id = item[h];
            }
            item["text"]=item[d];
            item["id"]=item[v];
            item.checked = false;
            item["children"]=[];
            if(valueIsCode){
                data[i][h] = id;
            }
            if(item[p]==s){
                r.push(item);
                continue;
            }
            if(!b["_"+item[p]]){
                for(var a = 0 ; a < len; a++){
                    var t = data[a];
                    if(item[p]==t[v] || valueIsCode && item[p]==t[h]){
                        if(t[p]==s&&!b["_"+t[v]]){
                            b["_"+t[v]] = t;
                            b["_"+t[v]].leaf = false;
                        }
                        if(!t["children"])t["children"]=[];
                        t.leaf = false;
                        t["children"].push(item);
                        item.leaf = true;
                        item.checked = false;
                        break;
                    }
                }
                continue;
            }
            if(!b["_"+item[p]]["children"]){
                b["_"+item[p]]["children"] = [];
                b["_"+item[p]].leaf = false;
            }
            item.leaf = true;
            item.checked = false;
            b["_"+item[p]]["children"].push(item);
            continue;
        }
        return 	r;
    },

    clearValue: function() {
        this.value = '';
        this.setRawValue(this.value);
        var root = this.tree.getRootNode();
        root.cascade(function(node){
            if (node.attributes.checked) {
                node.getUI().toggleCheck(false);
                node.attributes.checked=false;
            }
        },this)
        if(this.hiddenField) {
            this.hiddenField.value = ''
        }
        this.applyEmptyText()
    },

    getCheckedDisplay: function() {
        var re = new RegExp(this.separator, "g");
        return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ')
    },
    getCheckedValue: function(field) {
        field = field || this.valueField;
        var c = [];
        var snapshot = this.store.snapshot || this.store.data;
        snapshot.each(function(r) {
            if (r.get(this.checkField)) {
                c.push(r.get(field))
            }
        },this);
        return c.join(this.separator)
    },

    setValue: function(v) {
        if (typeof v != 'undefined') {
            v = '' + v;
            this.value =  v;
            this.store.clearFilter();
            this.store.each(function(r) {
                var checked = !(!v.match('(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField)) + '(' + this.separator + '|$)'));
                r.set(this.checkField, checked);
            },this);
            this.setRawValue(this.store.getCount()>0 ? this.getCheckedDisplay() : this.value);
            if (this.hiddenField) {
                this.hiddenField.value = this.value
            }
            if (this.el) {
                this.el.removeClass(this.emptyClass)
            }
        } else {
            this.clearValue()
        }
    },

    getValue: function() {
        return typeof this.value != 'undefined' ? this.value : '';
    },

    onSelect : Ext.emptyFn,
    select : Ext.emptyFn,
    onViewOver : Ext.emptyFn,
    onViewClick : Ext.emptyFn,
    assertValue : Ext.emptyFn,
    beforeBlur : Ext.emptyFn
});  
Ext.reg('lovtreecombo', Ext.ux.form.LovTreeCombo);