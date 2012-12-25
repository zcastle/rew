Ext.define('rewsoft.store.FormaPago', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.FormaPago',
    proxy: {
        type: 'ajax',
        url: 'data/readFormaPago.php',
        reader: {
            type: 'json',
            root: 'formapago'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});