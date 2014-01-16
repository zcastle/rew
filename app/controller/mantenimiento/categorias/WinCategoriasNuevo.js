Ext.define('rewsoft.controller.mantenimiento.categorias.WinCategoriasNuevo', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.categoria.WinCategoriasNuevo'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'wincategoriasnuevo'
    }],
    stores: [
    'Categorias',
    'Grupo',
    'Destino'
    ],
    init: function() {
        this.control({
            'wincategoriasnuevo': {
                render: this.onRenderedWinCategoriasNuevo
            },
            'wincategoriasnuevo button[name=btnCrear]': {
                click: this.onClickBtnCrear
            },
            'wincategoriasnuevo button[name=btnEditar]': {
               click: this.onClickBtnEditar
            }
        });
    },
    onRenderedWinCategoriasNuevo: function(){
        this.getGrupoStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getGrupoStore().load();
        this.getDestinoStore().load();
    },
    onClickBtnCrear: function(btn){
        var form = btn.up('window').down('form');
        if (form.getForm().isValid()){
            Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer grabar la categoria?', function(btn){
                if(btn=='yes'){
                    var values = form.getValues();
                    if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                        this.getCategoriasStore().proxy.extraParams.co_empresa = '01-02-03';
                    } else {
                        this.getCategoriasStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
                    }
                    this.getCategoriasStore().insert(0, values);
                    this.getCategoriasStore().sync({
                        callback: function() {
                            this.getCategoriasStore().load();
                        },
                        scope: this
                    });
                    form.up('window').close();
                }
            }, this);
        }else{
            Ext.Msg.alert("Error","Todos los campos son requeridos");
        }
    },
    onClickBtnEditar: function(btn){
        var form = btn.up('window').down('form');
        if (form.getForm().isValid()){
            Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer editar la categoria?', function(btn){
                if(btn=='yes'){
                    var record = form.getRecord();
                    var values = form.getValues();
                    record.set(values);
                    this.getCategoriasStore().sync({
                        callback: function() {
                            this.getCategoriasStore().load();
                        },
                        scope: this
                    });
                    form.up('window').close();
                }
            }, this);
        }else{
            Ext.Msg.alert("Error","Todos los campos son requeridos");
        }
    }
});