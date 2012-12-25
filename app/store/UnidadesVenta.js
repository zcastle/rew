Ext.define('rewsoft.store.UnidadesVenta', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.UnidadVenta',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readUnidadMedida.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'unidades',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            encode: true,  
            writeAllFields: true,
            root: 'unidades'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            co_empresa: null,
            no_unidad: null
        }
    }
});