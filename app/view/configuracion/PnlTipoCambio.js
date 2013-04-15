Ext.define('rewsoft.view.configuracion.PnlTipoCambio' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pnltipocambio',
    store: 'TipoCambio',
    initComponent: function() {
        this.columns = [{
            header: 'Compra',
            dataIndex: 'nu_tipo_cambio_compra',
            width: 80
        },{
            header: 'Venta',
            dataIndex: 'nu_tipo_cambio_venta',
            width: 80
        },{
            header: 'Fecha',
            dataIndex: 'fe_creacion',
            width: 150
        },{
            header: 'Usuario',
            dataIndex: 'co_usuario',
            flex: 1
        },{
            xtype: 'actioncolumn',
            name: 'actionEditar',
            width: 20,
            menuDisabled: true,
            items: [{
                icon: 'resources/images/editar-16x16.png',
                tooltip: 'Editar',
                iconCls: 'mousepointer'
            }]
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            border: false,
            dock: 'top',
            defaults: {
                xtype: 'combobox'
            },
            items: [{
                fieldLabel: 'Periodo',
                name: 'fe_ini_month',
                store: 'Meses',
                displayField: 'name',
                valueField: 'num',
                queryMode: 'local',
                emptyText: 'Month',
                allowBlank: false,
                forceSelection: true,
                width: 150,
                labelWidth: 50
            },{
                xtype: 'numberfield',
                name: 'fe_ini_year',
                allowBlank: false,
                value: new Date().getFullYear(),
                maxValue: new Date().getFullYear(),
                margins: '0 0 0 5',
                width: 55
            }]
        }]
        this.callParent(arguments);
    }
});