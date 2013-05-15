Ext.define('rewsoft.controller.mantenimiento.productos.WinProductosListar', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.WinProductos'
    ],
    stores: [
    'ProductosConsulta'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winproductos'
    }],
    init: function() {
        this.control({
            'winproductos': {
                render: this.onRenderedWinProductos
            },
            'winproductos textfield': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'winproductos grid': {
                render: this.onRenderedGridProducto,
                itemdblclick: this.onItemDblClickGridProducto
            }
        });
    },
    onRenderedWinProductos: function() {
        this.getProductosConsultaStore().proxy.extraParams.co_producto = '';
        this.getProductosConsultaStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getProductosConsultaStore().proxy.extraParams.co_grupo = '10';
        this.getProductosConsultaStore().load();
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProductosConsultaStore().proxy.extraParams.no_producto = text.getValue();
            this.getProductosConsultaStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key){
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProductosConsultaStore().proxy.extraParams.no_producto = '';
            this.getProductosConsultaStore().load();
        }
    },
    onRenderedGridProducto: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridProducto(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridProducto: function(grid, record){
        var winProductosCantidad = Ext.widget('winproductoscantidad');
        winProductosCantidad.down('hiddenfield[name=co_producto]').setValue(record.get('co_producto'));
        winProductosCantidad.down('hiddenfield[name=costo_s]').setValue(record.get('costo_s'));
        winProductosCantidad.down('displayfield[name=no_producto]').setValue(record.get('no_producto'));
        winProductosCantidad.show();
        this.getMainView().close();
    }
});