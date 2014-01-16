Ext.define('rewsoft.store.PoolPrinter', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.PoolPrinter',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            create: 'data/createPoolPrinter.php'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'poolprinter'
        }
    }
});