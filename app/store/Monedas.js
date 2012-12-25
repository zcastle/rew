Ext.define('rewsoft.store.Monedas', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Moneda',
    //autoLoad: true,
    //pageSize: 20,
    //remoteSort: true,
    /*proxy: {
        type: 'ajax',
        api:{
        //read: 'data/readCategorias.php'
        //create: 'data/mantenimiento/productos/createProducto.php',
        //date: 'data/mantenimiento/productos/updateProducto.php'
        //destroy: 'data/mantenimiento/productos/destroyProducto.php'
        },
        reader: {
            //type: 'json',
            //idProperty: 'codigo',
            root: 'categorias',
            //successProperty: 'success',
            totalProperty: 'totalCount'
        },
        writer: {
            encode: true,  
            writeAllFields: true,
            root: 'categorias'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            no_producto: null
        },
        simpleSortMode: true,
        autoSave: true
    },*/
    data: [
        {codigo: 'S', moneda: 'Soles'},
        {codigo: 'D', moneda: 'Dolares'}
    ]
});