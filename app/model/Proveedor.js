Ext.define('rewsoft.model.Proveedor', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id'
    },{
        name: 'nu_ruc'
    },{
        name: 'no_razon_social'
    },{
        name: 'de_direccion'
    },{
        name: 'no_contacto'
    },{
        name: 'nu_telefono'
    },{
    	name: 'co_forma_pago'
    },{
        name: 'no_forma_pago'
    }]
});