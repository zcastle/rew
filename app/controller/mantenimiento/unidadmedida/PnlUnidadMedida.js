Ext.define('rewsoft.controller.mantenimiento.unidadmedida.PnlUnidadMedida', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.unidadmedida.PnlUnidadMedida'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlunidadmedida'
    }],
    stores: [
    'UnidadesVenta'
    ],
    init: function() {
        this.control({
            'pnlunidadmedida': {
                render: this.onRenderedPnlCategorias,
                itemdblclick: this.onItemDblClickPnlCategorias,
                cellclick: this.onCellClickPnlCategorias
            },
            'pnlunidadmedida button[name=btnNuevo]': {
                click: this.onClickBtnNuevo
            }
        });
    },
    onRenderedPnlCategorias: function(grid) {
        this.getUnidadesVentaStore().proxy.extraParams.co_empresa = rewsoft.AppGlobals.CIA;
        this.getUnidadesVentaStore().load();
    },
    onItemDblClickPnlCategorias: function(Grid, record){
        var view = Ext.widget('winunidadmedidanuevo');
        view.down('form').loadRecord(record);
        view.down('button[name=btnCrear]').hide();
        view.down('button[name=btnEditar]').show();
        view.show();
    },
    onCellClickPnlCategorias: function(grid, td, columnIndex, record, tr, rowIndex, e, opt){
        var columna = grid.up('grid').columns[columnIndex].name;
        var unidad = record.get('no_unidad');
        if(columna == 'actionEditar') {
            var view = Ext.widget('winunidadmedidanuevo');
            view.down('form').loadRecord(record);
            view.down('button[name=btnCrear]').hide();
            view.down('button[name=btnEditar]').show();
            view.show();
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm('Confirmacion', 'Estas seguro de querer remover la unidad: ' + unidad + '?', function(btn){
                if(btn=='yes'){
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }, this);
        }
    },
    onClickBtnNuevo: function(btn){
        var view = Ext.widget('winunidadmedidanuevo');
        view.down('button[name=btnEditar]').hide();
        view.show();
    }
});