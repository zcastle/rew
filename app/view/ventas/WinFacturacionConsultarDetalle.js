Ext.define('rewsoft.view.ventas.WinFacturacionConsultarDetalle',{
    extend: 'Ext.Window',
    alias : 'widget.winventasfacturacionconsultardetalle',
    modal: true,
    resizable: false,
    layout: 'vbox',
    title: 'Detalle de Comprobante',
    initComponent: function() {
        this.items = [{
            xtype: 'hiddenfield',
            name: 'txtTipoComprobante'
        },{
            xtype: 'hiddenfield',
            name: 'txtNuComprobante'
        },{
            xtype: 'displayfield',
            name: 'lblNuComprobante',
            fieldLabel: 'Comprobante',
            value: '',
            fieldStyle: 'color: #f00;'
        },{
            xtype: 'displayfield',
            name: 'lblFecha',
            fieldLabel: 'Fecha',
            value: '',
            fieldStyle: 'color: #f00;'
        },{
            xtype: 'displayfield',
            name: 'lblCliente',
            fieldLabel: 'Cliente',
            value: '',
            fieldStyle: 'color: #f00;'
        },{
            xtype: 'grid',
            name: 'gridVentasDetalle',
            store: 'FacturacionesConsultarDetalle',
            width: 900,
            height: 400,
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
                width: 100
            },{
                header: 'Vencimiento',
                dataIndex: 'fe_vencimiento',
                menuDisabled: true,
                sortable: false,
                width: 70
            },{
                header: 'P. Unitario',
                dataIndex: 'va_producto',
                align: 'right',
                menuDisabled: true,
                sortable: false,
                width: 70,
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
                header: 'Unidad',
                dataIndex: 'no_unidad',
                menuDisabled: true,
                sortable: false,
                width: 80
            },{
                header: 'P. total',
                dataIndex: 'va_total',
                align: 'right',
                width: 70,
                menuDisabled: true,
                sortable: false,
                renderer: function(val){
                    return Ext.util.Format.number(val, "0,000.0000");
                }
            }],
            bbar: [{
                text: 'Recuperar',
                name: 'btnRecuperar',
                iconCls: 'ico-medium',
                scale: 'medium'
            },{
                text: 'Imprimir',
                name: 'btnImprimir',
                iconCls: 'ico-medium',
                scale: 'medium'
            }]
        }];
        this.callParent(arguments);
    }
});