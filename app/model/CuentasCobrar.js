Ext.define('MG.model.CuentasCobrar', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'fecha'
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
    },{
        name: 'no_forma_pago'
    },{
        name: 'no_estado'
    }]
});