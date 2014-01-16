Ext.define('rewsoft.view.almacen.abastecimiento.PnlOrdenAbastecimientoCrear', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnlordenabastecimientocrear',
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
                    style: 'border: 0px none; margin: 0; padding: 0;'
                },
                items: [{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items:[{
                        xtype: 'label',
                        text: "Documento No.",
                        name: 'lblNombreDocumento',
                        style: 'color: red; font-size: 21px;'
                    },{
                        xtype: 'label',
                        text: '001-0000100',
                        name: 'lblNumeroDocumento',
                        style: 'color: red; font-size: 21px;'
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    margin: '5 0 0 0',
                    items:[{
                        xtype: 'textareafield',
                        name: 'txtObservacion',
                        fieldLabel: 'Observacion',
                        labelWidth: 80,
                        flex: 1,
                        style: 'color: red;'
                    }]
                }]
            },{
                region: 'center',
                xtype: 'grid',
                name: 'gridPedido',
                store: 'Pedidos',
                columns: [{
                    header: 'Codigo',    
                    dataIndex: 'co_producto',
                    menuDisabled: true,
                    sortable: false,
                    width: 70
                },{
                    header: 'Producto',
                    dataIndex: 'no_producto',
                    menuDisabled: true,
                    sortable: false,
                    flex: 1
                },{
                    header: 'Cantidad',
                    dataIndex: 'cantidad',
                    menuDisabled: true,
                    sortable: false,
                    width: 60
                },{
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
                },{
                    xtype: 'actioncolumn',
                    width: 20,
                    menuDisabled: true,
                    items: [{
                        icon: 'resources/images/remove.gif',
                        tooltip: 'Remover',
                        iconCls: 'mousepointer'
                    }]
                }],
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
                        iconCls: 'ico-large',
                        scale: 'large'
                    },{
                        text: 'Imprimir',
                        name: 'btnImprimir',
                        iconCls: 'ico-large',
                        scale: 'large'
                    },{
                        text: 'Procesar',
                        name: 'btnProcesar',
                        iconCls: 'ico-large',
                        scale: 'large'
                    }]
                }]
            }]
        },{
            region: 'east',
            title: 'Buscar Producto',
            width: 300,
            layout: 'border',
            border: false,
            collapsible: true,
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