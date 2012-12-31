Ext.define('rewsoft.controller.almacen.IngresodeProductos', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.PnlIngresodeProducto',
    'almacen.WinCantidad'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlingresodeproducto'
    },{
        ref: 'WinAlmacenCantidad',
        selector: 'winalmacencantidad'
    }],
    stores: [
    'Productos',
    'Monedas',
    'IngresoProductos',
    'DocumentosAlmacen',
    'Proveedores',
    'Lotes',
    'Almacen',
    'ConsultaRuc',
    'UnidadesVentaByProducto',
    'FormaPago',
    'Monedas'
    ],
    init: function() {
        this.control({
            'pnlingresodeproducto': {
                render: this.onRenderedPnlIngresodeProducto,
                afterrender: this.onAfterRenderedPnlIngresodeProducto
            },
            'pnlingresodeproducto textfield[name=txtBuscar]': {
                keyup: this.onKeyUpTxtBuscar,
                keypress: this.onKeyPressTxtBuscar
            },
            'pnlingresodeproducto textfield[name=txtRuc]': {
                keypress: this.onKeyPressTxtRuc
            },
            'pnlingresodeproducto combo[name=cboTipoDocumento]': {
                beforerender: this.onBeforeRenderCboTipoDocumentos,
                select: this.onSelectCboTipoDocumentos
            },
            'pnlingresodeproducto grid[name=gridPedido]': {
                render: this.onRenderedGridPedido,
                itemdblclick: this.onItemDblClickGridPedido,
                cellclick: this.onCellClickGridPedido
            },
            'pnlingresodeproducto grid[name=gridProductos]': {
                render: this.onRenderedGridProductos,
                itemdblclick: this.onItemDblClickGridProductos
            },
            'pnlingresodeproducto button[name=btnLimpiarTodo]': {
                click: this.onClickBtnLimpiarTodo
            },
            'pnlingresodeproducto button[name=btnProcesar]': {
                click: this.onClickBtnProcesar
            },
            'pnlingresodeproducto combobox[name=cboMoneda]': {
                render: this.onRenderCboMoneda,
                select: this.onSelectCboMoneda
            },
            'winalmacencantidad': {
                render: this.onRenderedWinCantidad,
                afterrender: this.onAfterRenderWinCantidad
            },
            'winalmacencantidad button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            },
            'winalmacencantidad grid[name=gridLotes]': {
                itemclick: this.onItemClickGridLotes
            },
            'winalmacencantidad combo[name=co_unidad]': {
                beforerender: this.onBeforeRenderCboUnidadVenta
            },
            'winalmacencantidad numberfield[name=va_compra_sin_igv]': {
                keypress: this.onKeyPressVaCompraSinIgv
            },
            'winalmacencantidad numberfield[name=va_compra]': {
                keypress: this.onKeyPressVaCompra
            },
            'winalmacencantidad checkboxfield[name=chkSinLote]': {
                change: this.onChangeChkSinLote
            }
        });
    },
    onRenderedPnlIngresodeProducto: function(panel) {
        this.getIngresoProductosStore().removeAll()
        this.getProductosStore().pageSize = 50;
        this.getProductosStore().proxy.extraParams.no_producto = '';
        this.getProductosStore().proxy.extraParams.co_grupo = '';
        this.getProductosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getProductosStore().load();
        this.getFormaPagoStore().load();
        //this.getProveedoresStore().load();
        this.getAlmacenStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getAlmacenStore().load();
        panel.getEl().on('keypress', function (event, target){
            if(event.getKey() == event.ENTER) {
                var targetEl = Ext.get(target.id),
                fieldEl = targetEl.up('[class*=x-field]') || {},
                field = Ext.getCmp(fieldEl.id);
                if (field) {
                    var next = field.next('[isFormField]');
                    if (next) {
                        event.stopEvent();
                        next.focus();
                    }                   
                }
            }
        });
        this.getMainView().down('grid[name=gridPedido]').columns[2].hide();
        this.getMainView().down('grid[name=gridPedido]').columns[3].hide();
        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            this.getMainView().down('grid[name=gridPedido]').columns[2].show();
            this.getMainView().down('grid[name=gridPedido]').columns[3].show();
        }
    },
    onAfterRenderedPnlIngresodeProducto: function(win){
        win.down('combobox[name=cboAlmacen]').setValue('400');
    },
    onRenderedWinCantidad: function(win){
        var coTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]').getValue();
        if(coTipoDocumento == 'GR' || coTipoDocumento == null ){
            win.down('panel[name=zonePrecios]').hide();
        } else {
            win.down('panel[name=zonePrecios]').show();
        }
        win.down('panel[name=zoneLotes]').hide();
        win.down('panel[name=gridLotes]').hide();
        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            win.down('panel[name=zoneLotes]').show();
            win.down('panel[name=gridLotes]').show();
        }
    },
    onAfterRenderWinCantidad: function(win){
        this.getUnidadesVentaByProductoStore().proxy.extraParams.co_producto = this.getWinAlmacenCantidad().down('hiddenfield[name=co_producto]').getValue();
        this.getUnidadesVentaByProductoStore().load({
            callback: function(record, operation, success) {
                win.down('combobox[name=co_unidad]').setValue(record[0].data.id);
            },
            scope: this
        });
    },
    onBeforeRenderCboTipoDocumentos: function(combo) {
        this.getDocumentosAlmacenStore().filter('fl_almacen', 'S');
        combo.setValue('FV')
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
        var pedido = Ext.create('rewsoft.store.IngresoProductos', {
            co_producto: null,
            no_producto: null,
            lote: null,
            vencimiento: null,
            costo_s: null,
            cantidad: null,
            unidad: null,
            total: null
        });
        //grid.getStore().insert(0, pedido);
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.INSERT,
                fn: function(){
                    console.log('Insertando')
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
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
    onBeforeRenderCboUnidadVenta: function(combo){
        combo.setValue('UND');
    },
    onItemDblClickGridPedido: function(gridPedido, record){
        var WinCantidad = Ext.widget('winalmacencantidad');
        WinCantidad.down('form').loadRecord(record);
        this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().load();
        WinCantidad.show();
    },
    onItemDblClickGridProductos: function(grid, record){
        var WinCantidad = Ext.widget('winalmacencantidad');
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        WinCantidad.down('hiddenfield[name=co_producto]').setValue(record.get('co_producto'));
        this.getLotesStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = record.get('co_producto');
        this.getLotesStore().load();
        WinCantidad.down('label[name=no_producto]').setText(record.get('co_producto')+'-'+record.get('no_producto'));
        var pos = this.getPosicion(gridPedido, record.get('co_producto'))
        if(pos > -1){
            WinCantidad.down('numberfield').setValue(gridPedido.getStore().data.items[pos].get('ca_producto'));
            WinCantidad.down('textfield[name=va_compra_sin_igv]').setValue(gridPedido.getStore().data.items[pos].get('va_compra_sin_igv'));
            WinCantidad.down('textfield[name=va_compra]').setValue(gridPedido.getStore().data.items[pos].get('va_compra'));
        }else{
            WinCantidad.down('textfield[name=va_compra_sin_igv]').setValue(this.formatNumber4(record.get('va_compra_sin_igv')));
            WinCantidad.down('textfield[name=va_compra]').setValue(this.formatNumber4(record.get('va_compra')));
        }
        WinCantidad.show();
    },
    onCellClickGridPedido: function(grid, nada, columnIndex, record){
        if(columnIndex == 10) {
            var producto = record.get('no_producto');
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover el producto: ' + producto + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    this.setMontoTotal(grid);
                    this.onChangeGridPedido(grid);
                }
            }, this);
        }
    },
    getPosicion: function(grid, codigo){
        return grid.getStore().find("co_producto", codigo);
    },
    onClickBtnAceptar: function(button){
        var form = this.getWinAlmacenCantidad().down('form');
        if(form.getForm().isValid()){
            var co_producto = button.up('window').down('hiddenfield[name=co_producto]').getValue();
            var ca_producto = button.up('window').down('numberfield').getValue();
            var va_compra_sin_igv = button.up('window').down('textfield[name=va_compra_sin_igv]').getValue();
            var va_compra = button.up('window').down('textfield[name=va_compra]').getValue();
            var no_lote = button.up('window').down('textfield[name=no_lote]').getValue();
            var fe_vencimiento = button.up('window').down('datefield[name=fe_vencimiento]').getRawValue();
            var unidadventa = button.up('window').down('combobox[name=co_unidad]');
            var co_unidad = unidadventa.getValue();
            var no_unidad = unidadventa.getRawValue();;
            var gridPedido = this.getMainView().down('grid[name=gridPedido]');
            var pos = this.getPosicion(gridPedido, co_producto);
            if(pos > -1){
                var va_total = va_compra * ca_producto;
                this.editProducto(gridPedido, pos, 'ca_producto', ca_producto)
                this.editProducto(gridPedido, pos, 'va_compra_sin_igv', va_compra_sin_igv)
                this.editProducto(gridPedido, pos, 'va_compra', va_compra)
                this.editProducto(gridPedido, pos, 'va_total', va_total)
                this.editProducto(gridPedido, pos, 'no_lote', no_lote)
                this.editProducto(gridPedido, pos, 'fe_vencimiento', fe_vencimiento)
                this.editProducto(gridPedido, pos, 'co_unidad', co_unidad)
                this.editProducto(gridPedido, pos, 'no_unidad', no_unidad)
                this.setMontoTotal(gridPedido);
            }else{
                this.addProducto(ca_producto, va_compra_sin_igv, va_compra, no_lote, fe_vencimiento, co_unidad, no_unidad)
            }
            button.up('window').close();
        }
    },
    getTipoDocumento: function(){
        var coTipoDocumento = this.getMainView().down('combobox[name=cboTipoDocumento]').getValue();
        if(coTipoDocumento == 'BOLETA'){
            coTipoDocumento = 'BV';
        }
        return coTipoDocumento;
    },
    addProducto: function(ca_producto, va_compra_sin_igv, va_compra, no_lote, fe_vencimiento, co_unidad, no_unidad){
        var gridPedido = this.getMainView().down('grid[name=gridPedido]');
        var gridProducto = this.getMainView().down('grid[name=gridProductos]');
        var storePedido = gridPedido.getStore();
        var storeProductos = gridProducto.getSelectionModel().selected.items[0].data;
        var va_total = ca_producto * va_compra;
        var pedido = Ext.create('rewsoft.store.IngresoProductos', {
            co_producto: storeProductos.co_producto,
            no_producto: storeProductos.no_producto,
            no_lote: no_lote,
            fe_vencimiento: fe_vencimiento,
            va_compra_sin_igv: va_compra_sin_igv,
            va_compra: va_compra,
            ca_producto: ca_producto,
            co_unidad: co_unidad,
            no_unidad: no_unidad,
            va_total: va_total,
            fl_igv: storeProductos.fl_igv
        });
        var count = storePedido.getCount();
        storePedido.insert(count, pedido);
        this.setMontoTotal(gridPedido);
        this.onChangeGridPedido(gridPedido);
    },
    editProducto: function(gridPedido, pos, campo, valor){
        gridPedido.getStore().data.items[pos].set(campo, valor);
    },
    setMontoTotal: function(grid){
        this.getMainView().down('label[name=totalProductos]').setText('Productos: ' + grid.getStore().getCount());
        
        var neto = 0.0000;
        var igv = 0.0000;
        var no_gravado = 0.0000;
        var totalS = 0.0000;
        var totalD = 0.0000;

        grid.store.each(function(record) {
            totalS = totalS + record.data['va_total'];
            if(record.data['fl_igv'] == 'S'){
                neto = neto + (record.data['va_total'] / rewsoft.AppGlobals.VA_IGV);
            } else {
                //neto = neto + record.data['va_total'];
                no_gravado = no_gravado + record.data['va_total'];
            }
        });
        
        neto = Ext.util.Format.number(neto, rewsoft.AppGlobals.FORMA_NUMBER);
        igv = Ext.util.Format.number(neto * rewsoft.AppGlobals.VA_IGV_2, rewsoft.AppGlobals.FORMA_NUMBER);
        totalS = Ext.util.Format.number(totalS, rewsoft.AppGlobals.FORMA_NUMBER);
        totalD = Ext.util.Format.number(totalS / rewsoft.AppGlobals.TIPO_CAMBIO_VENTA, rewsoft.AppGlobals.FORMA_NUMBER);
        
        neto = neto + '';
        igv = igv + '';
        totalS = totalS + '';
        totalD = totalD + '';
        
        this.getMainView().down('displayfield[name=lblNeto]').setValue(neto);
        this.getMainView().down('displayfield[name=lblIgv]').setValue(igv);
        this.getMainView().down('displayfield[name=lblNoGravado]').setValue(no_gravado);
        this.getMainView().down('displayfield[name=lblTotalS]').setValue(totalS);
        this.getMainView().down('displayfield[name=lblTotalD]').setValue(totalD);
    },
    onClickBtnLimpiarTodo: function(button){
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover todos los producto?', function(btn){
            if(btn=='yes'){
                this.onClickBtnLimpiarTodoYes(button);
            }
        }, this);
    },
    onClickBtnLimpiarTodoYes: function(button){
        button.up('panel').up('panel').down('textfield[name=txtRuc]').setValue('');
        button.up('panel').up('panel').down('textfield[name=txtProveedor]').setValue('');
        button.up('panel').up('panel').down('textfield[name=txtSerie]').setValue('');
        button.up('panel').up('panel').down('textfield[name=txtNuDocumento]').setValue('');
        button.up('panel').up('panel').down('textfield[name=txtSerieOtroComprobante]').setValue('');
        button.up('panel').up('panel').down('textfield[name=txtOtroComprobante]').setValue('');
        this.getMainView().down('combo[name=cboTipoDocumento]').enable();
        button.up('grid').getStore().removeAll();
        this.getProductosStore().loadPage(1);
        this.setMontoTotal(button.up('grid'));
    },
    onClickBtnProcesar: function(button){
        var grid = button.up('grid');
        if(grid.getStore().getCount() == 0){
            return;
        }
        this.onClickBtnProcesarIngresoAlmacen(grid, button);
    },
    onClickBtnProcesarIngresoAlmacen: function(grid, button){
        var btnLimpiarTodo = button.up().down('button[name=btnLimpiarTodo]');
        var numeroSerie = button.up('panel').up('panel').down('textfield[name=txtSerie]').getValue();
        var numeroDocumento = button.up('panel').up('panel').down('textfield[name=txtNuDocumento]').getValue();
        var coProveedor = button.up('panel').up('panel').down('textfield[name=txtRuc]').getValue();

        var setieotroDocumento = button.up('panel').up('panel').down('textfield[name=txtSerieOtroComprobante]').getValue();
        var otroDocumento = button.up('panel').up('panel').down('textfield[name=txtOtroComprobante]').getValue();

        var coAlmacen = this.getMainView().down('combobox[name=cboAlmacen]').getValue();
        var cboTipoDocumento = button.up('panel').up('panel').down('combobox[name=cboTipoDocumento]');
        var coTipoDocumento = cboTipoDocumento.getValue();
        var tipoDocumento;
        var co_forma_pago = this.getMainView().down('combobox[name=cboFormaPago]').getValue();
        var va_neto = this.getMainView().down('displayfield[name=lblNeto]').getValue();
        var va_igv = this.getMainView().down('displayfield[name=lblIgv]').getValue();
        var va_no_gravado = this.getMainView().down('displayfield[name=lblNoGravado]').getValue();
        var va_compra = this.getMainView().down('displayfield[name=lblTotalS]').getValue();

        var co_moneda = this.getMainView().down('combobox[name=cboMoneda]').getValue();
        var fe_compra = this.getMainView().down('datefield[name=txtFeDocumento]').getRawValue();

        if(coTipoDocumento != null){
            tipoDocumento = cboTipoDocumento.getStore().findRecord('id', coTipoDocumento).data.documento;
        }
        if(numeroSerie == ''){
            Ext.Msg.alert('Cuidado!!!', 'Debe ingresar el numero de Serie');
            return;
        }
        if(numeroDocumento == ''){
            Ext.Msg.alert('Cuidado!!!', 'Debe ingresar el numero de Documento');
            return;
        }
        if(coProveedor == ''){
            Ext.Msg.alert('Cuidado!!!', 'Debe ingresar un proveedor');
            return;
        }
        if(coAlmacen == null){
            Ext.Msg.alert('Cuidado!!!', 'Debe elegir un Almacen');
            return;
        }
        Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer procesar la '+tipoDocumento+' No.: '+numeroSerie+'-'+numeroDocumento+' ?', function(btn){
            if(btn=='yes'){
                this.getMainView().down('combo[name=cboTipoDocumento]').enable();
                var detalle = new Array();
                grid.store.each(function(record) {
                    var registro = {
                        co_producto: record.data['co_producto'],
                        no_producto: record.data['no_categoria'],
                        ca_producto: record.data['ca_producto'],
                        no_unidad: record.data['no_unidad'],
                        co_unidad: record.data['co_unidad'],
                        va_compra_sin_igv: record.data['va_compra_sin_igv'],
                        va_compra: record.data['va_compra'],
                        no_lote: record.data['no_lote'],
                        fe_vencimiento: record.data['fe_vencimiento']
                    };
                    detalle.push(registro);
                });
                Ext.Ajax.request({
                    url: 'data/procesarIngresoProductos.php',
                    params: {
                        cia: rewsoft.AppGlobals.CIA,
                        coProveedor: coProveedor,
                        tipoComprobante: coTipoDocumento,
                        numeroDocumento: numeroSerie+'-'+numeroDocumento,
                        otroDocumento: setieotroDocumento+'-'+otroDocumento,
                        neto: va_neto,
                        igv: va_igv,
                        va_no_gravado: va_no_gravado,
                        total: va_compra,
                        coUsuario: rewsoft.AppGlobals.CO_USUARIO,
                        coAlmacen: coAlmacen,
                        co_forma_pago: co_forma_pago,
                        co_moneda: co_moneda,
                        va_tc: '0',
                        fe_compra: fe_compra,
                        va_impuesto: rewsoft.AppGlobals.IGV,
                        detalle: Ext.encode(detalle)
                    },
                    scope: this,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.success) {
                            this.onClickBtnLimpiarTodoYes(btnLimpiarTodo);
                        } else {
                            Ext.Msg.alert('Error!!!', 'Error en el proceso: ' + obj.msg);
                        }
                    }
                });
            }
        }, this);
    },
    formatNumber4: function(value){
        return Ext.util.Format.number(value, "0,000.0000");
    },
    onItemClickGridLotes: function(grid, record){
        //grid.up('window').down('textfield[name=txtLote]').setValue(record.get('no_lote'));
        //grid.up('window').down('datefield[name=txtVencimiento]').setValue(record.get('fe_vencimiento'));
        grid.up('window').down('form').loadRecord(record);
    },
    onSelectCboTipoDocumentos: function(combo, record){
        if(record[0].get('id') == 'GR'){
            this.getMainView().down('grid[name=gridPedido]').columns[4].hide();
            this.getMainView().down('grid[name=gridPedido]').columns[5].hide();
            this.getMainView().down('grid[name=gridPedido]').columns[8].hide();
            this.getMainView().down('grid[name=gridPedido]').columns[9].hide();
            this.getMainView().down('fieldcontainer[name=zoneTotales]').hide();
            //this.getMainView().down('toolbar[name=totales]').hide();
            this.getMainView().down('textfield[name=txtSerieOtroComprobante]').setFieldLabel('Nro. Factura');
        } else {
            this.getMainView().down('grid[name=gridPedido]').columns[4].show();
            this.getMainView().down('grid[name=gridPedido]').columns[5].show();
            this.getMainView().down('grid[name=gridPedido]').columns[8].show();
            this.getMainView().down('grid[name=gridPedido]').columns[9].show();
            this.getMainView().down('fieldcontainer[name=zoneTotales]').show();
            //this.getMainView().down('toolbar[name=totales]').show();
            this.getMainView().down('textfield[name=txtSerieOtroComprobante]').setFieldLabel('Nro. Guia');
        }
    },
    onChangeGridPedido: function(grid){
        /*var count = grid.getStore().getCount();
        if(count > 0){
            this.getMainView().down('combo[name=cboTipoDocumento]').disable();
        } else {
            this.getMainView().down('combo[name=cboTipoDocumento]').enable();
        }*/
    },
    onKeyPressTxtRuc: function(text, key){
        if(key.getKey() == key.ENTER){
            if(text.getValue().length == 0) {

            } else if(text.getValue().length == 110) {
                this.getMainView().down('textfield[name=txtProveedor]').setValue('');
                Ext.getBody().mask('Buscando Proveedor...');
                this.getConsultaRucStore().proxy.extraParams.nu_ruc = text.getValue();
                this.getConsultaRucStore().load({
                    callback: function(record, operation, success) {
                        Ext.getBody().unmask();
                        if(record[0].data.razon_social==""){
                            Ext.Msg.alert('Registro de Compras', 'EL numero de RUC: '+text.getValue()+' no existe.');
                        } else {
                            this.getMainView().down('textfield[name=txtProveedor]').setValue(record[0].data.razon_social);
                            this.getMainView().down('combobox[name=cboFormaPago]').setValue(record[0].data.co_forma_pago);
                            Ext.Ajax.request({
                                url: 'data/createProveedor.php',
                                params: {
                                    ruc: text.getValue(),
                                    razon_social: record[0].data.razon_social,
                                    direccion: record[0].data.direccion
                                },
                                success: function(response){
                                //console.log(response.responseText);
                                }
                            });
                        }
                    },
                    scope: this
                });
            } else if(text.getValue().length == 11) {
                this.getProveedoresStore().proxy.extraParams.nu_ruc = text.getValue();
                this.getProveedoresStore().load({
                    callback: function(record, operation, success) {
                        if(success){
                            Ext.Array.forEach (record, function(item, index, allItems){
                                this.getMainView().down('textfield[name=txtProveedor]').setValue(item.get('no_razon_social'));
                                this.getMainView().down('combobox[name=cboFormaPago]').setValue(item.get('co_forma_pago'));
                            }, this);
                        }
                    },
                    scope: this
                });
            } else {
                Ext.Msg.alert('Error!!!', "El numero de RUC debe contener 11 caracteres");
                text.focus();
            }
        }
    },
    onKeyPressVaCompraSinIgv: function(text, key){
        if(key.getKey() == key.ENTER){
            if(text.getValue() > 0 ){
                var con_igv = text.getValue() * rewsoft.AppGlobals.VA_IGV;
                this.getWinAlmacenCantidad().down('numberfield[name=va_compra]').setValue(con_igv);
            }
        }
    },
    onKeyPressVaCompra: function(text, key){
        if(key.getKey() == key.ENTER){
            if(text.getValue() > 0 ){
                var sin_igv = text.getValue() / rewsoft.AppGlobals.VA_IGV;
                this.getWinAlmacenCantidad().down('numberfield[name=va_compra_sin_igv]').setValue(sin_igv);
            }
        }
    },
    onRenderCboMoneda: function(combo){
        combo.setValue('S');
    },
    onSelectCboMoneda: function(combo){
        if(combo.getValue() == 'S'){
            this.getMainView().down('displayfield[name=lblTotalS]').setFieldLabel('Total S/.');
        }else {
            this.getMainView().down('displayfield[name=lblTotalS]').setFieldLabel('Total U$D');
        }
    },
    onChangeChkSinLote: function(check, newValue, oldValue){
        var txtLote = this.getWinAlmacenCantidad().down('textfield[name=no_lote]')
        var txtVencimiento = this.getWinAlmacenCantidad().down('datefield[name=fe_vencimiento]')
        if(newValue){
            txtLote.setValue('S/L');
            txtLote.disable();
            txtVencimiento.disable();
        }else{
            txtLote.setValue('');
            txtLote.enable();
            txtVencimiento.enable();
        }
    }
});