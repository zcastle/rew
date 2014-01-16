Ext.define('rewsoft.controller.LoginUser', {
    extend: 'Ext.app.Controller',
    views: [
    'LoginUser'
    ],
    refs: [{
        ref: 'Viewport',
        selector: 'viewport'
    },{
        ref: 'MainView',
        selector: 'loginuser'
    }],
    stores: [
    'Cia',
    'Usuarios',
    'TipoCambio'
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
        this.getUsuariosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getUsuariosStore().proxy.extraParams.co_usuario = '';
        this.getUsuariosStore().proxy.extraParams.is_login = true;
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
                    rewsoft.AppGlobals.CO_USUARIO = this.getMainView().down('combobox[name=txtUsuario]').getValue();
                    rewsoft.AppGlobals.RAZON_SOCIAL = this.getMainView().down('combobox[name=cboCia]').getStore().findRecord('co_empresa', rewsoft.AppGlobals.CIA).data.no_razon_social
                    Ext.getCmp('lblNoRazonSocial').setText(rewsoft.AppGlobals.RAZON_SOCIAL + ' - TCV: ' + rewsoft.AppGlobals.TIPO_CAMBIO_VENTA);
                    this.getViewport().getLayout().setActiveItem(1);
                    this.getMainView().hide();
                    var obj = Ext.decode(action.response.responseText);
                    rewsoft.AppGlobals.SERIE_FV = obj.data.serie_fv;
                    rewsoft.AppGlobals.SERIE_BV = obj.data.serie_bv;
                    switch(obj.data.id_rol){
                        case 1:
                            //ADMINISTRADOR
                            rewsoft.AppGlobals.ROL_ACTIVO = rewsoft.AppGlobals.ROL_ADMINISTRADOR;
                            break;
                        case 2:
                            //VENTAS
                            rewsoft.AppGlobals.ROL_ACTIVO = rewsoft.AppGlobals.ROL_VENTAS;
                            break;
                        case 3:
                            //ALMACEN
                            rewsoft.AppGlobals.ROL_ACTIVO = rewsoft.AppGlobals.ROL_ALMACEN;
                            break;
                        case 4:
                            //JEFE VENTAS
                            rewsoft.AppGlobals.ROL_ACTIVO = rewsoft.AppGlobals.ROL_VENTAS_JEFE;
                            break;
                        case 5:
                            //JEFE ALMACEN
                            rewsoft.AppGlobals.ROL_ACTIVO = rewsoft.AppGlobals.ROL_ALMACEN_JEFE;
                            break;
                    }
                    this.setMenus(rewsoft.AppGlobals.ROL_ACTIVO);
                    Ext.getBody().unmask();
                    this.getTipoCambioStore().proxy.extraParams.today = 'S';
                    this.getTipoCambioStore().load({
                        callback: function(record, operation, success) {
                            if(record.length < 1){
                                Ext.widget('wintipocambio').show();
                            } else {
                                //console.log(record[0].get('nu_tipo_cambio_venta'));
                                rewsoft.AppGlobals.TIPO_CAMBIO_VENTA = record[0].get('nu_tipo_cambio_venta');
                                Ext.getCmp('lblNoRazonSocial').setText(rewsoft.AppGlobals.RAZON_SOCIAL + ' - TCV: ' + rewsoft.AppGlobals.TIPO_CAMBIO_VENTA);
                            }
                        },
                        scope: this
                    });
                },
                failure: function(frm, action) {
                    if(action.failureType == 'server'){
                        var obj = Ext.decode(action.response.responseText);
                        Ext.Msg.alert('Login', obj.errors.reason);
                    }else{ 
                        Ext.Msg.alert('Login!', 'Error al logear. Intentar otra vez'); 
                    }
                    form.reset();
                    this.getMainView().down('combobox[name=cboCia]').setValue(rewsoft.AppGlobals.CIA);
                    Ext.getBody().unmask();
                }
            });
        } else {
            Ext.Msg.alert('Error!!!', 'Debe ingresar todos los datos');
        }
    },
    onBeforeRenderCboCia: function(combo){
        combo.setValue(rewsoft.AppGlobals.CIA);
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
            case rewsoft.AppGlobals.ROL_ADMINISTRADOR:
                //ADMINISTRADOR
                if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuVentas').show();
                }
                Ext.getCmp('mnuCompras').show();
                Ext.getCmp('mnuAlmacen').show();
                if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_DSILVANA){
                    Ext.getCmp('mnuReportes').show();
                }
                if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuContabilidad').show();
                }
                Ext.getCmp('mnuMantenimiento').show();
                Ext.getCmp('mnuConfiguracion').show();
                Ext.getCmp('mnuConfiguracionusuario').hide();
                break;
            case rewsoft.AppGlobals.ROL_VENTAS:
                //VENTAS
                if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuVentas').show();
                }
                break;
            case rewsoft.AppGlobals.ROL_ALMACEN:
                //ALMACEN
                Ext.getCmp('mnuAlmacen').show();
                break;
            case rewsoft.AppGlobals.ROL_VENTAS_JEFE:
                //JEFE VENTAS
                if(rewsoft.AppGlobals.MODELO_NEGOCIO == rewsoft.AppGlobals.MODELO_NEGOCIO_MELY_GIN){
                    Ext.getCmp('mnuVentas').show();
                }
                Ext.getCmp('mnuMantenimiento').show();
                break;
            case rewsoft.AppGlobals.ROL_ALMACEN_JEFE:
                //JEFE ALMACEN
                Ext.getCmp('mnuAlmacen').show();
                Ext.getCmp('mnuMantenimiento').show();
                break;
        }
    }
});