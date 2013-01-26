Ext.define('rewsoft.store.FacturacionesConsultarDetalle', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.FacturacionConsultarDetalle',
    proxy: {
        type: 'ajax',
        url: 'data/readVentasDetalle.php',
        reader: {
            type: 'json',
            root: 'ventasdetalle',
            totalProperty: 'totalCount'
        },
        actionMethods: {
            read: 'POST'
        },
        extraParams: {
            tipo_comprobante: '',
            nu_comprobante: ''
        }
    }
});