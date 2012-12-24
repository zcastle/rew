Ext.define('MG.store.Rol', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Rol',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data/readRoles.php',
        reader: {
            root: 'rol'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});