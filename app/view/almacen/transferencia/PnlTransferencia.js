Ext.define('rewsoft.view.almacen.transferencia.PnlTransferencia', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnltransferencia',
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
                        xtype: "textfield",
                        name: "txtNuDocumento",
                        fieldLabel: 'Documento',
                        labelWidth: 100,
                        value: '001-0000101',
                        border: false,
                        readOnly: true,
                        width: 200
                    },{
                        xtype: "datefield",
                        name: "txtFecha",
                        fieldLabel: 'FECHA',
                        format: 'd/m/Y',
                        value: new Date(),
                        labelWidth: 50,
                        border: false,
                        readOnly: true,
                        width: 140
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items:[{
                        xtype: "textfield",
                        name: "txtGrupoOrigen",
                        fieldLabel: 'Grupo de Origen',
                        labelWidth: 100,
                        readOnly: true,
                        value: 'MERCADERIA',
                        width: 300
                    },{
                        xtype: "combobox",
                        name: "cboAlmacenOrigen",
                        fieldLabel: 'Almacen Origen',
                        labelWidth: 100,
                        store: 'AlmacenTranslado',
                        valueField: 'co_almacen',
                        displayField: 'no_almacen',
                        queryMode: 'local',
                        editable: false,
                        width: 350
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
                    width: 60
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
                    header: 'Cantidad',
                    dataIndex: 'ca_producto',
                    menuDisabled: true,
                    sortable: false,
                    width: 70
                },{
                    header: 'Medida',
                    dataIndex: 'no_unidad',
                    menuDisabled: true,
                    sortable: false,
                    width: 90
                },{
                    header: 'Almacen Destino',
                    dataIndex: 'no_almacen',
                    menuDisabled: true,
                    sortable: false,
                    width: 120
                },{
                    xtype: 'actioncolumn',
                    name: 'actionRemover',
                    width: 20,
                    menuDisabled: true,
                    items: [{
                        icon: 'resources/images/remove.gif',
                        tooltip: 'Remover',
                        iconCls: 'mousepointer'
                    }]
                }],
                dockedItems: [{
                    xtype: 'fieldcontainer',
                    dock: 'bottom',
                    layout: 'hbox',
                    items: [{
                        xtype: 'label',
                        name: 'totalProductos',
                        text: 'Productos: 0',
                        baseCls: 'etiqueta'
                    },{
                        xtype: 'tbfill'
                    },{
                        xtype: 'button',
                        text: 'Limpiar todo',
                        name: 'btnLimpiarTodo',
                        iconCls: 'ico-medium',
                        scale: 'medium'
                    },{
                        xtype: 'button',
                        text: 'Procesar',
                        name: 'btnProcesar',
                        iconCls: 'ico-medium',
                        scale: 'medium'
                    }]
                    
                }]
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