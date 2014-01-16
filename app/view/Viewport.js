Ext.define('rewsoft.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'card'
    },
    border: false,
    items: [{
        id: 'card0',
        layout: 'border',
        items: [{
            region: 'center',
            layout: 'border',
            items:[{
                region: 'center',
                border: false
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
        },{
            region: 'south',
            iconCls: 'favicon',
            title: rewsoft.AppGlobals.NOTA_PIE
        }]
    },{
        id: 'card1',
        layout: 'border',
        items: [{
            region: 'center',
            xtype: 'mainview'
        },{
            region: 'south',
            iconCls: 'favicon',
            title: rewsoft.AppGlobals.NOTA_PIE
        }]
    }]
});