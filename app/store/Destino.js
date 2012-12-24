Ext.define('MG.store.Destino', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Destino',
    proxy: {
        type: 'ajax',
        url: 'data/readDestino.php',
        reader: {
            root: 'destino'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});