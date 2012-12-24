Ext.define('MG.store.Ubigeo', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Ubigeo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data/readUbigeo.php',
        reader: {
            root: 'ubigeo'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});