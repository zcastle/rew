Ext.define('rewsoft.controller.compras.ocompra.PnlOrdenCompra', {
    extend: 'Ext.app.Controller',
    views: [
    'compras.ocompra.PnlOrdenCompra',
    'compras.ocompra.WinCantidad',
    'compras.ocompra.WinRequerimientos',
    'compras.ocompra.WinBuscarProveedor'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlordencompra'
    },{
        ref: 'WinCantidadOrdenCompra',
        selector: 'wincantidadordencompra'
    },{
        ref: 'WinRequerimientos',
        selector: 'winrequerimientos'
    },{
        ref: 'WinBuscarProveedorOcompra',
        selector: 'winbuscarproveedorocompra'
    }],
    stores: [
    'Productos',
    'Lotes',
    'UnidadesVentaByProducto',
    'IngresoProductos',
    'RequerimientoC',
    'Requerimiento',
    'Proveedores'
    ],
    init: function() {
        this.control({
            'pnlordencompra': {
                render: this.onRenderPnlRequerimiento
            },
            'pnlordencompra grid[name=gridPedido]': {
                itemdblclick: this.onItemDblClickGridPedido,
                cellclick: this.onCellClickGridPedido
            },
            'pnlordencompra grid[name=gridProductos]': {
                render: this.onRenderedGridProductos,
                itemdblclick: this.onItemDblClickGridProductos
            },
            'pnlordencompra button[name=btnProcesar]': {
                click: this.onClickBtnProcesar
            },
            'pnlordencompra textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar,
                keypress: this.onKeyPressTxtBuscar
            },
            'pnlordencompra button[name=btnBuscarRequerimiento]': {
                click: this.onClickBtnBuscarRequerimiento
            },
            'pnlordencompra button[name=btnLimpiarTodo]': {
                click: this.onClickBtnLimpiarTodo
            },
            'wincantidadordencompra': {
                afterrender: this.onAfterRenderWinCantidad
            },
            'wincantidadordencompra button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            },
            'wincantidadordencompra textfield[name=no_proveedor]': {
                keypress: this.onKeyPressNoProveedor
            },
            'wincantidadordencompra numberfield[name=ca_producto]' : {
                keypress: this.onKeypressTxtCantidad
            },
            'wincantidadordencompra numberfield[name=va_compra]' : {
                keypress: this.onKeypressTxtPrecio
            },
            'wincantidadordencompra numberfield[name=va_compra_total]' : {
                keypress: this.onKeypressTxtTotal
            },
            'winbuscarproveedorocompra textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscarProveedor,
                keypress: this.onKeyPressTxtBuscarProveedor
            },
            'winbuscarproveedorocompra grid': {
                render: this.onRenderedGridProveedor,
                itemdblclick: this.onItemDblClickGridProveedor
            },
            'winrequerimientos': {
                render: this.onRenderedWinRequerimientos
            },
            'winrequerimientos grid[name=gridRequerimientos]': {
                render: this.onRenderedGridRequerimientos,
                itemdblclick: this.onItemDblClickGridRequerimientos
            }
        });
    },
    onRenderPnlRequerimiento: function() {
        this.getSecuencia();
        this.getProductosStore().load();
    },
    onRenderedWinRequerimientos: function(){
        this.getRequerimientoCStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getRequerimientoCStore().load();
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
        var WinCantidad = Ext.widget('wincantidadordencompra');
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        WinCantidad.down('hiddenfield[name=co_producto]').setValue(record.get('co_producto'));
        WinCantidad.down('hiddenfield[name=no_producto]').setValue(record.get('no_producto'));
        WinCantidad.down('label[name=no_producto2]').setText(record.get('co_producto')+'-'+record.get('no_producto'));
        WinCantidad.down('numberfield[name=va_compra]').setValue(record.get('va_compra'));
        WinCantidad.down('numberfield[name=va_compra_total]').setValue(record.get('va_compra'));
        /*this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().load();*/
        var pos = this.getPosicion(gridPedido, record.get('co_producto'))
        if(pos > -1){
            WinCantidad.down('numberfield[name=ca_producto]').setValue(gridPedido.getStore().data.items[pos].get('ca_producto'));
            WinCantidad.down('numberfield[name=va_compra]').setValue(gridPedido.getStore().data.items[pos].get('va_compra'));
            WinCantidad.down('numberfield[name=va_compra_total]').setValue(gridPedido.getStore().data.items[pos].get('ca_producto')*gridPedido.getStore().data.items[pos].get('va_compra'));
            //console.log(gridPedido.getStore().data.items[pos].get('va_compra'));
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
        var form = this.getWinCantidadOrdenCompra().down('form');
        if(form.getForm().isValid()){
            var co_producto = button.up('window').down('hiddenfield[name=co_producto]').getValue();
            var no_producto = button.up('window').down('hiddenfield[name=no_producto]').getValue();
            var ca_producto = button.up('window').down('numberfield[name=ca_producto]').getValue();
            var va_producto = button.up('window').down('numberfield[name=va_compra]').getValue();
            var va_compra_total = button.up('window').down('numberfield[name=va_compra_total]').getValue();
            var no_lote = '';
            var fe_vencimiento = '';
            var unidadventa = button.up('window').down('combobox[name=co_unidad]');
            var co_unidad = unidadventa.getValue();
            var no_unidad = unidadventa.getRawValue();
            var co_almacen = '';
            var no_almacen = '';
            var gridPedido = this.getMainView().down('grid[name=gridPedido]');

            var no_proveedor = button.up('window').down('textfield[name=no_proveedor]').getValue();
            var co_proveedor = button.up('window').down('displayfield[name=co_proveedor]').getValue();

            var pos = this.getPosicion(gridPedido, co_producto);
            if(pos > -1){
                this.editProducto(gridPedido, pos, 'ca_producto', ca_producto)
                this.editProducto(gridPedido, pos, 'va_compra', va_producto)
                this.editProducto(gridPedido, pos, 'va_compra_total', va_compra_total)
                //this.editProducto(gridPedido, pos, 'no_lote', '')
                //this.editProducto(gridPedido, pos, 'fe_vencimiento', fe_vencimiento)
                this.editProducto(gridPedido, pos, 'co_unidad', co_unidad)
                this.editProducto(gridPedido, pos, 'no_unidad', no_unidad)
                this.editProducto(gridPedido, pos, 'co_almacen', co_almacen)

                this.editProducto(gridPedido, pos, 'co_proveedor', co_proveedor)
                this.editProducto(gridPedido, pos, 'no_proveedor', no_proveedor)
                //this.editProducto(gridPedido, pos, 'no_almacen', no_almacen)
                //this.setTotalProductos(gridPedido);
            }else{
                this.addProducto(co_producto, no_producto, ca_producto, no_lote, fe_vencimiento, co_unidad, no_unidad, co_almacen, no_almacen, co_proveedor, no_proveedor, va_producto, va_compra_total)
            }
            button.up('window').close();
        }
    },
    addProducto: function(co_producto, no_producto, ca_producto, no_lote, fe_vencimiento, co_unidad, no_unidad, co_almacen, no_almacen, co_proveedor, no_proveedor, va_producto, va_compra_total){
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        var gridProducto = this.getMainView().down('grid[name=gridProductos]');
        var storePedido = gridPedido.getStore();
        /*try{
            var storeProductos = gridProducto.getSelectionModel().selected.items[0].data;
        }catch(e){
        }*/
        
        var pedido = Ext.create('rewsoft.store.IngresoProductos', {
            co_producto: co_producto,
            no_producto: no_producto,
            no_lote: no_lote,
            fe_vencimiento: fe_vencimiento,
            ca_producto: ca_producto,
            co_unidad: co_unidad,
            no_unidad: no_unidad,
            va_compra: va_producto,
            va_compra_total: va_compra_total,
            co_almacen: co_almacen,
            no_almacen: no_almacen,
            co_proveedor: co_proveedor,
            no_proveedor: no_proveedor
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
        var WinCantidad = Ext.widget('wincantidadordencompra');
        WinCantidad.down('form').loadRecord(record);
        /*this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().load();*/
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
        this.onClickBtnProcesarOcompra(grid, button);
    },
    onClickBtnProcesarOcompra: function(grid, button){
        var btnLimpiarTodo = this.getMainView().down('button[name=btnLimpiarTodo]');
        var numeroDocumento = this.getMainView().down('textfield[name=txtNuDocumento]').getValue();
        var numeroRequerimiento = this.getMainView().down('textfield[name=txtBuscarRequerimiento]').getValue();

        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la Orden de Compra No.: '+numeroDocumento+'?', function(btn){
            if(btn=='yes'){
                Ext.getBody().mask('Procesando Orden de Compra No.: '+numeroDocumento+' ...');
                var detalle = new Array();
                grid.store.each(function(record) {
                    var registro = {
                        co_producto: record.data['co_producto'],
                        ca_producto: record.data['ca_producto'],
                        va_producto: record.data['va_compra'],
                        co_unidad: record.data['co_unidad'],
                        co_proveedor: record.data['co_proveedor']
                    };
                    detalle.push(registro);
                });
                Ext.Ajax.request({
                    url: 'data/procesarOrdenCompra.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        tipoComprobante: 'OC',
                        numeroDocumento: numeroDocumento,
                        numeroRequerimiento: numeroRequerimiento,
                        coUsuario: rewsoft.AppGlobals.CO_USUARIO,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.setSecuencial();
                            this.onClickBtnLimpiarTodoYes(btnLimpiarTodo);
                            Ext.Msg.confirm('Impresion de Orden de Compra', 'Desea imprimir la <span style=color:red; font-weidth: bold>Orden de Compra No.: '+numeroDocumento+'</span>?', function(btn){
                                if(btn=='yes'){
                                    window.open("data/reportes/ocompra.php?nu_documento="+numeroDocumento, '_blank');
                                }
                            });
                            Ext.getBody().unmask();
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
        button.up('grid').getStore().removeAll();
        this.getProductosStore().loadPage(1);
        this.setTotalProductos(button.up('grid'));
        this.getMainView().down('textfield[name=txtBuscarRequerimiento]').setValue('');
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
                tipoDocumento: 'OC',
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
                tipoDocumento: 'OC',
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
    },
    onClickBtnBuscarRequerimiento: function(){
        Ext.widget('winrequerimientos').show();
    },
    onRenderedGridRequerimientos: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridRequerimientos(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridRequerimientos: function(grid, record){
        var nu_requerimiento = record.get('nu_requerimiento');
        this.getRequerimientoStore().proxy.extraParams.nu_requerimiento = nu_requerimiento;
        this.getRequerimientoStore().load({
            callback: function(record, operation, success) {
                this.getMainView().down('grid[name=gridPedido]').getStore().removeAll();
                Ext.Array.forEach(record, function(item, index, allItems){
                    this.addProducto(item.get('co_producto'), item.get('no_producto'), item.get('ca_producto'), '', '', '1', 'UNI', '', '', '', '', 0, 0);
                }, this);
                this.getMainView().down('textfield[name=txtBuscarRequerimiento]').setValue(nu_requerimiento);
                this.getWinRequerimientos().close();
            },
            scope: this
        })
    },
    onKeyPressTxtBuscarProveedor: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
            this.getProveedoresStore().proxy.extraParams.no_proveedor = text.getValue();
            this.getProveedoresStore().load();
        }
    },
    onKeyUpTxtBuscarProveedor: function(text, key){
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
            this.getProveedoresStore().proxy.extraParams.no_proveedor = '';
            this.getProveedoresStore().load();
        }
    },
    onKeyPressNoProveedor: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProveedoresStore().load();
            Ext.widget('winbuscarproveedorocompra').show();
        }
    },
    onRenderedGridProveedor: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridProveedor(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridProveedor: function(grid, record){
        this.getWinCantidadOrdenCompra().down('textfield[name=no_proveedor]').setValue(record.get('no_razon_social'));
        this.getWinCantidadOrdenCompra().down('displayfield[name=co_proveedor]').setValue(record.get('nu_ruc'));
        this.getWinBuscarProveedorOcompra().close();
    },
    onKeypressTxtCantidad: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtCantidad = this.getWinCantidadOrdenCompra().down('numberfield[name=ca_producto]')
            var txtPrecio = this.getWinCantidadOrdenCompra().down('numberfield[name=va_compra]')
            var txtTotal = this.getWinCantidadOrdenCompra().down('numberfield[name=va_compra_total]')
            txtTotal.setValue(txtCantidad.getValue() * txtPrecio.getValue())
            txtPrecio.focus();
        }
    },
    onKeypressTxtPrecio: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtCantidad = this.getWinCantidadOrdenCompra().down('numberfield[name=ca_producto]')
            var txtPrecio = this.getWinCantidadOrdenCompra().down('numberfield[name=va_compra]')
            var txtTotal = this.getWinCantidadOrdenCompra().down('numberfield[name=va_compra_total]')
            txtTotal.setValue(txtCantidad.getValue() * txtPrecio.getValue())
            txtTotal.focus();
        }
    },
    onKeypressTxtTotal: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtCantidad = this.getWinCantidadOrdenCompra().down('numberfield[name=ca_producto]')
            var txtPrecio = this.getWinCantidadOrdenCompra().down('numberfield[name=va_compra]')
            var txtTotal = this.getWinCantidadOrdenCompra().down('numberfield[name=va_compra_total]')
            var btnAceptar = this.getWinCantidadOrdenCompra().down('button[name=btnAceptar]')
            txtPrecio.setValue(txtTotal.getValue() / txtCantidad.getValue())
            btnAceptar.focus()
        }
    }
});