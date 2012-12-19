Ext.define('MG.store.Kardex', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Kardex',
    proxy: {
        type: 'ajax',
        url: 'data/readKardex.php',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'kardex'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: '',
            no_lote: '',
            co_almacen: ''
        }
    }
});