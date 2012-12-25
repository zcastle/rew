Ext.define('rewsoft.view.almacen.WinCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.winalmacencantidad',
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
                    labelWidth: 65,
                    width: 150,
                    value: 1
                },{
                    xtype: "combobox",
                    style: 'margin-top: 5px;',
                    name: "co_unidad", 
                    fieldLabel: "Und. Compra",
                    store: 'UnidadesVentaByProducto',
                    valueField: 'id',
                    displayField: 'no_unidad',
                    queryMode: 'local',
                    //typeAhead: true,
                    editable: false,
                    labelWidth: 100,
                    flex: 1,
                    margins: '0 0 0 5'
                }]
            },{
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                name: 'zonePrecios',
                frame: true,
                style: 'border: 0px none; margin: 0; padding: 0;',
                items:[{
                    xtype: 'numberfield',
                    name: 'va_compra_sin_igv',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'V. Compra',
                    allowNegative: false,
                    allowBlank: false,
                    minValue: 0,
                    enableKeyEvents: true,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    decimalPrecision: rewsoft.AppGlobals.DECIMALES,
                    labelWidth: 65,
                    width: 150
                },{
                    xtype: 'numberfield',
                    name: 'va_compra',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'Precio Compra',
                    allowNegative: false,
                    allowBlank: true,
                    minValue: 0,
                    enableKeyEvents: true,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    decimalPrecision: rewsoft.AppGlobals.DECIMALES,
                    labelWidth: 100,
                    flex: 1,
                    margins: '0 0 0 5'
                }]
            },{
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                name: 'zoneLotes',
                frame: true,
                style: 'border: 0px none; margin: 0; padding: 0;',
                items:[{
                    xtype: 'checkboxfield',
                    name: 'chkSinLote',
                    width: 70,
                    boxLabel  : 'S/Lote'
                },{
                    xtype: 'textfield',
                    name: 'no_lote',
                    style: 'margin-top: 5px;',
                    allowNegative: false,
                    allowBlank: true,
                    minValue: 1,
                    enableKeyEvents: true,
                    //labelWidth: 65,
                    width: 80
                },{
                    xtype: 'datefield',
                    name: 'fe_vencimiento',
                    format: 'd/m/Y',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'Vencimiento',
                    allowBlank: true,
                    enableKeyEvents: true,
                    labelWidth: 100,
                    flex: 1,
                    margins: '0 0 0 5'
                }]
            },{
                xtype: 'grid',
                name: 'gridLotes',
                height: 100,
                //hidden: true,
                margins: '5 0 0 0',
                store: 'Lotes',
                columns: [{
                    header: 'Lote',
                    dataIndex: 'no_lote',
                    menuDisabled: true,
                    sortable: false,
                    width: 150
                },{
                    header: 'Vencimiento',
                    dataIndex: 'fe_vencimiento',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
                },{
                    header: 'Stock',
                    dataIndex: 'ca_stock',
                    menuDisabled: true,
                    sortable: false,
                    width: 50
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