Ext.define('MG.view.Card', {
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
            title: 'REWSoft -> Gestion Comercial y Almacenes -> Desarrollado por openbusiness.pe [JC-v2.0]'
        }]
    },{
        id: 'card1',
        layout: 'border',
        items: [{
            region: 'center',
            xtype: 'mainview'
        },{
            region: 'south',
            title: 'REWSoft -> Gestion Comercial y Almacenes -> Desarrollado por openbusiness.pe [JC-v2.0]'
        }]
    }],
    initComponent: function() {
        this.callParent(arguments);
    }      
});
