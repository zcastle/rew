Ext.define('rewsoft.store.GuiaRemision', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.GuiaRemision',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readGuiaRemision.php'
        },
        reader: {
            type: 'json',
            root: 'guiaremision'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            cia: ''
        }
    }
});