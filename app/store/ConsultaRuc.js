Ext.define('MG.store.ConsultaRuc', {
    extend: 'Ext.data.Store',
    model: 'MG.model.ConsultaRuc',
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