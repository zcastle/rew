Ext.define('rewsoft.view.configuracion.WinTipoCambioUpdate', {
    extend: 'Ext.Window',
    alias: 'widget.wintipocambioupdate',
    title: 'Tipo de Cambio',
    border: false,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            id: 'frmTipoCambioUpdate',
            border: false,
            frame: true,
            defaults: {
                width: 300,
                labelWidth: 120
            },
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'TC Compra Actual',
                name: 'nu_tipo_cambio_compra',
                value: '0.00'
            },{
                xtype: 'displayfield',
                fieldLabel: 'TC Venta Actual',
                name: 'nu_tipo_cambio_venta',
                value: '0.00'
            },{
                xtype: 'fieldset',
                defaults: {
                    xtype: 'numberfield',
                    decimalSeparator: '.',
                    labelWidth: 120
                },
                items: [{
                    fieldLabel: 'TC Compra Nuevo',
                    name: 'tcCompraNuevo',
                    enableKeyEvents: true,
                    allowBlank: false,
                    minValue: 0,
                    value: '0.00'
                },{
                    fieldLabel: 'TC Venta Nuevo',
                    name: 'tcVentaNuevo',
                    allowBlank: false,
                    enableKeyEvents: true,
                    minValue: 0,
                    value: '0.00'
                }]
            }]
        }];
        this.buttons = [{
            name: 'btnActualizar',
            text : 'Actualizar',
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