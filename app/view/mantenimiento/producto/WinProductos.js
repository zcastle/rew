Ext.define('rewsoft.view.mantenimiento.producto.WinProductos', {
    extend: 'Ext.Window',
    alias: 'widget.winproductos',
    title: 'Productos',
    width: 500,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridProductos',
            height: 150,
            store: 'ProductosConsulta',
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
                header: 'Costo',
                dataIndex: 'costo_s',
                menuDisabled: true,
                sortable: false,
                align: 'right',
                width: 60,
                renderer: function(val){
                    return Ext.util.Format.number(val, "0,000.0000");
                }
            }],
            tbar: [{
                xtype: 'textfield',
                name: 'txtBuscar',
                fieldLabel: 'Buscar',
                labelWidth: 50,
                enableKeyEvents: true,
                flex: 1
            }]
        }],
        this.callParent(arguments);
    }      
});