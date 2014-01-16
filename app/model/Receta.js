Ext.define('rewsoft.model.Receta', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'co_producto'
    },{
        name: 'no_producto'
    },{
        name: 'ca_producto'
    },{
        name: 'co_unidad'
    },{
        name: 'no_unidad'
    },{
        name: 'ca_unidad'
    },{
        name: 'va_compra'
    },{
        name: 'va_total',
        type: 'float'
    },{
        name: 'co_almacen'
    }, {
        name: 'no_almacen'
    }]
});