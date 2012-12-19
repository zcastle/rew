Ext.define('MG.store.Usuarios', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Usuario',
    proxy: {
        type: 'ajax',
        url: 'data/readUsuarios.php',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'usuarios'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: null
        }
    }
});