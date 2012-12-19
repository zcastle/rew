Ext.define('MG.store.Categorias', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Categoria',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readCategorias.php',
            create: 'data/createCategoria.php',
            update: 'data/updateCategoria.php',
            destroy: 'data/destroyCategoria.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'categorias',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'categorias'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            no_categoria: null,
            co_grupo: null,
            co_empresa: null
        }
    }
});