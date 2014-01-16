Ext.define('rewsoft.view.mantenimiento.clientes.WinClientesNuevo', {
    extend: 'Ext.Window',
    alias: 'widget.winclientesnuevo',
    title: 'Clientes',
    border: false,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            id: 'frmClientesNuevo',
            border: false,
            frame: true,
            defaults: {
                width: 400,
                labelWidth: 90,
                allowBlank: false
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'RUC',
                name: 'codigo',
                allowDecimals: false,
                allowNegative: false,
                enableKeyEvents: true,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                width: 200
            },{
                fieldLabel: 'Razon Social',
                name: 'cliente'
            },{
                fieldLabel: 'Direccion',
                name: 'direccion'
            },{
                fieldLabel: 'Telefono',
                name: 'nu_telefono',
                allowBlank: true
            },{
                xtype: 'combobox',
                fieldLabel: 'Forma Pago',
                name: 'co_forma_pago',
                store: 'FormaPago',
                valueField: 'co_forma_pago',
                displayField: 'no_forma_pago',
                queryMode: 'local',
                allowBlank: true,
                //typeAhead: true
                editable: false
            }]
        }];
        this.buttons = [{
            name: 'btnCrear',
            text : 'Grabar',
            iconCls: 'ico-aceptar-medium',
            scale: 'medium'
        },{
            name: 'btnEditar',
            text : 'Editar',
            iconCls: 'ico-aceptar-medium',
            scale: 'medium'
        },{
            text : 'Cancelar',
            scope : this,
            iconCls: 'ico-cancelar',
            scale: 'medium',
            handler: this.close
        }];
        this.callParent(arguments);
    }
});