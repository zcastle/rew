Ext.define('MG.view.almacen.kardex.WinProductosAlmacenListar', {
    extend: 'Ext.Window',
    alias: 'widget.winproductoskardexalmacen',
    title: 'Almacen',
    width: 300,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridAlmacen',
            height: 150,
            store: 'AlmacenKardex',
            columns: [{
                header: 'Almacen',
                dataIndex: 'no_almacen',
                menuDisabled: true,
                sortable: false,
                flex: 1
            }]
        }],
        this.callParent(arguments);
    }      
});