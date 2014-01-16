Ext.define('rewsoft.store.OrdenCompra', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.OrdenCompra',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readOrdenCompra.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'productos'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            nu_orden_compra: ''
        }
    }
});