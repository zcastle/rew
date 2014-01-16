Ext.define('rewsoft.store.Destino', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Destino',
    proxy: {
        type: 'ajax',
        url: 'data/readDestino.php',
        reader: {
            type: 'json',
            root: 'destino'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});