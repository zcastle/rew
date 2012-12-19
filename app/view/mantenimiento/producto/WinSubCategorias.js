Ext.define('MG.view.mantenimiento.producto.WinSubCategorias', {
    extend: 'Ext.Window',
    alias: 'widget.winsubcategorias',
    title: 'Marcas',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridSubCategorias',
            height: 200,
            store: 'SubCategorias',
            columns: [{
                header: 'Codigo',
                dataIndex: 'co_sub_categoria',
                menuDisabled: true,
                sortable: false,
                width: 60
            },{
                header: 'Marca',
                dataIndex: 'no_sub_categoria',
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