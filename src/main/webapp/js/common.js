MainTabPanel = Ext.extend(Ext.Panel, {
    tabid: null,
    permissionButtons: [],
    constructor: function (config) {
        try {
            config = config || {};
            Ext.apply(this, config);
            var activeTab = Ext.getCmp('MainTab').getActiveTab();
            if (activeTab) {
                if (!this.width) {
                    this.width = activeTab.getInnerWidth();
                }
                if (!this.height) {
                    this.height = activeTab.getInnerHeight();
                }
            }
            MainTabPanel.superclass.constructor.call(this, {
                id: this.tabid + "_mainPanel",
                width: this.width,
                height: this.height
            });
            if (this.tabid)
                this.render(this.tabid + "p");
        } catch (e) {
            console.log(e);
        }
    }
});
Ext.reg('byErpMainTabPanel',MainTabPanel);