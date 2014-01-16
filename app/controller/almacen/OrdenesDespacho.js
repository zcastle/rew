Ext.define('rewsoft.controller.almacen.OrdenesDespacho', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.PnlOrdenesDespacho'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'pnlordenesdespacho'
    }],
    stores: [
    'OrdenDespacho'
    ],
    interval: null,
    init: function() {
        this.control({
            'pnlordenesdespacho': {
                render: this.onRenderedPnlOrdenesDespacho,
                destroy: this.onDestroyPnlOrdenesDespacho,
                itemdblclick: this.onItemDblClickPnlOrdenesDespacho
            }
        });
    },
    onRenderedPnlOrdenesDespacho: function() {
        this.getOrdenDespachoStore().load();
        this.interval = setInterval(function() {
            Ext.StoreMgr.lookup('OrdenDespacho').load();
        }, 1000 * 60);
    },
    onDestroyPnlOrdenesDespacho: function(){
        clearInterval(this.interval);
    },
    onItemDblClickPnlOrdenesDespacho: function(grid, record){
        var view = Ext.widget('winordenesdespachodetalle');
        view.down('form').loadRecord(record);
        view.show();
    }
});