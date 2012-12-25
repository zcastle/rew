Ext.define('rewsoft.store.Precio', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Precio',
    proxy: {
        type: 'ajax',
        url: 'data/readPrecios.php',
        reader: {
            type: 'json',
            root: 'precios'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: null
        }
    }
});