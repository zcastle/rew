Ext.define('rewsoft.controller.mantenimiento.productos.WinProductosNuevo', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.WinProductosNuevo'
    ],
    stores: [
    'Productos',
    'Grupo',
    'UnidadesVenta',
    'Almacen',
    'Precio',
    'Receta',
    'Destino'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winproductosnuevo'
    }],
    init: function() {
        this.control({
            'winproductosnuevo': {
                render: this.onRenderWinProductosNuevo,
                afterrender: this.onAfterRenderWinProductosNuevo
            },
            'winproductosnuevo button[name=btnCrear]': {
                click: this.onClickBtnCrear
            },
            'winproductosnuevo button[name=btnEditar]': {
                click: this.onClickBtnEditar
            },
            'winproductosnuevo button[name=btnPorcentajePrecio]':{
                click: this.onClickBtnPorcentajePrecio
            },
            'winproductosnuevo grid[name=gridPrecios]':{
                cellclick: this.onCellClickGridPrecios
            },
            'winproductosnuevo numberfield[name=txtPorcentajePrecio]': {
                keypress: this.onKeyPressTxtPorcentajePrecio
            },
            'winproductosnuevo button[name=btnAdd]':{
                click: this.onClickBtnAdd
            },
            'winproductosnuevo button[name=btnEliminarTodo]':{
                click: this.onClickBtnEliminarTodo
            },
            'winproductosnuevo textfield[name=co_categoria]': {
                keypress: this.onKeypressTxtCategoriaCodigo
            },
            'winproductosnuevo textfield[name=co_sub_categoria]': {
                keypress: this.onKeypressTxtSubCategoria
            },
            'winproductosnuevo textfield[name=co_pais_procedencia]': {
                keypress: this.onKeypressTxtPaisProcedencia
            },
            'winproductosnuevo combobox[name=co_grupo]': {
                select: this.onSelectCoGrupo
            },
            'winproductosnuevo grid[name=gridReceta]':{
                cellclick: this.onCellClickGridReceta
            },
            'winproductosnuevo button[name=btnAplicarCosto]': {
                click: this.onClickBtnAplicarCosto
            },
            'winproductosnuevo button[name=btnAplicarVentaSugerido]': {
                click: this.onClickBtnAplicarVentaSugerido
            },
            'winproductosnuevo textfield[name=no_producto]': {
                focus: this.onFocusNoProducto
            },
            'winproductosnuevo checkboxfield[name=chkMostrarFormula]': {
                change: this.onMostrarFormula
            },
            'winproductosnuevo numberfield[name=va_peso]': {
                keypress: this.onKeypressVaPeso
            },
            'winproductosnuevo numberfield[name=precio0]': {
                keypress: this.onKeypressPrecio0
            }
        });
    },
    onRenderWinProductosNuevo: function(win){
        win.down('fieldcontainer[name=zonaMarca]').hide();
        win.down('fieldcontainer[name=zonaPaisProcedencia]').hide();
        win.down('fieldcontainer[name=zonaPrecioCaja]').hide();
        win.down('checkbox[name=fl_serv]').hide();
        win.down('fieldset[name=zonaPrecios]').hide();
        win.down('fieldcontainer[name=zonaRecetas]').hide();
        win.down('fieldcontainer[name=zonaOrdenDestino]').hide();
        //win.down('fieldcontainer[name=zonaPresentacion]').hide();
        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_DSILVANA){
            win.down('fieldcontainer[name=zonaRecetas]').show();
            win.down('checkbox[name=fl_serv]').show();
            win.down('combobox[name=co_grupo]').show();
            win.down('fieldcontainer[name=zonaOrdenDestino]').show();
        } else if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
            win.down('fieldcontainer[name=zonaMarca]').show();
            win.down('fieldcontainer[name=zonaPaisProcedencia]').show();
            win.down('fieldcontainer[name=zonaPrecioCaja]').show();
            //win.down('fieldcontainer[name=zonaPresentacion]').show();
            win.down('fieldset[name=zonaPrecios]').show();
        }
        this.getGrupoStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getGrupoStore().load();
        this.getUnidadesVentaStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getUnidadesVentaStore().load();
        this.getPrecioStore().proxy.extraParams.co_producto = this.getMainView().down('hidden').getValue();
        this.getPrecioStore().load();
        this.getRecetaStore().proxy.extraParams.co_producto = this.getMainView().down('hidden').getValue();
        this.getRecetaStore().load({
            callback: function(){
                this.setCosto(this.getRecetaStore());
            },
            scope: this
        });
        this.getDestinoStore().load();
    },
    onAfterRenderWinProductosNuevo: function(win){
        if(this.getMainView().down('hidden').getValue() == ''){
            win.down('combobox[name=co_grupo]').setValue('40');
            win.down('textfield[name=co_sub_categoria]').setValue('00021');
            win.down('displayfield[name=no_sub_categoria]').setValue('NACIONAL');
            win.down('textfield[name=co_pais_procedencia]').setValue('00001');
            win.down('displayfield[name=no_pais_procedencia]').setValue('PERU');
            if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                win.down('combobox[name=co_unidad]').setValue('6');
            }else{
                win.down('combobox[name=co_unidad]').setValue('1');
            }
        }
        this.onSelectCoGrupo(win.down('combobox[name=co_grupo]'));
    },
    onClickBtnCrear: function(btn){
        var form = Ext.getCmp('frmMantenimientoProductosCrear');
        if (form.getForm().isValid()){
            Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer grabar el producto?', function(btn){
                if(btn=='yes'){
                    var values = form.getValues();
                    var precios = new Array();
                    var gridPrecios = this.getMainView().down('grid[name=gridPrecios]');
                    gridPrecios.store.each(function(record) {
                        var registro = {
                            va_per: record.data['va_per'],
                            va_precio: record.data['va_precio']
                        };
                        precios.push(registro);
                    });
                    values.precios = precios;
                    var receta = new Array();
                    var gridReceta = this.getMainView().down('grid[name=gridReceta]');
                    gridReceta.store.each(function(record) {
                        var registro = {
                            co_producto: record.data['co_producto'],
                            ca_producto: record.data['ca_producto'],
                            co_unidad: record.data['co_unidad'],
                            no_unidad: record.data['no_unidad'],
                            ca_unidad: record.data['ca_unidad'],
                            va_compra: record.data['va_compra'],
                            co_almacen: record.data['co_almacen']
                        };
                        receta.push(registro);
                    });
                    values.receta = receta;
                    if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                        this.getProductosStore().proxy.extraParams.co_empresa = '01-02-03';
                    }else{
                        this.getProductosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
                    }
                    this.getProductosStore().insert(0, values);
                    this.getProductosStore().sync({
                        callback: function() {
                            this.getProductosStore().load();
                        },
                        scope: this
                    });
                    form.up('window').close();
                }
            }, this);
        }else{
            Ext.Msg.alert("Error","Todos los campos son requeridos");
        }
    },
    onClickBtnEditar: function(btn){
        var form = btn.up('form');
        if (form.getForm().isValid()){
            Ext.Msg.confirm('Confirmacion', 'Esta seguro de querer editar el producto?', function(btn){
                if(btn=='yes'){
                    var record = form.getRecord();
                    var values = form.getValues();
                    var precios = new Array();
                    var grid = this.getMainView().down('grid');
                    var co_producto = this.getMainView().down('hidden').getValue();
                    grid.store.each(function(record) {
                        var registro = {
                            co_producto: co_producto,
                            va_per: record.data['va_per'],
                            va_precio: record.data['va_precio']
                        };
                        precios.push(registro);
                    });
                    values.precios = precios;
                    var receta = new Array();
                    var gridReceta = this.getMainView().down('grid[name=gridReceta]');
                    gridReceta.store.each(function(record) {
                        var registro = {
                            co_producto: record.data['co_producto'],
                            ca_producto: record.data['ca_producto'],
                            co_unidad: record.data['co_unidad'],
                            no_unidad: record.data['no_unidad'],
                            ca_unidad: record.data['ca_unidad'],
                            va_compra: record.data['va_compra'],
                            co_almacen: record.data['co_almacen']
                        };
                        receta.push(registro);
                    });
                    values.receta = receta;
                    record.set(values);
                    this.getProductosStore().sync({
                        callback: function() {
                            this.getProductosStore().load();
                        },
                        scope: this
                    });
                    form.up('window').close();
                }
            }, this);
        }else{
            Ext.Msg.alert("Error","Todos los campos son requeridos");
        }
    },
    onClickBtnPorcentajePrecio: function(){
        var costo = this.getMainView().down('numberfield[name=va_compra]').getValue();
        var per = this.getMainView().down('numberfield[name=txtPorcentajePrecio]').getValue();
        var grid = this.getMainView().down('grid');
        if(per > 0){
            var precio0 = costo * ((per / 100) + 1);
            var precio = Ext.create('rewsoft.store.Precio', {
                va_per: per,
                va_precio: precio0
            });
            var count = grid.getStore().getCount();
            grid.getStore().insert(count, precio);
            this.setPrecio(grid);
            this.getMainView().down('numberfield[name=txtPorcentajePrecio]').setValue('0');
            this.getMainView().down('numberfield[name=txtPorcentajePrecio]').focus();
        }else{
            Ext.Msg.alert('Error!!!', 'Debe ingresar un porcentaje valido');
        }
    },
    setPrecio: function(grid){
        var per = 100;
        grid.store.each(function(record){
            if(record.data['va_per'] < per){
                per = record.data['va_per'];
            }
        });
        var costo = this.getMainView().down('numberfield[name=va_compra]').getValue();
        var precio0 = costo * ((per / 100) + 1);
        this.getMainView().down('numberfield[name=precio0]').setValue(precio0);
    },
    onCellClickGridPrecios: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        if(columnIndex == 2) { //Remover
            var precio = record.get('va_precio');
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover el precio: ' + precio + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    this.setPrecio(grid);
                }
            }, this);
        }
    },
    onKeyPressTxtPorcentajePrecio: function(text, key){
        if(key.getKey() == key.ENTER){
            this.onClickBtnPorcentajePrecio();
        }
    },
    onClickBtnAdd: function(){
        var winProductos = Ext.widget('winproductos');
        winProductos.show();
    },
    onClickBtnEliminarTodo: function(){
        Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover todos los productos de la receta?', function(btn){
                if(btn=='yes'){
                    this.getRecetaStore().removeAll();
                    this.setCosto(this.getRecetaStore());
                }
            }, this);
    },
    onKeypressTxtCategoriaCodigo: function(text, e){
        if(e.getKey() == e.ENTER){
            var destino = this.getMainView().down('displayfield[name=no_categoria]');
            if(text.getValue() != ''){
                this.getCodigo(2, text.getValue(), destino);
            } else {
                Ext.widget('wincategorias').show();
            }
        }
    },
    onKeypressTxtSubCategoria: function(text, e){
        if(e.getKey() == e.ENTER){
            var destino = this.getMainView().down('displayfield[name=no_sub_categoria]');
            if(text.getValue() != ''){
                this.getCodigo(3, text.getValue(), destino);
            } else {
                Ext.widget('winsubcategorias').show();
            }
        }
    },
    onKeypressTxtPaisProcedencia: function(text, e){
        if(e.getKey() == e.ENTER){
            var destino = this.getMainView().down('displayfield[name=no_pais_procedencia]');
            if(text.getValue() != ''){
                this.getCodigo(4, text.getValue(), destino);
            } else {
                Ext.widget('winprocedencias').show();
            }
        }
    },
    getCodigo: function(id, codigo, destino){
        Ext.Ajax.request({
            url: 'data/readDescripcionByCodigo.php',
            params: {
                id: id,
                codigo: codigo
            },
            scope: this,
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(obj.success) {
                    destino.setValue(obj.data);
                } else {
                    destino.setValue('');
                    switch(id){
                        case 2:
                            Ext.widget('wincategorias').show();
                            break;
                        case 3:
                            Ext.widget('winsubcategorias').show();
                            break;
                        case 4:
                            Ext.widget('winprocedencias').show();
                            break;
                    }
                }
            }
        });
    },
    onSelectCoGrupo: function(combo){
        if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_DSILVANA){
            this.getMainView().down('numberfield[name=precio0]').hide();
            this.getMainView().down('fieldcontainer[name=zonaStock]').hide();
            this.getMainView().down('checkbox[name=fl_serv]').hide();
            this.getMainView().down('fieldcontainer[name=zonaUnidadMedida]').hide();
            //this.getMainView().down('fieldcontainer[name=zonaRecetas]').hide();
            switch(combo.getValue()){
                case '10':
                    this.getMainView().down('fieldcontainer[name=zonaUnidadMedida]').show();
                    this.getMainView().down('fieldcontainer[name=zonaStock]').show();
                    this.getMainView().down('fieldcontainer[name=zonaOrdenDestino]').hide();
                    break;
                case '40':
                    this.getMainView().down('numberfield[name=precio0]').show();
                    this.getMainView().down('checkbox[name=fl_serv]').show();
                    this.getMainView().down('fieldcontainer[name=zonaRecetas]').show();
                    this.getMainView().down('fieldcontainer[name=zonaOrdenDestino]').show();
                    break;
            }
        }
    },
    onCellClickGridReceta: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        if(columnIndex == 7) { //Remover
            var producto = record.get('no_producto');
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover el producto: ' + producto + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    this.setCosto(grid.getStore());
                }
            }, this);
        }
    },
    addProducto: function(co_producto, no_producto, ca_producto, co_unidad, no_unidad, ca_unidad, va_compra, co_almacen, no_almacen){
        var va_total = va_compra * ca_producto;
        var precio = Ext.create('rewsoft.store.Receta', {
            co_producto: co_producto,
            no_producto: no_producto,
            ca_producto: ca_producto,
            co_unidad: co_unidad,
            no_unidad: no_unidad,
            ca_unidad: ca_unidad,
            va_compra: va_compra,
            va_total: va_total,
            co_almacen: co_almacen,
            no_almacen: no_almacen
        });
        var count = this.getRecetaStore().getCount();
        this.getRecetaStore().insert(count, precio);
        this.setCosto(this.getRecetaStore());
    },
    setCosto: function(store){
        var costo = 0;
        var ventaSugerido = 0;
        store.each(function(record){
            costo = costo + record.data['va_total'];
        });
        ventaSugerido = (costo * 100) / 23;
        this.getMainView().down('displayfield[name=totalCosto]').setValue(Ext.util.Format.number(costo, "0,000.0000"));
        this.getMainView().down('displayfield[name=ventaSugerido]').setValue(Ext.util.Format.number(ventaSugerido, "0,000.0000"));
        this.getMainView().down('displayfield[name=formula]').setValue('('+costo+' * 100) / 23');
    },
    onClickBtnAplicarCosto: function(){
        this.getMainView().down('numberfield[name=va_compra]').setValue(this.getMainView().down('displayfield[name=totalCosto]').getValue());
    },
    onClickBtnAplicarVentaSugerido: function(){
        this.getMainView().down('numberfield[name=precio0]').setValue(this.getMainView().down('displayfield[name=ventaSugerido]').getValue());
    },
    onFocusNoProducto: function(text, event, opt){
    },
    onMostrarFormula: function(check, newValue, oldValue){
        var formula = this.getMainView().down('displayfield[name=formula]')
        if(newValue){
            formula.show();
        }else{
            formula.hide();
        }
    },
    onKeypressVaPeso: function(text, key){
        if (key.getKey() == key.ENTER) {
            var costo = this.getMainView().down('numberfield[name=va_compra]').getValue();
            var peso = text.getValue();
            if (peso > 0) {
                if (costo > 0) {
                    var precio0 = costo * peso;
                    this.getMainView().down('numberfield[name=precio0]').setValue(precio0);
                } else {
                    Ext.Msg.alert('Error!!!', 'Debe ingresar un costo valido');
                    this.getMainView().down('numberfield[name=va_compra]').focus()
                }
            } else {
                Ext.Msg.alert('Error!!!', 'Debe ingresar un peso valido');
                text.focus();
            }
        }
    },
    onKeypressPrecio0: function(text, key){
        if (key.getKey() == key.ENTER) {
            //var costo = this.getMainView().down('numberfield[name=va_compra]').getValue();
            var peso = this.getMainView().down('numberfield[name=va_peso]').getValue();
            var precio0 = text.getValue();
            if (peso > 0) {
                if(precio0 > 0) {
                    var costo = precio0 / peso;
                    this.getMainView().down('numberfield[name=va_compra]').setValue(costo);
                } else {
                    Ext.Msg.alert('Error!!!', 'Debe ingresar un precio valido');
                    text.focus();
                }
            } else {
                Ext.Msg.alert('Error!!!', 'Debe ingresar un peso valido');
                this.getMainView().down('numberfield[name=va_peso]').focus();
            }
        }
    }
});