Ext.define('MG.controller.mantenimiento.categorias.PnlCategorias', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.categoria.PnlCategorias'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlcategorias'
    }],
    stores: [
    'Categorias',
    'Grupo'
    ],
    init: function() {
        this.control({
            'pnlcategorias': {
                render: this.onRenderedPnlCategorias,
                itemdblclick: this.onItemDblClickPnlCategorias,
                cellclick: this.onCellClickPnlCategorias
            },
            'pnlcategorias button[name=btnNuevo]': {
                click: this.onClickBtnNuevo
            }
        });
    },
    onRenderedPnlCategorias: function(grid) {
        this.getCategoriasStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
        this.getCategoriasStore().load();
    },
    onItemDblClickPnlCategorias: function(Grid, record){
        var view = Ext.widget('wincategoriasnuevo');
        view.down('form').loadRecord(record);
        view.down('button[name=btnCrear]').hide();
        view.down('button[name=btnEditar]').show();
        view.show();
    },
    onCellClickPnlCategorias: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        var columna = grid.up('grid').columns[columnIndex].name;
        var categoria = record.get('no_categoria');
        if(columna == 'actionEditar') {
            var view = Ext.widget('wincategoriasnuevo');
            view.down('form').loadRecord(record);
            view.down('button[name=btnCrear]').hide();
            view.down('button[name=btnEditar]').show();
            view.show();
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover la categoria: ' + categoria + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }, this);
        }
    },
    onClickBtnNuevo: function(btn){
        var view = Ext.widget('wincategoriasnuevo');
        view.down('button[name=btnEditar]').hide();
        view.show();
    }
});