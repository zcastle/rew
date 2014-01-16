Ext.define('rewsoft.controller.configuracion.PnlUsuarios', {
    extend: 'Ext.app.Controller',
    views: [
    'configuracion.PnlUsuarios'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlusuarios'
    }],
    stores: [
        'Usuarios'
    ],
    init: function() {
        this.control({
            'pnlusuarios': {
                render: this.onRenderPnlUsuarios,
                itemdblclick: this.onItemDblClickPnlUsuarios,
                cellclick: this.onCellClickPnlUsuarios
            },
            'pnlusuarios button[name=btnNuevo]': {
                click: this.onClickBtnNuevo
            }
        });
    },
    onRenderPnlUsuarios: function(win) {
        this.getUsuariosStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getUsuariosStore().proxy.extraParams.co_usuario = '';
        this.getUsuariosStore().proxy.extraParams.is_login = false;
        this.getUsuariosStore().load();
    },
    onClickBtnNuevo: function(){
        var view = Ext.widget('winusuariosnuevo');
        view.down('button[name=btnCrear]').show();
        view.down('button[name=btnEditar]').hide();
        view.show();
    },
    onItemDblClickPnlUsuarios: function(Grid, record){
        var view = Ext.widget('winusuariosnuevo');
        view.down('form').loadRecord(record);
        view.down('button[name=btnCrear]').hide();
        view.down('button[name=btnEditar]').show();
        view.show();
    },
    onCellClickPnlUsuarios: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        var columna = grid.up('grid').columns[columnIndex].name;
        var nombre = record.get('no_usuario');
        if(columna == 'actionEditar') {
            var view = Ext.widget('winusuariosnuevo');
            view.down('form').loadRecord(record);
            view.down('button[name=btnCrear]').hide();
            view.down('button[name=btnEditar]').show();
            view.show();
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover al usuario: <span style=color:red; font-weidth: bold>' + nombre + '<span>?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }, this);
        }
    }
});