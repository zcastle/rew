Ext.define('rewsoft.controller.MainView', {
    extend: 'Ext.app.Controller',
    views: [
    'MainView',
    'LoginUser',
    'Viewport'
    ],
    refs: [{
        ref: 'Viewport',
        selector: 'viewport'
    },{
        ref: 'LoginUser',
        selector: 'loginuser'
    }],
    init: function() {
        this.control({
            'mainview': {
                render: this.onMainViewRendered
            },
            'mainview menuitem': {
                click: this.onMenuItemClick
            },
            'mainview button': {
                click: this.onMenuItemClick
            }
        });
    },
    onMainViewRendered: function() {
        rewsoft.AppGlobals.MODELO_NEGOCIO = rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN;
        //rewsoft.AppGlobals.MODELO_NEGOCIO = rewsoft.AppGlobals.MODELO_NEGOCIO_DSILVANA;
        this.loadMenu();
        if(rewsoft.AppGlobals.DEBUG){
            if(console){
                console.log('Debug activado');
            }
            //this.getLoginUser().hide();
            this.getViewport().getLayout().setActiveItem(1);
            //this.getController('TabMain').addTab('Facturacion', 'pnlventasfacturacion', 'ico-facturacion-small');
            //this.getController('TabMain').addTab('Ordenes de Despacho', 'pnlordenesdespacho');
            //this.getController('TabMain').addTab('Registro de Compras', 'pnlingresodeproducto');
            //this.getController('TabMain').addTab('Cuentas por Cobrar', 'pnlcuentascobrar');
            //this.getController('TabMain').addTab('Productos', 'pnlproductos');
            //this.getController('TabMain').addTab('Ordenes de Despacho', 'pnlordenesdespacho');
            //Ext.widget('winlibroventas').show();
            //Ext.widget('winregistroventas').show();
            //this.getController('TabMain').addTab('Ajuste de Inventario', 'pnlajusteinventario');
            //this.getController('TabMain').addTab('Consultar Kardex', 'pnlconsultarkardex');
            //Ext.widget('winconsultarstock').show();
            //this.getController('TabMain').addTab('Categorias', 'pnlcategorias');
            //this.getController('TabMain').addTab('Unidades de Medida', 'pnlunidadmedida');
            //this.getController('TabMain').addTab('Crear', 'pnlordenabastecimientocrear');
            //this.getController('TabMain').addTab('Transferencia de Productos', 'pnltransferencia');
            //this.getController('TabMain').addTab('Usuarios', 'pnlusuarios');
            //this.getController('TabMain').addTab('Clientes', 'pnlclientes', 'tabs');
            //this.getController('TabMain').addTab('Proveedores', 'pnlproveedores', 'tabs');
            //this.getController('TabMain').addTab('Comprobantes', 'pnlventasfacturacionconsultar', 'tabs');
            //Ext.widget('wintipocambio').show();
            //this.getController('TabMain').addTab('Tipo de Cambio', 'pnltipocambio', 'tabs');
            //this.getController('TabMain').addTab('Orden de Compra', 'pnlordencompra', 'tabs');
        } else {
            Ext.widget('loginuser');
        }
        //Ext.getCmp('primerTab').title = 'Bienvenidos '+rewsoft.AppGlobals.CO_USUARIO;
    },
    loadMenu: function(){
        var tb = new Ext.toolbar.Toolbar({
            id: 'tbMain'
        });
        
        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            tb.add({
                text: 'Ventas',
                name: 'mnuVentas',
                id: 'mnuVentas',
                menu: [{
                    text: 'Facturacion',
                    iconCls: 'ico-facturacion-small',
                    action: 'mnuVentasFacturacion'
                },{
                    text: 'Guia de Remision',
                    iconCls: 'ico-facturacion-small',
                    action: 'mnuVentasGuiaRemision'
                },{
                    text: 'Cotizaciones',
                    iconCls: 'ico-facturacion-small',
                    action: 'mnuVentasCotizacion'
                },{
                    text: 'Notas de Credito',
                    action: 'mnuVentasNotasdeCredito'
                }/*,{
                    text: 'Notas de Debito',
                    action: 'mnuVentasNotasdeDebito'
                }*/,{
                    text: 'Cuentas por Cobrar',
                    action: 'mnuVentasCuentasCobrar'
                },{
                    text: 'Consultar',
                    menu: [{
                        text: 'Comprobantes',
                        iconCls: 'ico-consultar-small',
                        action: 'mnuVentasFacturacionConsultar'
                    },{
                        text: 'Cotizaciones',
                        action: 'mnuVentasCotizaciones'
                    }]
                }]
            });
        }

        tb.add({
            text: 'Compras',
            name: 'mnuCompras',
            id: 'mnuCompras',
            menu: [{
                text: 'Registro de Compras',
                iconCls: 'ico-compras-small',
                action: 'mnuInventarioIngresodeProductos'
            },{
                text: 'Orden de Compra',
                action: 'mnuComprasOrdendeCompra'
            }]
        });
        
        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            tb.add({
                text: 'Almacen',
                name: 'mnuAlmacen',
                id: 'mnuAlmacen',
                menu: [{
                    text: 'Transferencia de Productos',
                    action: 'mnuInventarioTrasladodeProductos'
                },{
                    text: 'Ajuste de Inventario',
                    action: 'mnuInventarioAjusteInventario'
                },{
                    text: 'Consultar Stock',
                    action: 'mnuInventarioConsultarStock'
                },{
                    text: 'Consultar Kardex',
                    action: 'mnuInventarioConsultarKardex'
                },{
                    text: 'Ordenes de Despacho',
                    action: 'mnuInventarioOrdenesDespacho'
                },{
                    text: 'Ordenes de Requerimiento',
                    action: 'mnuInventarioOrdenesRequerimiento'
                }]
            });
        } else {
            tb.add({
                text: 'Almacen',
                name: 'mnuAlmacen',
                id: 'mnuAlmacen',
                menu: [{
                    text: 'Registro de Compras',
                    iconCls: 'ico-compras-small',
                    action: 'mnuInventarioIngresodeProductos'
                },{
                    text: 'Transferencia de Productos',
                    action: 'mnuInventarioTrasladodeProductos'
                },{
                    text: 'Ajuste de Inventario',
                    action: 'mnuInventarioAjusteInventario'
                },{
                    text: 'Consultar Stock',
                    action: 'mnuInventarioConsultarStock'
                },{
                    text: 'Consultar Kardex',
                    action: 'mnuInventarioConsultarKardex'
                },{
                    text: 'Orden de Abastecimiento',
                    menu: [{
                        text: 'Crear',
                        action: 'mnuInventarioOrdenAbastecimientoCrear'
                    },{
                        text: 'Consultar',
                        iconCls: 'ico-consultar-small',
                        action: 'mnuInventarioOrdenAbastecimientoConsultar'
                    }]
                }]
            });
        }

        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            tb.add({
                text: 'Contabilidad',
                name: 'mnuContabilidad',
                id: 'mnuContabilidad',
                menu: [{
                    text: 'Libro Compras',
                    action: 'mnuContabilidadLibroCompras'
                },{
                    text: 'Libro Ventas',
                    action: 'mnuContabilidadLibroVentas'
                }]
            });
        }

        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_DSILVANA){
            tb.add({
                text: 'Reportes',
                name: 'mnuReportes',
                id: 'mnuReportes',
                menu: [{
                    text: 'Registro de Ventas',
                    action: 'mnuReportesRegistroVentas'
                },{
                    text: 'Registro de Ventas x Familias',
                    action: 'mnuReportesRegistroVentasxFamilias'
                }]
            });
        }
        

        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            tb.add({
                text: 'Mantenimiento',
                name: 'mnuMantenimiento',
                id: 'mnuMantenimiento',
                menu: [{
                    text: 'Categorias',
                    action: 'mnuMantenimientoCategorias'
                },{
                    text: 'Sub Categorias',
                    action: 'mnuMantenimientoSubCategorias'
                },{
                    text: 'Productos',
                    action: 'mnuMantenimientoProductos'
                },{
                    text: 'Unidades de Medida',
                    action: 'mnuMantenimientoUnidadesdeMedida'
                },{
                    text: 'Marcas',
                    action: 'mnuMantenimientoMarcas'
                },{
                    text: 'Clientes',
                    action: 'mnuMantenimientoClientes'
                },{
                    text: 'Proveedores',
                    action: 'mnuMantenimientoProveedores'
                }]
            });
        } else {
            tb.add({
                text: 'Mantenimiento',
                name: 'mnuMantenimiento',
                id: 'mnuMantenimiento',
                menu: [{
                    text: 'Categorias',
                    action: 'mnuMantenimientoCategorias'
                },{
                    text: 'Productos',
                    action: 'mnuMantenimientoProductos'
                },{
                    text: 'Unidades de Medida',
                    action: 'mnuMantenimientoUnidadesdeMedida'
                },{
                    text: 'Clientes',
                    action: 'mnuMantenimientoClientes'
                },{
                    text: 'Proveedores',
                    action: 'mnuMantenimientoProveedores'
                }]
            });
        }

        tb.add({
            text: 'Configuracion',
            name: 'mnuConfiguracion',
            id: 'mnuConfiguracion',
            menu: [{
                text: 'Tipo de Cambio',
                action: 'mnuConfiguracionTipoCambio'
            },{
                text: 'Usuarios',
                action: 'mnuConfiguracionUsuarios'
            }]
        });

        tb.add({
            text: 'Configuracion',
            name: 'mnuConfiguracionUsuario',
            id: 'mnuConfiguracionusuario',
            menu: [{
                text: 'Actualizar Datos',
                action: 'mnuConfiguracionUsuariosUpdate'
            }]
        });
        
        tb.add({
            xtype: 'tbfill'
        });
        
        tb.add({
            baseCls: 'etiqueta',
            xtype: 'label',
            id: 'lblNoRazonSocial',
            text: rewsoft.AppGlobals.RAZON_SOCIAL + ' - Tipo de Cambio: ' + rewsoft.AppGlobals.TIPO_CAMBIO_VENTA,
            margins: '0 5 0 0'
        });
        
        Ext.getCmp('menu').add(tb);
    },
    onMenuItemClick: function(menuItem) {
        switch(menuItem.action){
            case 'mnuVentasFacturacion':
                this.getController('TabMain').addTab(menuItem.text, 'pnlventasfacturacion', 'ico-facturacion-small');
                break;
            case 'mnuVentasFacturacionConsultar':
                this.getController('TabMain').addTab(menuItem.text, 'pnlventasfacturacionconsultar', 'ico-consultar-small');
                break;
            case 'mnuComprasFacturasCompras':
                this.getController('TabMain').addTab(menuItem.text, 'pnlcomprasfacturacion', 'tabs');
                break;
            case 'mnuMantenimientoCategorias':
                this.getController('TabMain').addTab(menuItem.text, 'pnlcategorias', 'tabs');
                break;
            case 'mnuMantenimientoSubCategorias':
                this.getController('TabMain').addTab(menuItem.text, 'pnlsubcategorias', 'tabs');
                break;
            case 'mnuMantenimientoProductos':
                this.getController('TabMain').addTab(menuItem.text, 'pnlproductos', 'tabs');
                break;
            case 'mnuInventarioIngresodeProductos':
                this.getController('TabMain').addTab(menuItem.text, 'pnlingresodeproducto', 'ico-compras-small');
                break;
            case 'mnuInventarioOrdenesDespacho':
                this.getController('TabMain').addTab(menuItem.text, 'pnlordenesdespacho', 'tabs');
                break;
            case 'mnuVentasCuentasCobrar':
                this.getController('TabMain').addTab(menuItem.text, 'pnlcuentascobrar', 'tabs');
                break;
            case 'mnuContabilidadLibroCompras':
                //this.getController('TabMain').addTab(menuItem.text, 'winlibrocompras', 'tabs');
                break;
            case 'mnuContabilidadLibroVentas':
                Ext.widget('winlibroventas').show();
                break;
            case 'mnuReportesRegistroVentas':
                Ext.widget('winregistroventas').show();
                break;
            case 'mnuReportesRegistroVentasxFamilias':
                Ext.widget('winregistroventasxfamilias').show();
                break;
            case 'mnuInventarioConsultarStock':
                Ext.widget('winconsultarstock').show();
                break;
            case 'mnuInventarioAjusteInventario':
                this.getController('TabMain').addTab(menuItem.text, 'pnlajusteinventario', 'tabs');
                break;
            case 'mnuInventarioConsultarKardex':
                this.getController('TabMain').addTab(menuItem.text, 'pnlconsultarkardex', 'tabs');
                break;
            case 'mnuMantenimientoUnidadesdeMedida':
                this.getController('TabMain').addTab(menuItem.text, 'pnlunidadmedida', 'tabs');
                break;
            case 'mnuInventarioOrdenAbastecimientoCrear':
                this.getController('TabMain').addTab(menuItem.text, 'pnlordenabastecimientocrear', 'tabs');
                break;
            case 'mnuInventarioOrdenAbastecimientoConsultar':
                //this.getController('TabMain').addTab(menuItem.text, '', 'tabs');
                break;
            case 'mnuInventarioTrasladodeProductos':
                this.getController('TabMain').addTab(menuItem.text, 'pnltransferencia', 'tabs');
                break;
            case 'mnuVentasGuiaRemision':
                this.getController('TabMain').addTab(menuItem.text, 'pnlventasfacturacion', 'ico-facturacion-small');
                var combo = this.getController('ventas.Facturaciones').getMainView().down('combo[name=cboTipoDocumento]');
                combo.setValue('GR');
                this.getController('ventas.Facturaciones').onSelectCboTipoDocumentos(combo);
                break;
            case 'mnuVentasCotizacion':
                this.getController('TabMain').addTab(menuItem.text, 'pnlventasfacturacion', 'ico-facturacion-small');
                var combo = this.getController('ventas.Facturaciones').getMainView().down('combo[name=cboTipoDocumento]');
                combo.setValue('CC');
                this.getController('ventas.Facturaciones').onSelectCboTipoDocumentos(combo);
                break;
            case 'mnuConfiguracionTipoCambio':
                //Ext.widget('wintipocambio').show();
                this.getController('TabMain').addTab(menuItem.text, 'pnltipocambio', 'tabs');
                break;
            case 'mnuConfiguracionUsuarios':
                this.getController('TabMain').addTab(menuItem.text, 'pnlusuarios', 'tabs');
                break;
            case 'mnuConfiguracionUsuariosUpdate':
                Ext.widget('winusuariosupdate').show();
                break;
            case 'mnuMantenimientoClientes':
                this.getController('TabMain').addTab(menuItem.text, 'pnlclientes', 'tabs');
                break;
            case 'mnuMantenimientoProveedores':
                this.getController('TabMain').addTab(menuItem.text, 'pnlproveedores', 'tabs');
                break;
            case 'mnuVentasNotasdeCredito':
                this.getController('TabMain').addTab(menuItem.text, 'pnlventasfacturacion', 'ico-facturacion-small');
                var combo = this.getController('ventas.Facturaciones').getMainView().down('combo[name=cboTipoDocumento]');
                combo.setValue('NC');
                this.getController('ventas.Facturaciones').onSelectCboTipoDocumentos(combo);
                break;
            case 'mnuInventarioOrdenesRequerimiento':
                this.getController('TabMain').addTab(menuItem.text, 'pnlrequerimiento', 'tabs');
                break;
            case 'mnuComprasOrdendeCompra':
                this.getController('TabMain').addTab(menuItem.text, 'pnlordencompra', 'tabs');
                break;
        }
    }
});