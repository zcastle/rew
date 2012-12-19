Ext.define('MG.store.PrecioCaja', {
    extend: 'Ext.data.Store',
    model: 'MG.model.PrecioCaja',
    proxy: {
        type: 'ajax',
        url: 'data/readPreciosCaja.php',
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