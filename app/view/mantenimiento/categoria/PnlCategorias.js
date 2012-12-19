Ext.define('MG.view.mantenimiento.categoria.PnlCategorias' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlcategorias',
    store: 'Categorias',
    initComponent: function() {
        this.columns = [{
            header: 'Codigo',    
            dataIndex: 'co_categoria',   
            width: 60
        },{
            header: 'Categoria',
            dataIndex: 'no_categoria',
            flex: 1
        },{
            header: 'Grupo',
            dataIndex: 'no_grupo',
            width: 200
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
            store: 'Categorias',
            displayInfo: true,
            displayMsg: 'Monstrando categorias {0} - {1} de {2}',
            emptyMsg: "No hay categorias para mostrar",
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