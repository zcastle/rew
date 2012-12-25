Ext.define('rewsoft.store.Ubigeo', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Ubigeo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data/readUbigeo.php',
        reader: {
            type: 'json',
            root: 'ubigeo'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});