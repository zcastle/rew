Ext.define('MG.store.GuiaRemision', {
    extend: 'Ext.data.Store',
    model: 'MG.model.GuiaRemision',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readGuiaRemision.php'
        },
        reader: {
            root: 'guiaremision'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            cia: null
        }
    }
});