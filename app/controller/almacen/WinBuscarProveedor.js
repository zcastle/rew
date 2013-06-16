Ext.define('rewsoft.controller.almacen.WinBuscarProveedor', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.WinBuscarProveedor'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winbuscarproveedor'
    },{
        ref: 'PnlIngresodeProducto',
        selector: 'pnlingresodeproducto'
    }],
    stores: [
        'Proveedores'
    ],
    init: function() {
        this.control({
            'winbuscarproveedor': {
                render: this.onRenderWinBuscarProveedor
            },
            'winbuscarproveedor textfield[name=txtBuscar]': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'winbuscarproveedor grid': {
                render: this.onRenderedGridProveedor,
                itemdblclick: this.onItemDblClickGridProveedor
            }
        });
    },
    onRenderWinBuscarProveedor: function() {
        this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
        this.getProveedoresStore().proxy.extraParams.no_proveedor = '';
        this.getProveedoresStore().load();
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
            this.getProveedoresStore().proxy.extraParams.no_proveedor = text.getValue();
            this.getProveedoresStore().load();
        }
    },
    onKeyUpTxtBuscar: function(text, key){
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
            this.getProveedoresStore().proxy.extraParams.no_proveedor = '';
            this.getProveedoresStore().load();
        }
    },
    onRenderedGridProveedor: function(grid){
        grid.getView().on('viewready', function(grd){
            var maps = new Ext.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.onItemDblClickGridProveedor(grd, record)
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
    },
    onItemDblClickGridProveedor: function(grid, record){
        try{
            this.getPnlIngresodeProducto().down('textfield[name=txtRuc]').setValue(record.get('nu_ruc'));
            this.getPnlIngresodeProducto().down('textfield[name=txtProveedor]').setValue(record.get('no_razon_social'));
            this.getPnlIngresodeProducto().down('combobox[name=cboFormaPago]').setValue(record.get('co_forma_pago')+'');
        }catch(e){}
        this.getMainView().close();
    }
});