Ext.define('rewsoft.controller.almacen.requerimiento.PnlRequerimiento', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.requerimiento.PnlRequerimiento',
    'almacen.requerimiento.WinCantidad'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlrequerimiento'
    },{
        ref: 'WinAlmacenRequerimiento',
        selector: 'winalmacenrequerimiento'
    }],
    stores: [
    'Productos',
    'Lotes',
    'UnidadesVentaByProducto',
    'IngresoProductos'
    ],
    init: function() {
        this.control({
            'pnlrequerimiento': {
                render: this.onRenderPnlRequerimiento
            },
            'pnlrequerimiento grid[name=gridPedido]': {
                itemdblclick: this.onItemDblClickGridPedido,
                cellclick: this.onCellClickGridPedido
            },
            'pnlrequerimiento grid[name=gridProductos]': {
                render: this.onRenderedGridProductos,
                itemdblclick: this.onItemDblClickGridProductos
            },
            'pnlrequerimiento button[name=btnProcesar]': {
                click: this.onClickBtnProcesar
            },
            'pnlrequerimiento textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar,
                keypress: this.onKeyPressTxtBuscar
            },
            'winalmacenrequerimiento': {
                afterrender: this.onAfterRenderWinCantidad
            },
            'winalmacenrequerimiento button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            }
        });
    },
    onRenderPnlRequerimiento: function() {
        this.getSecuencia();
        this.getProductosStore().load();
    },
    onRenderedGridProductos: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridProductos(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridProductos: function(grid, record){
        var WinCantidad = Ext.widget('winalmacenrequerimiento');
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        WinCantidad.down('hiddenfield[name=co_producto]').setValue(record.get('co_producto'));
        WinCantidad.down('label[name=no_producto]').setText(record.get('co_producto')+'-'+record.get('no_producto'));
        this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().load();
        var pos = this.getPosicion(gridPedido, record.get('co_producto'))
        if(pos > -1){
            WinCantidad.down('numberfield').setValue(gridPedido.getStore().data.items[pos].get('ca_producto'));
            //WinCantidad.down('textfield[name=no_lote]').setValue(gridPedido.getStore().data.items[pos].get('no_lote'));
            //WinCantidad.down('textfield[name=fe_vencimiento]').setValue(gridPedido.getStore().data.items[pos].get('fe_vencimiento'));
        }
        WinCantidad.show();
    },
    onAfterRenderWinCantidad: function(win){
        this.getUnidadesVentaByProductoStore().proxy.extraParams.co_producto = win.down('hiddenfield[name=co_producto]').getValue();
        this.getUnidadesVentaByProductoStore().load({
            callback: function(record, operation, success) {
                win.down('combobox[name=co_unidad]').setValue(record[0].data.id);
            },
            scope: this
        });
    },
    onClickBtnAceptar: function(button){
        var form = this.getWinAlmacenRequerimiento().down('form');
        if(form.getForm().isValid()){
            var co_producto = button.up('window').down('hiddenfield[name=co_producto]').getValue();
            var ca_producto = button.up('window').down('numberfield').getValue();
            var no_lote = '';
            var fe_vencimiento = '';
            var unidadventa = button.up('window').down('combobox[name=co_unidad]');
            var co_unidad = unidadventa.getValue();
            var no_unidad = unidadventa.getRawValue();
            var co_almacen = '';
            var no_almacen = '';
            var gridPedido = this.getMainView().down('grid[name=gridPedido]');
            var pos = this.getPosicion(gridPedido, co_producto);
            if(pos > -1){
                this.editProducto(gridPedido, pos, 'ca_producto', ca_producto)
                this.editProducto(gridPedido, pos, 'no_lote', no_lote)
                this.editProducto(gridPedido, pos, 'fe_vencimiento', fe_vencimiento)
                this.editProducto(gridPedido, pos, 'co_unidad', co_unidad)
                this.editProducto(gridPedido, pos, 'no_unidad', no_unidad)
                this.editProducto(gridPedido, pos, 'co_almacen', co_almacen)
                this.editProducto(gridPedido, pos, 'no_almacen', no_almacen)
                this.setTotalProductos(gridPedido);
            }else{
                this.addProducto(ca_producto, no_lote, fe_vencimiento, co_unidad, no_unidad, co_almacen, no_almacen)
            }
            button.up('window').close();
        }
    },
    addProducto: function(ca_producto, no_lote, fe_vencimiento, co_unidad, no_unidad, co_almacen, no_almacen){
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        var gridProducto = this.getMainView().down('grid[name=gridProductos]');
        var storePedido = gridPedido.getStore();
        var storeProductos = gridProducto.getSelectionModel().selected.items[0].data;
        var pedido = Ext.create('rewsoft.store.IngresoProductos', {
            co_producto: storeProductos.co_producto,
            no_producto: storeProductos.no_producto,
            no_lote: no_lote,
            fe_vencimiento: fe_vencimiento,
            ca_producto: ca_producto,
            co_unidad: co_unidad,
            no_unidad: no_unidad,
            co_almacen: co_almacen,
            no_almacen: no_almacen
        });
        var count = storePedido.getCount();
        storePedido.insert(count, pedido);
        this.setTotalProductos(gridPedido);
    },
    editProducto: function(gridPedido, pos, campo, valor){
        gridPedido.getStore().data.items[pos].set(campo, valor);
    },
    getPosicion: function(grid, codigo){
        return grid.getStore().find("co_producto", codigo);
    },
    setTotalProductos: function(grid){
        this.getMainView().down('label[name=totalProductos]').setText('Productos: ' + grid.getStore().getCount());
    },
    onItemDblClickGridPedido: function(gridPedido, record){
        var WinCantidad = Ext.widget('winalmacenrequerimiento');
        WinCantidad.down('form').loadRecord(record);
        this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().load();
        WinCantidad.show();
    },
    onCellClickGridPedido: function(grid, nada, columnIndex, record){
        //grid, td, cellIndex, record, tr, rowIndex, e, eOpts
        var columna = grid.up('grid').columns[columnIndex].name;
        var producto = record.get('no_producto');
        if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover el producto: ' + producto + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    //grid.getStore().sync();
                }
            }, this);
        }
    },
    onClickBtnProcesar: function(button){
        var grid = button.up('grid');
        if(grid.getStore().getCount() == 0){
            return;
        }
        this.onClickBtnProcesarAjuste(grid, button);
    },
    onClickBtnProcesarAjuste: function(grid, button){
        var btnLimpiarTodo = button.up().down('button[name=btnLimpiarTodo]');
        var numeroDocumento = button.up('panel').up('panel').down('textfield[name=txtNuDocumento]').getValue();
        var observacion = button.up('panel').up('panel').down('textfield[name=txtObservacion]').getValue();

        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar el Requerimiento No.: '+numeroDocumento+'?', function(btn){
            if(btn=='yes'){
                var detalle = new Array();
                grid.store.each(function(record) {
                    var registro = {
                        co_producto: record.data['co_producto'],
                        ca_producto: record.data['ca_producto'],
                        co_unidad: record.data['co_unidad']
                    };
                    detalle.push(registro);
                });
                Ext.Ajax.request({
                    url: 'data/procesarRequerimiento.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        tipoComprobante: 'OR',
                        numeroDocumento: numeroDocumento,
                        coUsuario: rewsoft.AppGlobals.CO_USUARIO,
                        observacion: observacion,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.setSecuencial();
                            this.onClickBtnLimpiarTodoYes(btnLimpiarTodo);
                        } else {
                            Ext.Msg.alert('Error!!!', 'Error en el proceso: ' + obj.msg);
                        }
                    }
                });
            }
        }, this);
    },
    onClickBtnLimpiarTodo: function(button){
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover todos los producto?', function(btn){
            if(btn=='yes'){
                this.onClickBtnLimpiarTodoYes(button);
            }
        }, this);
    },
    onClickBtnLimpiarTodoYes: function(button){
        button.up('panel').up('panel').down('textfield[name=txtObservacion]').setValue('');
        button.up('grid').getStore().removeAll();
        this.getProductosStore().loadPage(1);
        this.setTotalProductos(button.up('grid'));
        this.getNumeroDocumento();
    },
    getNumeroDocumento: function(){

    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProductosStore().proxy.extraParams.no_producto = '';
            this.getProductosStore().load();
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProductosStore().proxy.extraParams.no_producto = text.getValue();
            this.getProductosStore().load();
        }
    },
    getSecuencia: function(){
        Ext.Ajax.request({
            url: 'data/readNumeroSecuencia.php',
            params: {
                cia: rewsoft.AppGlobals.CIA,
                tipoDocumento: 'OR',
                nuSerie: '1'
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(obj.success) {
                    this.getMainView().down('textfield[name=txtNuDocumento]').setValue(obj.secuencia);
                } else {
                    Ext.Msg.alert('Error!!!', 'Error al optener la secuencia del documento');
                }
            }
        });
    },
    setSecuencial: function(){
        Ext.Ajax.request({
            url: 'data/setNumeroSecuencia.php',
            params: {
                cia: rewsoft.AppGlobals.CIA,
                tipoDocumento: 'OR',
                nu_serie: '1',
                nu_secuencia: null
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                this.getSecuencia();
                if(!obj.success) {
                    Ext.Msg.alert('Error!!!', 'Error al cambiar la secuencia del documento');
                }
            }
        });
    }
});