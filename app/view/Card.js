Ext.define('rewsoft.view.Card', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.card',
    activeItem: 0,
    defaults: {
        border:false
    },
    border: false,
    layout: 'card',
    items: [{
        id: 'card0',
        layout: 'border',
        items: [{
            region: 'center'
        },{
            region: 'south',
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
            title: rewsoft.AppGlobals.NOTA_PIE
        }]
    }],
    initComponent: function() {
        this.callParent(arguments);
    }      
});
