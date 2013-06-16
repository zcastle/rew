Ext.define('rewsoft.view.compras.WinCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.wincomprascantidad',
    title: 'Ingreso de Cantidad',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'hidden',
            name: 'txtCodigo'
        },{
            xtype: 'label',
            name: 'lblProducto',
            baseCls: 'titulo-producto',
            text: 'Nombre Producto'
        },{
            xtype: 'numberfield',
            style: 'margin-top: 5px;',
            fieldLabel: 'Cantidad',
            allowDecimals: false,
            allowNegative: false,
            allowBlank: false,
            minValue: 1,
            enableKeyEvents: true,
            labelWidth: 55,
            width: 140,
            value: 1
        },{
            xtype: 'textfield',
            name: 'txtPrecio',
            style: 'margin-top: 5px;',
            fieldLabel: 'Precio',
            allowNegative: false,
            allowBlank: false,
            minValue: 1,
            enableKeyEvents: true,
            labelWidth: 55,
            width: 140
        }],
        this.buttons = [{
            name: 'btnAceptar',
            text: 'Aceptar'
        },{
            text: 'Cancelar',
            scope: this,
            handler: this.close
        }]
        this.callParent(arguments);
    }      
});