Ext.define('rewsoft.view.almacen.transferencia.WinCantidad', {
    extend: 'Ext.Window',
    alias: 'widget.winalmacentransferenciacantidad',
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
                    allowBlank: true,
                    minValue: 1,
                    enableKeyEvents: true,
                    labelWidth: 55,
                    allowBlank: false,
                    width: 140
                },{
                    xtype: 'textfield',
                    name: 'fe_vencimiento',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'Vencimiento',
                    allowBlank: true,
                    enableKeyEvents: true,
                    readOnly: true,
                    labelWidth: 75,
                    allowBlank: false,
                    flex: 1,
                    margins: '0 0 0 5'
                },{
                    xtype: 'displayfield',
                    hidden: true,
                    name: 'ca_stock',
                    fieldLabel: 'Stock Sistema',
                    value: 0,
                    margins: '5 0 0 5'
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
                    xtype: 'combobox',
                    name: 'no_almacen_destino',
                    style: 'margin-top: 5px;',
                    fieldLabel: 'Almacen',
                    allowBlank: true,
                    labelWidth: 55,
                    store: 'AlmacenTranslado',
                    valueField: 'co_almacen',
                    displayField: 'no_almacen',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    flex: 1
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
                    width: 150
                },{
                    header: 'Vencimiento',
                    dataIndex: 'fe_vencimiento',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
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