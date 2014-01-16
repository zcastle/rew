Ext.define('rewsoft.store.SubCategorias', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.SubCategoria',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readSubCategorias.php'
        },
        reader: {
            type: 'json',
            root: 'subcategorias',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'subcategorias'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            no_sub_categoria: ''
        }
    }
});