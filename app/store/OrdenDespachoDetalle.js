Ext.define('rewsoft.store.OrdenDespachoDetalle', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.OrdenDespachoDetalle',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'data/readOrdenesDespachoDetalle.php',
        reader: {
            type: 'json',
            root: 'ordenesdetalle'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            nu_documento: null
        }
    }
});