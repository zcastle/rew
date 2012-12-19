Ext.define('MG.store.Grupo', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Grupo',
    proxy: {
        type: 'ajax',
        url: 'data/readGrupos.php',
        reader: {
            root: 'grupos'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: null
        }
    }
});