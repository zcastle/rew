Ext.define('MG.controller.mantenimiento.Proveedores', {
    extend: 'Ext.app.Controller',
    views: [
    'mantenimiento.proveedor.PnlProveedor'
    ],
    init: function() {
        this.control({
            'pnlproveedor': {
                render: this.onPnlProveedorRendered
            }
        });
    },
    onPnlProveedorRendered: function(grid) {
        //grid.getStore().load();
    }
});