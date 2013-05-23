Ext.define('rewsoft.view.TabMain', {
    extend: 'Ext.TabPanel',
    alias : 'widget.tabmain',
    layout: 'fit',
    autoShow: true,
    initComponent: function(){
        this.items = [{
            title: 'Bienvenido',
            id: 'primerTab',
            iconCls: 'favicon',
            layout: 'border',
            items: [{
                region: 'center',
                border: false,
                layout: 'ux.center',
                items: [{
                    //bodyStyle: 'background-image: url(resources/images/melygin-logo.png); background-repeat: no-repeat;', //456 x 419
                    //bodyStyle: 'background-image: url(resources/images/logo-500x93.png); background-repeat: no-repeat;',
                    border: false,
                    width: 500,
                    padding: '15 0 0 0'
                }]
            },{
                region: 'south',
                border: false,
                layout: 'hbox',
                items: [{
                    border: false,
                    flex:1
                },{
                    xtype: 'image',
                    src: 'resources/images/logo-250x47.png',
                    width: 250,
                    height: 47,
                    padding: '0 5 5 0'
                }]
            }]
        }];
        this.callParent(arguments);
    }
});