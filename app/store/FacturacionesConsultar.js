Ext.define('rewsoft.store.FacturacionesConsultar', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.FacturacionConsultar',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readVentas.php',
        reader: {
            type: 'json',
            root: 'ventas',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            doc: ''
        }
    }
});