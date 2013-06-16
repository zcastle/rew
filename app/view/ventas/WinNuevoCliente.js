Ext.define('rewsoft.view.ventas.WinNuevoCliente', {
    extend: 'Ext.Window',
    alias: 'widget.winnuevocliente',
    title: 'Registrar Cliente',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            url: 'data/createCliente.php',
            bodyPadding: 5,
            frame: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth: 80
            },
            defaultType: 'textfield',
            items: [{
                name: 'txtRuc',
                fieldLabel: 'RUC',
                anchor: '50%',
                allowBlank: false
            },{
                name: 'txtRazonSocial',
                fieldLabel: 'Razon Social',
                allowBlank: false
            },{
                name: 'txtDireccion',
                fieldLabel: 'Direccion'
            },{
                name: 'txtTelefono',
                fieldLabel: 'Telefono'
            }]
        }],
        this.buttons = [{
                name: 'btnGuardarCliente',
                text: 'Guardar'
            },{
                text: 'Cancelar',
                scope: this,
                handler:  this.close
            }]
        this.callParent(arguments);
    }      
});