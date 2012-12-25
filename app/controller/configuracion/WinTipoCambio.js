Ext.define('rewsoft.controller.configuracion.WinTipoCambio', {
    extend: 'Ext.app.Controller',
    views: [
    'configuracion.WinTipoCambio'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'wintipocambio'
    }],
    stores: [
    'TipoCambio'
    ],
    init: function() {
        this.control({
            'wintipocambio': {
                render: this.onRenderWinTipoCambio
            },
            'wintipocambio button[name=btnAceptar]':{
                click: this.onClickBtnAceptar
            }
        });
    },
    onRenderWinTipoCambio: function(win) {
        var form = Ext.getCmp('frmTipoCambio').getForm();
        this.getTipoCambioStore().load({
            callback: function(record, operation, success) {
                form.loadRecord(record[0]);
                Ext.Array.forEach(record, function(item, index, allItems){
                    //form.loadRecord(item);
                }, this);
            },
            scope: this
        });
    },
    onClickBtnAceptar: function(btn){
        var form = Ext.getCmp('frmTipoCambio').getForm();
        if(form.isValid()){
            Ext.getBody().mask('Actualizando Tipo de Cambio ...');
            var record = form.getRecord();
            var values = form.getValues();
            record.set(values);
            this.getTipoCambioStore().sync({
                callback: function() {
                    Ext.getBody().unmask();
                    this.getMainView().close();
                },
                scope: this
            });
        } else {
            console.log('No Valido');
        }
    }
});