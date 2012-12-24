Ext.define('MG.controller.configuracion.WinUsuariosNuevo', {
    extend: 'Ext.app.Controller',
    views: [
    'configuracion.WinUsuariosNuevo'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winusuariosnuevo'
    }],
    stores: [
    'Usuarios',
    'Ubigeo',
    'Rol'
    ],
    init: function() {
        this.control({
            'winusuariosnuevo': {
                render: this.onRenderWinTipoCambio
            },
            'winusuariosnuevo button[name=btnCrear]':{
                click: this.onClickBtnCrear
            },'winusuariosnuevo button[name=btnEditar]':{
                click: this.onClickBtnEditar
            }
        });
    },
    onRenderWinTipoCambio: function(win) {
        this.getUbigeoStore().load();
        this.getRolStore().load();
    },
    onClickBtnCrear: function(btn){
        var form = Ext.getCmp('frmUsuariosNuevo').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Usuarios', 'Grabar datos?', function(btn){
                if(btn=='yes'){
                    Ext.getBody().mask('Creando Usuario ...');
                    this.getUsuariosStore().insert(0, form.getValues());
                    this.getUsuariosStore().sync({
                        success: function(batch, options) {
                            Ext.getBody().unmask();
                            this.getUsuariosStore().load();
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
            Ext.Msg.show('Usuarios','Debe ingresar todos los campos requeridos');
        }
    },
    onClickBtnEditar: function(){
        var form = Ext.getCmp('frmUsuariosNuevo').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Usuarios', 'Actualizar datos?', function(btn){
                if(btn=='yes'){
                    var record = form.getRecord();
                    var values = form.getValues();
                    record.set(values);
                    this.getUsuariosStore().sync();
                    this.getUsuariosStore().load();
                    this.getMainView().close();
                }
            }, this);
            
        } else {
            Ext.Msg.alert('Usuarios','Debe ingresar todos los campos requeridos');
        }
    }
});