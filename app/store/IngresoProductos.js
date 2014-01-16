Ext.define('rewsoft.store.IngresoProductos', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.IngresoProductos',
    roxy: {
        type: 'ajax',
        url: 'data/pedidos.json',
        reader: {
            type: 'json',
            root: 'pedido',
            successProperty: 'success'
        },
        actionMethods: {
            read: 'POST'
        }
    }
    //data: []
});