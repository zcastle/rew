Ext.define('rewsoft.store.OrdenCompraC', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.OrdenCompraC',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readOrdenCompraC.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'ordencompra'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: ''
        }
    }
});