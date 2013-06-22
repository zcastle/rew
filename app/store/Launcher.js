Ext.define('rewsoft.store.Launcher', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.Launcher',
    autoLoad: true,
    data: [
        {src: 'resources/images/ajax.png', caption: 'Facturacion', action: 'mnuVentasFacturacion'},
        {src: 'resources/images/ajax.png', caption: 'Registro de Compras', action: 'mnuInventarioIngresodeProductos'},
        {src: 'resources/images/ajax.png', caption: 'Productos', action: 'mnuMantenimientoProductos'}
    ]
    
});