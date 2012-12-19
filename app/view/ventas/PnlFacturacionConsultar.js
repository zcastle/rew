Ext.define('MG.view.ventas.PnlFacturacionConsultar' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnlventasfacturacionconsultar',
    store: 'FacturacionesConsultar',
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
                return Ext.util.Format.number(val, "0,000.0000");
            }
        },{
            header: 'IGV S/.',
            dataIndex: 'igv',
            width: 80,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, "0,000.0000");
            }
        },{
            header: 'Total S/.',
            dataIndex: 'total',
            width: 80,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, "0,000.0000");
            }
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            border: false,
            dock: 'top',
            items: [{
                xtype: "combobox",
                name: "cboTipoDocumento", 
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
            store: 'FacturacionesConsultar',
            displayInfo: true,
            displayMsg: 'Monstrando productos {0} - {1} de {2}',
            emptyMsg: "No hay productos para mostrar",
            items:[
            '-', {
                text: 'Detalle',
                name: 'btnDetalle',
                iconCls: 'ico-editar',
                scale: 'medium'
            }]
        });
        this.callParent(arguments);
    }
});