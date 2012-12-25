Ext.define('rewsoft.view.mantenimiento.producto.WinProcedencias', {
    extend: 'Ext.Window',
    alias: 'widget.winprocedencias',
    title: 'Procedencias',
    width: 500,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridProcedencia',
            height: 150,
            store: 'Pais',
            columns: [{
                header: 'Codigo',
                dataIndex: 'co_pais',
                menuDisabled: true,
                sortable: false,
                width: 60
            },{
                header: 'Pais',
                dataIndex: 'no_pais',
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