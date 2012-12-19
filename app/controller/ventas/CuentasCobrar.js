Ext.define('MG.controller.ventas.CuentasCobrar', {
    extend: 'Ext.app.Controller',
    views: [
    'ventas.PnlCuentasCobrar'
    ],
    refs: [{
        ref: 'PnlCuentasCobrar',
        selector: 'pnlcuentascobrar'
    }],
    stores: [
        'CuentasCobrar'
    ],
    init: function() {
        this.control({
            'pnlcuentascobrar': {
                render: this.onRenderedPnlCuentasCobrar
            }
        });
    },
    onRenderedPnlCuentasCobrar: function() {
        this.getCuentasCobrarStore().load();
    }
});