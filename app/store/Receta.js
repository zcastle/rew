Ext.define('rewsoft.store.Receta', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Receta',
    proxy: {
        type: 'ajax',
        url: 'data/readReceta.php',
        reader: {
            type: 'json',
            root: 'receta'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: ''
        }
    }
});