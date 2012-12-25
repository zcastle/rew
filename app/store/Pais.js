Ext.define('rewsoft.store.Pais', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Pais',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readPais.php',
        reader: {
            type: 'json',
            root: 'pais',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            no_pais: null
        }
    }
});