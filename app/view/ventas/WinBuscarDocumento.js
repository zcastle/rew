Ext.define('rewsoft.view.ventas.WinBuscarDocumento', {
    extend: 'Ext.Window',
    alias: 'widget.winbuscardocumento',
    title: 'Buscar Documento',
    width: 600,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridBuscarDocumento',
            height: 400,
            store: 'BuscarDocumento',
            columns: [{
                header: 'Fecha',
                dataIndex: 'fe_documento',
                menuDisabled: true,
                width: 80
            },{
                header: 'Tipo',
                dataIndex: 'tipo_documento',
                menuDisabled: true,
                width: 35
            },{
                header: 'Numero',
                dataIndex: 'nu_documento',
                menuDisabled: true,
                width: 90
            },{
                header: 'Cliente',
                dataIndex: 'no_cliente',
                menuDisabled: true,
                sortable: false,
                flex: 1
            },{
                header: 'Venta',
                dataIndex: 'va_venta',
                menuDisabled: true,
                sortable: false,
                width: 90,
                align: 'right',
                renderer: function(val){
                    return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
                }
            }],
            tbar: [{
                xtype: 'textfield',
                name: 'txtBuscar',
                fieldLabel: 'Buscar',
                labelWidth: 50,
                enableKeyEvents: true,
                flex: 1
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'BuscarDocumento',
                displayInfo: true,
                displayMsg: 'Mostrando documentos {0} - {1} de {2}',
                emptyMsg: "No hay documento para mostrar"
            })
        }],
        this.callParent(arguments);
    }      
});