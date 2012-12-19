Ext.define('MG.store.AlmacenTranslado', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Almacen',
    proxy: {
        type: 'ajax',
        url: 'data/readAlmacen.php',
        reader: {
            root: 'almacen'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: null,
            co_producto: null
        }
    }
});