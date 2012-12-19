Ext.define('MG.model.HistorialCompraProducto', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'fecha',
        type: 'string'
    },{
        name: 'nudocumento',
        type: 'string'
    },{
        name: 'cantidad',
        type: 'string'
    },{
        name: 'precio',
        type: 'string'
    }]
});