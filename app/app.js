Ext.application({
    requires:[
    	//'AppGlobals',
        'Ext.container.Viewport',
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',
        'Ext.ux.layout.Center',
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
        'Ext.data.proxy.JsonP'
        //'rewsoft.view.Card',
        //'rewsoft.view.MainView',
        //'rewsoft.view.TabMain',
        //'rewsoft.view.LoginUser'
    ],
    //models: ["Miojc"],
    //views: ['TabMain'],
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
        'mantenimiento.clientes.PnlClientes',
        'mantenimiento.clientes.WinClientesNuevo',
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
    name: 'rewsoft',
    autoCreateViewport: false,
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                    xtype: 'card'
                }
            ]
        });
    }
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

Ext.define('rewsoft.AppGlobals', {
    singleton: true,
    DEBUG: false,
    //ROLES
    //ROL_ID: 2,
    ROL_ACTIVO: 'ADMIN',
    //FIN ROLES
    ROL_ADMINISTRADOR: 'ADMIN',
    ROL_VENTAS: 'VENTAS',
    ROL_VENTAS_JEFE: 'VENTAS_JEFE',
    ROL_ALMACEN: 'ALMACEN',
    ROL_ALMACEN_JEFE: 'ALMACEN_JEFE',
    ROL_REPORTES: 'REPORTES',
    IGV: 18,
    VA_IGV: 1.18,
    VA_IGV_2: 0.18,
    TIPO_CAMBIO_COMPRA: 2.65,
    TIPO_CAMBIO_VENTA: 2.60,
    CIA: '01', //CODIGO DE LA EMPRESA SEGUN LA TB m_empresas
    NOMBRE_COMERCIAL: 'EMPRESA',
    RAZON_SOCIAL: 'EMPRESA SA',
    CO_USUARIO: 'ADMIN',
    MODELO_NEGOCIO: null,
    MODELO_NEGOCIO_MELY_GIN: 'MG',
    MODELO_NEGOCIO_DSILVANA: 'POS',
    DECIMALES: 4,
    FORMA_NUMBER: '0,000.0000',
    FORMA_PAGO_DEFAULT: '1010',
    SERIE_FV: '1',
    SERIE_BV: '1',
    NOTA_PIE: 'REWSoft -> Gestion Comercial y Almacenes -> Desarrollado por openbusiness.pe [v2.5-JC]'
});