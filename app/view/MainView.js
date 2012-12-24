Ext.define('MG.view.MainView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainview',
    layout: 'border',
    initComponent: function() {
        this.items = [{
                region: 'north',
                id: 'menu',
                border: false
            },{
                region: 'center',
                xtype: 'tabmain'
            }/*,{
                region: 'west',
                id: 'launcher',
                collapsible: true,
                //collapsed: true,
                width: 360,
                title: 'L A U N C H E R',
                layout: 'fit',
                items: [{
                    xtype: 'menutouch'
                }]
            }*/],
        this.callParent(arguments);
    }      
});