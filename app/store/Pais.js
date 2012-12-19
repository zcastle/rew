Ext.define('MG.store.Pais', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Pais',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readPais.php',
        reader: {
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