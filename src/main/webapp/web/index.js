$(function () {


    var toolbar = new Ext.Toolbar({
        //renderTo: Ext.getBody(),
        region:'north',
        border: false,
        style: 'border:none;background:#D7E2F3;',//边缘线去除background:#d0ebe2;
        frame:false,
        height:30,
        items: [
            {
                text: "系统管理",
                handler: function (btn) {
                    alert(btn.text);
                }
            },
            {
                text: "编辑",
                handler:function (btn) {

                }
            },
            {
                text: "格式"
            },
            {
                text: "查看",
                handler:function () {
                    showSelfInfo();
                },
                scope:this
            },
            {
                text: "帮助"
            },
            "->",//用于居右
            new Ext.form.Field(), {
                text: "搜索"
            }
        ]
    });
    var tree = new Ext.tree.TreePanel({
        region: 'west',
        //True表示为面板是可收缩的，并自动渲染一个展开/收缩的轮换按钮在头部工具条
        collapsible: true,
        title: '导航菜单',//标题文本
        width: 200,
        margins:'2 0 2 2',
        expanded:false,
        defaults:{
            bodyStyle: 'background:#d0ebe2;border-color:#d0ebe2;border:none;'
        },
        border : false,//表框
        frame:false,
        autoScroll: true,//自动滚动条
        animate : true,//动画效果
        rootVisible: false,//根节点是否可见
        split: true,
        //autoHeight: true,//自动高度, 默认为false
        // draggable:true,//是否允许拖曳
        // enableDrag:true,//树的节点可以拖动Drag(效果上是), 注意不是Draggable
        // enableDD:true,//设置树的节点是否可以拖动
        //enableDrop:true,//仅仅drop
        //lines:false,//是否显示树线，默认为true
        loader : new Ext.tree.TreeLoader({
            /* preloadChildren: true,
             dataUrl:'json/menu.json'*/
        }),
        root : new Ext.tree.AsyncTreeNode({
            text:'我是根',
            children:[{
                text : '系统管理',
                children : [
                    { text : '用户' , leaf : true },
                    { text : '岗位' , leaf : true }
                ]
            },{
                text :'基础数据',
                children : [
                    { text : '商品' , leaf : true },
                    { text : '服务' , leaf : true }
                ]
            }]
        }),
        listeners: {
            afterrender: function(node) {
                // tree.expandAll();//展开树
            },
            'click':function(node){
                if(node.isLeaf()){
                    //alert('已经是末节点！');
                    addTab('1');
                }
            },
            beforeload:function () {
                var delayTask=new Ext.util.DelayedTask(function () {

                });
                delayTask.delay(10);
            },
            load:function () {
                var delayTask=new Ext.util.DelayedTask(function () {

                });
                delayTask.delay(20);
            }
        }
    });

    var panel = new Ext.Panel({
        //title: "面板用法",
        //width: 300,
        //renderTo: Ext.getBody(),
        region:'south',
        border:false,
        //frame:false,
        height:22,
        bodyStyle:'border:none;background-color:#D5E1F2;',//#d0ebe2background:#d0ebe2;
        style:'text-align:center;',
        html: "到底了。。。"
        /*tbar: [{
            text: "顶部工具栏topToolbar"
        }],
        bbar: [{
            text: "底部工具栏bottomToolbar"
        }],
        buttons: [{
            text: "按钮位于footer"
        }]*/
    });

    var tabPanel=new Ext.TabPanel( {
        region:'center',
        id:'MainTab',
        margins:'2 2 2 0',
        enableTabScroll : true,
        // plugins : new Ext.ux.TabCloseMenu(),
        // bodyStyle:'width:100%;overflow-x:hidden;overflow-y:scroll;background-color: #F6F6F5;',
        defaults:{
            bodyStyle: 'overflow:hidden;background-color: #F6F6F5;border:none'
        },
        // autoScroll:true,
        border:false,
        activeTab: 0,//激活的页数
        frame: true, //出现渲染的边框
        items: [{
            xtype:'panel',
            itemId:'welcome',
            //iconCls:'house',//标题前的图片
            title: '欢迎页面',
            layout:'table',
            frame:true,
            html:'欢迎',
            baseCls:'x-plain'
        }
        ],
        // //双击关闭tab页
        initEvents: function() {
            Ext.TabPanel.superclass.initEvents.call(this);
            this.mon(this.strip, {
                scope: this,
                mousedown: this.onStripMouseDown,
                contextmenu: this.onStripContextMenu
            });
            if(this.enableTabScroll){
                this.mon(this.strip, 'mousewheel', this.onWheel, this);
            }
            //以上是父类的方法 还是要的
            // 新增的方法 ADD:monitor title dbclick
            this.mon(this.strip, 'dblclick', this.onTitleDbClick, this);
        },
        //ADD: handler  双击关闭tab页
        onTitleDbClick: function(e, target, o) {
            var t = this.findTargets(e);
            if(t.item&&"欢迎页面"!=t.item.title){
                if (t.item.fireEvent('beforeclose', t.item) !== false) {
                    t.item.fireEvent('close', t.item);
                    this.remove(t.item);
                }
            }
        }
    });

    IndexPanel = Ext.extend(Ext.Viewport, {

        constructor:function(config){
            var component = this;
            // var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait...",title:'系统信息'});
            try{
                IndexPanel.superclass.constructor.call(this, {
                    frame:false,
                    border:false,
                    layout:"border",
                    items:[toolbar,tree,panel,tabPanel]
                });

            }catch(e){
                console.log(e);
            }
        }
    });
    new IndexPanel();

 /*   new Ext.Viewport({
        frame:false,
        border:false,
        layout:"border",
        items: [toolbar,tree,tabPanel,panel]
    });*/
});

