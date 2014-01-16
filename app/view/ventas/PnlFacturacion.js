Ext.define('rewsoft.view.ventas.PnlFacturacion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnlventasfacturacion',
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
                        store: 'DocumentosFacturacion',
                        valueField: 'id',
                        displayField: 'documento',
                        queryMode: 'local',
                        //typeAhead: true,
                        editable: false,
                        labelWidth: 70
                    },{
                        xtype: 'label',
                        name: 'lblNombreDocumento',
                        text: 'BOLETA No.:',
                        style: 'color: red; font-size: 21px'
                    },{
                        xtype: "textfield",
                        name: "txtNuDocumento", 
                        border: false,
                        readOnly: true,
                        width: 140,
                        fieldStyle: 'color: red; font-size: 21px; background: none; border: none'
                    },{
                        xtype: 'button',
                        name: 'btnCambiarSerie',
                        text: 'Cambiar',
                        iconCls: 'ico-editar-small'
                    },{
                        xtype: 'button',
                        name: 'btnBuscarPasado',
                        text: 'Buscar',
                        iconCls: 'ico-buscar-small'
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items:[{
                        xtype: "textfield",
                        name: "txtRuc", 
                        fieldLabel: "Cliente",
                        labelWidth: 70,
                        width: 180,
                        enableKeyEvents: true
                    },{
                        xtype: "textfield",
                        name: "txtCliente",
                        readOnly: true,
                        flex: 1
                    },{
                        xtype: 'button',
                        name: 'btnNuevoCliente',
                        text: 'Nuevo',
                        iconCls: 'ico-cliente-small'
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: "textfield",
                        name: "txtDireccion", 
                        fieldLabel: "Direccion",
                        labelWidth: 70,
                        readOnly: true,
                        flex: 1
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: "textfield",
                        name: "txtBuscarGuiaRemision",
                        fieldLabel: "GR-OD-CC",
                        labelWidth: 70,
                        readOnly: true,
                        width: 180
                    },{
                        xtype: 'button',
                        name: 'btnBuscarGuiaRemision',
                        text: 'Buscar',
                        iconCls: 'ico-buscar-small'
                    },{
                        xtype: "textfield",
                        name: "txtBuscarComprobante",
                        fieldLabel: "FV-BV-OD",
                        labelWidth: 70,
                        readOnly: true,
                        width: 200
                    },{
                        xtype: 'button',
                        name: 'btnBuscarComprobante',
                        text: 'Buscar',
                        iconCls: 'ico-buscar-small'
                    },{
                        xtype: "combobox",
                        name: "cboFormaPago", 
                        fieldLabel: "F. Pago",
                        store: 'FormaPago',
                        valueField: 'co_forma_pago',
                        displayField: 'no_forma_pago',
                        queryMode: 'local',
                        //typeAhead: true,
                        editable: false,
                        labelWidth: 70,
                        width: 220
                    },{
                        xtype: "displayfield",
                        name: "txtFechaVencimiento", 
                        labelWidth: 50,
                        fieldLabel: "Vence",
                        fieldStyle: 'border: 1px solid #B5B8C8;',
                        value: Ext.Date.format(new Date(), 'n/j/Y'),
                        flex: 1
                    }]
                },{
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: "combobox",
                        name: "cboVendedor", 
                        fieldLabel: "Vendedor",
                        store: 'Usuarios',
                        valueField: 'co_usuario',
                        displayField: 'no_usuario',
                        queryMode: 'local',
                        //typeAhead: true,
                        editable: false,
                        labelWidth: 70,
                        width: 180
                    },{
                        xtype: "combobox",
                        name: "cboMoneda", 
                        fieldLabel: "Moneda",
                        labelWidth: 50,
                        store: 'Monedas',
                        valueField: 'codigo',
                        displayField: 'moneda',
                        queryMode: 'local',
                        editable: false,
                        width: 135
                    },{
                        xtype: "datefield",
                        name: "txtFeDocumento",
                        fieldLabel: "F. Documento",
                        labelWidth: 90,
                        width: 200,
                        value: new Date()
                    },{
                        xtype: 'button',
                        name: 'btnActualizarFecha',
                        text: 'Actualizar'
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
                }/*,{
                    header: 'Presentacion',
                    dataIndex: 'presentacion',
                    menuDisabled: true,
                    sortable: false,
                    width: 90
                }*/,{
                    header: 'Lote',
                    dataIndex: 'lote',
                    menuDisabled: true,
                    sortable: false,
                    width: 100
                },{
                    header: 'Vencimiento',
                    dataIndex: 'vencimiento',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
                },{
                    header: 'P. Unitario',
                    dataIndex: 'precio0',
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
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    menuDisabled: true,
                    sortable: false,
                    width: 80
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
                    name: 'actionRemover',
                    width: 20,
                    menuDisabled: true,
                    items: [{
                        icon: 'resources/images/remove.gif',
                        tooltip: 'Remover',
                        iconCls: 'mousepointer'
                    }]
                }],
                bbar: [{
                    xtype: 'label',
                    text: 'V. Venta:',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    name: 'lblNeto',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                },{
                    xtype: 'label',
                    text: 'IGV:',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    name: 'lblIgv',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                },{
                    xtype: 'label',
                    text: 'Total S/.:',
                    name: 'label-total',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    name: 'lblTotalS',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                },{
                    xtype: 'label',
                    name: 'lblTotalD1',
                    hidden: true,
                    text: 'Total $:',
                    baseCls: 'etiqueta-titulo'
                },{
                    xtype: 'label',
                    hidden: true,
                    name: 'lblTotalD',
                    text: '0.00',
                    baseCls: 'etiqueta',
                    flex: 1
                },{
                    xtype: 'checkboxfield',
                    name: 'chkMostrarMontoDolares',
                    boxLabel: 'Monto en Dolares',
                    fieldStyle: 'font-size: 17px;'
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
                        text: 'Imprimir',
                        name: 'btnImprimirCotizacion',
                        iconCls: 'ico-large',
                        scale: 'large'
                    },{
                        text: 'IGV Incluido',
                        name: 'btnIgvIncluido',
                        enableToggle: true,
                        pressed: true,
                        scale: 'large'
                    },{
                        text: 'Limpiar todo',
                        name: 'btnLimpiarTodo',
                        iconCls: 'ico-limpiar-large',
                        scale: 'large'
                    },{
                        text: 'Procesar Venta',
                        name: 'btnProcesar',
                        iconCls: 'ico-aceptar-large',
                        scale: 'large'
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
                    header: 'Unitario',
                    dataIndex: 'precio0',
                    menuDisabled: true,
                    align: 'right',
                    width: 70,
                    sortable: false,
                    renderer: function(val){
                        return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
                    }
                },{
                    header: 'Costo',
                    dataIndex: 'va_compra',
                    menuDisabled: true,
                    hidden: true,
                    align: 'right',
                    width: 70,
                    sortable: false,
                    renderer: function(val){
                        return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
                    }
                },{
                    header: 'Stock',
                    dataIndex: 'ca_stock',
                    menuDisabled: true,
                    hidden: true,
                    align: 'right',
                    width: 60,
                    sortable: false
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
                    },{
                        xtype: 'checkboxfield',
                        hidden: true,
                        name: 'chkMostrarCosto',
                        boxLabel: 'Mostrar Costo'
                    },{
                        xtype: 'checkboxfield',
                        name: 'chkMostrarMarca',
                        checked: true,
                        boxLabel: 'Marca'
                    },{
                        xtype: 'checkboxfield',
                        name: 'chkMostrarStock',
                        boxLabel: 'Stock'
                    }]
                }]
            }]
        }],
        this.callParent(arguments);
    }      
});