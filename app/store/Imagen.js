Ext.define('MG.store.Imagen', {
    extend: 'Ext.data.Store',
    model: 'MG.model.Imagen',
    autoLoad: true,
    data: [
        {src: 'resources/images/ajax.png', caption: 'Facturacion', action: 'mnuVentasFacturacionFacturar'},
        {src: 'resources/images/ajax.png', caption: 'Registro de Compras', action: 'mnuInventarioIngresodeProductos'},
        {src: 'resources/images/ajax.png', caption: 'Productos', action: 'mnuMantenimientoProductos'}
    ]
    
});