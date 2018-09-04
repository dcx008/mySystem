Ext.form.ClearableComboBox = Ext.extend(Ext.form.ComboBox, {  
    initComponent: function(){  
        Ext.form.ClearableComboBox.superclass.initComponent.call(this);  
        this.addEvents('clear');  
          
        this.triggerConfig = {  
            tag:'span',  
            cls:'x-form-twin-triggers',  
            //style:'padding-right:2px',  
            cn:[  
                {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger"},  
                {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger x-form-clear-trigger"}  
            ]  
        };  
    },  
  
    getTrigger: function(index){  
        return this.triggers[index];  
    },  
  
    initTrigger: function(){  
        var ts = this.trigger.select('.x-form-trigger', true);  
        this.wrap.setStyle('overflow', 'hidden');  
        var triggerField = this;  
        ts.each(function(t, all, index){  
            t.hide = function(){  
                var w = triggerField.wrap.getWidth();  
                this.dom.style.display = 'none';  
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());  
            };  
            t.show = function(){  
                var w = triggerField.wrap.getWidth();  
                this.dom.style.display = '';  
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());  
            };  
            var triggerIndex = 'Trigger'+(index+1);  
  
            if(this['hide'+triggerIndex]){  
                t.dom.style.display = 'none';  
            }  
            t.on("click", this['on'+triggerIndex+'Click'], this, {preventDefault:true});  
            t.addClassOnOver('x-form-trigger-over');  
            t.addClassOnClick('x-form-trigger-click');  
        }, this);  
        this.triggers = ts.elements;  
    },  
  
    onTrigger1Click: function() {this.onTriggerClick()},  
    onTrigger2Click: function() {this.clearValue(); this.fireEvent('clear', this)},
    expand : function(){
        if(this.isExpanded() || !this.hasFocus){
            this.reDoResize();
            return;
        }

        if(this.title || this.pageSize){
            this.assetHeight = 0;
            if(this.title){
                this.assetHeight += this.header.getHeight();
            }
            if(this.pageSize){
                this.assetHeight += this.footer.getHeight();
            }
        }

        if(this.bufferSize){
            this.doResize(this.bufferSize);
            delete this.bufferSize;
        }
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));

        // zindex can change, re-check it and set it if necessary
        this.list.setZIndex(this.getZIndex());
        this.list.show();
        if(Ext.isGecko2){
            this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
        }
        this.mon(Ext.getDoc(), {
            scope: this,
            mousewheel: this.collapseIf,
            mousedown: this.collapseIf
        });
        this.fireEvent('expand', this);
    },
    reDoResize:function () {
        var showName=this.displayField;
        if(ByUtil.isUE(showName)){
            return;
        }
        var maxLength=this.width;
        this.getStore().each(function (rec) {
            //36:添加冗余宽度 (包括下拉条宽度)
            if(maxLength<rec.get(showName).getCssLength()+36){
                maxLength=rec.get(showName).getCssLength()+36;
            }
        })
        this.doResize(maxLength);
    }
});  
  
Ext.reg('clearcombo', Ext.form.ClearableComboBox);