Ext.define('rewsoft.controller.almacen.abastecimiento.PnlOrdenAbastecimientoCrear', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.abastecimiento.PnlOrdenAbastecimientoCrear',
    'almacen.abastecimiento.WinCantidad'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlordenabastecimientocrear'
    }],
    stores: [
    'Productos',
    'Pedidos'
    ],
    nu_serie: null,
    nu_secuencia: null,
    init: function() {
        this.control({
            'pnlordenabastecimientocrear': {
                render: this.onRenderedPnlFacturacion
            },
            'pnlordenabastecimientocrear textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar,
                keypress: this.onKeyPressTxtBuscar
            },
            'pnlordenabastecimientocrear grid[name=gridPedido]': {
                itemdblclick: this.onItemDblClickGridPedido,
                cellclick: this.onCellClickGridPedido
            },
            'pnlordenabastecimientocrear grid[name=gridProductos]': {
                render: this.onRenderedGridProductos,
                itemdblclick: this.onItemDblClickGridProductos
            },
            'pnlordenabastecimientocrear button[name=btnLimpiarTodo]': {
                click: this.onClickBtnLimpiarTodo
            },
            'pnlordenabastecimientocrear button[name=btnProcesar]': {
                click: this.onClickBtnProcesar
            },
            'winabastecimientocantidad button[name=btnAceptar]':{
                click: this.onClickBtnAceptar
            }
        })
    },
    onRenderedPnlFacturacion: function() {
        this.getPedidosStore().removeAll()
        this.getProductosStore().pageSize = 50;
        this.getProductosStore().proxy.extraParams.no_producto = '';
        this.getProductosStore().proxy.extraParams.co_grupo = '';
        this.getProductosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getProductosStore().load();
        this.getSecuencia('OA');
    },
    onRenderedGridProductos: function(grid){        
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    if(record){
                        this.onItemDblClickGridProductos(grd, record)
                    }
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProductosStore().proxy.extraParams.no_producto = '';
            this.getProductosStore().loadPage(1);
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProductosStore().proxy.extraParams.no_producto = text.getValue();
            this.getProductosStore().loadPage(1);
        }
    },
    onItemDblClickGridPedido: function(gridPedido, record){
        this.onItemDblClickGridProductos(gridPedido, record);
    },
    onItemDblClickGridProductos: function(grid, record){
        var view = Ext.widget('winabastecimientocantidad');
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        view.down('hidden').setValue(record.get('co_producto'));
        view.down('label[name=no_producto]').setText(record.get('no_producto'));
        var pos = this.getPosicion(gridPedido, record.get('co_producto'))
        if(pos > -1){
            view.down('numberfield').setValue(gridPedido.getStore().data.items[pos].get('cantidad'));
        }
        view.show();
    },
    onCellClickGridPedido: function(grid, nada, columnIndex, record){
        if(columnIndex == 8) {
            var producto = record.get('no_producto');
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover el producto: ' + producto + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    this.setTotalItems(grid);
                }
            }, this);
        }
    },
    getPosicion: function(grid, codigo){
        return grid.getStore().find("co_producto", codigo);
    },
    validar: function(button){
        var rpta = true;
        var viewWinCantidad = button.up('window');
        var cantidad = viewWinCantidad.down('textfield[name=txtCantidad]');
        if(cantidad.value == null || cantidad.value < 1){
            Ext.Msg.alert('Validacion', 'Ingrese una cantidad valida');
            rpta = false;
        }
        return rpta;
    },
    editProducto: function(gridPedido, pos, campo, valor){
        gridPedido.getStore().data.items[pos].set(campo, valor);
    },
    setTotalItems: function(grid){
        this.getMainView().down('label[name=totalProductos]').setText('Productos: ' + grid.getStore().getCount());
    },
    onClickBtnLimpiarTodo: function(){
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover todos los producto?', function(btn){
            if(btn=='yes'){
                this.onClickBtnLimpiarTodoYes();
            }
        }, this);
    },
    onClickBtnLimpiarTodoYes: function(){
        this.getPedidosStore().removeAll();
        this.setTotalItems(this.getMainView().down('grid[name=gridPedido]'));
    },
    onClickBtnProcesar: function(button){
        var grid = this.getMainView().down('grid[name=gridPedido]');
        if(grid.getStore().getCount() > 0){
            this.onClickBtnProcesarOrdenAbastecimiento(grid, button);
        }
    },
    onClickBtnProcesarOrdenAbastecimiento: function(grid, button){
        var numeroDocumento = this.getMainView().down('label[name=lblNumeroDocumento]').text;
        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la Orden de Abastecimiento No.: '+numeroDocumento+' ?', function(btn){
            if(btn=='yes'){
                Ext.getBody().mask('Procesando Orden de Abastecimiento No.: '+numeroDocumento+' ...');
                var detalle = new Array();
                grid.store.each(function(record) {
                    var registro = {
                        co_producto: record.data['co_producto'],
                        ca_producto: record.data['cantidad'],
                        unidad: record.data['unidad']
                    };
                    detalle.push(registro);
                });
                Ext.Ajax.request({
                    url: 'data/procesarOrdenAbastecimiento.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        numeroDocumento: numeroDocumento,
                        co_usuario: rewsoft.AppGlobals.CO_USUARIO,
                        observacion: null,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.setSecuencial('OA');
                            this.onClickBtnLimpiarTodoYes();
                            Ext.getBody().unmask();
                        } else {
                            Ext.Msg.alert('Error!!!', 'Error en el proceso: ' + obj.msg);
                        }
                    },
                    failure: function(response, dos, tres){
                        Ext.getBody().unmask();
                    }
                });
            }
        }, this);
    },
    formatNumber4: function(value){
        return Ext.util.Format.number(value, rewsoft.AppGlobals.FORMA_NUMBER);
    },
    formatNumber2: function(value){
        return Ext.util.Format.number(value, rewsoft.AppGlobals.FORMA_NUMBER);
    },
    getSecuencia: function(coTipoDocumento){
        Ext.Ajax.request({
            url: 'data/readNumeroSecuencia.php',
            params: {
                cia: rewsoft.AppGlobals.CIA,
                tipoDocumento: coTipoDocumento
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(obj.success) {
                    this.getMainView().down('label[name=lblNumeroDocumento]').setText(obj.secuencia);
                    this.nu_serie = obj.nu_serie;
                    this.nu_secuencia = obj.nu_secuencia;
                } else {
                    Ext.Msg.alert('Error!!!', 'Error al optener la secuencia del documento');
                }
            }
        });
    },
    setSecuencial: function(coTipoDocumento){
        Ext.Ajax.request({
            url: 'data/setNumeroSecuencia.php',
            params: {
                cia: rewsoft.AppGlobals.CIA,
                tipoDocumento: coTipoDocumento,
                nu_serie: this.nu_serie,
                nu_secuencia: null
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(!obj.success) {
                    Ext.Msg.alert('Error!!!', 'Error al cambiar la secuencia del documento');
                } else {
                    this.getSecuencia(coTipoDocumento);
                }
            }
        });
    },
    onClickBtnAceptar: function(button){
        var form = button.up('window').down('form');
        if(form.getForm().isValid()){
            var co_producto = button.up('window').down('hidden[name=co_producto]').getValue();
            var no_producto = button.up('window').down('label[name=no_producto]').text;
            var ca_producto = button.up('window').down('numberfield').getValue();
            var gridPedido = this.getMainView().down('grid[name=gridPedido]');
            var pos = this.getPosicion(gridPedido, co_producto);
            if(pos > -1){
                this.editProducto(gridPedido, pos, 'cantidad', ca_producto);
                this.editProducto(gridPedido, pos, 'unidad', 'UNI')
            }else{
                this.addProducto(co_producto, no_producto, ca_producto, 'UNI')
            }
            this.setTotalItems(gridPedido);
            button.up('window').close();
        }
    },
    addProducto: function(co_producto, no_producto, cantidad, unidad){
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        var storePedido = gridPedido.getStore();
        var pedido = Ext.create('rewsoft.store.Pedidos', {
            co_producto: co_producto,
            no_producto: no_producto,
            cantidad: cantidad,
            unidad: unidad
        });
        var count = storePedido.getCount();
        storePedido.insert(count, pedido);
        this.setTotalItems(gridPedido);
    }
});