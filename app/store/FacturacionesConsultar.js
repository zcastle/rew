Ext.define('MG.store.FacturacionesConsultar', {
    extend: 'Ext.data.Store',
    model: 'MG.model.FacturacionConsultar',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readVentas.php',
        reader: {
            root: 'ventas',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});