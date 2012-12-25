Ext.define('rewsoft.view.ventas.WinBuscarCliente', {
    extend: 'Ext.Window',
    alias: 'widget.winbuscarcliente',
    title: 'Clientes',
    width: 500,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridClientes',
            height: 300,
            store: 'Clientes',
            columns: [{
                header: 'RUC',
                dataIndex: 'ruc',
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                header: 'Cliente',
                dataIndex: 'cliente',
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
                store: 'Clientes',
                displayInfo: true,
                displayMsg: 'Mostrando clientes {0} - {1} de {2}',
                emptyMsg: "No hay clientes para mostrar"
            })
        }],
        this.callParent(arguments);
    }      
});