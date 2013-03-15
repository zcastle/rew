Ext.define('rewsoft.store.UnidadesVentaByProducto', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.UnidadVenta',
    proxy: {
        type: 'ajax',
        url: 'data/readUnidadMedidaByProducto.php',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'unidades'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: ''
        }
    }
});