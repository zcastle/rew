Ext.define('MG.store.TipoCambio', {
    extend: 'Ext.data.Store',
    model: 'MG.model.TipoCambio',
    proxy: {
        type: 'ajax',
        url: 'data/readTipoCambio.php',
        api:{
            read: 'data/readTipoCambio.php',
            update: 'data/updateTipoCambio.php'
        },
        reader: {
            root: 'tipocambio'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'tipocambio'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});