Ext.define('rewsoft.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'fit'
    },
    items: [{
        xtype: 'card'
    }]
});