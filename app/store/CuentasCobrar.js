Ext.define('rewsoft.store.CuentasCobrar', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.CuentasCobrar',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readCuentasCobrar.php'
        },
        reader: {
            type: 'json',
            root: 'cuentascobrar',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            coEmpresa: rewsoft.AppGlobals.CIA,
            coEstado: '01'
        }
    }
});