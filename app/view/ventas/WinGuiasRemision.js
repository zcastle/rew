Ext.define('rewsoft.view.ventas.WinGuiasRemision', {
    extend: 'Ext.Window',
    alias: 'widget.winguiasremision',
    title: 'Guias de Remision',
    width: 450,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridGuiasRemision',
            height: 150,
            store: 'GuiaRemision',
            columns: [{
                header: 'Fecha',
                dataIndex: 'fe_guia',
                menuDisabled: true,
                sortable: false,
                width: 75
            },{
                header: 'Documento',
                dataIndex: 'tipo_documento',
                menuDisabled: true,
                sortable: false,
                width: 100
            },{
                header: 'Numero',
                dataIndex: 'nu_comprobante',
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                header: 'Cliente',
                dataIndex: 'no_cliente',
                menuDisabled: true,
                sortable: false,
                flex: 1
            }]
        }],
        this.callParent(arguments);
    }      
});