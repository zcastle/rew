Ext.define('rewsoft.controller.almacen.OrdenesDespachoDetalle', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.WinOrdenesDespachoDetalle'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winordenesdespachodetalle'
    }],
    stores: [
    'OrdenDespachoDetalle'
    ],
    init: function() {
        this.control({
            'winordenesdespachodetalle': {
                render: this.onRenderedWinOrdenesDespachoDetalle
            },
            'winordenesdespachodetalle grid': {
                itemdblclick: this.onItemDblClickGrid
            },
            'winordenesdespachodetalle button[name=btnAceptar]': {
                click: this.onClickBtnAceptar
            }
        });
    },
    onRenderedWinOrdenesDespachoDetalle: function(win) {
        this.getOrdenDespachoDetalleStore().proxy.extraParams.nu_documento = this.getMainView().down('displayfield[name=nu_comprobante]').getValue();
        this.getOrdenDespachoDetalleStore().load();
    },
    onItemDblClickGrid: function(grid, record){
        var view = Ext.widget('winordenesdespachodetallelotes');
        view.down('form').loadRecord(record);
        view.show();
    },
    onClickBtnAceptar: function(){
        

        Ext.Msg.confirm('Confirmacion', 'Esta seguro de procesar el despacho?', function(btn){
            if(btn=='yes'){
                var detalle = new Array();
                this.getOrdenDespachoDetalleStore().each(function(record){
                    var registro = {
                        co_producto: record.get('co_producto'),
                        no_lote: record.get('no_lote'),
                        fe_vencimiento: record.get('fe_vencimiento')
                    };
                    detalle.push(registro);
                });
                Ext.Ajax.request({
                    url: 'data/updateOrdenDespacho.php',
                    params: {
                        nu_documento: this.getMainView().down('displayfield[name=nu_comprobante]').getValue(),
                        detalle: Ext.encode(detalle)
                    },
                    success: function(response){
                        this.getController('almacen.OrdenesDespacho').getOrdenDespachoStore().load();
                        this.getMainView().hide();
                    },
                    scope: this
                });
            }
        }, this);
    }
});