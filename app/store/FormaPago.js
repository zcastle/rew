Ext.define('MG.store.FormaPago', {
    extend: 'Ext.data.Store',
    model: 'MG.model.FormaPago',
    proxy: {
        type: 'ajax',
        url: 'data/readFormaPago.php',
        reader: {
            root: 'formapago'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});