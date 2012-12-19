Ext.define('MG.model.Cliente', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'codigo', 
        type: 'string'
    },{
        name: 'cliente', 
        type: 'string'
    },{
        name: 'ruc', 
        type: 'string'
    },{
        name: 'direccion', 
        type: 'string'
    },{
        name: 'co_forma_pago', 
        type: 'string'
    }]
});