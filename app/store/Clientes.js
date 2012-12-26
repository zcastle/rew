Ext.define('rewsoft.store.Clientes', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Cliente',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api: {
            read: 'data/readClientes.php',
            create: 'data/createClientes.php',
            update: 'data/updateClientes.php',
            destroy: 'data/destroyClientes.php'
        },
        reader: {
            type: 'json',
            root: 'clientes',
            successProperty: 'success',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true,
            root: 'clientes'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_cliente: '',
            no_cliente: '',
            edit: '',
            c_f_p: ''
        },
        listeners: {
            exception: function(proxy, response, operation){
                var err = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: 'REMOTE EXCEPTION',
                    msg: err.msg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});