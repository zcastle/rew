Ext.define('rewsoft.store.RequerimientoC', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.RequerimientoC',
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readRequerimientoC.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'requerimiento'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: ''
        }
    }
});