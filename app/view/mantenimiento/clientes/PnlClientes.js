Ext.define('rewsoft.view.mantenimiento.clientes.PnlClientes' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlclientes',
    store: 'Clientes',
    initComponent: function() {
        this.columns = [{
            header: 'Ruc',
            dataIndex: 'codigo',   
            width: 80
        },{
            header: 'Cliente',
            dataIndex: 'cliente',
            width: 300
        },{
            header: 'Direccion',
            dataIndex: 'direccion',
            flex: 1
        },{
            header: 'Telefono',
            dataIndex: 'nu_telefono',
            width: 100
        },{
            header: 'Forma de Pago',
            dataIndex: 'no_forma_pago',
            width: 100
        },{
            xtype: 'actioncolumn',
            name: 'actionEditar',
            width: 20,
            menuDisabled: true,
            items: [{
                icon: 'resources/images/editar-16x16.png',
                tooltip: 'Editar',
                iconCls: 'mousepointer'
            }]
        },{
            xtype: 'actioncolumn',
            name: 'actionRemover',
            width: 20,
            menuDisabled: true,
            items: [{
                icon: 'resources/images/remove.gif',
                tooltip: 'Remover',
                iconCls: 'mousepointer'
            }]
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            border: false,
            dock: 'top',
            items: [{
                xtype: 'textfield',
                name: 'txtBuscar',
                fieldLabel: 'Buscar',
                labelWidth: 45,
                enableKeyEvents: true,
                flex: 1
            }]
        }]
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: 'Clientes',
            displayInfo: true,
            displayMsg: 'Monstrando clientes {0} - {1} de {2}',
            emptyMsg: "No hay clientes para mostrar",
            items:[
            '-', {
                text: 'Nuevo',
                name: 'btnNuevo',
                iconCls: 'ico-nuevo',
                scale: 'medium'
            }]
        });
        this.callParent(arguments);
    }
});