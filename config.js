Ext.onReady(function() {
    Ext.define('AppGlobals', {
        singleton: true,
        DEBUG: false,
        IS_ROOT: true,
        //ROLES
        //ROL_ID: 2,
        ROL_ACTIVO: 'ADMIN',
        //FIN ROLES
        ROL_ADMINISTRADOR: 'ADMIN',
        ROL_VENTAS: 'VENTAS',
        ROL_VENTAS_JEFE: 'VENTAS_JEFE',
        ROL_ALMACEN: 'ALMACEN',
        ROL_ALMACEN_JEFE: 'ALMACEN_JEFE',
        ROL_REPORTES: 'REPORTES',
        IGV: 18,
        VA_IGV: 1.18,
        VA_IGV_2: 0.18,
        TIPO_CAMBIO_COMPRA: 2.65,
        TIPO_CAMBIO_VENTA: 2.60,
        CIA: '01', //CODIGO DE LA EMPRESA SEGUN LA TB m_empresas
        NOMBRE_COMERCIAL: 'EMPRESA',
        RAZON_SOCIAL: 'EMPRESA SA',
        CO_USUARIO: 'ADMIN',
        MODELO_NEGOCIO: null,
        MODELO_NEGOCIO_MELY_GIN: 'MG',
        MODELO_NEGOCIO_DSILVANA: 'POS',
        DECIMALES: 4,
        FORMA_NUMBER: '0,000.0000',
        FORMA_PAGO_DEFAULT: '1010',
        SERIE_FV: '1',
        SERIE_BV: '1'
    });
});