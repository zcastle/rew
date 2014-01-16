Ext.define('rewsoft.view.configuracion.PnlUsuarios' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlusuarios',
    store: 'Usuarios',
    initComponent: function() {
        this.columns = [{
            header: 'Nombre',
            dataIndex: 'no_usuario',   
            width: 120
        },{
            header: 'Apellido',
            dataIndex: 'ap_usuario',
            width: 200
        },{
            header: 'Telefono',
            dataIndex: 'nu_telefono',
            width: 60
        },{
            header: 'Direccion',
            dataIndex: 'de_direccion',
            flex: 1
        },{
            header: 'Distrito',
            dataIndex: 'no_ubigeo',
            width: 200
        },{
            header: 'Usuario Acceso',
            dataIndex: 'co_usuario',
            width: 150
        },{
            header: 'Rol',
            dataIndex: 'no_rol',
            width: 120
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
            store: 'Usuarios',
            displayInfo: true,
            displayMsg: 'Monstrando usuarios {0} - {1} de {2}',
            emptyMsg: "No hay usuarios para mostrar",
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