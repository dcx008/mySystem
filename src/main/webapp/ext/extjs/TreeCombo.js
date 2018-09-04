Ext.ux.TreeCombo = Ext.extend(Ext.form.ClearableComboBox, {
    isHiddenValue:true,
    tplId:'TreeCombo',
    constructor : function(cfg) {
        cfg = cfg || {};
        Ext.ux.TreeCombo.superclass.constructor.call(this, Ext.apply({
            maxHeight : 230,
            editable : false,
            mode : 'local',
            triggerAction : 'all',
            rootVisible : false,
            selectMode : 'all'
        }, cfg));
    },
    store : new Ext.data.SimpleStore({
        fields : [],
        data : [[]]
    }),
    // 重写onViewClick，使展开树结点是不关闭下拉框
    onViewClick : function(doFocus) {
        var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);
        if (r) {
            this.onSelect(r, index);
        }
        if (doFocus !== false) {
            this.el.focus();
        }
    },
    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.value = '';
        }
        this.setRawValue('');
        this.lastSelectionText = '';
        this.applyEmptyText();
        this.value = '';
        this.setHiddenValue('');
    },
    tree : null,
    // 隐藏值
    hiddenValue : null,
    getHiddenValue : function() {
        return this.hiddenValue;
    },
    getValue : function() {   //增加适用性，与原来combo组件一样
        if (this.isHiddenValue) {
            return this.hiddenValue;
        } else if (this.valueField) {
            return Ext.isDefined(this.value) ? this.value : '';
        } else {
            return Ext.form.ComboBox.superclass.getValue.call(this);
        }
    },
    setHiddenValue : function(code, dispText) {
        this.setValue(code);
        Ext.form.ComboBox.superclass.setValue.call(this, dispText);
        this.hiddenValue = code;
    },
    initComponent : function() {
        var _this = this;
        var tplRandomId = 'deptcombo_' + Math.floor(Math.random() * 1000) + this.tplId;
        this.tpl = "<div style='height:" + _this.maxHeight + "px;width: auto;' id='" + tplRandomId + "'></div>";
        this.tree = new Ext.tree.TreePanel({
            frame: false,
            border: false,
            defaults: {
                // bodyStyle: 'overflow-y:auto;'
            },
            collapsible: false,
            expanded: true,
            rootVisible: _this.rootVisible || false,
            lines: true,
            animate: false,
            height:_this.maxHeight,
            split: true,
            loader: new Ext.tree.JsonPluginTreeLoader({
                rootName: 'data',
                dataUrl: _this.url,
                listeners:{
                    load:function (combo,rootNode,response) {
                        if(rootNode.childNodes.length>0){
                            rootNode.childNodes.forEach(function (val,index,array) {
                                val.expand()
                            })
                            _this.fireEvent("expand",_this);
                        }
                    }
                }
            }),
            autoScroll: true,
            root: {
                nodeType: 'async'
            },
            listeners: {
                expandnode:function (node) {
                    if(_this.tree.getRootNode()!=node && node && node.childNodes.length>0){
                        var width=_this.getMaxLength(_this.list.getWidth(),node,false);
                        if(width!=_this.list.getWidth()){
                            _this.doResize(width);
                        }
                    }
                }
            }
        });
        this.tree.on('click', function(node) {
            _this.fireEvent('onDoResize',_this);
            if ((_this.selectMode == 'leaf' && node.leaf == true) || _this.selectMode == 'all') {
                if(_this.fireEvent('beforeselect',_this,node)){
                	_this.fireEvent('select',_this,node);
                }
            }
        });
        this.on('select',function(obj,node){
        	var dispText = node.text;
        	var code = node.id;
        	var attrName = _this.attrName;
        	if(attrName &&　(attrName in node.attributes)){
        		code = node.attributes[attrName];
        	}
            obj.setHiddenValue(code, dispText);
            obj.collapse();
        });
        this.on('expand', function() {
            if(this.tree.getRootNode().childNodes.length>0){
                this.fireEvent("onDoResize",this);
            }
            var me=this;
            this.tree.render(tplRandomId);
        });
        this.on('onDoResize',this.onDoResize,this);
        Ext.ux.TreeCombo.superclass.initComponent.call(this);
    },
    onDoResize:function () {
        var lenTemp=this.getMaxLength(this.getWidth(),this.tree.getRootNode(),true);
        this.doResize(lenTemp)
    },
    getMaxLength:function (len,node,typeFlag) {//typeFlag true  获取整个树，所有打开节点中最大的宽度，false,获取node下子节点的最大宽度
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
                var w_1=(node_index+1)*16+30;//16：小图标宽度，20 冗余宽度
                var w=val.text.toString().getCssLength()+w_1;
                if(len<w){
                    len=w;
                }
                if(typeFlag && val.childNodes && val.childNodes.length > 0 && val.expanded){
                    len=me.getMaxLength(len,val,true);
                }
            })
        }
        return len;
    }
});
Ext.reg("treecombo", Ext.ux.TreeCombo);