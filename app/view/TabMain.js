Ext.require('Ext.ux.layout.Center');
Ext.define('MG.view.TabMain', {
    extend: 'Ext.TabPanel',
    alias : 'widget.tabmain',
    layout: 'fit',
    autoShow: true,
    initComponent: function(){
        this.items = [{
            title: 'Bienvenido',
            //iconCls: 'tabs',
            //xtype: 'menutouch'
            layout: 'ux.center',
            items:[{
                border: false,
                //bodyStyle: 'background-image: url(resources/images/melygin-logo.png); background-repeat: no-repeat;', //456 x 419
                bodyStyle: 'background-image: url(resources/images/loggo-500x93.png); background-repeat: no-repeat;',
                margins: '20',
                width: 500,
                height: 93
            }]
        }];
        this.callParent(arguments);
    }
});