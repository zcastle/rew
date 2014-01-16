Ext.define('rewsoft.view.almacen.PnlOrdenesDespacho' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlordenesdespacho',
    store: 'OrdenDespacho',
    initComponent: function() {
        this.columns = [{
            header: 'Fecha',    
            dataIndex: 'fecha',   
            width: 130
        },{
            header: 'Nro. Orden',
            dataIndex: 'nu_comprobante',
            width: 120
        },{
            header: 'Cliente',
            dataIndex: 'no_cliente',
            flex: 1
        },{
            header: 'Vendedor',
            dataIndex: 'co_vendedor',
            width: 200
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
            store: 'OrdenDespacho',
            displayInfo: true,
            displayMsg: 'Mostrando ordenes {0} - {1} de {2}',
            emptyMsg: "No hay ordenes para mostrar"/*,
            items:[
            '-', {
                text: 'Despachar',
                name: 'btnDespachar',
                iconCls: 'ico-nuevo',
                scale: 'medium'
            }]*/
        });
        this.callParent(arguments);
    }
});