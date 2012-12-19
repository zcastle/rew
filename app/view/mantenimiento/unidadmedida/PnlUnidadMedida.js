Ext.define('MG.view.mantenimiento.unidadmedida.PnlUnidadMedida' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlunidadmedida',
    store: 'UnidadesVenta',
    initComponent: function() {
        this.columns = [{
            header: 'Unidad',    
            dataIndex: 'no_unidad',   
            width: 100
        },{
            header: 'Sub Unidad',
            dataIndex: 'no_sub_unidad',
            width: 100
        },{
            header: 'Cantidad',
            dataIndex: 'ca_sub_unidad',
            flex: 1
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
            store: 'UnidadesVenta',
            displayInfo: true,
            displayMsg: 'Monstrando unidades {0} - {1} de {2}',
            emptyMsg: "No hay unidades para mostrar",
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