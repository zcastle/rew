Ext.define('rewsoft.view.almacen.kardex.WinProductosListar', {
    extend: 'Ext.Window',
    alias: 'widget.winproductoskardex',
    title: 'Productos',
    width: 500,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridProductos',
            height: 200,
            store: 'ProductosKardex',
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
                header: 'Marca',
                dataIndex: 'no_sub_categoria',
                menuDisabled: true,
                sortable: false,
                width: 150
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