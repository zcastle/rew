Ext.define('rewsoft.store.DiasTrabajo', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.DiasTrabajo',
    pageSize: 30,
    proxy: {
        type: 'ajax',
        url: 'data/readDiasTrabajo.php',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'dias',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});