function addTab(tabid) {
    var centerPanel = Ext.getCmp("MainTab");
    var tabId = "main_tab_" + tabid;
    //var tab = centerPanel.getComponent(tabId);
    var elWidth=Ext.getBody().getWidth();
    var elHeight=Ext.getBody().getHeight();
    var newTab = centerPanel.add(new Ext.Panel({
        id : tabId,
        draggable:false,
        layout : 'fit',
        title:'新页面',
        //iconCls:'tab',
        border : false,
        frame:false,
        closable : true,
        //autoScroll:true,
        autoLoad:{
            url:'/web/systemManage/user.jsp',
            method:'post',
            discardUrl: true,
            text: "<div class='loading-indicator' style='margin-left:"+(elWidth/3)+"px;margin-top: "+(elHeight/4)+"px;font-size: 20px;'>页面加载中,请稍候……</div>",
            nocache: true,
            params:{
                'basicModuleId':'1',
                'defaultValue':''
            },
            timeout: 9000,
            nocache:true,
            scripts:true
        },
        listeners : {
            'bodyresize':function(){
                var w = Ext.getCmp('MainTab').getActiveTab().getInnerWidth();
                var h = Ext.getCmp('MainTab').getActiveTab().getInnerHeight();
                w = w < 800 ? 800:w;
                var Atab = Ext.getCmp('MainTab').getActiveTab().id;
                var submain = Ext.getCmp(Atab.replace("main_tab_","")+"_mainPanel");
                if (submain) {
                    submain.setWidth(w);
                    submain.setHeight(h);
                }
            }
        }
    }));
    centerPanel.setActiveTab(newTab);
}

function showSelfInfo() {
    var modifyPassWin = new Ext.Window({
        id:'modifyPassWin',
        title:'修改个人密码',
        width:300,
        height:220,
        plain:true,
        modal:true,
        border:false,
        frame:true,
        layout:'border',
        items:[{
            xtype:'form',
            id:'modifyPassForm',
            border:false,
            frame:true,
            region:'center',
            labelWidth:60,
            defaults:{
                xtype:'textfield',
                width:200
            },
            items:[{
                xtype:'displayfield',
                fieldLabel: '用户名',
                value:'管理员'
            },{
                fieldLabel: '旧密码',
                id:'modifyPass_oldPass',
                inputType : 'password',
                allowBlank:false,
                maxLength:32
            },{
                fieldLabel: '新密码',
                id:'modifyPass_newPass',
                inputType : 'password',
                allowBlank:false,
                minLength:6,
                maxLength:14
            },{
                fieldLabel: '重复密码',
                id:'modifyPass_newPass2',
                minLength:6,
                allowBlank:false,
                inputType : 'password',
                maxLength:14,
                vtype :'password',
                initialPassField : 'modifyPass_newPass'
            }]
        }],buttons:[
            {
                text: '重置',
                handler:function(){
                    Ext.getCmp("modifyPassForm").getForm().reset();
                }
            },
            {
                text: '保存',
                handler:function(){

                }
            },{
                text: '取消',
                handler:function(){
                    Ext.getCmp("modifyPassWin").close();
                }
            }]
    });
    modifyPassWin.show();
}

