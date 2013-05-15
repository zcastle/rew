Ext.define('rewsoft.view.configuracion.WinUsuariosUpdate', {
    extend: 'Ext.Window',
    alias: 'widget.winusuariosupdate',
    title: 'Usuarios',
    border: false,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            id: 'frmUsuariosUpdate',
            border: false,
            frame: true,
            defaults: {
                width: 300,
                labelWidth: 70,
                fieldStyle: 'border: 1px solid #B5B8C8; color: red;'
            },
            defaultType: 'displayfield',
            items: [{
                xtype: 'hiddenfield',
                name: 'co_empresa',
                value: rewsoft.AppGlobals.CIA
            },{
                fieldLabel: 'Nombres',
                name: 'no_usuario'
            },{
                fieldLabel: 'Apellidos',
                name: 'ap_usuario'
            },{
                fieldLabel: 'Telefono',
                name: 'nu_telefono'
            },{
                fieldLabel: 'Direccion',
                name: 'de_direccion'
            },{
                fieldLabel: 'Distrito',
                name: 'no_ubigeo'
            },{
                xtype: 'fieldset',
                title: 'Datos de Acceso',
                defaults: {
                    width: 275,
                    labelWidth: 80,
                    allowBlank: false,
                    fieldStyle: 'border: 1px solid #B5B8C8; color: red;'
                },
                defaultType: 'textfield',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Usuario',
                    name: 'co_usuario'
                },{
                    inputType: 'password',
                    fieldLabel: 'Contraseña',
                    name: 'pw_usuario'
                },{
                    inputType: 'password',
                    fieldLabel: 'Confirmar',
                    validator: function(value) {
                        var password1 = this.previousSibling('[name=pw_usuario]');
                        return (value === password1.getValue()) ? true : 'Las contraseñas no coinciden.'
                    }
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Rol',
                    name: 'no_rol'
                }]
            }]
        }];
        this.buttons = [{
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