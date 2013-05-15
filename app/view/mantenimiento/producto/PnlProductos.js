Ext.define('rewsoft.view.mantenimiento.producto.PnlProductos' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlproductos',
    store: 'Productos',
    initComponent: function() {
        this.columns = [{
            header: 'Codigo',    
            dataIndex: 'co_producto',   
            width: 70
        },{
            header: 'Producto',
            dataIndex: 'no_producto',
            flex: 1
        },{
            header: 'Marca',
            dataIndex: 'no_sub_categoria',
            width: 150
        },{
            header: 'Grupo',
            dataIndex: 'no_grupo',
            width: 150
        },{
            header: 'Categoria',
            dataIndex: 'no_categoria',
            width: 200
        },{
            header: 'Valor Compra',
            dataIndex: 'va_compra',
            align: 'right',
            width: 90,
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        },{
            header: 'Precio Venta',
            dataIndex: 'precio0',
            align: 'right',
            width: 90,
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        },{
            header: 'Procedencia',
            dataIndex: 'no_pais_procedencia',
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
        this.tbar = [{
            xtype: 'textfield',
            name: 'txtBuscar',
            fieldLabel: 'Buscar',
            labelWidth: 45,
            enableKeyEvents: true,
            flex: 1
        }/*,{
            xtype: "combobox",
            name: "cboCategorias", 
            fieldLabel: "Categoria",
            store: 'Categorias',
            valueField: 'co_categoria',
            displayField: 'no_categoria',
            queryMode: 'local',
            editable: false,
            labelWidth: 60,
            width: 250
        },{
            xtype: "combobox",
            name: "cboSubCategoria",
            fieldLabel: "Sub Categoria",
            store: 'SubCategorias',
            valueField: 'co_sub_categoria',
            displayField: 'no_sub_categoria',
            queryMode: 'local',
            editable: false,
            labelWidth: 75,
            width: 250
        }*/]
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: 'Productos',
            displayInfo: true,
            displayMsg: 'Mostrando productos {0} - {1} de {2}',
            emptyMsg: "No hay productos para mostrar",
            items:[
            '-', {
                text: 'Nuevo',
                name: 'btnNuevo',
                iconCls: 'ico-nuevo',
                scale: 'medium'
            }/*,{
                text: 'Lotes',
                name: 'btnMostrarLotes',
                iconCls: 'ico-medium',
                scale: 'medium'
            }*/]
        });
        this.callParent(arguments);
    }
});