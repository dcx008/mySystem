$(function () {
    debugger
    Ext.getCmp('MainTab').getActiveTab();
    var p = new Ext.Panel({
        title: 'My Panel',//标题
        width:400,
        height:200,
        html: "<p>我是内容，我包含的html可以被执行！</p>"//panel主体中的内容，可以执行html代码
    });
});