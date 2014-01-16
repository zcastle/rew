Ext.define('rewsoft.controller.mantenimiento.productos.WinCategoriasListar', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.WinCategorias'
    ],
    stores: [
    'Categorias'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'wincategorias'
    }],
    init: function() {
        this.control({
            'wincategorias': {
                render: this.onRenderedWinCategorias
            },
            'wincategorias textfield': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'wincategorias grid': {
                render: this.onRenderedGridCategorias,
                itemdblclick: this.onItemDblClickGridCategorias
            }
        });
    },
    onRenderedWinCategorias: function() {
        var co_grupo = this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('combobox[name=co_grupo]').getValue();
        this.getCategoriasStore().proxy.extraParams.no_categoria = '';
        this.getCategoriasStore().proxy.extraParams.co_grupo = co_grupo;
        this.getCategoriasStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getCategoriasStore().load();
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
        this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('textfield[name=co_categoria]').setValue(record.get('co_categoria'));
        this.getController('mantenimiento.productos.WinProductosNuevo').getMainView().down('displayfield[name=no_categoria]').setValue(record.get('no_categoria'));
        this.getMainView().close();
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getCategoriasStore().proxy.extraParams.no_categoria = text.getValue();
            this.getCategoriasStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getCategoriasStore().proxy.extraParams.no_categoria = '';
            this.getCategoriasStore().load();
        }
    }
});