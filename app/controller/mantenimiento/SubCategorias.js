Ext.define('rewsoft.controller.mantenimiento.SubCategorias', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.categoria.PnlSubCategorias'
    ],
    stores: [
    'SubCategorias'
    ],
    init: function() {
        this.control({
            'pnlsubcategorias': {
                render: this.onRenderedPnlSubCategorias
            }
        });
    },
    onRenderedPnlSubCategorias: function(grid) {
       this.getSubCategoriasStore().load();
    }
});