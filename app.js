Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Ext: 'extjs/src',
        'Ext.ux': 'extjs/ux'
    } 
});

Ext.require([
    'Ext.ux.layout.Center'
]);

Ext.application({
    name: 'MG',
    appFolder: 'app',
    launch: function() {
        Ext.create('MG.view.LoginUser', {}).show();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'card'
            }]
        });
    },
    controllers: [
    'LoginUser',
    'MainView',
    'TabMain',
    'MenuTouch',
    'mantenimiento.productos.PnlProductos',
    'mantenimiento.productos.WinProductosNuevo',
    'mantenimiento.productos.WinProductosListar',
    'mantenimiento.productos.WinCategoriasListar',
    'mantenimiento.productos.WinSubCategoriasListar',
    'mantenimiento.productos.WinProcedenciasListar',
    'mantenimiento.productos.WinProductosCantidad',
    'mantenimiento.categorias.PnlCategorias',
    'mantenimiento.categorias.WinCategoriasNuevo',
    'mantenimiento.unidadmedida.PnlUnidadMedida',
    'mantenimiento.unidadmedida.WinUnidadMedidaNuevo',
    'mantenimiento.SubCategorias',
    'mantenimiento.Proveedores',
    'ventas.Facturaciones',
    'ventas.CuentasCobrar',
    'ventas.WinBuscarCliente',
    'ventas.WinNuevoCliente',
    'compras.Facturaciones',
    'almacen.IngresodeProductos',
    'almacen.OrdenesDespacho',
    'almacen.OrdenesDespachoDetalle',
    'almacen.OrdenesDespachoDetalleLotes',
    'almacen.WinConsultarStock',
    'almacen.ajuste.PnlAjusteInventario',
    'almacen.kardex.PnlConsultarKardex',
    'almacen.abastecimiento.PnlOrdenAbastecimientoCrear',
    'almacen.transferencia.PnlTransferencia',
    'contabilidad.WinLibroVentas',
    'reportes.WinRegistroVentas'
    ]
});

Ext.onReady(function() {
    (Ext.defer(function() {
        var hideMask = function () {
            Ext.get('loading').remove();
            Ext.fly('loading-mask').animate({
                opacity: 0,
                remove: true
            });
        };
        Ext.defer(hideMask, 250);
    },500));
});

Ext.apply(Ext.form.field.VTypes, {
    daterange: function(val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
        * Always return true since we're only using this vtype to set the
        * min/max allowed values (these are tested for after the vtype test)
        */
        return true;
    },

    daterangeText: 'Start date must be less than end date',

    password: function(val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText: 'Passwords do not match'
});