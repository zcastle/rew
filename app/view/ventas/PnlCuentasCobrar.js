Ext.define('rewsoft.view.ventas.PnlCuentasCobrar' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlcuentascobrar',
    store: 'CuentasCobrar',
    initComponent: function() {
        this.columns = [{
            header: 'Fecha',    
            dataIndex: 'fecha',   
            width: 80
        },{
            header: 'Documento',
            dataIndex: 'documento',
            width: 80
        },{
            header: 'Numero',
            dataIndex: 'numero',
            width: 80
        },{
            header: 'RUC',
            dataIndex: 'ruc',
            width: 90
        },{
            header: 'Cliente',
            dataIndex: 'cliente',
            flex: 1
        },{
            header: 'Neto S/.',
            dataIndex: 'neto',
            width: 80,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        },{
            header: 'IGV S/.',
            dataIndex: 'igv',
            width: 80,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        },{
            header: 'Total S/.',
            dataIndex: 'total',
            width: 80,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        },{
            header: 'Forma de Pago',
            dataIndex: 'no_forma_pago',
            width: 150
        },{
            header: 'Estado',
            dataIndex: 'no_estado',
            width: 90
        },{
            xtype: 'actioncolumn',
            width: 20,
            menuDisabled: true,
            items: [{
                icon: 'resources/images/remove.gif',
                tooltip: 'Editar'
            }]
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            border: false,
            dock: 'top',
            items: [{
                xtype: "combobox",
                name: "cboDocumento", 
                fieldLabel: "Documento",
                store: 'DocumentosFacturacion',
                valueField: 'id',
                displayField: 'documento',
                queryMode: 'local',
                //typeAhead: true,
                editable: false,
                labelWidth: 70,
                margins: '4 0 0 0'
            },{
                xtype: "combobox",
                name: "cboClientes", 
                fieldLabel: "Cliente",
                store: 'Clientes',
                valueField: 'codigo',
                displayField: 'cliente',
                queryMode: 'local',
                typeAhead: true,
                labelWidth: 45,
                width: 400,
                margins: '4 0 0 0'
            },{
                xtype: 'textfield',
                name: 'txtBuscar',
                fieldLabel: 'Buscar Documento',
                labelWidth: 110,
                flex: 1
            }]
        }];
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: 'CuentasCobrar',
            displayInfo: true,
            displayMsg: 'Monstrando cuentas {0} - {1} de {2}',
            emptyMsg: "No hay cuentas para mostrar"
        });
        this.callParent(arguments);
    }
});