Ext.define('rewsoft.view.compras.PnlFacturacion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnlcomprasfacturacion',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    initComponent: function() {
        this.items = [{
            layout: 'border',
            flex: 1,
            border: false,
            items: [{
                region: 'north',
                frame: true,
                border: false,
                items: [{
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    height: 24,
                    frame: true,
                    style: 'border: 0px none; margin: 0; padding: 0;',
                    items:[{
                        xtype: "combobox",
                        name: "cboProveedores", 
                        fieldLabel: "Proveedor",
                        //store: 'Proveedores',
                        valueField: 'codigo',
                        displayField: 'proveedor',
                        queryMode: 'local',
                        typeAhead: true,
                        labelWidth: 70,
                        flex: 1
                    },{
                        xtype: "label",
                        name: "txtRuc", 
                        text: 'RUC: 00000000000',
                        width: 110,
                        margins: '4 0 0 5',
                        style: 'color: #ff0000;'
                    },{
                        xtype: 'button',
                        margins: '0 0 0 5',
                        height: 10,
                        text: 'Editar'
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    height: 25,
                    frame: true,
                    style: 'border: 0px none; margin: 5 0 0 0; padding: 0;',
                    items: [{
                        xtype: "textfield",
                        name: "txtDireccion", 
                        fieldLabel: "Direccion",
                        border: false,
                        labelWidth: 70,
                        readOnly: true,
                        flex: 1
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    height: 25,
                    frame: true,
                    style: 'border: 0px none; margin: 3 0 0 0; padding: 0;',
                    items: [{
                        xtype: "textfield",
                        name: "txtGuiaRemision", 
                        fieldLabel: "G. Remision",
                        border: false,
                        readOnly: true,
                        labelWidth: 70
                    },{
                        xtype: 'button',
                        text: 'Buscar',
                        margins: '0 0 0 5'
                    },{
                        xtype: "textfield",
                        name: "txtOrdenCompra", 
                        fieldLabel: "O. Compra",
                        margins: '0 0 0 5',
                        border: false,
                        readOnly: true,
                        labelWidth: 70
                    },{
                        xtype: 'button',
                        text: 'Buscar',
                        margins: '0 0 0 5'
                    },{
                        xtype: "combobox",
                        name: "cboMonedas", 
                        fieldLabel: "Moneda",
                        store: 'Monedas',
                        valueField: 'codigo',
                        displayField: 'moneda',
                        queryMode: 'local',
                        typeAhead: true,
                        labelWidth: 50,
                        width: 150,
                        margins: '0 0 0 5'
                    }]
                }]
            },{
                region: 'center',
                xtype: 'grid',
                name: 'gridPedido',
                columns: [{
                    header: 'Codigo',    
                    dataIndex: 'codigo',
                    menuDisabled: true,
                    sortable: false,
                    width: 60
                },{
                    header: 'Producto',
                    dataIndex: 'producto',
                    menuDisabled: true,
                    sortable: false,
                    flex: 1
                },{
                    header: 'Presentacion',
                    dataIndex: 'presentacion',
                    menuDisabled: true,
                    sortable: false,
                    width: 90
                },{
                    header: 'P. Unitario',
                    dataIndex: 'unitario',
                    align: 'right',
                    menuDisabled: true,
                    sortable: false,
                    width: 70,
                    renderer: function(val){
                        return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
                    }
                },{
                    header: 'Cantidad',
                    dataIndex: 'cantidad',
                    menuDisabled: true,
                    sortable: false,
                    width: 60
                },{
                    header: 'P. total',
                    dataIndex: 'total',
                    align: 'right',
                    width: 70,
                    menuDisabled: true,
                    sortable: false,
                    renderer: function(val){
                        return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
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
                bbar: [{
                    xtype: 'label',
                    text: 'Neto:',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    id: 'lblNetoCompra',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                },{
                    xtype: 'label',
                    text: 'IGV:',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    id: 'lblIgvCompra',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                },{
                    xtype: 'label',
                    text: 'Total:',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    id: 'lblTotal',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    border: false,
                    dock: 'bottom',
                    items: [{
                        xtype: 'label',
                        id: 'totalProductosCompra',
                        text: 'Productos: 0',
                        baseCls: 'etiqueta'
                    },{
                        xtype: 'tbfill'
                    },{
                        text: 'Limpiar todo',
                        name: 'btnLimpiarTodo',
                        iconCls: 'ico-large',
                        scale: 'large'
                    },{
                        text: 'Guardar',
                        name: 'btnGuardar',
                        iconCls: 'ico-large',
                        scale: 'large'
                    }]
                }]
            }]
        },/*{
            title: 'Opciones',
            border: false,
            width: 80,
            defaults: {
                xtype: 'button',
                width: 80
            },
            items: [{
                text: 'Eliminar Linea',
                name: 'btnEliminarLinea',
                iconCls: 'ico-large',
                iconAlign: 'top',
                scale: 'large'
            },{
                text: 'Editar Linea',
                name: 'btnEditarLinea',
                iconCls: 'ico-large',
                iconAlign: 'top',
                scale: 'large'
            }]
        },*/{
            title: 'Buscar Producto',
            width: 400,
            layout: 'border',
            border: false,
            items: [{
                region: 'center',
                xtype: 'grid',
                name: 'gridProductos',
                store: 'Productos',
                columns: [{
                    header: 'Producto',
                    dataIndex: 'producto',
                    menuDisabled: true,
                    flex: 1
                },{
                    header: 'Marca',
                    dataIndex: 'no_sub_categoria',
                    menuDisabled: true,
                    width: 100
                },{
                    header: 'Compra',
                    dataIndex: 'compra',
                    menuDisabled: true,
                    align: 'right',
                    width: 70,
                    sortable: false,
                    renderer: function(val){
                        return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
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