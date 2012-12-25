Ext.define('rewsoft.controller.mantenimiento.productos.WinSubCategoriasListar', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.WinSubCategorias'
    ],
    stores: [
    'SubCategorias'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winsubcategorias'
    }],
    init: function() {
        this.control({
            'winsubcategorias': {
                render: this.onRenderedWinCategorias
            },
            'winsubcategorias textfield': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'winsubcategorias grid': {
                render: this.onRenderedGridCategorias,
                itemdblclick: this.onItemDblClickGridCategorias
            }
        });
    },
    onRenderedWinCategorias: function() {
        this.getSubCategoriasStore().proxy.extraParams.no_sub_categoria = null;
        this.getSubCategoriasStore().load();
    },
    onRenderedGridCategorias: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridCategorias(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridCategorias: function(grid, record){
        this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('textfield[name=co_sub_categoria]').setValue(record.get('co_sub_categoria'));
        this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('displayfield[name=no_sub_categoria]').setValue(record.get('no_sub_categoria'));
        this.getMainView().close();
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getSubCategoriasStore().proxy.extraParams.no_sub_categoria = text.getValue();
            this.getSubCategoriasStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getSubCategoriasStore().proxy.extraParams.no_sub_categoria = null;
            this.getSubCategoriasStore().load();
        }
    }
});