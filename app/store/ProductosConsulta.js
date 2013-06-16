Ext.define('rewsoft.store.ProductosConsulta', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Producto',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readProductos.php',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'productos',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            no_producto: '',
            co_grupo: '',
            co_empresa: ''
        }
    }
});