Ext.define('rewsoft.controller.ventas.Facturaciones', {
    extend: 'Ext.app.Controller',
    views: [
    'ventas.PnlFacturacion',
    'ventas.WinCantidad',
    'ventas.WinSeries',
    'ventas.WinGuiasRemision',
    'ventas.WinBuscarDocumento'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlventasfacturacion'
    },{
        ref: 'WinNuevoCliente',
        selector: 'winnuevocliente'
    },{
        ref: 'WinVentasCantidad',
        selector: 'winventascantidad'
    },{
        ref: 'WinBuscarDocumento',
        selector: 'winbuscardocumento'
    }],
    stores: [
    'Productos',
    'Pedidos',
    'Lotes',
    'HistorialCompraProductos',
    'DocumentosFacturacion',
    'UnidadesVentaByProducto',
    'Series',
    'ConsultaRuc',
    'FormaPago',
    'GuiaRemision',
    'Clientes',
    'Precio',
    'PrecioCaja',
    'Usuarios',
    'BuscarDocumento'
    ],
    nu_serie: null,
    nu_secuencia: null,
    incluye_igv: true,
    is_edit: false,
    init: function() {
        this.control({
            'pnlventasfacturacion': {
                render: this.onRenderedPnlFacturacion,
                destroy: this.onDestroyPnlFacturacion
            },
            'pnlventasfacturacion textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar,
                keypress: this.onKeyPressTxtBuscar
            },
            'pnlventasfacturacion textfield[name=txtRuc]': {
                keypress: this.onKeyPressTxtRuc
            },
            'pnlventasfacturacion combo[name=cboClientes]': {
                select: this.onSelectCboClientes
            },
            'pnlventasfacturacion combo[name=cboTipoDocumento]': {
                beforerender: this.onBeforeRenderCboTipoDocumentos,
                select: this.onSelectCboTipoDocumentos
            },
            'pnlventasfacturacion combo[name=cboFormaPago]': {
                beforerender: this.onBeforeRenderCboFormaPago,
                select: this.onSelectCboFormaPago
            },
            'pnlventasfacturacion combo[name=cboVendedor]': {
                beforerender: this.onBeforeRenderCboVendedor
            },
            'pnlventasfacturacion grid[name=gridPedido]': {
                render: this.onRenderedGridPedido,
                itemdblclick: this.onItemDblClickGridPedido,
                cellclick: this.onCellClickGridPedido
            },
            'pnlventasfacturacion grid[name=gridProductos]': {
                render: this.onRenderedGridProductos,
                itemdblclick: this.onItemDblClickGridProductos
            },
            'pnlventasfacturacion button[name=btnLimpiarTodo]': {
                click: this.onClickBtnLimpiarTodo
            },
            'pnlventasfacturacion button[name=btnProcesar]': {
                click: this.onClickBtnProcesar
            },
            'pnlventasfacturacion button[name=btnImprimir]': {
                click: this.onClickBtnImprimir
            },
            'pnlventasfacturacion button[name=btnCambiarSerie]': {
                click: this.onClickBtnCambiarSerie
            },
            'pnlventasfacturacion button[name=btnBuscarGuiaRemision]': {
                click: this.onClickBtnBuscarGuiaRemision
            },
            'pnlventasfacturacion button[name=btnNuevoCliente]' : {
                click: this.onClickBtnNuevoCliente
            },
            'pnlventasfacturacion checkboxfield[name=chkMostrarCosto]' : {
                change: this.onChangeChkMostrarCosto
            },
            'pnlventasfacturacion checkboxfield[name=chkMostrarStock]' : {
                change: this.onChangeChkMostrarStock
            },
            'pnlventasfacturacion checkboxfield[name=chkMostrarMarca]' : {
                change: this.onChangeChkMostrarMarca
            },
            'pnlventasfacturacion checkboxfield[name=chkMostrarMontoDolares]' : {
                change: this.onChangeChkMostrarMontoDolares
            },
            'pnlventasfacturacion combobox[name=cboMoneda]': {
                render: this.onRenderCboMoneda,
                select: this.onSelectCboMoneda
            },
            'pnlventasfacturacion button[name=btnIgvIncluido]': {
                toggle: this.onToggleIgvIncluido
            },
            'pnlventasfacturacion button[name=btnImprimirCotizacion]': {
                click: this.onClickBtnImprimirCotizacion
            },
            'pnlventasfacturacion button[name=btnBuscarPasado]': {
                click: this.onClickBtnBuscarPasado
            },
            'pnlventasfacturacion button[name=btnActualizarFecha]': {
                click: this.actualizarFechaCotizacion
            },
            'winventascantidad': {
                render: this.onRenderedWinCantidad,
                afterrender: this.onAfterRenderWinCantidad
            },
            'winventascantidad button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            },
            'winventascantidad grid[name=gridLotes]': {
                itemclick: this.onItemClickGridLotes
            },
            'winventascantidad grid[name=gridPrecios]': {
                itemclick: this.onItemClickGridPrecios
            },
            'winventascantidad combo[name=cboUnidadVenta]': {
                beforerender: this.onBeforeRenderCboUnidadVenta
            },
            'winventascantidad grid[name=gridPrecioCaja]': {
                itemclick: this.onItemClickGridPrecioCaja
            },
            'winventascantidad numberfield[name=txtCantidad]' : {
                keypress: this.onKeypressTxtCantidad
            },
            'winventascantidad numberfield[name=txtPrecio]' : {
                keypress: this.onKeypressTxtPrecio
            },
            'winventascantidad numberfield[name=txtTotal]' : {
                keypress: this.onKeypressTxtTotal
            },
            'winventascantidad grid[name=txtTotal]' : {
                keypress: this.onKeypressTxtTotal
            },
            'winseries grid[name=gridSeries]': {
                cellclick: this.onCellClickGridSeries,
                itemdblclick: this.onItemDblClickGridSeries
            },
            'winguiasremision': {
                render: this.onRenderedWinGuiasRemision
            },
            'winguiasremision grid[name=gridGuiasRemision]': {
                itemdblclick: this.onItemDblClickGridGuiasRemision
            },
            'winbuscardocumento': {
                render: this.onRenderedWinBuscarDocumento
            },
            'winbuscardocumento grid': {
                itemdblclick: this.onItemDblClickGridBuscarDocumento
            }
        });
    },
    onRenderedPnlFacturacion: function() {
        this.getPedidosStore().removeAll()
        this.getProductosStore().pageSize = 50;
        this.getProductosStore().proxy.extraParams.no_producto = '';
        this.getProductosStore().proxy.extraParams.co_grupo = '';
        this.getProductosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getProductosStore().load();
        this.getFormaPagoStore().load();
        this.getUsuariosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getUsuariosStore().load();
        //this.getUsuariosStore().filter('id_rol', '2');
        this.getUsuariosStore().filter(function(r) {
            var value = r.get('id_rol');
            return (value == 1 || value == 2);
        });
        if(rewsoft.AppGlobals.ROL_ACTIVO==rewsoft.AppGlobals.ROL_ADMINISTRADOR){
            this.getMainView().down('button[name=btnCambiarSerie]').show();
            this.getMainView().down('combobox[name=cboVendedor]').enable();
        }else{
            this.getMainView().down('button[name=btnCambiarSerie]').hide();
            this.getMainView().down('combobox[name=cboVendedor]').disable();
        }
        this.incluye_igv = true;
        this.is_edit = false;
    },
    onRenderCboMoneda: function(combo){
        combo.setValue('S');
    },
    onSelectCboMoneda: function(combo){
        if(combo.getValue() == 'S'){
            this.getMainView().down('label[name=label-total]').setText('Total S/.');
        }else {
            this.getMainView().down('label[name=label-total]').setText('Total U$D');
        }
    },
    onRenderedWinCantidad: function(win){
    //this.getHistorialCompraProductosStore().load();
        this.getPrecioStore().proxy.extraParams.co_producto = win.down('hidden[name=txtCodigo]').getValue();
        this.getPrecioStore().load();
        this.getPrecioCajaStore().proxy.extraParams.co_producto = win.down('hidden[name=txtCodigo]').getValue();
        this.getPrecioCajaStore().load();
        if(rewsoft.AppGlobals.ROL_ACTIVO==rewsoft.AppGlobals.ROL_ADMINISTRADOR){
            win.down('textfield[name=txtCosto]').show();
        }else{
            win.down('textfield[name=txtCosto]').hide();
        }
    },
    onRenderedWinGuiasRemision: function(win){
        this.getGuiaRemisionStore().proxy.extraParams.cia = rewsoft.AppGlobals.CIA;
        this.getGuiaRemisionStore().load();
        win.down('grid').getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    if(record){
                        this.onItemDblClickGridGuiasRemision(grd, record)
                    }
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
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
    onRenderedGridPedido: function(grid){
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
    onBeforeRenderCboTipoDocumentos: function(combo) {
        this.getDocumentosFacturacionStore().filter('fl_facturacion', 'S');
        combo.setValue('BV');
        this.onSelectCboTipoDocumentos(combo);
    },
    onBeforeRenderCboFormaPago: function(combo) {
        combo.setValue(rewsoft.AppGlobals.FORMA_PAGO_DEFAULT);
    },
    onBeforeRenderCboUnidadVenta: function(combo){
        combo.setValue('UND');
    },
    onBeforeRenderCboVendedor: function(combo){
        combo.setValue(rewsoft.AppGlobals.CO_USUARIO);
    },
    onSelectCboClientes: function(combo, record) {
        this.getMainView().down('textfield[name=txtRuc]').setValue(record[0].get('ruc'));
        this.getMainView().down('textfield[name=txtDireccion]').setValue(record[0].get('direccion'));
    },
    onItemDblClickGridPedido: function(gridPedido, record){
        this.onItemDblClickGridProductos(gridPedido, record);
    },
    onItemDblClickGridProductos: function(grid, record){
        var viewWinVentasCantidad = Ext.widget('winventascantidad');
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        viewWinVentasCantidad.down('hidden').setValue(record.get('co_producto'));
        this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().proxy.extraParams.co_almacen = '';
        this.getLotesStore().proxy.extraParams.fl_stock = 'S';
        this.getLotesStore().load();
        viewWinVentasCantidad.down('label[name=lblProducto]').setText(record.get('co_producto')+'-'+record.get('no_producto'));
        var pos = this.getPosicion(gridPedido, record.get('co_producto'))
        if(pos > -1){
            viewWinVentasCantidad.down('numberfield').setValue(gridPedido.getStore().data.items[pos].get('cantidad'));
            viewWinVentasCantidad.down('textfield[name=txtPrecio]').setValue(this.formatNumber4(gridPedido.getStore().data.items[pos].get('precio0')));
            viewWinVentasCantidad.down('textfield[name=txtCosto]').setValue(this.formatNumber4(gridPedido.getStore().data.items[pos].get('va_compra')));
            viewWinVentasCantidad.down('textfield[name=txtLote]').setValue(gridPedido.getStore().data.items[pos].get('lote'));
            viewWinVentasCantidad.down('textfield[name=txtVencimiento]').setValue(gridPedido.getStore().data.items[pos].get('vencimiento'));
            viewWinVentasCantidad.down('textfield[name=co_almacen]').setValue(gridPedido.getStore().data.items[pos].get('co_almacen'));
        }else{
            viewWinVentasCantidad.down('textfield[name=txtPrecio]').setValue(this.formatNumber4(record.get('precio0')));
            viewWinVentasCantidad.down('textfield[name=txtCosto]').setValue(this.formatNumber4(record.get('va_compra')));
        }
        var ruc = this.getMainView().down('textfield[name=txtRuc]').getValue();
        var rs = this.getMainView().down('textfield[name=txtCliente]').getValue();
        if(ruc == ''){
            viewWinVentasCantidad.down('textfield[name=txtCliente]').hide();
            viewWinVentasCantidad.down('grid[name=gridHistorialPedido]').hide();
        }else{
            viewWinVentasCantidad.down('textfield[name=txtCliente]').setValue(rs);
            viewWinVentasCantidad.down('textfield[name=txtCliente]').show();
            viewWinVentasCantidad.down('grid[name=gridHistorialPedido]').show();
            this.getHistorialCompraProductosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
            this.getHistorialCompraProductosStore().proxy.extraParams.co_cliente = ruc;
            this.getHistorialCompraProductosStore().proxy.extraParams.co_producto = record.get('co_producto');
            this.getHistorialCompraProductosStore().load();
        }
        viewWinVentasCantidad.show();
    },
    onCellClickGridPedido: function(grid, nada, columnIndex, record){
        var columna = grid.up('grid').columns[columnIndex].name;
        var producto = record.get('no_producto');
        if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover al producto: <span style=color:red; font-weidth: bold>' + producto + '<span>?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }, this);
        }
    },
    getPosicion: function(grid, codigo){
        return grid.getStore().find("co_producto", codigo);
    },
    validarPrecio: function(grid, precio){
        var menor = new Array();
        grid.store.each(function(record){
            menor.push(record.get('va_precio'));
        });
        menor.sort();
        var va_menor = menor[0];
        if(menor.length == 0) return true;
        if(precio.value < va_menor){
            return false;
        }else{
            return true;
        }
    },
    onClickBtnAceptar: function(button){
        if(this.validar(button)){
            var viewWinVentasCantidad = button.up('window');
            var gridPrecios = viewWinVentasCantidad.down('grid[name=gridPrecios]');
            var gridPrecioCaja = viewWinVentasCantidad.down('grid[name=gridPrecioCaja]');
            var unitario = viewWinVentasCantidad.down('numberfield[name=txtPrecio]');
            var costo = viewWinVentasCantidad.down('textfield[name=txtCosto]');
            //if(!this.validarPrecio(gridPrecios, unitario)){
            if(unitario.getValue() <= costo.getValue()){
                Ext.Msg.alert('Validacion', 'Precio ingresado es invalido');
                return;
            }
            var cantidad = viewWinVentasCantidad.down('numberfield');
            var codigo = viewWinVentasCantidad.down('hidden');
            var lote = viewWinVentasCantidad.down('textfield[name=txtLote]');
            var co_almacen = viewWinVentasCantidad.down('textfield[name=co_almacen]').getValue();
            var vencimiento = viewWinVentasCantidad.down('textfield[name=txtVencimiento]');
            var co_unidad = viewWinVentasCantidad.down('combobox[name=cboUnidadVenta]').getValue();
            //var unidad = viewWinVentasCantidad.down('combobox[name=cboUnidadVenta]').getRawValue();
            var unidad = 'UNI';
            try{
                var record = gridPrecioCaja.getSelectionModel().selected.items[0];
                if(record.get('no_medida')=='UNIDAD'){
                    unidad = 'UNI';
                }else if(record.get('no_medida')=='CAJA'){
                    unidad = 'CAJ';
                }
            }catch(e){}
            var gridPedido = this.getMainView().down('grid[name=gridPedido]');
            var pos = this.getPosicion(gridPedido, codigo.getValue())

            if(pos > -1){
                var total = unitario.value * cantidad.value;
                this.editProducto(gridPedido, pos, 'cantidad', cantidad.value)
                this.editProducto(gridPedido, pos, 'precio0', unitario.value)
                this.editProducto(gridPedido, pos, 'total', total)
                this.editProducto(gridPedido, pos, 'lote', lote.value)
                this.editProducto(gridPedido, pos, 'vencimiento', vencimiento.value)
                this.editProducto(gridPedido, pos, 'co_unidad', co_unidad)
                this.editProducto(gridPedido, pos, 'unidad', unidad)
                this.editProducto(gridPedido, pos, 'co_almacen', co_almacen)
                this.setMontoTotal(gridPedido);
            }else{
                var gridProducto = this.getMainView().down('grid[name=gridProductos]');
                var storeProductos = gridProducto.getSelectionModel().selected.items[0].data;
                this.addProducto(storeProductos.co_producto, storeProductos.no_producto, unitario.value, storeProductos.costo_s, cantidad.value, lote.value, vencimiento.value, co_unidad, unidad, co_almacen)
            }
            button.up('window').close();
        }
    },
    validar: function(button){
        var rpta = true;
        var viewWinVentasCantidad = button.up('window');
        var cantidad = viewWinVentasCantidad.down('textfield[name=txtCantidad]');
        var precio = viewWinVentasCantidad.down('textfield[name=txtPrecio]');
        var lote = viewWinVentasCantidad.down('textfield[name=txtLote]');
        var stockLote = viewWinVentasCantidad.down('textfield[name=txtStockLote]');
        var coTipoDocumento = this.getTipoDocumento();
        if(cantidad.value == null || cantidad.value < 1){
            Ext.Msg.alert('Validacion', 'Ingrese una cantidad valida');
            rpta = false;
        }else if(cantidad.value > stockLote.value) {
            Ext.Msg.alert('Validacion', 'La cantidad excede a la cantidad del lote: '+lote.value);
            rpta = false;
        }else if(precio.value == null || precio.value == 0){
            Ext.Msg.alert('Validacion', 'Ingrese un precio valido');
            rpta = false;
        }
        return rpta;
    },
    addProducto: function(co_producto, no_producto, precio0, costo_s, cantidad, lote, vencimiento, co_unidad, unidad, co_almacen){
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        var storePedido = gridPedido.getStore();
        var total = cantidad * precio0;
        var pedido = Ext.create('rewsoft.store.Pedidos', {
            co_producto: co_producto,
            no_producto: no_producto,
            //presentacion: storeProductos.presentacion,
            lote: lote,
            vencimiento: vencimiento,
            precio0: precio0,
            costo_s: costo_s,
            cantidad: cantidad,
            co_unidad: co_unidad,
            unidad: unidad,
            total: total,
            co_almacen: co_almacen
        });
        //var count = storePedido.getCount();
        storePedido.add(pedido);
        this.setMontoTotal(gridPedido);
    },
    editProducto: function(gridPedido, pos, campo, valor){
        gridPedido.getStore().data.items[pos].set(campo, valor);
    },
    setMontoTotal: function(grid){
        this.getMainView().down('label[name=totalProductos]').setText('Productos: ' + grid.getStore().getCount());
        
        var totalS = 0.00;
        var totalD = 0.00;
        var neto = 0.00;
        var igv = 0.00;
        
        grid.store.each(function(record) {
            totalS = totalS + record.data['total'];
        });

        if (this.incluye_igv){
            neto = this.formatNumber2(totalS / rewsoft.AppGlobals.VA_IGV);
            igv = this.formatNumber2(neto * rewsoft.AppGlobals.VA_IGV_2);
            totalS = this.formatNumber2(totalS);
            totalD = this.formatNumber2(totalS / rewsoft.AppGlobals.TIPO_CAMBIO_VENTA);
        } else {
            neto = totalS;
            igv = neto * rewsoft.AppGlobals.VA_IGV_2
            totalS = neto + igv;
            totalD = this.formatNumber2(totalS / rewsoft.AppGlobals.TIPO_CAMBIO_VENTA);
            neto = this.formatNumber2(neto);
            igv = this.formatNumber2(igv);
            totalS = this.formatNumber2(totalS);
        }

        neto = neto + '';
        igv = igv + '';
        totalS = totalS + '';
        totalD = totalD + '';
        
        this.getMainView().down('label[name=lblNeto]').setText(neto);
        this.getMainView().down('label[name=lblIgv]').setText(igv);
        this.getMainView().down('label[name=lblTotalS]').setText(totalS);
        this.getMainView().down('label[name=lblTotalD]').setText(totalD);
    },
    onClickBtnLimpiarTodo: function(){
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover todos los producto?', function(btn){
            if(btn=='yes'){
                this.onClickBtnLimpiarTodoYes();
            }
        }, this);
    },
    onClickBtnLimpiarTodoYes: function(){
        var cboTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]');
        var coTipoDocumento = cboTipoDocumento.getValue();
        this.setSecuencial(coTipoDocumento, cboTipoDocumento);
        this.getMainView().down('textfield[name=txtRuc]').setValue('');
        this.getMainView().down('textfield[name=txtCliente]').setValue('');
        this.getMainView().down('textfield[name=txtDireccion]').setValue('');
        this.getMainView().down('textfield[name=txtBuscarGuiaRemision]').setValue('');
        this.getMainView().down('button[name=btnImprimirCotizacion]').hide();
        this.getMainView().down('button[name=btnIgvIncluido]').show();
        //this.getMainView().down('button[name=btnLimpiarTodo]').show();
        this.getMainView().down('button[name=btnProcesar]').show();
        this.getPedidosStore().removeAll();
        this.setMontoTotal(this.getMainView().down('grid[name=gridPedido]'));
    },
    onClickBtnProcesar: function(button){
        var grid = this.getMainView().down('grid[name=gridPedido]');
        if(grid.getStore().getCount() == 0){
            Ext.Msg.alert('Validacion', 'No hay productos para procesar');
            return;
        }
        var coTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]').getValue();
        if(coTipoDocumento == 'BV' || coTipoDocumento == 'FV'){ //Boleta o Factura
            this.onClickBtnProcesarVenta(grid, button);
        }else if(coTipoDocumento == 'GR'){ //Guia de Remision
            this.onClickBtnProcesarGuiaRemision(grid, button);
        }else if(coTipoDocumento == 'OD'){ //Orden de Despacho
            this.onClickBtnProcesarOrdenDespacho(grid, button);
        }else if(coTipoDocumento == 'CC'){ //Cotizacion
            this.onClickBtnProcesarCotizacion(grid, button);
        }
    },
    onClickBtnProcesarVenta: function(grid, button){
        if(!this.validarLotes(grid)){
            return;
        }
        var numeroDocumento = this.getMainView().down('textfield[name=txtNuDocumento]').getValue();
        var cboTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]');
        var coTipoDocumento = cboTipoDocumento.getValue();
        var tipoDocumento = cboTipoDocumento.getRawValue();
        var coCliente = this.getMainView().down('textfield[name=txtRuc]').getValue();
        var nuGuiaRemision = this.getMainView().down('textfield[name=txtBuscarGuiaRemision]').getValue();
        var fe_vencimiento = this.getMainView().down('displayfield[name=txtFechaVencimiento]').getValue();
        var co_vendedor = this.getMainView().down('combobox[name=cboVendedor]').getValue();
        if(coTipoDocumento == 'FV' && coCliente == ''){
            Ext.Msg.alert('Cuidado!!!', 'Esta realizando una Factura y debe elegir un cliente');
            return;
        }
        var coFormaPago = this.getMainView().down('combobox[name=cboFormaPago]').getValue();
        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la '+tipoDocumento+' No.: '+numeroDocumento+' ?', function(btn){
            if(btn=='yes'){
                var fl_imprimir = 'N';
                Ext.Msg.confirm('Impresion de comprobante', 'Desea imprimir la <span style=color:red; font-weidth: bold>'+tipoDocumento+' No.: '+numeroDocumento+'</span>?', function(btn){
                    if(btn=='yes' || btn=='no'){
                        fl_imprimir = btn=='yes' ? 'S' : 'N';
                    }
                    Ext.getBody().mask('Procesando <span style=color:red; font-weidth: bold>'+tipoDocumento+' No.: '+numeroDocumento+'</span> ...');
                    var detalle = new Array();
                    var total = 0;
                    grid.store.each(function(record) {
                        var registro = [{
                            co_producto: record.data['co_producto'],
                            no_producto: record.data['no_producto'],
                            cantidad: record.data['cantidad'],
                            unidad: record.data['unidad'],
                            precio0: record.data['precio0'],
                            total: record.data['total'],
                            lote: record.data['lote'],
                            co_almacen: record.data['co_almacen'],
                            vencimiento: record.data['vencimiento'],
                            co_unidad: record.data['co_unidad'],
                            no_unidad: record.data['unidad']
                        }];
                        detalle.push(registro);
                        total = total + record.data['total'];
                    });
                    var neto = total / 1.18;
                    var igv = neto * 0.18;
                    Ext.Ajax.request({
                        url: 'data/procesarVenta.php',
                        params: {
                            cia: rewsoft.AppGlobals.CIA,
                            coCliente: coCliente,
                            tipoComprobante: coTipoDocumento,
                            numeroDocumento: numeroDocumento,
                            neto: neto,
                            igv: igv,
                            total: total,
                            co_forma_pago: coFormaPago,
                            co_vendedor: co_vendedor,
                            nuGuiaRemision: nuGuiaRemision,
                            fe_vencimiento: fe_vencimiento,
                            fl_imprimir: fl_imprimir,
                            detalle: Ext.encode(detalle)
                        },
                        scope: this,
                        success: function(response){
                            var obj = Ext.decode(response.responseText);
                            if(obj.success) {
                                //this.imprimirBoleta(detalle);
                                //this.imprimirFactura(coTipoDocumento, numeroDocumento);
                                this.setSecuencial(coTipoDocumento, cboTipoDocumento);
                                this.onClickBtnLimpiarTodoYes();
                                Ext.getBody().unmask();
                            } else {
                                Ext.Msg.alert('Error!!!', 'Error en el proceso: ' + obj.msg);
                            }
                        },
                        failure: function(response, dos, tres){
                        }
                    });
                }, this);
            }
        }, this);
    },
    onClickBtnProcesarOrdenDespacho: function(grid, button){
        var numeroDocumento = this.getMainView().down('textfield[name=txtNuDocumento]').value;
        var cboTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]');
        var coTipoDocumento = cboTipoDocumento.getValue();
        var coCliente = this.getMainView().down('textfield[name=txtRuc]').getValue();
        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la Orden de Despacho No.: '+numeroDocumento+' ?', function(btn){
            if(btn=='yes'){
                Ext.getBody().mask('Procesando Orden de Despaho No.: '+numeroDocumento+' ...');
                var detalle = new Array();
                var total = 0;
                grid.store.each(function(record) {
                    var registro = [{
                        co_producto: record.data['co_producto'],
                        no_producto: record.data['no_producto'],
                        cantidad: record.data['cantidad'],
                        unidad: record.data['unidad'],
                        precio0: record.data['precio0'],
                        total: record.data['total'],
                        lote: record.data['lote'],
                        vencimiento: record.data['vencimiento']
                    }];
                    detalle.push(registro);
                    total = total + record.data['total'];
                });
                var neto = total / 1.18;
                var igv = neto * 0.18;
                Ext.Ajax.request({
                    url: 'data/procesarOrdenDespacho.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        coCliente: coCliente,
                        numeroDocumento: numeroDocumento,
                        neto: neto,
                        igv: igv,
                        total: total,
                        co_vendedor: rewsoft.AppGlobals.CO_USUARIO,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.setSecuencial(coTipoDocumento, cboTipoDocumento);
                            this.onClickBtnLimpiarTodoYes();
                            Ext.getBody().unmask();
                        } else {
                            Ext.Msg.alert('Error!!!', 'Error en el proceso');
                        }
                    },
                    failure: function(response, dos, tres){
                    }
                });
            }
        }, this);
    },
    onClickBtnProcesarGuiaRemision: function(grid, button){
        var numeroDocumento = this.getMainView().down('textfield[name=txtNuDocumento]').value;
        var cboTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]');
        var coTipoDocumento = cboTipoDocumento.getValue();
        var tipoDocumento = cboTipoDocumento.getStore().findRecord('id', coTipoDocumento).data.documento;
        var coCliente = this.getMainView().down('textfield[name=txtRuc]').getValue();
        var coFormaPago = this.getMainView().down('combobox[name=cboFormaPago]').getValue();
        if(coFormaPago  == 'CONTADO'){
            coFormaPago  = rewsoft.AppGlobals.FORMA_PAGO_DEFAULT;
        }
        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la '+tipoDocumento+' No.: '+numeroDocumento+' ?', function(btn){
            if(btn=='yes'){
                Ext.getBody().mask('Procesando '+tipoDocumento+' No.: '+numeroDocumento+' ...');
                var detalle = new Array();
                var total = 0;
                var fl_imprimir = 'N';
                Ext.Msg.confirm('Impresion de comprobante', 'Desea imprimir la '+tipoDocumento+' No.: '+numeroDocumento+' ?', function(btn){
                    if(btn=='yes'){
                        fl_imprimir = 'S';
                    }
                }, this);
                grid.store.each(function(record) {
                    var registro = [{
                        co_producto: record.data['co_producto'],
                        no_producto: record.data['no_producto'],
                        cantidad: record.data['cantidad'],
                        unidad: record.data['unidad'],
                        precio0: record.data['precio0'],
                        total: record.data['total'],
                        lote: record.data['lote'],
                        vencimiento: record.data['vencimiento']
                    }];
                    detalle.push(registro);
                    total = total + record.data['total'];
                });
                var neto = total / 1.18;
                var igv = neto * 0.18;
                Ext.Ajax.request({
                    url: 'data/procesarGuiaRemision.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        coCliente: coCliente,
                        tipoComprobante: coTipoDocumento,
                        numeroDocumento: numeroDocumento,
                        neto: neto,
                        igv: igv,
                        total: total,
                        co_forma_pago: coFormaPago,
                        co_vendedor: rewsoft.AppGlobals.CO_USUARIO,
                        fl_imprimir: fl_imprimir,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.setSecuencial(coTipoDocumento, cboTipoDocumento);
                            this.onClickBtnLimpiarTodoYes();
                            Ext.getBody().unmask();
                        } else {
                            Ext.Msg.alert('Error!!!', 'Error en el proceso');
                        }
                    },
                    failure: function(response, dos, tres){
                    }
                });
            }
        }, this);
    },
    onClickBtnProcesarCotizacion: function(grid, button){
        var numeroDocumento = this.getMainView().down('textfield[name=txtNuDocumento]').value;
        var fe_documento = this.getMainView().down('datefield[name=txtFeDocumento]').getRawValue();
        var cboTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]');
        var coTipoDocumento = cboTipoDocumento.getValue();
        var tipoDocumento = cboTipoDocumento.getStore().findRecord('id', coTipoDocumento).data.documento;
        var coCliente = this.getMainView().down('textfield[name=txtRuc]').getValue();
        var fl_igv_incluido = 1;
        if(this.incluye_igv){
            fl_igv_incluido = 1;
        } else {
            fl_igv_incluido = 0;
        }
        var coFormaPago = this.getMainView().down('combobox[name=cboFormaPago]').getValue();
        if(coFormaPago  == 'CONTADO'){
            coFormaPago  = rewsoft.AppGlobals.FORMA_PAGO_DEFAULT;
        }
        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la '+tipoDocumento+' No.: '+numeroDocumento+' ?', function(btn){
            if(btn=='yes'){
                Ext.getBody().mask('Procesando '+tipoDocumento+' No.: '+numeroDocumento+' ...');
                var detalle = new Array();
                var total = 0;
                grid.store.each(function(record) {
                    var registro = [{
                        co_producto: record.data['co_producto'],
                        cantidad: record.data['cantidad'],
                        unidad: record.data['unidad'],
                        precio0: record.data['precio0'],
                        total: record.data['total']
                    }];
                    detalle.push(registro);
                    total = total + record.data['total'];
                });
                var neto = total / 1.18;
                var igv = neto * 0.18;
                Ext.Ajax.request({
                    url: 'data/procesarCotizacion.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        coCliente: coCliente,
                        tipoComprobante: coTipoDocumento,
                        numeroDocumento: numeroDocumento,
                        neto: neto,
                        igv: igv,
                        total: total,
                        co_forma_pago: coFormaPago,
                        co_vendedor: rewsoft.AppGlobals.CO_USUARIO,
                        fe_documento: fe_documento,
                        fl_igv_incluido: fl_igv_incluido,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.setSecuencial(coTipoDocumento, cboTipoDocumento);
                            this.onClickBtnLimpiarTodoYes();
                            Ext.Msg.confirm('Impresion de cotizacion', 'Desea imprimir la <span style=color:red; font-weidth: bold>cotizacion No.: '+numeroDocumento+'</span>?', function(btn){
                                if(btn=='yes'){
                                    window.open("data/reportes/cotizacion.php?nu_documento="+numeroDocumento, '_blank');
                                }
                            });
                            Ext.getBody().unmask();
                        } else {
                            Ext.Msg.alert('Error!!!', 'Error en el proceso');
                        }
                    },
                    failure: function(response, dos, tres){
                    }
                });
            }
        }, this);
    },
    validarLotes: function(grid){
        var rpta = true;
        grid.store.each(function(record) {
            if(record.data['lote'] == ''){
                Ext.Msg.alert('Error!!!', 'Hay productos sin Lotes, verificar...');
                rpta = false;
            }
        });
        return rpta;
    },
    imprimirBoleta: function(detalle){
        window.open("data/imprimirBoleta.php?detalle="+Ext.encode(detalle), '_blank');
    },
    imprimirFactura: function(tipo_comprobante, numero_comprobante){
        //window.open("data/imprimirFactura.php?detalle="+Ext.encode(detalle), '_blank');
        window.open("data/comprobantes/imprimirFactura.php?cia="+rewsoft.AppGlobals.CIA+"&tipo_comprobante="+tipo_comprobante+"&numero_comprobante="+numero_comprobante, '_blank');
    },
    formatNumber4: function(value){
        return Ext.util.Format.number(value, rewsoft.AppGlobals.FORMA_NUMBER);
    },
    formatNumber2: function(value){
        return Ext.util.Format.number(value, rewsoft.AppGlobals.FORMA_NUMBER);
    },
    onItemClickGridLotes: function(grid, record){
        grid.up('window').down('textfield[name=txtLote]').setValue(record.get('no_lote'));
        grid.up('window').down('textfield[name=txtVencimiento]').setValue(record.get('fe_vencimiento'));
        grid.up('window').down('textfield[name=txtStockLote]').setValue(record.get('ca_stock'));
        grid.up('window').down('textfield[name=co_almacen]').setValue(record.get('co_almacen'));
    },
    getSecuencia: function(combo, coTipoDocumento){
        var nuSerie;
        if(coTipoDocumento=='FV'){
            nuSerie = rewsoft.AppGlobals.SERIE_FV;
        }else {
            nuSerie = rewsoft.AppGlobals.SERIE_BV;
        }
        //nuSerie = '00'.concat(nuSerie);
        Ext.Ajax.request({
            url: 'data/readNumeroSecuencia.php',
            params: {
                cia: rewsoft.AppGlobals.CIA,
                tipoDocumento: coTipoDocumento,
                nuSerie: nuSerie
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(obj.success) {
                    this.getMainView().down('textfield[name=txtNuDocumento]').setValue(obj.secuencia);
                    this.nu_serie = obj.nu_serie;
                    this.nu_secuencia = obj.nu_secuencia;
                } else {
                    Ext.Msg.alert('Error!!!', 'Error al optener la secuencia del documento');
                }
            }
        });
    },
    setSecuencial: function(coTipoDocumento, cboTipoDocumento){
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
                this.onSelectCboTipoDocumentos(cboTipoDocumento);
                if(!obj.success) {
                    Ext.Msg.alert('Error!!!', 'Error al cambiar la secuencia del documento');
                }
            }
        });
    },
    getTipoDocumento: function(){
        var coTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]').getValue();
        if(coTipoDocumento == 'BOLETA'){
            coTipoDocumento = 'BV';
        }
        return coTipoDocumento;
    },
    onSelectCboTipoDocumentos: function(combo){
        var coTipoDocumento = this.getTipoDocumento();
        this.getSeriesStore().proxy.extraParams.cia = rewsoft.AppGlobals.CIA;
        this.getSeriesStore().proxy.extraParams.tipoDocumento = coTipoDocumento;
        this.getSeriesStore().load();
        try{
            var tipoDocumento = combo.getStore().findRecord('id', coTipoDocumento).data.documento;
            this.getMainView().down('label[name=lblNombreDocumento]').setText(tipoDocumento+' No.:');
        }catch(e){}
        try{
            this.getMainView().down('textfield[name=txtBuscarGuiaRemision]').hide();
            this.getMainView().down('button[name=btnBuscarGuiaRemision]').hide();
            this.getMainView().down('textfield[name=txtBuscarComprobante]').hide();
            this.getMainView().down('button[name=btnBuscarComprobante]').hide();
            this.getMainView().down('datefield[name=txtFeDocumento]').hide();
            this.getMainView().down('button[name=btnIgvIncluido]').hide();
            this.getMainView().down('button[name=btnImprimirCotizacion]').hide();
            this.getMainView().down('button[name=btnBuscarPasado]').hide();

            if(coTipoDocumento == 'BV' || coTipoDocumento == 'FV'){
                this.getMainView().down('textfield[name=txtBuscarGuiaRemision]').show();
                this.getMainView().down('button[name=btnBuscarGuiaRemision]').show();
                if(rewsoft.AppGlobals.ROL_ACTIVO==rewsoft.AppGlobals.ROL_ADMINISTRADOR){
                    this.getMainView().down('button[name=btnCambiarSerie]').show();
                }else{
                    this.getMainView().down('button[name=btnCambiarSerie]').hide();
                }
                this.getMainView().down('combobox[name=cboFormaPago]').show();
                this.getMainView().down('displayfield[name=txtFechaVencimiento]').show();
                this.getMainView().down('button[name=btnProcesar]').setText('Procesar Venta');
            } else if(coTipoDocumento == 'GR'){
                this.getMainView().down('textfield[name=txtBuscarComprobante]').show();
                this.getMainView().down('button[name=btnBuscarComprobante]').show();
                this.getMainView().down('button[name=btnCambiarSerie]').show(); //Siempre se muestra
                this.getMainView().down('button[name=btnProcesar]').setText('Generar Guia');
            } else if(coTipoDocumento == 'CC'){
                this.getMainView().down('combobox[name=cboFormaPago]').show();
                this.getMainView().down('displayfield[name=txtFechaVencimiento]').show();
                this.getMainView().down('button[name=btnProcesar]').setText('Cotizar');
                this.getMainView().down('datefield[name=txtFeDocumento]').show();
                this.getMainView().down('button[name=btnIgvIncluido]').show();
                //this.getMainView().down('button[name=btnImprimirCotizacion]').show();
                this.getMainView().down('button[name=btnBuscarPasado]').show();
                //this.getMainView().down('combobox[name=cboVendedor]').hide();
            } else {
                this.getMainView().down('combobox[name=cboFormaPago]').hide();
                this.getMainView().down('displayfield[name=txtFechaVencimiento]').hide();
                this.getMainView().down('button[name=btnProcesar]').setText('Procesar');
                //this.getMainView().down('combobox[name=cboVendedor]').hide();
            }
        }catch(e){}
        this.getSecuencia(combo, coTipoDocumento);
    },
    onClickBtnImprimir: function(button){
        var grid = button.up('grid');
        if(grid.getStore().getCount() == 0){
            return;
        }
        var detalle = new Array();
        grid.store.each(function(record) {
            var registro = [{
                codigo: record.data['co_producto'],
                producto: record.data['no_producto'],
                cantidad: record.data['cantidad'],
                unidadventa: record.data['unidad'],
                unitario: record.data['precio0'],
                total: record.data['total'],
                lote: record.data['lote'],
                vencimiento: record.data['vencimiento']
            }];
            detalle.push(registro);
        });
        this.imprimirFactura(detalle);
    },
    onClickBtnCambiarSerie: function(){
        Ext.widget('winseries').show();
    },
    onCellClickGridSeries: function(grid, nada, columnIndex, record){
        if(columnIndex == 2) {
            var co_documento = record.get('co_documento');
            var nu_serie = record.get('nu_serie');
            var nu_secuencia = record.get('nu_secuencia');
            Ext.Msg.show({
                title: 'Cambio de secuencia',
                msg: 'Ingrese el numero de secuencia',
                buttons: Ext.Msg.OKCANCEL,
                animateTarget: grid,
                //icon: Ext.MessageBox.INFO,
                prompt: true,
                value: nu_secuencia,
                scope: this,
                fn: function(btn, text){
                    if(btn=='ok'){
                        Ext.Msg.show({
                            title: 'Cambio de secuencia',
                            msg: 'Seguro que desea reemplazar el numero de secuencia por ' + text,
                            buttons: Ext.Msg.YESNO,
                            animateTarget: grid,
                            scope: this,
                            fn: function(btn){
                                if(btn=='yes'){
                                    Ext.Ajax.request({
                                        url: 'data/setNumeroSecuencia.php',
                                        params: {
                                            cia: rewsoft.AppGlobals.CIA,
                                            tipoDocumento: co_documento,
                                            nu_serie: nu_serie,
                                            nu_secuencia: text
                                        },
                                        scope: this,
                                        success: function(response){
                                            var obj = Ext.decode(response.responseText);
                                            if(obj.success) {
                                                record.set('nu_secuencia', text);
                                                var serie = this.getMainView().down('textfield[name=txtNuDocumento]').getValue().substr(0, 3);
                                                if(serie == nu_serie){
                                                    this.getMainView().down('textfield[name=txtNuDocumento]').setValue(nu_serie+"-"+text);
                                                }
                                            }else {
                                                Ext.Msg.alert('Error!!!', obj.error);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    onItemDblClickGridSeries: function(grid, record){
        this.getMainView().down('textfield[name=txtNuDocumento]').setValue(record.get('nu_serie')+"-"+record.get('nu_secuencia'));
        grid.up('window').hide();
    },
    onClickBtnBuscarGuiaRemision: function(){
        Ext.widget('winguiasremision').show();
    },
    onItemDblClickGridGuiasRemision: function(grid, record){
        this.getPedidosStore().removeAll()
        var tipo = record.get('co_tipo_documento');
        this.getMainView().down('textfield[name=txtBuscarGuiaRemision]').setValue(tipo+"-"+record.get('nu_comprobante'));
        this.getMainView().down('textfield[name=txtRuc]').setValue(record.get('co_cliente'));
        this.getMainView().down('textfield[name=txtCliente]').setValue(record.get('no_cliente'));
        this.getDetalleGuiaRemision(record.get('nu_comprobante'), tipo);
        grid.up('window').hide();
    },
    getDetalleGuiaRemision: function(nu_comprobante, tipo) {
        var url = '';
        if(tipo == 'GR'){
            url = 'data/readGuiaRemisionDetalle.php';
        } else if(tipo == 'OD'){
            url = 'data/readOrdenesDespachoDetalle.php';
        } else if(tipo == 'CC'){
            url = 'data/readCotizacionDetalle.php';
        } else if(tipo == 'FV') {
            url = 'data/readVentasDetalle-FV.php';
        } else if(tipo == 'BV') {
            url = 'data/readVentasDetalle-BV.php';
        }
        Ext.getBody().mask('Cargando Data...');
        Ext.Ajax.request({
            url: url,
            params: {
                nu_documento: nu_comprobante
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                Ext.Array.forEach(obj.ordenesdetalle, function(item, index, allItems){
                    this.addProducto(item['co_producto'], item['no_producto'], item['va_producto'], 0, item['ca_producto'], item['no_lote'], item['fe_vencimiento'], 'UNIDAD');
                }, this)
                Ext.getBody().unmask();
            }
        });
    },
    onClickBtnNuevoCliente: function() {
        Ext.widget('winnuevocliente').show();
    },
    onKeyPressTxtRuc: function(text, key) {
        if(key.getKey() == key.ENTER){
            if(text.getValue().length == 11) {
                this.buscarCliente(text, key);
            } else {
                //Ext.Msg.alert('Error!!!', "El numero de RUC debe contener 11 caracteres");
                //text.focus();
                Ext.widget('winbuscarcliente').show();
            }
        }
    },
    buscarCliente: function(text, key){
        Ext.getBody().mask('Buscando Cliente...');
        this.getClientesStore().proxy.extraParams.co_cliente = text.getValue();
        this.getClientesStore().proxy.extraParams.no_cliente = '';
        this.getClientesStore().load({
            callback: function(record, operation, success) {
                if(success){
                    this.getMainView().down('textfield[name=txtCliente]').setValue(record[0].data.cliente);
                    this.getMainView().down('textfield[name=txtDireccion]').setValue(record[0].data.direccion);
                    this.getMainView().down('combobox[name=cboFormaPago]').setValue(record[0].data.co_forma_pago+'');
                }
                Ext.getBody().unmask();
            },
            scope: this
        });
    },
    buscarClienteInternet: function(text, key){
        this.getMainView().down('textfield[name=txtCliente]').setValue('');
        this.getMainView().down('textfield[name=txtDireccion]').setValue('');
        Ext.getBody().mask('Buscando Cliente...');
        this.getConsultaRucStore().proxy.extraParams.nu_ruc = text.getValue();
        this.getConsultaRucStore().load({
            callback: function(record, operation, success) {
                if(success){
                    if(record[0].data.razon_social==""){
                        Ext.Msg.alert('Facturar', 'EL numero de RUC: '+text.getValue()+' no existe.');
                    } else {
                        this.getMainView().down('textfield[name=txtCliente]').setValue(record[0].data.razon_social);
                        this.getMainView().down('textfield[name=txtDireccion]').setValue(record[0].data.direccion);
                        Ext.Ajax.request({
                            url: 'data/createCliente.php',
                            scope: this,
                            params: {
                                txtRuc: text.getValue(),
                                txtRazonSocial: record[0].data.razon_social,
                                txtDireccion: record[0].data.direccion,
                                edit: true
                            },
                            success: function(response){
                                var obj = Ext.decode(response.responseText);
                                var co_forma_pago = obj.co_forma_pago;
                                this.getMainView().down('combobox[name=cboFormaPago]').setValue(co_forma_pago+'');
                            }
                        });
                    }
                } else {
                    this.getClientesStore().proxy.extraParams.co_cliente = text.getValue();
                    this.getClientesStore().proxy.extraParams.no_cliente = '';
                    this.getClientesStore().load({
                        callback: function(record, operation, success) {
                            if(success){
                                this.getMainView().down('textfield[name=txtCliente]').setValue(record[0].data.cliente);
                                this.getMainView().down('textfield[name=txtDireccion]').setValue(record[0].data.direccion);
                                this.getMainView().down('combobox[name=cboFormaPago]').setValue(record[0].data.co_forma_pago+'');
                            }
                        },
                        scope: this
                    });
                }
                Ext.getBody().unmask();
            },
            scope: this
        });
    },
    onChangeChkMostrarCosto: function(check, newValue, oldValue){
        if(newValue){
            this.getMainView().down('grid[name=gridProductos]').columns[3].show()
        } else {
            this.getMainView().down('grid[name=gridProductos]').columns[3].hide()
        }
    },
    onChangeChkMostrarMarca: function(check, newValue, oldValue){
        if(newValue){
            this.getMainView().down('grid[name=gridProductos]').columns[1].show()
        } else {
            this.getMainView().down('grid[name=gridProductos]').columns[1].hide()
        }
    },
    onChangeChkMostrarStock: function(check, newValue, oldValue){
        if(newValue){
            this.getMainView().down('grid[name=gridProductos]').columns[4].show()
        } else {
            this.getMainView().down('grid[name=gridProductos]').columns[4].hide()
        }
    },
    onChangeChkMostrarMontoDolares: function(check, newValue, oldValue){
        if(newValue){
            this.getMainView().down('label[name=lblTotalD1]').show()
            this.getMainView().down('label[name=lblTotalD]').show()
        } else {
            this.getMainView().down('label[name=lblTotalD1]').hide()
            this.getMainView().down('label[name=lblTotalD]').hide()
        }
    },
    onAfterRenderWinCantidad: function(win){
        this.getUnidadesVentaByProductoStore().proxy.extraParams.co_producto = win.down('hidden[name=txtCodigo]').getValue();
        this.getUnidadesVentaByProductoStore().load({
            callback: function(record, operation, success) {
                win.down('combobox[name=cboUnidadVenta]').setValue(record[0].data.id);
            },
            scope: this
        });
    },
    onItemClickGridPrecioCaja: function(grid, record){
        var txtCantidad = this.getWinVentasCantidad().down('numberfield[name=txtCantidad]')
        var txtPrecio = this.getWinVentasCantidad().down('numberfield[name=txtPrecio]')
        var txtTotal = this.getWinVentasCantidad().down('numberfield[name=txtTotal]')
        txtPrecio.setValue(record.get('va_precio'));
        txtTotal.setValue(txtCantidad.getValue() * txtPrecio.getValue())
        txtPrecio.focus();
    },
    onSelectCboFormaPago: function(combo, records){
        var fe_vencimiento = combo.up().down('displayfield[name=txtFechaVencimiento]');
        var nu_dias = records[0].get('nu_dias');
        var hoy = new Date();
        var dias = nu_dias * 1000;
        hoy.setTime(hoy.getTime()+24*60*60*dias);
        var mes = new String(hoy.getMonth() + 1);
        if(mes.length<2){
            mes = '0'.concat(mes);
        }
        var hoyd = new String(hoy.getDate());
        if(hoyd.length<2){
            hoyd = '0'.concat(hoyd);
        }
        var fecha = hoyd + '/' + mes + '/' + hoy.getFullYear(); 
        fe_vencimiento.setValue(fecha);
    },
    onKeypressTxtCantidad: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtCantidad = this.getWinVentasCantidad().down('numberfield[name=txtCantidad]')
            var txtPrecio = this.getWinVentasCantidad().down('numberfield[name=txtPrecio]')
            var txtTotal = this.getWinVentasCantidad().down('numberfield[name=txtTotal]')
            txtTotal.setValue(txtCantidad.getValue() * txtPrecio.getValue())
            txtPrecio.focus();
        }
    },
    onKeypressTxtPrecio: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtCantidad = this.getWinVentasCantidad().down('numberfield[name=txtCantidad]')
            var txtPrecio = this.getWinVentasCantidad().down('numberfield[name=txtPrecio]')
            var txtTotal = this.getWinVentasCantidad().down('numberfield[name=txtTotal]')
            txtTotal.setValue(txtCantidad.getValue() * txtPrecio.getValue())
            txtTotal.focus();
        }
    },
    onKeypressTxtTotal: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtCantidad = this.getWinVentasCantidad().down('numberfield[name=txtCantidad]')
            var txtPrecio = this.getWinVentasCantidad().down('numberfield[name=txtPrecio]')
            var txtTotal = this.getWinVentasCantidad().down('numberfield[name=txtTotal]')
            var btnAceptar = this.getWinVentasCantidad().down('button[name=btnAceptar]')
            txtPrecio.setValue(txtTotal.getValue() / txtCantidad.getValue())
            btnAceptar.focus()
        }
    },
    onItemClickGridPrecios: function(grid, record){
        var txtCantidad = this.getWinVentasCantidad().down('numberfield[name=txtCantidad]')
        var txtPrecio = this.getWinVentasCantidad().down('numberfield[name=txtPrecio]')
        var txtTotal = this.getWinVentasCantidad().down('numberfield[name=txtTotal]')
        txtPrecio.setValue(record.get('va_precio'));
        txtTotal.setValue(txtCantidad.getValue() * txtPrecio.getValue())
        txtPrecio.focus();
    },
    onToggleIgvIncluido: function(button, pressed){
        Ext.getBody().mask('Procesando...');
        this.incluye_igv = pressed;
        if(pressed) {
            button.setText('IGV Incluido');
        } else {
            button.setText('IGV NO Incluido');
        }
        this.IgvIncluido(pressed);
        Ext.getBody().unmask();
    },
    IgvIncluido: function(pressed){
        var grid = this.getMainView().down('grid[name=gridPedido]');
        grid.store.each(function(record) {
            var pos = this.getPosicion(grid, record.data['co_producto'])
            if(pos > -1){
                var precio0 = 0;
                if (pressed){
                    precio0 = record.data['precio0'] * rewsoft.AppGlobals.VA_IGV;
                } else {
                    precio0 = record.data['precio0'] / rewsoft.AppGlobals.VA_IGV;
                }
                var total = precio0 * record.data['cantidad'];
                this.editProducto(grid, pos, 'cantidad', record.data['cantidad'])
                this.editProducto(grid, pos, 'precio0', precio0)
                this.editProducto(grid, pos, 'total', total)
            }
        }, this);
        this.setMontoTotal(grid);
    },
    onDestroyPnlFacturacion: function(){
        this.incluye_igv = true;
        this.is_edit = false;
    },
    onClickBtnBuscarPasado: function(button){
        Ext.widget('winbuscardocumento').show();
    },
    onRenderedWinBuscarDocumento: function(win){
        var coTipoDocumento = this.getTipoDocumento();
        this.getBuscarDocumentoStore().proxy.extraParams.tipo_documento = coTipoDocumento;
        this.getBuscarDocumentoStore().load();
        win.down('grid').getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    if(record){
                        this.onItemDblClickGridBuscarDocumento(grd, record)
                    }
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridBuscarDocumento: function(grid, record){
        this.getPedidosStore().removeAll()
        //this.getMainView().down('textfield[name=txtBuscarGuiaRemision]').setValue(tipo+"-"+record.get('nu_comprobante'));
        this.getMainView().down('textfield[name=txtNuDocumento]').setValue(record.get('nu_documento'));
        this.getMainView().down('textfield[name=txtRuc]').setValue(record.get('co_cliente'));
        this.getMainView().down('textfield[name=txtCliente]').setValue(record.get('no_cliente'));
        this.getMainView().down('datefield[name=txtFeDocumento]').setValue(record.get('fe_documento'));
        this.getDetalleGuiaRemision(record.get('nu_documento'), record.get('tipo_documento'));
        grid.up('window').hide();
        //
        this.getMainView().down('button[name=btnImprimirCotizacion]').show();
        this.getMainView().down('button[name=btnIgvIncluido]').hide();
        //this.getMainView().down('button[name=btnLimpiarTodo]').hide();
        this.getMainView().down('button[name=btnProcesar]').hide();


    },
    actualizarFechaCotizacion: function(){
        var nu_documento = this.getMainView().down('textfield[name=txtNuDocumento]').getValue();
        var fe_documento = this.getMainView().down('datefield[name=txtFeDocumento]').getRawValue();
        console.log(fe_documento);
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer cambiar la fecha de la cotizacion <span style=color:red; font-weidth: bold>' + nu_documento + '<span> a <span style=color:red; font-weidth: bold>' + fe_documento + '<span>?', function(btn){
            if(btn=='yes'){
                Ext.getBody().mask('Procesando...');
                Ext.Ajax.request({
                url: 'data/updateFechaCotizacion.php',
                params: {
                    nu_documento: nu_documento,
                    fe_documento: fe_documento
                },
                scope: this,
                success: function(response){
                    var obj = Ext.decode(response.responseText);
                    Ext.getBody().unmask();
                }
            });
            }
        }, this);
    },
    onClickBtnImprimirCotizacion: function(btn){
        var numeroDocumento = this.getMainView().down('textfield[name=txtNuDocumento]').value;
        window.open("data/reportes/cotizacion.php?nu_documento="+numeroDocumento, '_blank');
    }
});