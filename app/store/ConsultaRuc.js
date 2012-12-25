Ext.define('rewsoft.store.ConsultaRuc', {
    extend: 'Ext.data.Store',
    model: 'rewsoft.model.ConsultaRuc',
    proxy: {
        type: 'jsonp',
        url: 'http://www.openbusiness.pe/ceb/getRazonSocialFromSunat.php',
        //url: 'data/getRazonSocialFromSunat.php',
        extraParams: {
            co_tipo: null,
            nu_ruc: null
        }
    }
});