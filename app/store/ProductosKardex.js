Ext.define('rewsoft.store.ProductosKardex', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Producto',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readProductos.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'productos'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: null,
            no_producto: null,
            co_grupo: null,
            co_empresa: null
        }
    }
});