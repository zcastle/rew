Ext.define('rewsoft.view.almacen.requerimiento.WinCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.winalmacenrequerimiento',
    title: 'Ingreso de Cantidad',
    width: 400,
    modal: true,
    border: false,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            border: false,
            frame: true,
            items: [{
                xtype: 'hiddenfield',
                name: 'co_producto'
            },{
                xtype: 'label',
                name: 'no_producto',
                baseCls: 'titulo-producto',
                text: 'Nombre Producto'
            },{
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                frame: true,
                style: 'border: 0px none; margin: 0; padding: 0;',
                items:[{
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
                    width: 140,
                    value: 1
                },{
                    xtype: "combobox",
                    style: 'margin-top: 5px;',
                    name: "co_unidad", 
                    fieldLabel: "Und. Medida",
                    store: 'UnidadesVentaByProducto',
                    valueField: 'id',
                    displayField: 'no_unidad',
                    queryMode: 'local',
                    //typeAhead: true,
                    editable: false,
                    labelWidth: 75,
                    flex: 1,
                    margins: '0 0 0 5'
                }]
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