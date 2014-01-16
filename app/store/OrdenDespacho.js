Ext.define('rewsoft.store.OrdenDespacho', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.OrdenDespacho',
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