Ext.define('rewsoft.controller.ventas.FacturacionesConsultar', {
    extend: 'Ext.app.Controller',
    views: [
    'ventas.PnlFacturacionConsultar',
    'ventas.WinFacturacionConsultarDetalle'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlfacturacionconsultar'
    },{
        ref: 'WinVentasFacturacionConsultarDetalle',
        selector: 'winventasfacturacionconsultardetalle'
    }],
    stores: [
        'DocumentosFacturacion',
        'FacturacionesConsultar',
        'FacturacionesConsultarDetalle',
        'Clientes',
        'PoolPrinter'
    ],
    init: function() {
        this.control({
            'pnlventasfacturacionconsultar': {
                render: this.onRenderedPnlFacturacionConsultar,
                itemdblclick: this.onItemDblClickGridComprobantes
            },
            'pnlventasfacturacionconsultar combobox[name=cboTipoDocumento]': {
                render: this.onRenderedCboTipoDocumento,
                select: this.onSelectCboTipoDocumento
            },
            'pnlventasfacturacionconsultar textfield[name=txtClientes]': {
                keypress: this.onKeyPressTxtCliente
            },
            'pnlventasfacturacionconsultar textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar,
                keypress: this.onKeyPressTxtBuscar
            },
            'winventasfacturacionconsultardetalle button[name=btnRecuperar]': {
                click: this.onClickBtnRecuperar
            },
            'winventasfacturacionconsultardetalle button[name=btnImprimir]': {
                click: this.onClickBtnImprimir
            }
        });
    },
    onRenderedPnlFacturacionConsultar: function(view) {
        this.getDocumentosFacturacionStore().filter('fl_facturacion', 'S');
        this.getClientesStore().load();
        this.getFacturacionesConsultarStore().load();
        view.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    if(record){
                        this.onItemDblClickGridComprobantes(grd, record)
                    }
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onRenderedCboTipoDocumento: function(combo){
        //combo.setValue('FV');
    },
    onSelectCboTipoDocumento: function(combo){
        this.getFacturacionesConsultarStore().clearFilter(true);
        this.getFacturacionesConsultarStore().filter('tipo_comprobante', combo.getValue());
    },
    onKeyPressTxtCliente: function(text, key) {
        if(key.getKey() == key.ENTER){
            Ext.widget('winbuscarcliente').show();
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getFacturacionesConsultarStore().proxy.extraParams.doc = '';
            this.getFacturacionesConsultarStore().loadPage(1);
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getFacturacionesConsultarStore().proxy.extraParams.doc = text.getValue();
            this.getFacturacionesConsultarStore().loadPage(1);
        }
    },
    onItemDblClickGridComprobantes: function(grid, record){
        var view = Ext.widget('winventasfacturacionconsultardetalle');
        this.getFacturacionesConsultarDetalleStore().proxy.extraParams.tipo_comprobante = record.get('tipo_comprobante');
        this.getFacturacionesConsultarDetalleStore().proxy.extraParams.nu_comprobante = record.get('numero');
        this.getFacturacionesConsultarDetalleStore().load();
        var tipoDocumento;
        if (record.get('tipo_comprobante') == 'FV'){
            tipoDocumento = 'Factura: '
        } else if (record.get('tipo_comprobante') == 'BV'){
            tipoDocumento = 'Boleta: '
        }
        view.down('hiddenfield[name=txtTipoComprobante]').setValue(record.get('tipo_comprobante'))
        view.down('hiddenfield[name=txtNuComprobante]').setValue(record.get('numero'))
        view.down('displayfield[name=lblNuComprobante]').setValue(tipoDocumento+record.get('numero'))
        view.down('displayfield[name=lblFecha]').setValue(record.get('fecha'))
        view.down('displayfield[name=lblCliente]').setValue(record.get('ruc')+' - '+record.get('cliente'))
        view.show();
    },
    onClickBtnRecuperar: function(btn){
        Ext.getBody().mask('Recuperando ...');
        this.getController('TabMain').addTab('Facturacion', 'pnlventasfacturacion', 'ico-facturacion-small');
        this.getController('ventas.Facturaciones').getMainView().down('grid[name=gridPedido]').getStore().removeAll();
        this.getFacturacionesConsultarDetalleStore().each(function(record){
            this.getController('ventas.Facturaciones').addProducto(
                record.data['co_producto'], 
                record.data['no_producto'], 
                record.data['va_producto'], 
                0, 
                record.data['ca_producto'], 
                '', 
                '',
                '',
                record.data['no_unidad'],
                ''
            );
        }, this);
        Ext.getBody().unmask();
        this.getWinVentasFacturacionConsultarDetalle().close();
    },
    onClickBtnImprimir: function(btn){
        var view = btn.up('window');
        var tipo = view.down('hiddenfield[name=txtTipoComprobante]').getValue();
        var numero = view.down('hiddenfield[name=txtNuComprobante]').getValue();
        var tipoDocumento;
        if (tipo == 'FV'){
            tipoDocumento = 'Factura: '
        } else if (tipo == 'BV'){
            tipoDocumento = 'Boleta: '
        }
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer imprimir la '+tipoDocumento+' No. '+numero, function(btn){
            if(btn=='yes'){
                var pp = {
                    id: null,
                    co_empresa: rewsoft.AppGlobals.CIA,
                    tipo_comprobante: tipo,
                    nu_comprobante: numero,
                    nu_serie: '1',
                    fl_impreso: 'N',
                    fl_ticket: 'N'
                };
                this.getPoolPrinterStore().add(pp);
                this.getPoolPrinterStore().sync();
            }
        }, this);
    }
});