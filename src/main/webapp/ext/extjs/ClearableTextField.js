/** 
 * 带按钮选项的TextField组件 
 *  
 * @class Ext.form.ClearableTextField 
 * @extends Ext.form.TextField 
 * @author zk 
 */  
Ext.form.ClearableTextField = Ext.extend(Ext.form.TriggerField, {  
    triggerStatus : 0, //0隐藏，1显示  
    initComponent : function() {  
        Ext.form.ClearableTextField.superclass.initComponent.call(this);  
        this.addEvents('clear');    
  
        this.triggerConfig = {  
            tag : 'span',  
            cls : 'x-form-twin-triggers',  
            cn : [{  
                        tag : "img",  
                        src : Ext.BLANK_IMAGE_URL,  
                        cls : "x-form-trigger x-form-clear-trigger"  
                    }]  
        };
    },  
    getTrigger : function() {  
        return this.trigger;  
    },  
    afterRender : function(){  
        Ext.form.ClearableTextField.superclass.afterRender.call(this);  
        this.trigger.hide();  
    },  
    initTrigger : function(){  
        var triggerField = this;
        var defaultWidth=this.getWidth();
        triggerField.triggerStatus = 0;  
          
        //默认  
        this.trigger.hide = function(){
            var w = defaultWidth;
            this.dom.style.display = 'none';
            triggerField.el.setWidth(w + triggerField.trigger.getWidth());
            triggerField.triggerStatus = 0;
        };  
        this.trigger.show = function(){
            var w = defaultWidth;
            this.dom.style.display = '';
            triggerField.el.setWidth(w-triggerField.trigger.getWidth());
            triggerField.triggerStatus = 1;
        };  
  
        this.mon(this.trigger, 'click', this.onTriggerClick, this, {preventDefault:true});  
        this.trigger.addClassOnOver('x-form-trigger-over');  
        this.trigger.addClassOnClick('x-form-trigger-click');  
    },  
    /*onResize : function(w, h){  
        Ext.form.TriggerField.superclass.onResize.call(this, w, h);  
    },*/  
    onTriggerClick : function() {  
        if (this.readOnly || this.disabled) {  
            return;  
        }  
        this.clearValue();  
        this.fireEvent('clear', this);  
        if (this.hasListener('change')) {  
            this.fireEvent('change', this);  
        }  
    },  
    onBlur : function() {
        Ext.form.ClearableTextField.superclass.onBlur.call(this);
        if (this.getValue()&&this.getValue().length > 0) {
            this.trigger.show();
        } else {
    		this.trigger.hide();
        }  
    },  
    setValue : function(v) {  
        Ext.form.ClearableTextField.superclass.setValue.call(this,v);  
        if (this.getValue()&&this.getValue().length > 0) {  
        	if(this.trigger)
        		this.trigger.show();  
        } else {
        	if(this.trigger)
        		this.trigger.hide();  
        }  
    },  
    clearValue : function() {  
        this.setRawValue('');  
        this.applyEmptyText();  
        this.value = '';  
        this.trigger.hide();  
    },  
    reset : function() {  
        Ext.form.ClearableTextField.superclass.reset.call(this);  
        if (this.getValue()&&this.getValue().length > 0) {  
            this.trigger.show();  
        } else {  
            this.trigger.hide();  
        }  
    }
});  
  
Ext.reg('cleartextfield', Ext.form.ClearableTextField);