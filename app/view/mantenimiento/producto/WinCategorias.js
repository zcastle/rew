Ext.define('rewsoft.view.mantenimiento.producto.WinCategorias', {
    extend: 'Ext.Window',
    alias: 'widget.wincategorias',
    title: 'Categorias',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridCategorias',
            height: 200,
            store: 'Categorias',
            columns: [{
                header: 'Codigo',
                dataIndex: 'co_categoria',
                menuDisabled: true,
                sortable: false,
                width: 60
            },{
                header: 'Categoria',
                dataIndex: 'no_categoria',
                menuDisabled: true,
                sortable: false,
                flex: 1
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