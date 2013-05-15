Ext.define('rewsoft.view.almacen.WinOrdenesDespachoDetalle', {
    extend: 'Ext.Window',
    alias: 'widget.winordenesdespachodetalle',
    title: 'Detalle de Orden',
    width: 600,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
           xtype: 'form',
           defaultType: 'displayfield',
           height: 80,
           frame: true,
           border: false,
           defaults: {
                labelWidth: 70,
                flex: 1,
                fieldStyle: 'color: red;' //border: 1px solid #B5B8C8; text-align: right;
           },
           items: [{
                name: 'fecha',
                fieldLabel: 'Fecha'
           },{
                name: 'nu_comprobante',
                fieldLabel: 'Nro. Orden'
           },{
                name: 'no_cliente',
                fieldLabel: 'Cliente'
           }]
        },{
            xtype: 'grid',
            border: false,
            name: 'gridOrdenDespachoDetale',
            height: 300,
            store: 'OrdenDespachoDetalle',
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
                dataIndex: 'ca_producto',
                menuDisabled: true,
                sortable: false,
                width: 70
            },{
                header: 'Lote',
                dataIndex: 'no_lote',
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                header: 'Vencimiento',
                dataIndex: 'fe_vencimiento',
                menuDisabled: true,
                sortable: false,
                width: 90
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