Ext.define('rewsoft.store.BuscarDocumento', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.BuscarDocumento',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'data/readBuscarDocumento.php',
        reader: {
            type: 'json',
            root: 'documentos',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            tipo_documento: '',
            nu_documento: '',
            no_cliente: ''
        }
    }
});