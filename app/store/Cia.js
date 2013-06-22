Ext.define('rewsoft.store.Cia', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Cia',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data/readCia.php',
        reader: {
            type: 'json',
            root: 'cia'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});