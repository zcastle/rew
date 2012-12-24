Ext.define('MG.view.mantenimiento.categoria.WinCategoriasNuevo', {
    extend: 'Ext.window.Window',
    alias : 'widget.wincategoriasnuevo',
    title: 'Categorias',
    layout: 'fit',
    resizable: false,
    border: false,
    modal: true,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            frame: true,
            defaults: {
                width: 300,
                labelWidth: 70
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'id'
            },{
                xtype: 'hiddenfield',
                name: 'co_categoria'
            },{
                xtype: 'combobox',
                name: 'co_grupo',
                fieldLabel: 'Grupo',
                store: 'Grupo',
                valueField: 'co_grupo',
                displayField: 'no_grupo',
                queryMode: 'local',
                editable: false,
                msgTarget: 'side',
                allowBlank: false
            },{
                xtype: 'textfield',
                name: 'no_categoria',
                fieldLabel: 'Categoria',
                allowBlank: false
            }]
        }],
        this.buttons = [{
                name: 'btnCrear',
                text : 'Grabar',
                iconCls: 'ico-aceptar-medium',
                scale: 'medium'
            },{
                name: 'btnEditar',
                text : 'Editar',
                iconCls: 'ico-aceptar-medium',
                scale: 'medium'
            },{
                text : 'Cancelar',
                scope : this,
                iconCls: 'ico-cancelar',
                scale: 'medium',
                handler: this.close
            }]
        this.callParent(arguments);
    }
});