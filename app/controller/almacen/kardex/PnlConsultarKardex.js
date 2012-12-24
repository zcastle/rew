Ext.define('MG.controller.almacen.kardex.PnlConsultarKardex', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.kardex.PnlConsultarKardex',
    'almacen.kardex.WinProductosListar',
    'almacen.kardex.WinProductosLotesListar',
    'almacen.kardex.WinProductosAlmacenListar'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlconsultarkardex'
    },{
        ref: 'WinProductosKardex',
        selector: 'winproductoskardex'
    },{
        ref: 'WinProductosKardexLotes',
        selector: 'winproductoskardexlotes'
    },{
        ref: 'WinProductosKardexAlmacen',
        selector: 'winproductoskardexalmacen'
    }],
    stores: [
    'ProductosKardex',
    'Lotes',
    'Kardex',
    'AlmacenKardex'
    ],
    init: function() {
        this.control({
            'pnlconsultarkardex': {
                render: this.onRenderedPnlConsultarKardex
            },
            'pnlconsultarkardex textfield[name=co_producto]': {
                keypress: this.onKeypressCoProducto
            },
            'pnlconsultarkardex textfield[name=co_almacen]': {
                keypress: this.onKeypressCoAlmacen
            },
            'pnlconsultarkardex textfield[name=no_lote]': {
                keypress: this.onKeypressCoLote
            },
            'winproductoskardex': {
                render: this.onRenderWinProductosKardex
            },
            'winproductoskardex textfield': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'winproductoskardex grid': {
                render: this.onRenderedGridProducto,
                itemdblclick: this.onItemDblClickGridProducto
            },
            'winproductoskardexlotes grid': {
                render: this.onRenderedGridLote,
                itemdblclick: this.onItemDblClickGridLote
            },
            'winproductoskardexalmacen grid': {
                render: this.onRenderedGridAlmacen,
                itemdblclick: this.onItemDblClickGridAlmacen
            }
        });
    },
    onRenderedPnlConsultarKardex: function(grid) {
        this.getProductosKardexStore().proxy.extraParams.co_grupo = null;
        this.getProductosKardexStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
        this.getProductosKardexStore().proxy.extraParams.no_producto = null;
        this.getLotesStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
        grid.columns[7].hide();
        grid.columns[8].hide();
        grid.down('container[name=zoneLotes]').hide();
        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            grid.down('container[name=zoneLotes]').show();
        }
    },
    onKeypressCoProducto: function(text, key){
        if(key.getKey() == key.ENTER){
            if(text.getValue() != ""){
                this.getProductosKardexStore().proxy.extraParams.no_producto = text.getValue();
                this.getMainView().down('form').getForm().reset();
                this.getProductosKardexStore().load({
                    callback: function(record, operation, success) {
                        if(success){
                            if(record.length > 1){
                                Ext.widget('winproductoskardex').show();
                            }else{
                                Ext.Array.forEach (record, function(item, index, allItems){
                                    this.getMainView().down('form').loadRecord(item);
                                    this.getMainView().down('form').down('textfield[name=co_almacen]').focus();
                                }, this);
                            }
                        }else {
                            this.getProductosKardexStore().proxy.extraParams.no_producto = "";
                            this.getProductosKardexStore().load();
                            Ext.widget('winproductoskardex').show();
                        }
                    },
                    scope: this
                });
            }else {
                this.getProductosKardexStore().proxy.extraParams.no_producto = "";
                this.getProductosKardexStore().load();
                Ext.widget('winproductoskardex').show();
            }
        }
    },
    onKeypressCoLote: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getLotesStore().proxy.extraParams.co_producto = this.getMainView().down('form').down('textfield[name=co_producto]').getValue();
            this.getLotesStore().proxy.extraParams.fl_stock = '';
            if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                this.getLotesStore().proxy.extraParams.co_almacen = this.getMainView().down('form').down('textfield[name=co_almacen]').getValue();
            }else{
                this.getLotesStore().proxy.extraParams.co_almacen = '';
            }
            this.getLotesStore().load();
            Ext.widget('winproductoskardexlotes').show();
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProductosKardexStore().proxy.extraParams.no_producto = text.getValue();
            this.getProductosKardexStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key){
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProductosKardexStore().proxy.extraParams.no_producto = null;
            this.getProductosKardexStore().load();
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
        this.getMainView().down('form').loadRecord(record);
        this.getWinProductosKardex().close();
        this.getMainView().down('form').down('textfield[name=co_almacen]').focus();
    },
    onRenderedGridLote: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridLote(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridLote: function(grid, record){
        this.getMainView().down('form').loadRecord(record);
        this.getWinProductosKardexLotes().close();
        var r = this.getMainView().down('form').getRecord();
        var co_producto = this.getMainView().down('form').down('textfield[name=co_producto]').getValue();
        var no_lote = r.get('no_lote');
        var co_almacen = this.getMainView().down('form').down('textfield[name=co_almacen]').getValue();
        this.loadKardex(co_producto, no_lote, co_almacen);
    },
    loadKardex: function(co_producto, no_lote, co_almacen){
        this.getKardexStore().proxy.extraParams.co_producto = co_producto;
        this.getKardexStore().proxy.extraParams.no_lote = no_lote;
        this.getKardexStore().proxy.extraParams.co_almacen = co_almacen;
        this.getKardexStore().load();
    },
    onKeypressCoAlmacen: function(text, key) {
        if(key.getKey() == key.ENTER){
            this.getAlmacenKardexStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
            this.getAlmacenKardexStore().proxy.extraParams.co_producto = this.getMainView().down('form').down('textfield[name=co_producto]').getValue();
            this.getAlmacenKardexStore().load();
            Ext.widget('winproductoskardexalmacen').show();
        }
    },
    onRenderedGridAlmacen: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridAlmacen(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridAlmacen: function(grid, record){
        if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            this.getMainView().down('form').loadRecord(record);
            this.getMainView().down('form').down('textfield[name=no_lote]').focus();
            var co_producto = this.getMainView().down('form').down('textfield[name=co_producto]').getValue();
            var no_lote = this.getMainView().down('form').down('textfield[name=no_lote]').getValue();
            var co_almacen = this.getMainView().down('form').down('textfield[name=co_almacen]').getValue();
            this.loadKardex(co_producto, no_lote, co_almacen);
        }   else {
            this.getMainView().down('form').loadRecord(record);
            this.getWinProductosKardexAlmacen().close();
            var r = this.getMainView().down('form').getRecord();
            var co_producto = this.getMainView().down('form').down('textfield[name=co_producto]').getValue();
            var no_lote = 'S/L';
            var co_almacen = this.getMainView().down('form').down('textfield[name=co_almacen]').getValue();
            this.loadKardex(co_producto, no_lote, co_almacen);
        }
        this.getWinProductosKardexAlmacen().close();
    },
    onRenderWinProductosKardex: function(win){
        win.down('textfield[name=txtBuscar]').focus(false, 1000);
    }
});