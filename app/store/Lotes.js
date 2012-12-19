Ext.define('MG.store.Lotes', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Lote',
    proxy: {
        type: 'ajax',
        url: 'data/readLotes.php',
        reader: {
            root: 'lotes'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: '',
            co_producto: '',
            co_almacen: ''
        }
    }/*,
    data: [
        {lote: 'L01-050', vencimiento: '15/06/2012', stock: '40'},
        {lote: 'L01-100', vencimiento: '30/06/2012', stock: '35'}
    ]*/
});