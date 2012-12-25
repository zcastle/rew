Ext.application({
    requires:[
    	'rewsoft.AppGlobals',
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',

        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Hidden',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Display',
        'Ext.form.FieldContainer',
        'Ext.form.FieldSet',

        'Ext.grid.column.Action',
        'Ext.data.proxy.JsonP',

        'rewsoft.view.Card',
        'rewsoft.view.MainView',
        'rewsoft.view.TabMain',
        'rewsoft.view.LoginUser'

    ],
    //models: ["Miojc"],
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
	    'reportes.WinRegistroVentas',
	    'configuracion.WinTipoCambio',
	    'configuracion.PnlUsuarios',
	    'configuracion.WinUsuariosNuevo',
	    'configuracion.WinUsuariosUpdate'
    ],
    //views: ['MainView'],
    name: 'rewsoft',
    autoCreateViewport: true
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

Ext.apply('Ext.form.field.VTypes', {
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