Ext.define('rewsoft.controller.mantenimiento.productos.WinProcedenciasListar', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.WinProcedencias'
    ],
    stores: [
    'Pais'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winprocedencias'
    }],
    init: function() {
        this.control({
            'winprocedencias': {
                render: this.onRenderedWinCategorias
            },
            'winprocedencias textfield': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'winprocedencias grid': {
                render: this.onRenderedGridPais,
                itemdblclick: this.onItemDblClickGridPais
            }
        });
    },
    onRenderedWinCategorias: function() {
        this.getPaisStore().proxy.extraParams.no_pais = '';
        this.getPaisStore().load();
    },
    onRenderedGridPais: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridPais(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridPais: function(grid, record){
        this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('textfield[name=co_pais_procedencia]').setValue(record.get('co_pais'));
        this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('displayfield[name=no_pais_procedencia]').setValue(record.get('no_pais'));
        this.getMainView().close();
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getPaisStore().proxy.extraParams.no_pais = text.getValue();
            this.getPaisStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getPaisStore().proxy.extraParams.no_pais = '';
            this.getPaisStore().load();
        }
    }
});