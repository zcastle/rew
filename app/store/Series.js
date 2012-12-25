Ext.define('rewsoft.store.Series', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Serie',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readSeries.php'
        },
        reader: {
            type: 'json',
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