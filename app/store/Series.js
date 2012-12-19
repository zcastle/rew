Ext.define('MG.store.Series', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Serie',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readSeries.php'
        },
        reader: {
            root: 'series'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            cia: null,
            tipoDocumento: null
        }
    }
});