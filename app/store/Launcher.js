Ext.define('MG.store.Launcher', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Launcher',
    autoLoad: true,
    data: [
        {src: 'resources/images/ajax.png', caption: 'Facturacion', action: 'mnuVentasFacturacion'},
        {src: 'resources/images/ajax.png', caption: 'Registro de Compras', action: 'mnuInventarioIngresodeProductos'},
        {src: 'resources/images/ajax.png', caption: 'Productos', action: 'mnuMantenimientoProductos'}
    ]
    
});