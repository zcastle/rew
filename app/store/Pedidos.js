Ext.define('MG.store.Pedidos', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Pedido',
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