Ext.define('rewsoft.view.mantenimiento.producto.WinProductosCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.winproductoscantidad',
    title: 'Productos',
    width: 300,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            frame: true,
            layout: {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start'
            },
            defaults: {
                allowBlank: false,
                labelWidth: 60
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'co_producto'
            },{
                xtype: 'hiddenfield',
                name: 'costo_s'
            },{
                xtype: 'displayfield',
                name: 'no_producto',
                value: 'Producto',
                fieldStyle: 'color: red; font-size: 18px; background: none; border: none'
            },{
                xtype: 'numberfield',
                name: 'txtCantidad',
                fieldLabel: 'Cantidad',
                value: 1,
                minValue: 1
            },{
                xtype: 'combobox',
                name: 'cboUnidad',
                fieldLabel: 'Unidad',
                store: 'UnidadesVentaByProducto',
                valueField: 'id',
                displayField: 'no_unidad',
                queryMode: 'local',
                editable: false
            },{
                xtype: 'combobox',
                name: 'cboAlmacen',
                fieldLabel: 'Almacen',
                store: 'Almacen',
                valueField: 'co_almacen',
                displayField: 'no_almacen',
                queryMode: 'local',
                editable: false
            }],
            buttons: [{
                name: 'btnAceptar',
                text: 'Aceptar'
            },{
                name: 'btnCancelar',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }],
        this.callParent(arguments);
    }
});