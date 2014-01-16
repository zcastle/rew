Ext.define('rewsoft.view.almacen.WinBuscarOrdenCompra', {
    extend: 'Ext.Window',
    alias: 'widget.winbuscarordencompra',
    title: 'Orden de Compra',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridOrdenCompra',
            height: 200,
            store: 'OrdenCompraC',
            columns: [{
                header: 'Fecha',
                dataIndex: 'fe_orden_compra',
                menuDisabled: true,
                sortable: false,
                width: 85
            },{
                header: 'Numero',
                dataIndex: 'nu_orden_compra',
                menuDisabled: true,
                sortable: false,
                width: 100
            },{
                header: 'Proveedor',
                dataIndex: 'no_proveedor',
                menuDisabled: true,
                sortable: false,
                flex: 1
            }]
        }],
        this.callParent(arguments);
    }      
});