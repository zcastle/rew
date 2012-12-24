Ext.define('MG.model.TipoCambio', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id'
    },{
        name: 'nu_tipo_cambio_compra'
    },{
        name: 'nu_tipo_cambio_venta'
    },{
        name: 'tcCompraNuevo'
    },{
        name: 'tcVentaNuevo'
    }]
});