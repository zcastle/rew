Ext.define('rewsoft.controller.ventas.WinNuevoCliente', {
    extend: 'Ext.app.Controller',
    views: [
    'ventas.WinNuevoCliente'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winnuevocliente'
    },{
        ref: 'PnlVentasFacturacion',
        selector: 'pnlventasfacturacion'
    }],
    init: function() {
        this.control({
            'winnuevocliente button[name=btnGuardarCliente]': {
                click: this.onClickBtnGuardarCliente
            }
        });
    },
    onClickBtnGuardarCliente: function(btn){
        var form = this.getMainView().down('form');
        if (form.getForm().isValid()) {
            form.submit({
                scope: this,
                success: function(form, action) {
                    Ext.Msg.alert('Registrar Cliente', 'Cliente Guardado');
                    this.getPnlVentasFacturacion().down('textfield[name=txtRuc]').setValue(action.result.data.nu_ruc+'');
                    this.getPnlVentasFacturacion().down('textfield[name=txtCliente]').setValue(action.result.data.no_cliente);
                    this.getPnlVentasFacturacion().down('textfield[name=txtDireccion]').setValue(action.result.data.direccion);
                    this.getPnlVentasFacturacion().down('combobox[name=cboFormaPago]').setValue('1010');
                    this.getMainView().close();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Error!!!', action.result.error);
                }
            });
        } else {
            Ext.Msg.alert('Error!!!', 'Ingrese todos los campos solicitados');
        }
    }
});