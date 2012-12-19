Ext.define('MG.view.mantenimiento.proveedor.PnlProveedor' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlproveedor',
    store: 'mantenimiento.Proveedores',
    initComponent: function() {
        this.columns = [{
            header: 'Codigo',    
            dataIndex: 'codigo',   
            width: 60
        },{
            header: 'Ruc',
            dataIndex: 'ruc',
            width: 100
        },{
            header: 'Razon Social',
            dataIndex: 'razonsocial',
            flex: 1
        },{
            header: 'Nombre Comercial',
            dataIndex: 'nombrecomercial',
            flex: 1
        }];
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: 'mantenimiento.Proveedores',
            displayInfo: true,
            displayMsg: 'Monstrando proveedores {0} - {1} de {2}',
            emptyMsg: "No hay proveedores para mostrar",
            items:[
            '-', {
                text: 'Nuevo',
                name: 'btnNuevo',
                iconCls: 'ico-nuevo',
                scale: 'medium'
            },{
                text: 'Editar',
                name: 'btnEditar',
                iconCls: 'ico-editar',
                scale: 'medium'
            },{
                text: 'Eliminar',
                name: 'btnEliminar',
                iconCls: 'ico-eliminar',
                scale: 'medium'
            }]
        });
        this.viewConfig = {
            stripeRows: true
        }
        this.callParent(arguments);
    }
});