Ext.define('rewsoft.controller.mantenimiento.clientes.WinClientesNuevo', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.clientes.WinClientesNuevo'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winclientesnuevo'
    }],
    stores: [
        'Clientes',
        'FormaPago'
    ],
    init: function() {
        this.control({
            'winclientesnuevo': {
                render: this.onRenderWinClientesNuevo
            },
            'winclientesnuevo button[name=btnCrear]':{
                click: this.onClickBtnCrear
            },
            'winclientesnuevo button[name=btnEditar]':{
                click: this.onClickBtnEditar
            }
        });
    },
    onRenderWinClientesNuevo: function(win) {
        this.getFormaPagoStore().load();
    },
    onClickBtnCrear: function(btn){
        var form = Ext.getCmp('frmClientesNuevo').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Clientes', 'Grabar datos?', function(btn){
                if(btn=='yes'){
                    Ext.getBody().mask('Creando Cliente ...');
                    this.getClientesStore().proxy.extraParams.co_cliente = '';
                    this.getClientesStore().proxy.extraParams.no_cliente = '';
                    this.getClientesStore().proxy.extraParams.edit = '';
                    this.getClientesStore().proxy.extraParams.c_f_p = rewsoft.AppGlobals.FORMA_PAGO_DEFAULT;
                    this.getClientesStore().add(form.getValues());
                    this.getClientesStore().sync({
                        success: function(batch, options) {
                            Ext.getBody().unmask();
                            this.getClientesStore().load();
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
            Ext.Msg.show('Clientes','Debe ingresar todos los campos requeridos');
        }
    },
    onClickBtnEditar: function(){
        var form = Ext.getCmp('frmClientesNuevo').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Clientes', 'Actualizar datos?', function(btn){
                if(btn=='yes'){
                    var record = form.getRecord();
                    var values = form.getValues();
                    record.set(values);
                    this.getClientesStore().proxy.extraParams.co_cliente = '';
                    this.getClientesStore().proxy.extraParams.no_cliente = '';
                    this.getClientesStore().proxy.extraParams.edit = '';
                    this.getClientesStore().proxy.extraParams.c_f_p = rewsoft.AppGlobals.FORMA_PAGO_DEFAULT;
                    this.getClientesStore().sync();
                    this.getClientesStore().load();
                    this.getMainView().close();
                }
            }, this);
            
        } else {
            Ext.Msg.alert('Clientes','Debe ingresar todos los campos requeridos');
        }
    }
});