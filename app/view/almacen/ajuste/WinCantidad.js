Ext.define('rewsoft.view.almacen.ajuste.WinCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.winalmacenajustecantidad',
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
            },{
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                frame: true,
                style: 'border: 0px none; margin: 0; padding: 0;',
                items:[{
                    xtype: 'textfield',
                    name: 'no_lote',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'Lote',
                    allowNegative: false,
                    allowBlank: false,
                    minValue: 1,
                    enableKeyEvents: true,
                    labelWidth: 55,
                    readOnly: true,
                    width: 140
                },{
                    xtype: 'textfield',
                    name: 'fe_vencimiento',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'Vencimiento',
                    allowBlank: false,
                    enableKeyEvents: true,
                    readOnly: true,
                    labelWidth: 75,
                    flex: 1,
                    margins: '0 0 0 5'
                },{
                    xtype: 'displayfield',
                    hidden: true,
                    name: 'ca_stock'
                },{
                    xtype: 'displayfield',
                    hidden: true,
                    name: 'co_almacen'
                },{
                    xtype: 'displayfield',
                    hidden: true,
                    name: 'no_almacen'
                }]
            },{
                xtype: 'grid',
                name: 'gridLotes',
                height: 100,
                margins: '5 0 0 0',
                store: 'Lotes',
                columns: [{
                    header: 'Lote',
                    dataIndex: 'no_lote',
                    menuDisabled: true,
                    sortable: false,
                    width: 100
                },{
                    header: 'Vencimiento',
                    dataIndex: 'fe_vencimiento',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
                },{
                    header: 'Stock',
                    hidden: true,
                    dataIndex: 'ca_stock',
                    menuDisabled: true,
                    sortable: false,
                    width: 50
                },{
                    header: 'Almacen',
                    dataIndex: 'no_almacen',
                    menuDisabled: true,
                    sortable: false,
                    flex: 1
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