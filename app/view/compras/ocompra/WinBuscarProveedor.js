Ext.define('rewsoft.view.compras.ocompra.WinBuscarProveedor', {
    extend: 'Ext.Window',
    alias: 'widget.winbuscarproveedorocompra',
    title: 'Proveedores',
    width: 500,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridProveedores',
            height: 300,
            store: 'Proveedores',
            columns: [{
                header: 'RUC',
                dataIndex: 'nu_ruc',
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                header: 'Proveedor',
                dataIndex: 'no_razon_social',
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
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'Proveedores',
                displayInfo: true,
                displayMsg: 'Mostrando proveedores {0} - {1} de {2}',
                emptyMsg: "No hay proveedores para mostrar"
            })
        }],
        this.callParent(arguments);
    }      
});