Ext.define('MG.store.ProductosConsulta', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Producto',
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
            no_producto: null,
            co_grupo: null,
            co_empresa: null
        }
    }
});