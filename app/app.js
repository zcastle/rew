/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'rewsoft',
    views: [
        //'Main',
        'Viewport'
    ],
    requires:[
        'Ext.container.Viewport',
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',
        'Ext.TabPanel',
        'Ext.grid.Panel',
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
        'Ext.form.field.File',
        'Ext.grid.column.Action',
        'Ext.data.proxy.JsonP',
        'rewsoft.AppGlobals'
    ],
    controllers: [
        //'Main',
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
        'mantenimiento.clientes.PnlClientes',
        'mantenimiento.clientes.WinClientesNuevo',
        'mantenimiento.proveedores.PnlProveedores',
        'mantenimiento.proveedores.WinProveedoresNuevo',
        'ventas.Facturaciones',
        'ventas.FacturacionesConsultar',
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
        'almacen.WinBuscarProveedor',
        'almacen.requerimiento.PnlRequerimiento',
        'compras.ocompra.PnlOrdenCompra',
        'contabilidad.WinLibroVentas',
        'reportes.WinRegistroVentas',
        'reportes.WinRegistroVentasXFamilias',
        'configuracion.WinTipoCambio',
        'configuracion.PnlUsuarios',
        'configuracion.WinUsuariosNuevo',
        'configuracion.WinUsuariosUpdate'
    ],
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