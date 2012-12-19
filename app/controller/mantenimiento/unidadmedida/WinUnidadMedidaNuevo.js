Ext.define('MG.controller.mantenimiento.unidadmedida.WinUnidadMedidaNuevo', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.unidadmedida.WinUnidadMedidaNuevo'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winunidadmedidanuevo'
    }],
    stores: [
    'UnidadesVenta'
    ],
    init: function() {
        this.control({
            'winunidadmedidanuevo': {
                render: this.onRenderedWinCategoriasNuevo
            },
            'winunidadmedidanuevo button[name=btnCrear]': {
                click: this.onClickBtnCrear
            },
            'winunidadmedidanuevo button[name=btnEditar]': {
                click: this.onClickBtnEditar
            }
        });
    },
    onRenderedWinCategoriasNuevo: function(){
    },
    onClickBtnCrear: function(btn){
        var form = btn.up('window').down('form');
        if (form.getForm().isValid()){
            Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer grabar la unidad?', function(btn){
                if(btn=='yes'){
                    var values = form.getValues();
                    if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                        this.getUnidadesVentaStore().proxy.extraParams.co_empresa = '01-02-03';
                    } else {
                        this.getUnidadesVentaStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
                    }
                    this.getUnidadesVentaStore().insert(0, values);
                    this.getUnidadesVentaStore().sync({
                        callback: function() {
                            this.getUnidadesVentaStore().load();
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
                    this.getUnidadesVentaStore().sync({
                        callback: function() {
                            this.getUnidadesVentaStore().load();
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