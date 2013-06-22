Ext.define('rewsoft.store.TipoCambio', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.TipoCambio',
    proxy: {
        type: 'ajax',
        url: 'data/readTipoCambio.php',
        api:{
            create: 'data/createTipoCambio.php',
            read: 'data/readTipoCambio.php',
            update: 'data/updateTipoCambio.php'
        },
        reader: {
            type: 'json',
            root: 'tipocambio',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'tipocambio'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            today: 'N'
        }
    }
});