Ext.define('MG.controller.MainView', {
    extend: 'Ext.app.Controller',
    views: [
    'MainView'
    ],
    refs: [{
        ref: 'Card',
        selector: 'card'
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
        //AppGlobals.MODELO_NEGOCIO = AppGlobals.MODELO_NEGOCIO_MELY_GIN;
        AppGlobals.MODELO_NEGOCIO = AppGlobals.MODELO_NEGOCIO_DSILVANA;
        this.loadMenu();
        if(AppGlobals.DEBUG){
            console.log('Debug activado');
            this.getLoginUser().hide();
            this.getCard().getLayout().setActiveItem(1);
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
            this.getController('TabMain').addTab('Categorias', 'pnlcategorias');
            //this.getController('TabMain').addTab('Unidades de Medida', 'pnlunidadmedida');
            //this.getController('TabMain').addTab('Crear', 'pnlordenabastecimientocrear');
            //this.getController('TabMain').addTab('Transferencia de Productos', 'pnltransferencia');
            //this.getController('TabMain').addTab('Usuarios', 'pnlusuarios');
        }
    },
    loadMenu: function(){
        var tb = new Ext.toolbar.Toolbar({
            id: 'tbMain'
        });
        
        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
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
                    text: 'Consultar',
                    menu: [{
                        text: 'Facturacion',
                        iconCls: 'ico-consultar-small',
                        action: 'mnuVentasFacturacionConsultar'
                    },{
                        text: 'Cotizaciones',
                        action: 'mnuVentasCotizaciones'
                    }]
                },{
                    text: 'Notas de Credito',
                    action: 'mnuVentasNotasdeCredito'
                },{
                    text: 'Notas de Debito',
                    action: 'mnuVentasNotasdeDebito'
                },{
                    text: 'Cuentas por Cobrar',
                    action: 'mnuVentasCuentasCobrar'
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
        
        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
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

        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
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

        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_DSILVANA){
            tb.add({
                text: 'Reportes',
                name: 'mnuReportes',
                id: 'mnuReportes',
                menu: [{
                    text: 'Registro de Ventas',
                    action: 'mnuReportesRegistroVentas'
                },{
                    text: 'Registro de Ventas x Productos',
                    action: 'mnuReportesRegistroVentasxProductos'
                }]
            });
        }
        

        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
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
            text: AppGlobals.RAZON_SOCIAL + ' - Tipo de Cambio: ' + AppGlobals.TIPO_CAMBIO_VENTA,
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
                this.getController('ventas.Facturaciones').getMainView().down('combo[name=cboTipoDocumento]').setValue('GR');
                break;
            case 'mnuVentasCotizacion':
                this.getController('TabMain').addTab(menuItem.text, 'pnlventasfacturacion', 'ico-facturacion-small');
                this.getController('ventas.Facturaciones').getMainView().down('combo[name=cboTipoDocumento]').setValue('CC');
                break;
            case 'mnuConfiguracionTipoCambio':
                Ext.widget('wintipocambio').show();
                break;
            case 'mnuConfiguracionUsuarios':
                this.getController('TabMain').addTab(menuItem.text, 'pnlusuarios', 'tabs');
                break;
            case 'mnuConfiguracionUsuariosUpdate':
                Ext.widget('winusuariosupdate').show();
                break;
        }
    }
});