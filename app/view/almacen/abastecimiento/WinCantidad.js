Ext.define('rewsoft.view.almacen.abastecimiento.WinCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.winabastecimientocantidad',
    title: 'Ingreso de Cantidad',
    width: 200,
    modal: true,
    resizable: false,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            frame: true,
            border: false,
            items: [{
                xtype: 'hidden',
                name: 'co_producto'
            },{
                xtype: 'label',
                name: 'no_producto',
                baseCls: 'titulo-producto',
                text: 'Nombre Producto'
            },{
                xtype: 'numberfield',
                style: 'margin-top: 5px;',
                name: 'ca_producto',
                fieldLabel: 'Cantidad',
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                minValue: 1,
                enableKeyEvents: true,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                labelWidth: 55,
                width: 160,
                value: 1,
                margins: '0 0 0 5'
            }]
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