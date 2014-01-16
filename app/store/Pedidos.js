Ext.define('rewsoft.store.Pedidos', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Pedido',
    /*proxy: {
        type: 'ajax',
        url: 'data/pedidos.json',
        api:{
            read: 'data/pedidos.json'
        },
        reader: {
            type: 'json',
            root: 'pedido',
            successProperty: 'success'
        },
        actionMethods: {
            read: 'POST'
        },
        simpleSortMode: true
    }*/
    data: []
});