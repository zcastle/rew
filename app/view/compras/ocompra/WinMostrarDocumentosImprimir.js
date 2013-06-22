Ext.define('rewsoft.view.compras.ocompra.WinMostrarDocumentosImprimir', {
    extend: 'Ext.Window',
    alias: 'widget.winmostrardocumentosimprimir',
    title: 'Documentos generados para imrimir',
    width: 200,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridDocumentosImprimir',
            height: 150,
            store: 'MostrarDocumentosImprimir',
            columns: [{
                header: 'Documento',
                dataIndex: 'nu_documento',
                menuDisabled: true,
                sortable: false,
                flex: 1
            }]
        }],
        this.callParent(arguments);
    }      
});