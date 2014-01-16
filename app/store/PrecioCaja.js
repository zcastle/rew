Ext.define('rewsoft.store.PrecioCaja', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.PrecioCaja',
    proxy: {
        type: 'ajax',
        url: 'data/readPreciosCaja.php',
        reader: {
            type: 'json',
            root: 'precios'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: ''
        }
    }
});