Ext.define('MG.store.Receta', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Receta',
    proxy: {
        type: 'ajax',
        url: 'data/readReceta.php',
        reader: {
            root: 'receta'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: null
        }
    }
});