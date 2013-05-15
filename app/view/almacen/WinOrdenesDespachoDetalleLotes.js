Ext.define('rewsoft.view.almacen.WinOrdenesDespachoDetalleLotes', {
    extend: 'Ext.Window',
    alias: 'widget.winordenesdespachodetallelotes',
    title: 'Ingreso de Lotes',
    width: 310,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
           xtype: 'form',
           defaultType: 'displayfield',
           height: 70,
           frame: true,
           border: false,
           defaults: {
                labelWidth: 70,
                fieldStyle: 'color: red;'
           },
           items: [{
                name: 'co_producto',
                fieldLabel: 'Codigo'
           },{
                name: 'no_producto',
                fieldLabel: 'Producto'
           },{
                name: 'ca_producto',
                fieldLabel: 'Cantidad'
           }]
        },{
            xtype: 'grid',
            border: false,
            name: 'gridLotes',
            height: 100,
            store: 'Lotes',
            columns: [{
                header: 'Lote',
                dataIndex: 'no_lote',
                menuDisabled: true,
                sortable: false,
                width: 150
            },{
                header: 'Vencimiento',
                dataIndex: 'fe_vencimiento',
                menuDisabled: true,
                sortable: false,
                width: 80
            },{
                header: 'Stock',
                dataIndex: 'ca_stock',
                menuDisabled: true,
                sortable: false,
                width: 50
            }]
        }]/*,
        this.buttons = [{
            name: 'btnAceptar',
            text: 'Aceptar'
        },{
            text: 'Cancelar',
            scope: this,
            handler: this.close
        }]*/
        this.callParent(arguments);
    }      
});