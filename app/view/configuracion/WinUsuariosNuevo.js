Ext.define('rewsoft.view.configuracion.WinUsuariosNuevo', {
    extend: 'Ext.Window',
    alias: 'widget.winusuariosnuevo',
    title: 'Usuarios',
    border: false,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            id: 'frmUsuariosNuevo',
            border: false,
            frame: true,
            defaults: {
                width: 300,
                labelWidth: 70,
                allowBlank: false
            },
            defaultType: 'textfield',
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
            },/*{
                xtype: 'numberfield',
                fieldLabel: 'DNI',
                name: 'nu_dni',
                allowDecimals: false,
                allowNegative: false,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                allowBlank: true
            },*/{
                fieldLabel: 'Telefono',
                name: 'nu_telefono',
                allowBlank: true
            },{
                fieldLabel: 'Direccion',
                name: 'de_direccion',
                allowBlank: true
            },{
                xtype: 'combobox',
                fieldLabel: 'Distrito',
                name: 'co_ubigeo',
                store: 'Ubigeo',
                valueField: 'co_ubigeo',
                displayField: 'no_ubigeo',
                queryMode: 'local',
                typeAhead: true
                //editable: false
            },{
                xtype: 'fieldset',
                title: 'Datos de Acceso',
                defaults: {
                    width: 275,
                    labelWidth: 80,
                    allowBlank: true
                },
                defaultType: 'textfield',
                items: [{
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
                    xtype: 'combobox',
                    fieldLabel: 'Rol',
                    name: 'id_rol',
                    store: 'Rol',
                    valueField: 'id_rol',
                    displayField: 'no_rol',
                    queryMode: 'local',
                    editable: false
                }]
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