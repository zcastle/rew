Ext.define('rewsoft.controller.mantenimiento.productos.PnlProductos', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.PnlProductos'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlproductos'
    }],
    stores: [
    'Productos'
    ],
    edit: false,
    init: function() {
        this.control({
            'pnlproductos': {
                render: this.onRenderedPnlProductos,
                itemdblclick: this.onItemDblClickPnlProductos,
                cellclick: this.onCellClickPnlProductos
            },
            'pnlproductos textfield[name=txtBuscar]': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'pnlproductos button[name=btnNuevo]': {
                click: this.onClickBtnNuevo
            }
        });
    },
    onRenderedPnlProductos: function(grid) {
        if(rewsoft.AppGlobals.MODELO_NEGOCIO_ELI){
            this.getMainView().columns[4].hide();
            this.getMainView().columns[8].show();
            this.getMainView().columns[9].hide();
        }else{
            this.getMainView().columns[4].show();
            this.getMainView().columns[8].hide();
            this.getMainView().columns[9].show();
        }
        this.getProductosStore().proxy.extraParams.no_producto = '';
        this.getProductosStore().proxy.extraParams.co_grupo = '';
        this.getProductosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getProductosStore().load();
        //this.onClickBtnNuevo(null);
    },
    onClickBtnNuevo: function(button){
        var view = Ext.widget('winproductosnuevo');
        view.down('button[name=btnCrear]').show();
        view.down('button[name=btnEditar]').hide();
        view.show();
    },
    onItemDblClickPnlProductos: function(Grid, record){
        var view = Ext.widget('winproductosnuevo');
        view.down('form').loadRecord(record);
        view.down('button[name=btnCrear]').hide();
        view.down('button[name=btnEditar]').show();
        view.show();
    },
    onCellClickPnlProductos: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        //grid, td, cellIndex, record, tr, rowIndex, e, eOpts
        var columna = grid.up('grid').columns[columnIndex].name;
        var producto = record.get('no_producto');
        if(columna == 'actionEditar') {
            var view = Ext.widget('winproductosnuevo');
            view.down('form').loadRecord(record);
            view.down('button[name=btnCrear]').hide();
            view.down('button[name=btnEditar]').show();
            view.show();
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover al producto: <span style=color:red; font-weidth: bold>' + producto + '<span>?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }, this);
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProductosStore().proxy.extraParams.no_producto = text.getValue();
            this.getProductosStore().loadPage(1);
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProductosStore().proxy.extraParams.no_producto = '';
            this.getProductosStore().loadPage(1);
        }
    },
    addProducto: function(co_producto, no_producto, ca_producto, co_unidad, no_unidad, va_compra){
        var store = this.getWinProductosNuevo().down('grid[name=gridReceta]').getStore();
        var total = cantidad * costo_s;
        var pedido = Ext.create('rewsoft.store.Receta', {
            co_producto: co_producto,
            no_producto: no_producto,
            va_compra: va_compra,
            ca_producto: ca_producto,
            co_unidad: co_unidad,
            no_unidad: no_unidad
        });
        var count = store.getCount();
        store.insert(count, pedido);
    }
});