Ext.define('rewsoft.controller.mantenimiento.clientes.PnlClientes', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.clientes.PnlClientes'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlclientes'
    }],
    stores: [
        'Clientes'
    ],
    init: function() {
        this.control({
            'pnlclientes': {
                render: this.onRenderPnlClientes,
                itemdblclick: this.onItemDblClickPnlClientes,
                cellclick: this.onCellClickPnlClientes
            },
            'pnlclientes textfield[name=txtBuscar]': {
                keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
            },
            'pnlclientes button[name=btnNuevo]': {
                click: this.onClickBtnNuevo
            }
        });
    },
    onRenderPnlClientes: function(win) {
        this.getClientesStore().proxy.extraParams.no_cliente = '';
        this.getClientesStore().load();
    },
    onClickBtnNuevo: function(){
        var view = Ext.widget('winclientesnuevo');
        view.down('button[name=btnCrear]').show();
        view.down('button[name=btnEditar]').hide();
        view.show();
    },
    onItemDblClickPnlClientes: function(Grid, record){
        var view = Ext.widget('winclientesnuevo');
        view.down('form').loadRecord(record);
        view.down('button[name=btnCrear]').hide();
        view.down('button[name=btnEditar]').show();
        view.down('textfield[name=codigo]').disable();
        view.show();
    },
    onCellClickPnlClientes: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        var columna = grid.up('grid').columns[columnIndex].name;
        var nombre = record.get('cliente');
        if(columna == 'actionEditar') {
            var view = Ext.widget('winclientesnuevo');
            view.down('form').loadRecord(record);
            view.down('button[name=btnCrear]').hide();
            view.down('button[name=btnEditar]').show();
            view.down('textfield[name=codigo]').disable();
            view.show();
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover al cliente: <span style=color:red; font-weidth: bold>' + nombre + '<span>?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }, this);
        }
    },
    onKeyPressTxtBuscar: function(text, key){
        if(key.getKey() == key.ENTER){
            this.getClientesStore().proxy.extraParams.no_cliente = text.getValue();
            this.getClientesStore().loadPage(1);
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getClientesStore().proxy.extraParams.no_cliente = '';
            this.getClientesStore().loadPage(1);
        }
    }
});
