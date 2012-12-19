Ext.define('MG.store.Precio', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Precio',
    proxy: {
        type: 'ajax',
        url: 'data/readPrecios.php',
        reader: {
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