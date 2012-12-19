Ext.define('MG.view.mantenimiento.producto.WinMostrarLotes', {
    extend: 'Ext.Window',
    alias: 'widget.winproductosmostrarlotes',
    title: 'Lotes',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            items: [{
                
            }]
            
        }],
        this.callParent(arguments);
    }      
});