Ext.define('rewsoft.store.Proveedores', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Proveedor',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readProveedores.php',
            create: 'data/createProveedores.php',
            update: 'data/updateProveedores.php',
            destroy: 'data/destroyProveedores.php'
        },
        reader: {
            type: 'json',
            root: 'proveedores',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            encode: true,
            root: 'proveedores'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            nu_ruc: '',
            no_proveedor: '',
            c_f_p: rewsoft.AppGlobals.FORMA_PAGO_DEFAULT
        }
    }
});