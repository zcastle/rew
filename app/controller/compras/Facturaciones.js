
Ext.define('rewsoft.controller.compras.Facturaciones', {
    extend: 'Ext.app.Controller',
    views: [
    'compras.PnlFacturacion',
    'compras.WinCantidad'
    ],
    refs: [{
        ref: 'PnlFacturacion',
        selector: 'pnlcomprasfacturacion'
    }],
    stores: [
        'Productos',
        'Clientes',
        'Monedas'
    ],
    msgBox: null,
    init: function() {
        this.control({
            'pnlcomprasfacturacion': {
                render: this.onRenderedPnlFacturacion
            },
            'pnlcomprasfacturacion textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar
            },
            'pnlcomprasfacturacion combo[name=cboProveedores]': {
                beforerender: this.onBeforeRenderCboProveedores,
                select: this.onSelectCboProveedores
            },
            'pnlcomprasfacturacion combo[name=cboMonedas]': {
                beforerender: this.onBeforeRenderCboMonedas
            },
            'pnlcomprasfacturacion grid[name=gridPedido]': {
                render: this.onRenderedGridPedido,
                itemdblclick: this.onItemDblClickGridPedido,
                cellclick: this.onCellClickGridPedido
            },
            'pnlcomprasfacturacion grid[name=gridProductos]': {
                render: this.onRenderedGridProductos,
                itemdblclick: this.onItemDblClickGridProductos
            },
            'pnlcomprasfacturacion button[name=btnLimpiarTodo]': {
                click: this.onClickBtnLimpiarTodo
            },
            'pnlcomprasfacturacion button[name=btnVenta]': {
                click: this.onClickBtnVenta
            },
            'wincomprascantidad': {
                render: this.onRenderedWinCantidad
            },
            'wincomprascantidad button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            }
        });
    },
    onRenderedPnlFacturacion: function() {
        this.msgBox = Ext.create('Ext.window.MessageBox',{
            buttonText: {
                yes: 'S&iacute;',
                no: 'No'
            }
        });
        this.getProductosStore().pageSize = 50;
        this.getProductosStore().load();
        this.getClientesStore().load();
    },
    onRenderedWinCantidad: function(win){
        //this.getLotesStore().load();
        //this.getHistorialCompraProductosStore().load();
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
    onRenderedGridPedido: function(grid){
    },
    onKeyUpTxtBuscar: function(text) {
        if(text.getValue().length > 2) {
            this.getProductosStore().proxy.extraParams.no_producto = text.getValue();
        }else if(text.getValue().length == 0){
            this.getProductosStore().proxy.extraParams.no_producto = '';
        }
        this.getProductosStore().loadPage(1);
    },
    onBeforeRenderCboProveedores: function(combo) {
        //combo.setValue('VARIOS');
    },
    onSelectCboProveedores: function(combo, record) {
        combo.up().down('label[name=txtRuc]').setText('RUC: ' + record[0].get('ruc'));
        combo.up().up().down('textfield[name=txtDireccion]').setValue(record[0].get('direccion'));
    },
    onBeforeRenderCboMonedas: function(combo) {
        combo.setValue('Soles');
    },
    onItemDblClickGridPedido: function(gridPedido, record){
        var WinCantidad = Ext.widget('wincomprascantidad');
        WinCantidad.down('hidden').setValue(record.get('codigo'));
        WinCantidad.down('label[name=lblProducto]').setText(record.get('producto'));
        WinCantidad.down('numberfield').setValue(record.get('cantidad'));
        WinCantidad.down('textfield[name=txtPrecio]').setValue(this.formatNumber4(record.get('unitario')));
        WinCantidad.show();
    },
    onItemDblClickGridProductos: function(grid, record){
        var WinCantidad = Ext.widget('wincomprascantidad');
        var gridPedido = this.getPnlFacturacion().down('grid[name=gridPedido]');
        WinCantidad.down('hidden').setValue(record.get('codigo'));
        WinCantidad.down('label[name=lblProducto]').setText(record.get('producto'));
        var pos = this.getPosicion(gridPedido, record.get('codigo'))
        if(pos > -1){
            WinCantidad.down('numberfield').setValue(gridPedido.getStore().data.items[pos].get('cantidad'));
            WinCantidad.down('textfield[name=txtPrecio]').setValue(gridPedido.getStore().data.items[pos].get('unitario'));
        }else{
            WinCantidad.down('textfield[name=txtPrecio]').setValue(this.formatNumber4(record.get('unitario')));
        }
        WinCantidad.show();
    },
    onCellClickGridPedido: function(grid, nada, columnIndex, record){
        if(columnIndex == 6) {
            var producto = record.get('producto');
            this.msgBox.confirm('Confirmacion', 'Estas seguro de querer remover el producto: ' + producto + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    this.setMontoTotal(grid);
                }
            }, this);
        }
    },
    getPosicion: function(grid, codigo){
        return grid.getStore().find("codigo", codigo);
    },
    onClickBtnAceptar: function(button){
        var cantidad = button.up('window').down('numberfield');
        var codigo = button.up('window').down('hidden');
        if(cantidad.value != '0' && cantidad.value != null) {
            var gridPedido = this.getPnlFacturacion().down('grid[name=gridPedido]');
            var pos = this.getPosicion(gridPedido, codigo.getValue())
            if(pos > -1){
                var unitario = gridPedido.getStore().data.items[pos].get('unitario');
                var total = unitario * cantidad.value;
                //total = total + '';
                this.editProducto(gridPedido, pos, 'cantidad', cantidad.value)
                this.editProducto(gridPedido, pos, 'total', total)
                this.setMontoTotal(gridPedido);
            }else{
                this.addProducto(cantidad.value)
            }
            button.up('window').close();
        }
    },
    addProducto: function(cantidad){
        var gridPedido = this.getPnlFacturacion().down('grid[name=gridPedido]');
        var gridProducto = this.getPnlFacturacion().down('grid[name=gridProductos]');
        var storePedido = gridPedido.getStore();
        var storeProductos = gridProducto.getSelectionModel().selected.items[0].data;
        var total = cantidad * storeProductos.unitario;
        var pedido = Ext.create('rewsoft.store.Pedidos', {
            codigo: storeProductos.codigo,
            producto: storeProductos.producto,
            presentacion: storeProductos.presentacion,
            unitario: storeProductos.unitario,
            cantidad: cantidad,
            total: total
        });
        var count = storePedido.getCount(); // +1
        storePedido.insert(count, pedido);
        this.setMontoTotal(gridPedido);
    },
    editProducto: function(gridPedido, pos, campo, valor){
        gridPedido.getStore().data.items[pos].set(campo, valor);
    },
    setMontoTotal: function(grid){
        Ext.getCmp('totalProductosCompra').setText('Productos: ' + grid.getStore().getCount());
        
        var totalS = 0.00;
        var totalD = 0.00;
        var neto = 0.00;
        var igv = 0.00;
        
        grid.store.each(function(record) {
            totalS = totalS + record.data['total'];
        });
        
        neto = Ext.util.Format.number(totalS / rewsoft.AppGlobals.VA_IGV, "0,000.00");
        igv = Ext.util.Format.number(neto * rewsoft.AppGlobals.VA_IGV_2, "0,000.00");
        totalS = Ext.util.Format.number(totalS, "0,000.00");
        totalD = Ext.util.Format.number(totalS / rewsoft.AppGlobals.TIPO_CAMBIO_VENTA, "0,000.00");
        
        neto = neto + '';
        igv = igv + '';
        totalS = totalS + '';
        totalD = totalD + '';
        
        Ext.getCmp('lblNetoCompra').setText(neto);
        Ext.getCmp('lblIgvCompra').setText(igv);
        Ext.getCmp('lblTotal').setText(totalS);
        //Ext.getCmp('lblTotalDCompra').setText(totalD);
    },
    onClickBtnLimpiarTodo: function(button){
        this.msgBox.confirm('Confirmacion', 'Estas seguro de querer remover todos los producto?', function(btn){
            if(btn=='yes'){
                button.up('grid').getStore().removeAll();
                this.setMontoTotal(button.up('grid'));
            }
        }, this);
    },
    onClickBtnVenta: function(button){
        var grid = button.up('grid');
        if(grid.getStore().getCount() == 0){
            return;
        }
        this.msgBox.confirm('Confirmacion', 'Esta seguro de procesar su pedido?', function(btn){
            if(btn=='yes'){
                var detalle = new Array();
                var total = 0;
                grid.store.each(function(record) {
                    var registro = [{
                        codigo: record.data['codigo'],
                        cantidad: record.data['cantidad']
                    }];
                    detalle.push(registro);
                    total = total + record.data['total'];
                });
                Ext.Ajax.request({
                    url: 'URL.php',
                    params: {
                        detalle: Ext.encode(detalle),
                        cliente: null,
                        total: Ext.util.Format.number(total, "0,000.00")
                    },
                    scope: this,
                    success: function(response){
                        
                    }
                });
            }
        }, this);
    },
    formatNumber4: function(value){
        return Ext.util.Format.number(value, rewsoft.AppGlobals.FORMA_NUMBER);
    }
});