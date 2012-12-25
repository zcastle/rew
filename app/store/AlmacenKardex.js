Ext.define('rewsoft.store.AlmacenKardex', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Almacen',
    proxy: {
        type: 'ajax',
        url: 'data/readAlmacen.php',
        reader: {
            type: 'json',
            root: 'almacen'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: null,
            co_producto: null
        }
    }
});