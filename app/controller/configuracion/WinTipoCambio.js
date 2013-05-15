Ext.define('rewsoft.controller.configuracion.WinTipoCambio', {
    extend: 'Ext.app.Controller',
    views: [
    'configuracion.WinTipoCambio',
    'configuracion.WinTipoCambioUpdate',
    'configuracion.PnlTipoCambio'
    ],
    refs: [{
        ref: 'WinTipoCambio',
        selector: 'wintipocambio'
    },{
        ref: 'WinTipoCambioUpdate',
        selector: 'wintipocambioupdate'
    },{
        ref: 'PnlTipoCambio',
        selector: 'pnltipocambio'
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
            },
            'wintipocambio textfield[name=tcCompraNuevo]':{
                keypress: this.onKeypressTcCompraNuevo
            },
            'wintipocambio textfield[name=tcVentaNuevo]':{
                keypress: this.onKeypressTcVentaNuevo
            },
            'pnltipocambio': {
                render: this.onRenderPnlTipoCambio
            },
            'wintipocambioupdate button[name=btnActualizar]':{
                click: this.onClickBtnActualizar
            },
            'wintipocambioupdate textfield[name=tcCompraNuevo]':{
                keypress: this.onKeypressTcCompraNuevo
            },
            'wintipocambioupdate textfield[name=tcVentaNuevo]':{
                keypress: this.onKeypressTcVentaNuevo
            }
        });
    },
    onRenderWinTipoCambio: function(win) {
        var form = Ext.getCmp('frmTipoCambio').getForm();
        this.getTipoCambioStore().proxy.extraParams.today = 'N';
        this.getTipoCambioStore().load({
            callback: function(record, operation, success) {
                form.loadRecord(record[0]);
                //Ext.Array.forEach(record, function(item, index, allItems){
                    //form.loadRecord(item);
                //}, this);
            },
            scope: this
        });
    },
    onRenderPnlTipoCambio: function(grid){
        this.getTipoCambioStore().proxy.extraParams.today = 'T';
        this.getTipoCambioStore().load({
            callback: function(record, operation, success) {
                grid.store.loadData(record);
                //Ext.Array.forEach(record, function(item, index, allItems){
                    //grid.store.add(item);
                //}, this);
            },
            scope: this
        });
    },
    onClickBtnAceptar: function(btn){
        var form = Ext.getCmp('frmTipoCambio').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Confirmacion', 'Grabar tipo de cambio?', function(btn){
                if(btn=='yes'){
                    Ext.getBody().mask('Grabando Tipo de Cambio ...');
                    var values = form.getValues();
                    this.getTipoCambioStore().add({
                        tcCompraNuevo: values.tcCompraNuevo,
                        tcVentaNuevo: values.tcVentaNuevo,
                        co_usuario: rewsoft.AppGlobals.CO_USUARIO
                    });
                    this.getTipoCambioStore().sync({
                        callback: function() {
                            this.getWinTipoCambio().close();
                            rewsoft.AppGlobals.TIPO_CAMBIO_VENTA = values.tcVentaNuevo;
                            Ext.getCmp('lblNoRazonSocial').setText(rewsoft.AppGlobals.RAZON_SOCIAL + ' - TCV: ' + rewsoft.AppGlobals.TIPO_CAMBIO_VENTA);
                            Ext.getBody().unmask();
                        },
                        scope: this
                    });
                }
            }, this);
        }
    },
    onClickBtnActualizar: function(btn){
        var form = Ext.getCmp('frmTipoCambioUpdate').getForm();
        if(form.isValid()){
            Ext.Msg.confirm('Confirmacion', 'Actualizar tipo de cambio?', function(btn){
                if(btn=='yes'){
                    Ext.getBody().mask('Grabando Tipo de Cambio ...');
                    var record = form.getRecord();
                    var values = form.getValues();
                    record.set(values);
                    this.getTipoCambioStore().sync({
                        callback: function() {
                            Ext.getBody().unmask();
                            this.getWinTipoCambioUpdate().close();
                        },
                        scope: this
                    });
                }
            }, this);
        }
    },
    onKeypressTcCompraNuevo: function(text, key){
        if(key.getKey() == key.ENTER){
            text.up().down('textfield[name=tcVentaNuevo]').focus();
        }
    },
    onKeypressTcVentaNuevo: function(text, key){
        if(key.getKey() == key.ENTER){
            this.onClickBtnAceptar(null);
        }
    }
});