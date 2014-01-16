Ext.define('rewsoft.store.Usuarios', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Usuario',
    proxy: {
        type: 'ajax',
        api: {
            read: 'data/readUsuarios.php',
            create: 'data/createUsuarios.php',
            update: 'data/updateUsuarios.php',
            destroy: 'data/destroyUsuarios.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'usuarios'
        },
        writer: {
            type: 'json',
            encode: true,
            writeAllFields: true,
            root: 'usuario'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: '',
            co_usuario: '',
            is_login: true
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