Ext.define('rewsoft.store.Proveedores', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Proveedor',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readProveedores.php'
        },
        reader: {
            type: 'json',
            root: 'proveedores',
            successProperty: 'success'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            nu_ruc: null
        }
    }
});