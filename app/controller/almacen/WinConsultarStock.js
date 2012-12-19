Ext.define('MG.controller.almacen.WinConsultarStock', {
    extend: 'Ext.app.Controller',
    views: [
    'almacen.WinConsultarStock'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winconsultarstock'
    }],
    stores: [
        'Meses'
    ],
    init: function() {
        this.control({
            'winconsultarstock': {
                render: this.onRenderedWinConsultaStock
            },
            'winconsultarstock button[name=btnVerStock]': {
                click: this.onClickBtnVerStock
            }
        });
    },
    onRenderedWinConsultaStock: function() {
    },
    onClickBtnVerStock: function(button){
        var mostrarLotes = this.getMainView().down('checkboxfield[name=chkMostrarLotes]').getValue();
        var win = window.open('data/reportes/reporteConsultaStock.php?cia='+AppGlobals.CIA+'&lotes='+mostrarLotes, '_blank');
        //win.print();
        this.getMainView().close();
    }
});