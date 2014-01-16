Ext.define('rewsoft.controller.ventas.WinBuscarCliente', {
    extend: 'Ext.app.Controller',
    views: [
    'ventas.WinBuscarCliente'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winbuscarcliente'
    },{
        ref: 'PnlVentasFacturacion',
        selector: 'pnlventasfacturacion'
    },{
        ref: 'PnlVentasFacturacionConsultar',
        selector: 'pnlventasfacturacionconsultar'
    }],
    stores: [
        'Clientes'
    ],
    init: function() {
        this.control({
            'winbuscarcliente': {
                render: this.onRenderWinBuscarCliente
            },
            'winbuscarcliente textfield[name=txtBuscar]': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'winbuscarcliente grid': {
                render: this.onRenderedGridClientes,
                itemdblclick: this.onItemDblClickGridClientes
            }
        });
    },
    onRenderWinBuscarCliente: function() {
        this.getClientesStore().proxy.extraParams.co_cliente = '';
        this.getClientesStore().proxy.extraParams.no_cliente = '';
        this.getClientesStore().load();
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getClientesStore().proxy.extraParams.co_cliente = '';
            this.getClientesStore().proxy.extraParams.no_cliente = text.getValue();
            this.getClientesStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key){
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getClientesStore().proxy.extraParams.co_cliente = '';
            this.getClientesStore().proxy.extraParams.no_cliente = '';
            this.getClientesStore().load();
        }
    },
    onRenderedGridClientes: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridClientes(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridClientes: function(grid, record){
        try{
            this.getPnlVentasFacturacion().down('textfield[name=txtRuc]').setValue(record.get('ruc'));
            this.getPnlVentasFacturacion().down('textfield[name=txtCliente]').setValue(record.get('cliente'));
            this.getPnlVentasFacturacion().down('textfield[name=txtDireccion]').setValue(record.get('direccion'));
            this.getPnlVentasFacturacion().down('combobox[name=cboFormaPago]').setValue(record.get('co_forma_pago')+'');
        }catch(e){}
        try{
            this.getPnlVentasFacturacionConsultar().down('hiddenfield[name=txtRuc]').setValue(record.get('ruc'));
            this.getPnlVentasFacturacionConsultar().down('textfield[name=txtClientes]').setValue(record.get('cliente'));
        }catch(e){}
        this.getMainView().close();
    }
});