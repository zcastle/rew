Ext.define('MG.controller.almacen.OrdenesDespachoDetalleLotes', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.WinOrdenesDespachoDetalleLotes'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winordenesdespachodetallelotes'
    }],
    stores: [
    'Lotes'
    ],
    init: function() {
        this.control({
            'winordenesdespachodetallelotes': {
                render: this.onRenderedWinOrdenesDespachoDetalleLotes
            },
            'winordenesdespachodetallelotes grid': {
                itemdblclick: this.onItemDblClickGrid
            }
        });
    },
    onRenderedWinOrdenesDespachoDetalleLotes: function(win) {
        this.getLotesStore().proxy.extraParams.co_empresa = AppGlobals.CIA;
        this.getLotesStore().proxy.extraParams.co_producto = this.getMainView().down('displayfield[name=co_producto]').getValue();
        this.getLotesStore().load();
    },
    onItemDblClickGrid: function(grid, record){
        this.getMainView().down('form').getRecord().set('no_lote', record.get('no_lote'));
        this.getMainView().down('form').getRecord().set('fe_vencimiento', record.get('fe_vencimiento'));
        this.getMainView().close();
    }
});