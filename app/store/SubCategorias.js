Ext.define('MG.store.SubCategorias', {
    extend: 'Ext.data.Store',
    model: 'MG.model.SubCategoria',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readSubCategorias.php'
        },
        reader: {
            root: 'subcategorias',
            totalProperty: 'totalCount'
        },
        writer: {
            encode: true,  
            writeAllFields: true,
            root: 'subcategorias'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            no_sub_categoria: null
        }
    }
});