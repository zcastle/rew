Ext.define('rewsoft.view.almacen.PnlIngresodeProducto', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnlingresodeproducto',
    border: false,
    layout: 'border',
    initComponent: function() {
        this.items = [{
            region: 'center',
            layout: 'border',
            flex: 1,
            border: false,
            items: [{
                region: 'north',
                frame: true,
                border: false,
                defaults: {
                    frame: true,
                    style: 'border: 0px none; margin: 0; padding: 0;',
                    defaults:{
                        margins:'0 5 5 0'
                    }
                },
                items: [{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items:[{
                        xtype: "combobox",
                        name: "cboTipoDocumento", 
                        fieldLabel: "Documento",
                        labelWidth: 70,
                        store: 'DocumentosAlmacen',
                        valueField: 'id',
                        displayField: 'documento',
                        queryMode: 'local',
                        editable: false,
                        width: 220
                    },{
                        xtype: "textfield",
                        name: "txtSerie", 
                        width: 70
                    },{
                        xtype: 'label',
                        text: '-',
                        margin: '3 0 0 0'
                    },{
                        xtype: "textfield",
                        name: "txtNuDocumento", 
                        width: 120
                    },{
                        xtype: "datefield",
                        name: "txtFeDocumento",
                        fieldLabel: "Fecha Documento",
                        labelWidth: 105,
                        width: 210,
                        value: new Date()
                    },{
                        xtype: "combobox",
                        name: "cboMoneda", 
                        fieldLabel: "Moneda",
                        labelWidth: 60,
                        store: 'Monedas',
                        valueField: 'codigo',
                        displayField: 'moneda',
                        queryMode: 'local',
                        editable: false,
                        width: 150
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items:[{
                        xtype: "textfield",
                        name: "txtRuc", 
                        fieldLabel: "Proveedor",
                        labelWidth: 70,
                        width: 180,
                        enableKeyEvents: true
                    },{
                        xtype: "textfield",
                        name: "txtProveedor",
                        readOnly: true,
                        flex: 1
                    },{
                        xtype: "combobox",
                        name: "cboAlmacen", 
                        fieldLabel: "Almacen",
                        store: 'Almacen',
                        valueField: 'co_almacen',
                        displayField: 'no_almacen',
                        queryMode: 'local',
                        editable: false,
                        labelWidth: 50,
                        width: 300
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: "textfield",
                        name: "txtSerieOtroComprobante",
                        fieldLabel: "Nro. Guia",
                        labelWidth: 70,
                        width: 180
                    },{
                        xtype: 'label',
                        text: '-',
                        margin: '3 0 0 0'
                    },{
                        xtype: "textfield",
                        name: "txtOtroComprobante",
                        width: 120
                    },{
                        xtype: "combobox",
                        name: "cboFormaPago", 
                        fieldLabel: "Forma de Pago",
                        store: 'FormaPago',
                        valueField: 'co_forma_pago',
                        displayField: 'no_forma_pago',
                        queryMode: 'local',
                        editable: false,
                        labelWidth: 90
                    }]
                }]
            },{
                region: 'center',
                xtype: 'grid',
                name: 'gridPedido',
                store: 'IngresoProductos',
                columns: [{
                    header: 'Codigo',    
                    dataIndex: 'co_producto',
                    menuDisabled: true,
                    sortable: false,
                    width: 70/*,
                    renderer : function(val, val2, record){
                        if (record.get('fl_igv') == 'N') {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    }*/
                },{
                    header: 'Producto',
                    dataIndex: 'no_producto',
                    menuDisabled: true,
                    sortable: false,
                    flex: 1
                },{
                    header: 'Lote',
                    dataIndex: 'no_lote',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
                },{
                    header: 'Vencimiento',
                    dataIndex: 'fe_vencimiento',
                    menuDisabled: true,
                    sortable: false,
                    width: 70
                },{
                    header: 'Valor Compra',
                    dataIndex: 'va_compra_sin_igv',
                    align: 'right',
                    menuDisabled: true,
                    sortable: false,
                    width: 80,
                    renderer: function(val){
                        return Ext.util.Format.number(val, "0,000.0000");
                    }
                },{
                    header: 'Precio Compra',
                    dataIndex: 'va_compra',
                    align: 'right',
                    menuDisabled: true,
                    sortable: false,
                    width: 80,
                    renderer: function(val){
                        return Ext.util.Format.number(val, "0,000.0000");
                    }
                },{
                    header: 'Cantidad',
                    dataIndex: 'ca_producto',
                    menuDisabled: true,
                    sortable: false,
                    width: 60
                },{
                    header: 'Medida',
                    dataIndex: 'no_unidad',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
                },{
                    header: 'Total',
                    dataIndex: 'va_total',
                    align: 'right',
                    width: 70,
                    menuDisabled: true,
                    sortable: false,
                    renderer: function(val){
                        return Ext.util.Format.number(val, "0,000.0000");
                    }
                },{
                    header: 'Afecto',
                    dataIndex: 'fl_igv',
                    menuDisabled: true,
                    sortable: false,
                    width: 50,
                    renderer : function(val){
                        if (val == 'N') {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    }
                },{
                    xtype: 'actioncolumn',
                    width: 20,
                    menuDisabled: true,
                    items: [{
                        icon: 'resources/images/remove.gif',
                        tooltip: 'Remover'
                    }]
                }],
                dockedItems: [{
                    xtype: 'fieldcontainer',
                    dock: 'bottom',
                    layout: 'hbox',
                    name: 'totales',
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        flex: 1,
                        items: [{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'button'
                            },
                            items: [{
                                text: 'Limpiar todo',
                                name: 'btnLimpiarTodo',
                                iconCls: 'ico-limpiar-large',
                                scale: 'large'
                            },{
                                text: 'Procesar',
                                name: 'btnProcesar',
                                iconCls: 'ico-aceptar-large',
                                scale: 'large'
                            }]
                        },{
                            xtype: 'label',
                            name: 'totalProductos',
                            text: 'Productos: 0',
                            baseCls: 'etiqueta'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        margins: '5 5 0 0',
                        name: 'zoneTotales',
                        defaults: {
                            xtype: 'displayfield',
                            labelWidth: 70,
                            width: 160,
                            fieldStyle: 'border: 1px solid #B5B8C8; color: red; text-align: right',
                            value: '0.00'
                        },
                        items: [{
                            name: 'lblNeto',
                            fieldLabel: 'Neto'
                        },{
                            name: 'lblIgv',
                            fieldLabel: 'IGV (' + rewsoft.AppGlobals.IGV + ')'
                        },{
                            name: 'lblNoGravado',
                            fieldLabel: 'No gravado'
                        },{
                            name: 'lblTotalS',
                            fieldLabel: 'Total S/.'
                        },{
                            name: 'lblTotalD',
                            fieldLabel: 'Total U$D',
                            hidden: true
                        }]
                    }]
                    
                }]/*,
                dockedItems: [{
                    xtype: 'toolbar',
                    border: false,
                    dock: 'bottom',
                    items: [{
                        xtype: 'label',
                        name: 'totalProductos',
                        text: 'Productos: 0',
                        baseCls: 'etiqueta'
                    },{
                        xtype: 'tbfill'
                    },{
                        text: 'Limpiar todo',
                        name: 'btnLimpiarTodo',
                        iconCls: 'ico-medium',
                        scale: 'medium'
                    },{
                        text: 'Procesar',
                        name: 'btnProcesar',
                        iconCls: 'ico-medium',
                        scale: 'medium'
                    }]
                }]*/
            }]
        },{
            region: 'east',
            title: 'Buscar Producto',
            width: 400,
            layout: 'border',
            border: false,
            collapsible: true,
            //collapsed: true,
            split: true,
            items: [{
                region: 'center',
                xtype: 'grid',
                name: 'gridProductos',
                store: 'Productos',
                columns: [{
                    header: 'Producto',
                    dataIndex: 'no_producto',
                    menuDisabled: true,
                    flex: 1
                },{
                    header: 'Marca',
                    dataIndex: 'no_sub_categoria',
                    menuDisabled: true,
                    width: 100
                },{
                    header: 'V. Compra',
                    dataIndex: 'va_compra',
                    menuDisabled: true,
                    align: 'right',
                    width: 70,
                    sortable: false,
                    renderer: function(val){
                        return Ext.util.Format.number(val, "0,000.0000");
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    border: false,
                    dock: 'top',
                    items: [{
                        xtype: 'textfield',
                        name: 'txtBuscar',
                        enableKeyEvents: true,
                        flex: 1
                    }]
                }]
            }]
        }],
        this.callParent(arguments);
    }      
});