Ext.define('MG.store.Cia', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Cia',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data/readCia.php',
        reader: {
            root: 'cia'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});