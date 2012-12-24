Ext.define('MG.controller.LoginUser', {
    extend: 'Ext.app.Controller',
    views: [
    'LoginUser',
    'Card'
    ],
    refs: [{
        ref: 'Card',
        selector: 'card'
    },{
        ref: 'MainView',
        selector: 'loginuser'
    }],
    stores: [
    'Cia',
    'Usuarios'
    ],
    init: function() {
        this.control({
            'loginuser':{
                render: this.onRenderLoginUser
            },
            'loginuser textfield[name=txtUsuario]': {
                //select: this.onSelectUsuario
                //keyup: this.onKeyUpTxtUsuario
            },
            'loginuser textfield[name=txtClave]': {
                keyup: this.onKeyUpTxtClave
            },
            'loginuser button[name=btnLogin]':{
                click: this.onClickBtnLogin
            },
            'loginuser combobox[name=cboCia]':{
                select: this.onSelectCboCia,
                beforerender: this.onBeforeRenderCboCia
            }
        });
    },
    onRenderLoginUser: function(){
        //this.getLoginUser().down('combobox[name=cboCia]').hide();
        this.getUsuariosStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
        this.getUsuariosStore().proxy.extraParams.co_usuario = '';
        this.getUsuariosStore().load();
    },
    /*onSelectUsuario: function(combo){
        var txtClave = combo.up().down('textfield[name=txtClave]');
        txtClave.focus();
    },*/
    /*onKeyUpTxtUsuario: function(text, key){
        if(key.getKey() == key.ENTER){
            var txtClave = text.up().down('textfield[name=txtClave]');
            txtClave.focus();
        }
    },*/
    onKeyUpTxtClave: function(text, key){
        if(key.getKey() == key.ENTER){
            var form = text.up().getForm();
            this.onSubmit(form);
        }
    },
    onClickBtnLogin: function(button){
        var form = button.up('window').down('form').getForm();
        this.onSubmit(form);
    },
    onSubmit: function(form){
        if (form.isValid()) {
            Ext.getBody().mask('Identificando');
            form.submit({
                scope: this,
                //waitTitle: 'Authenticando..',
                //waitMsg: 'Iniciando sesion...',
                success: function(frm, action) {
                    AppGlobals.CO_USUARIO = this.getMainView().down('combobox[name=txtUsuario]').getValue();
                    AppGlobals.RAZON_SOCIAL = this.getMainView().down('combobox[name=cboCia]').getStore().findRecord('co_empresa', AppGlobals.CIA).data.no_razon_social
                    Ext.getCmp('lblNoRazonSocial').setText(AppGlobals.RAZON_SOCIAL + ' - TC: ' + AppGlobals.TIPO_CAMBIO_VENTA);
                    this.getCard().getLayout().setActiveItem(1);
                    this.getMainView().hide();
                    var obj = Ext.decode(action.response.responseText);
                    AppGlobals.SERIE_FV = obj.data.serie_fv;
                    AppGlobals.SERIE_BV = obj.data.serie_bv;
                    switch(obj.data.id_rol){
                        case 1:
                            //ADMINISTRADOR
                            AppGlobals.ROL_ACTIVO = AppGlobals.ROL_ADMINISTRADOR;
                            break;
                        case 2:
                            //VENTAS
                            AppGlobals.ROL_ACTIVO = AppGlobals.ROL_VENTAS;
                            break;
                        case 3:
                            //ALMACEN
                            AppGlobals.ROL_ACTIVO = AppGlobals.ROL_ALMACEN;
                            break;
                        case 4:
                            //JEFE VENTAS
                            AppGlobals.ROL_ACTIVO = AppGlobals.ROL_VENTAS_JEFE;
                            break;
                        case 5:
                            //JEFE ALMACEN
                            AppGlobals.ROL_ACTIVO = AppGlobals.ROL_ALMACEN_JEFE;
                            break;
                    }
                    this.setMenus(AppGlobals.ROL_ACTIVO);
                    Ext.getBody().unmask();
                },
                failure: function(frm, action) {
                    if(action.failureType == 'server'){
                        var obj = Ext.decode(action.response.responseText);
                        Ext.Msg.alert('Login', obj.errors.reason);
                    }else{ 
                        Ext.Msg.alert('Login!', 'Error al logear. Intentar otra vez'); 
                    }
                    form.reset();
                    this.getMainView().down('combobox[name=cboCia]').setValue(AppGlobals.CIA);
                    Ext.getBody().unmask();
                }
            });
        } else {
            Ext.Msg.alert('Error!!!', 'Debe ingresar todos los datos');
        }
    },
    onBeforeRenderCboCia: function(combo){
        combo.setValue(AppGlobals.CIA);
    },
    onSelectCboCia: function(){
        //this.getMainView().down('textfield[name=txtUsuario]').focus();
    },
    setMenus: function(rol){
        var menu = Ext.getCmp('tbMain');
        Ext.Array.forEach(menu.items.items, function(item, index, allItems){
            if(item.name != undefined){
                item.hide();
            }
        }, this)
        Ext.getCmp('mnuConfiguracionusuario').show();
        switch(rol){
            case AppGlobals.ROL_ADMINISTRADOR:
                //ADMINISTRADOR
                if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuVentas').show();
                }
                Ext.getCmp('mnuCompras').show();
                Ext.getCmp('mnuAlmacen').show();
                if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuContabilidad').show();
                }
                Ext.getCmp('mnuMantenimiento').show();
                Ext.getCmp('mnuConfiguracion').show();
                Ext.getCmp('mnuConfiguracionusuario').hide();
                break;
            case AppGlobals.ROL_VENTAS:
                //VENTAS
                if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuVentas').show();
                }
                break;
            case AppGlobals.ROL_ALMACEN:
                //ALMACEN
                Ext.getCmp('mnuAlmacen').show();
                break;
            case AppGlobals.ROL_VENTAS_JEFE:
                //JEFE VENTAS
                if(AppGlobals.MODELO_NEGOCIO == AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuVentas').show();
                }
                Ext.getCmp('mnuMantenimiento').show();
                break;
            case AppGlobals.ROL_ALMACEN_JEFE:
                //JEFE ALMACEN
                Ext.getCmp('mnuAlmacen').show();
                Ext.getCmp('mnuMantenimiento').show();
                break;
        }
    }
});