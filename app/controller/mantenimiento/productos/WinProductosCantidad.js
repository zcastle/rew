Ext.define('rewsoft.controller.mantenimiento.productos.WinProductosCantidad', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.producto.WinProductosCantidad'
    ],
    stores: [
    'Almacen',
    'Receta',
    'UnidadesVentaByProducto'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winproductoscantidad'
    }],
    init: function() {
        this.control({
            'winproductoscantidad': {
                render: this.onRenderedWinProductosCantidad,
                afterrender: this.onAfterRenderedWinProductosCantidad
            },
            'winproductoscantidad button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            }
        });
    },
    onRenderedWinProductosCantidad: function() {
        this.getAlmacenStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getAlmacenStore().load();
    },
    onAfterRenderedWinProductosCantidad: function(win){
        win.down('combobox[name=cboAlmacen]').setValue('400');
        this.getUnidadesVentaByProductoStore().proxy.extraParams.co_producto = this.getMainView().down('hiddenfield[name=co_producto]').getValue();
        this.getUnidadesVentaByProductoStore().load({
            callback: function(record, operation, success) {
                win.down('combobox[name=cboUnidad]').setValue(record[0].data.id);
            },
            scope: this
        });
    },
    onClickBtnAceptar: function(){
        if(true){
            var co_producto = this.getMainView().down('hiddenfield[name=co_producto]').getValue()
            var no_producto = this.getMainView().down('displayfield[name=no_producto]').getValue()
            var va_compra = this.getMainView().down('hiddenfield[name=costo_s]').getValue()
            var ca_producto = this.getMainView().down('numberfield[name=txtCantidad]').getValue()
            var co_almacen = this.getMainView().down('combobox[name=cboAlmacen]').getValue()
            var no_almacen = this.getMainView().down('combobox[name=cboAlmacen]').getRawValue()
            var co_unidad = this.getMainView().down('combobox[name=cboUnidad]').getValue();
            var no_unidad = this.getMainView().down('combobox[name=cboUnidad]').getRawValue();
            var ca_unidad;
            if(co_unidad.length > 1){
                var record = this.getMainView().down('combobox[name=cboUnidad]').findRecord('id', co_unidad);
                ca_unidad = record.get('ca_sub_unidad');
                costo_s = costo_s / record.get('ca_sub_unidad');
            }
            this.getController('mantenimiento.productos.WinProductosNuevo').addProducto(co_producto, no_producto, ca_producto, co_unidad, no_unidad, ca_unidad, va_compra, co_almacen, no_almacen);
            this.getMainView().close();
        }else{
            Ext.Msg.alert('Error!!!', 'Debe ingresar un porcentaje valido');
        }
    }
});