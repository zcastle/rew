Ext.define('rewsoft.store.Productos', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Producto',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readProductos.php',
            create: 'data/createProducto.php',
            update: 'data/updateProducto.php',
            destroy: 'data/destroyProducto.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'productos',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'productos'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_producto: '',
            no_producto: '',
            co_grupo: '',
            co_empresa: ''
        }
    },
    listeners: {
        write: function(proxy, operation){
        }
    }
});