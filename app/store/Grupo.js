Ext.define('rewsoft.store.Grupo', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Grupo',
    proxy: {
        type: 'ajax',
        url: 'data/readGrupos.php',
        reader: {
            type: 'json',
            root: 'grupos'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: ''
        }
    }
});