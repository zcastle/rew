Ext.define('MG.store.CuentasCobrar', {
    extend: 'Ext.data.Store',
    model: 'MG.model.CuentasCobrar',
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
            coEmpresa: AppGlobals.CIA,
            coEstado: '01'
        }
    }
});