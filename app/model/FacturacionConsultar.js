Ext.define('rewsoft.model.FacturacionConsultar', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'fecha'
    },{
        name: 'tipo_comprobante' 
    },{
        name: 'documento'
    },{
        name: 'numero'
    },{
        name: 'ruc'
    },{
        name: 'cliente'
    },{
        name: 'neto'
    },{
        name: 'igv'
    },{
        name: 'total'
    }]
});