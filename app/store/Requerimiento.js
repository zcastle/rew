Ext.define('rewsoft.store.Requerimiento', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Requerimiento',
    pageSize: 25,
    proxy: {
        type: 'ajax',
        api:{
            read: 'data/readRequerimiento.php',
            create: 'data/createRequerimiento.php'
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
            nu_requerimiento: ''
        }
    }
});