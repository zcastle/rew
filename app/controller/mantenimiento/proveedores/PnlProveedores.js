Ext.define('rewsoft.controller.mantenimiento.proveedores.PnlProveedores', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.proveedores.PnlProveedores'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlproveedores'
    }],
    stores: [
        'Proveedores'
    ],
    init: function() {
        this.control({
            'pnlproveedores': {
                render: this.onRenderPnlProveedores,
                itemdblclick: this.onItemDblClickPnlClientes,
                cellclick: this.onCellClickPnlClientes
            },
            'pnlproveedores textfield[name=txtBuscar]': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'pnlproveedores button[name=btnNuevo]': {
                click: this.onClickBtnNuevo
            }
        });
    },
    onRenderPnlProveedores: function(win) {
        this.getProveedoresStore().proxy.extraParams.nu_ruc = '';
        this.getProveedoresStore().load();
    },
    onClickBtnNuevo: function(){
        var view = Ext.widget('winproveedoresnuevo');
        view.down('button[name=btnCrear]').show();
        view.down('button[name=btnEditar]').hide();
        view.show();
    },
    onItemDblClickPnlClientes: function(Grid, record){
        var view = Ext.widget('winproveedoresnuevo');
        view.down('form').loadRecord(record);
        view.down('button[name=btnCrear]').hide();
        view.down('button[name=btnEditar]').show();
        view.down('textfield[name=nu_ruc]').disable();
        view.show();
    },
    onCellClickPnlClientes: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        var columna = grid.up('grid').columns[columnIndex].name;
        var nombre = record.get('no_razon_social');
        if(columna == 'actionEditar') {
            var view = Ext.widget('winproveedoresnuevo');
            view.down('form').loadRecord(record);
            view.down('button[name=btnCrear]').hide();
            view.down('button[name=btnEditar]').show();
            view.down('textfield[name=nu_ruc]').disable();
            view.show();
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover al proveedor: <span style=color:red; font-weidth: bold>' + nombre + '<span>?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync({
                        success: function(batch, options) {
                            this.getProveedoresStore().load();
                        },
                        scope: this
                    });
                }
            }, this);
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getProveedoresStore().proxy.extraParams.no_proveedor = text.getValue();
            this.getProveedoresStore().loadPage(1);
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getProveedoresStore().proxy.extraParams.no_proveedor = '';
            this.getProveedoresStore().loadPage(1);
        }
    }
});
