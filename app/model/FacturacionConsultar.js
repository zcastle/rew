Ext.define('MG.model.FacturacionConsultar', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'fecha', 
        type: 'string'
    },{
        name: 'documento', 
        type: 'string'
    },{
        name: 'numero', 
        type: 'string'
    },{
        name: 'ruc', 
        type: 'string'
    },{
        name: 'cliente',
        type: 'string'
    },{
        name: 'neto', 
        type: 'string'
    },{
        name: 'igv', 
        type: 'string'
    },{
        name: 'total', 
        type: 'string'
    }]
});