Ext.define('rewsoft.store.HistorialCompraProductos', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.HistorialCompraProducto',
    pageSize: 5,
    proxy: {
        type: 'ajax',
        url: 'data/readHistorialCompraProductos.php',
        reader: {
            type: 'json',
            root: 'historial',
            successProperty: 'success',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: null,
            co_cliente: null,
            co_producto: null
        }
    }
});