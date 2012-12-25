Ext.define('rewsoft.view.TabMain', {
    extend: 'Ext.TabPanel',
    alias : 'widget.tabmain',
    requires:[
        'Ext.ux.layout.Center'
    ],
    layout: 'fit',
    autoShow: true,
    initComponent: function(){
        this.items = [{
            title: 'Bienvenido',
            layout: 'ux.center',
            items:[{
                border: false,
                //bodyStyle: 'background-image: url(resources/images/melygin-logo.png); background-repeat: no-repeat;', //456 x 419
                bodyStyle: 'background-image: url(resources/images/logo-500x93.png); background-repeat: no-repeat;',
                margins: '20',
                width: 500,
                height: 93
            }]
        }];
        this.callParent(arguments);
    }
});