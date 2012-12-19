Ext.define('MG.store.OrdenDespacho', {
    extend: 'Ext.data.Store',
    model: 'MG.model.OrdenDespacho',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readOrdenesDespacho.php',
        reader: {
            type: 'json',
            root: 'ordenes',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});