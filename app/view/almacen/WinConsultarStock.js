Ext.define('rewsoft.view.almacen.WinConsultarStock', {
    extend: 'Ext.Window',
    alias: 'widget.winconsultarstock',
    title: 'Consultar Stock',
    //width: 100,
    //height: 100,
    border: false,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'container',
            defaults: {
                xtype: 'fieldset',
                layout: 'hbox',
                defaults: {
                    labelWidth: 90
                },
                defaultType: 'textfield'
            },
            items: [{
                items: [{
                    fieldLabel: 'Categorias',
                    name: 'cboCategoria',
                    emptyText: 'Categoria',
                    width: 300
                },{
                    xtype: 'button',
                    name: 'btnLimpiarCategoria',
                    text: 'Limpiar',
                    margins: '0 0 0 5'
                }]
            },{
                items: [{
                    fieldLabel: 'Sub Categorias',
                    name: 'cboSubCategoria',
                    emptyText: 'Sub Categoria',
                    width: 300
                },{
                    xtype: 'button',
                    name: 'btnLimpiarSubCategoria',
                    text: 'Limpiar',
                    margins: '0 0 0 5'
                }]
            },{
                items:[{
                    xtype: 'checkboxfield',
                    name: 'chkMostrarLotes',
                    boxLabel: 'Mostrar Lotes',
                    checked: true
                }]
            }]
        }];
        this.buttons = [{
                xtype: 'button',
                name: 'btnVerStock',
                text: 'Ver',
                margins: '0 0 0 5',
                width: 55
            }]
        this.callParent(arguments);
    }
});