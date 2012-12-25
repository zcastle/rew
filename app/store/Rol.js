Ext.define('rewsoft.store.Rol', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Rol',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data/readRoles.php',
        reader: {
            type: 'json',
        
            root: 'rol'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});