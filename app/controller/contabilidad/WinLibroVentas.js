Ext.define('rewsoft.controller.contabilidad.WinLibroVentas', {
    extend: 'Ext.app.Controller',
    views: [
    'contabilidad.WinLibroVentas'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winlibroventas'
    }],
    stores: [
        'Meses'
    ],
    init: function() {
        this.control({
            'winlibroventas': {
                render: this.onRenderedWinLibroVentas
            },
            'winlibroventas button[name=btnVer]': {
                click: this.onClickVer
            }
        });
    },
    onRenderedWinLibroVentas: function() {
    },
    onClickVer: function(){
        var form = this.getMainView().down('form').getForm();
        if(form.isValid()){
            var fe_ini = this.getMainView().down('combobox[name=fe_ini]').getValue();
            var fe_ini_year = this.getMainView().down('numberfield[name=fe_ini_year]').getValue();
            //var fe_fin = this.getMainView().down('combobox[name=fe_fin]').getValue();
            //var fe_fin_year = this.getMainView().down('numberfield[name=fe_fin_year]').getValue();
            /*if(fe_fin_year < fe_ini_year){
                Ext.Msg.alert('Atencion','El año de Fin debe ser mayor o igual al año de Inicio');
                return;
            }else if(fe_fin < fe_ini){
                Ext.Msg.alert('Atencion','El mes de Fin debe ser mayor o igual al mes de Inicio');
                return;
            }*/
            //window.open('data/reportes/reporteLibroVentas.php?mes_ini='+fe_ini+"&anio_ini="+fe_ini_year+"&mes_fin="+fe_fin+"&anio_fin="+fe_fin_year, '_blank');
            window.open('data/reportes/reporteLibroVentas.php?mes_ini='+fe_ini+"&anio_ini="+fe_ini_year, '_blank');
            this.getMainView().close();
        }
    }
});