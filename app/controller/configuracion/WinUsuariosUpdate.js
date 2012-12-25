Ext.define('rewsoft.controller.configuracion.WinUsuariosUpdate', {
    extend: 'Ext.app.Controller',
    views: [
    'configuracion.WinUsuariosUpdate'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winusuariosupdate'
    }],
    stores: [
    'Usuarios'
    ],
    init: function() {
        this.control({
            'winusuariosupdate': {
                render: this.onRenderWinUsuariosUpdate
            },
            'winusuariosupdate button[name=btnEditar]':{
                click: this.onClickBtnEditar
            }
        });
    },
    onRenderWinUsuariosUpdate: function(win) {
        this.getUsuariosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getUsuariosStore().proxy.extraParams.co_usuario = rewsoft.AppGlobals.CO_USUARIO;
        this.getUsuariosStore().load({
            callback: function(record, operation, success) {
                if(success){
                    this.getMainView().down('form').loadRecord(record[0]);
                }
            },
            scope: this
        });
    },
    onClickBtnEditar: function(){
        var form = Ext.getCmp('frmUsuariosUpdate').getForm();
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