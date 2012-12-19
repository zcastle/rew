Ext.define('MG.store.DocumentosAlmacen', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Documento',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readDocumentos.php'
        },
        reader: {
            root: 'documentos'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});