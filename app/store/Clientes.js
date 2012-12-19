Ext.define('MG.store.Clientes', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Cliente',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readClientes.php'
        },
        reader: {
            type: 'json',
            root: 'clientes',
            successProperty: 'success',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_cliente: '',
            no_cliente: ''
        }
    }
});