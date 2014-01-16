Ext.define('rewsoft.controller.mantenimiento.proveedores.WinProveedoresNuevo', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.proveedores.WinProveedoresNuevo'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winproveedoresnuevo'
    }],
    stores: [
        'Proveedores',
        'FormaPago'
    ],
    init: function() {
        this.control({
            'winproveedoresnuevo': {
                render: this.onRenderWinProveedoresNuevo
            },
            'winproveedoresnuevo button[name=btnCrear]':{
                click: this.onClickBtnCrear
            },
            'winproveedoresnuevo button[name=btnEditar]':{
                click: this.onClickBtnEditar
            }
        });
    },
    onRenderWinProveedoresNuevo: function(win) {
        this.getFormaPagoStore().load();
    },
    onClickBtnCrear: function(btn){
        var form = Ext.getCmp('frmProveedoresNuevo').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Proveedores', 'Grabar datos?', function(btn){
                if(btn=='yes'){
                    Ext.getBody().mask('Creando Proveeedor ...');
                    this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
                    this.getProveedoresStore().add(form.getValues());
                    this.getProveedoresStore().sync({
                        success: function(batch, options) {
                            Ext.getBody().unmask();
                            this.getProveedoresStore().load();
                            this.getMainView().close();
                        },
                        failure: function(batch, options){
                            Ext.getBody().unmask();
                        },
                        scope: this
                    });
                }
            }, this);
            
        } else {
            Ext.Msg.show('Proveedores','Debe ingresar todos los campos requeridos');
        }
    },
    onClickBtnEditar: function(){
        var form = Ext.getCmp('frmProveedoresNuevo').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Proveedores', 'Actualizar Proveedor?', function(btn){
                if(btn=='yes'){
                    var record = form.getRecord();
                    var values = form.getValues();
                    record.set(values);
                    this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
                    this.getProveedoresStore().proxy.extraParams.c_f_p = rewsoft.AppGlobals.FORMA_PAGO_DEFAULT;
                    this.getProveedoresStore().sync({
                        success: function(batch, options) {
                            this.getProveedoresStore().load();
                        },
                        scope: this
                    });
                    this.getProveedoresStore().load();
                    this.getMainView().close();
                }
            }, this);
            
        } else {
            Ext.Msg.alert('Proveedores','Debe ingresar todos los campos requeridos');
        }
    }
});