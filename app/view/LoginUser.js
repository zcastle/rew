Ext.define('rewsoft.view.LoginUser', {
    extend: 'Ext.window.Window',
    alias : 'widget.loginuser',
    id: 'frmLogin',
    width: 448,
    closable: false,
    resizable: false,
    border: false,
    //plain: true,
    modal: true,
    bodyStyle: 'background-image: url(resources/images/fondologinpie.png);',
    //layout: 'border',
    autoShow: true,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            height: 135,
            id: 'frmLoginCampos',
            url: 'data/login.php', 
            defaultType: 'textfield',
            monitorValid: true,
            items: [{
                xtype: 'combobox',
                hidden: true,
                name: 'cboCia',
                baseCls: 'field',
                fieldLabel: 'Empresa',
                labelWidth: 70,
                allowBlank: false,
                width: 250,
                margin: '5 0 0 180',
                editable: false,
                store: 'Cia',
                valueField: 'co_empresa',
                displayField: 'no_comercial',
                queryMode: 'local'//,
                //typeAhead: true
            },{
                xtype: 'combobox',
                name: 'txtUsuario',
                store: 'Usuarios',
                valueField: 'co_usuario',
                displayField: 'co_usuario',
                editable: false,
                baseCls: 'field',
                fieldLabel: 'Usuario',
                queryMode: 'local',
                labelWidth: 70,
                allowBlank: false,
                emptyText: 'usuario',
                width: 250,
                margin: '25 0 0 180'
            },{
                inputType: 'password',
                baseCls: 'field',
                name: 'txtClave',
                fieldLabel: 'Clave',
                labelWidth: 70,
                allowBlank: false,
                enableKeyEvents: true,
                emptyText: '******',
                width: 250,
                margin: '5 0 0 180'
            },{
                xtype: 'button',
                text: 'Ingresar',
                name: 'btnLogin',
                iconCls: 'ico-login',
                scale: 'large',
                margin: '5 5 0 329',
                padding: '5 10'
            }]
        }];
        this.callParent(arguments);
    }
});