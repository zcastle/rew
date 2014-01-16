Ext.define('rewsoft.view.mantenimiento.categoria.PnlSubCategorias' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlsubcategorias',
    store: 'SubCategorias',
    initComponent: function() {
        this.columns = [{
            header: 'Codigo',    
            dataIndex: 'co_sub_categoria',   
            width: 60
        },{
            header: 'Sub Categoria',
            dataIndex: 'no_sub_categoria',
            flex: 1
        },{
            xtype: 'actioncolumn',
            width: 20,
            menuDisabled: true,
            items: [{
                icon: 'resources/images/editar-16x16.png',
                tooltip: 'Editar',
                iconCls: 'mousepointer'
            }]
        },{
            xtype: 'actioncolumn',
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
            store: 'SubCategorias',
            displayInfo: true,
            displayMsg: 'Monstrando productos {0} - {1} de {2}',
            emptyMsg: "No hay productos para mostrar",
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