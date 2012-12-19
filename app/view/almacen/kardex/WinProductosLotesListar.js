Ext.define('MG.view.almacen.kardex.WinProductosLotesListar', {
    extend: 'Ext.Window',
    alias: 'widget.winproductoskardexlotes',
    title: 'Lotes',
    width: 300,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridLotes',
            height: 150,
            store: 'Lotes',
            columns: [{
                header: 'Lote',
                dataIndex: 'no_lote',
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                header: 'Vencimiento',
                dataIndex: 'fe_vencimiento',
                menuDisabled: true,
                sortable: false,
                flex: 1
            }]/*,
            tbar: [{
                xtype: 'textfield',
                name: 'txtBuscar',
                fieldLabel: 'Buscar',
                labelWidth: 50,
                enableKeyEvents: true,
                flex: 1
            }]*/
        }],
        this.callParent(arguments);
    }      
});