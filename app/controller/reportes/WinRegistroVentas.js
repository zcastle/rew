Ext.define('MG.controller.reportes.WinRegistroVentas', {
    extend: 'Ext.app.Controller',
    views: [
    'reportes.WinRegistroVentas'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winregistroventas'
    }],
    stores: [
        'Meses'
    ],
    init: function() {
        this.control({
            'winregistroventas': {
                render: this.onRenderedWinLibroVentas
            },
            'winregistroventas button[name=btnVerMeses]': {
                click: this.onClickVerMeses
            },
            'winregistroventas button[name=btnVerRangoFechas]': {
                click: this.onClickVerRangoFechas
            }
        });
    },
    onRenderedWinLibroVentas: function() {
    },
    onClickVerMeses: function(button){
        var form = button.up('window').down('form[name=frmMeses]').getForm();
        if(form.isValid()){
            var fe_ini_month = this.getMainView().down('combobox[name=fe_ini_month]').getValue();
            var fe_ini_year = this.getMainView().down('numberfield[name=fe_ini_year]').getValue();
            var fe_fin_month = this.getMainView().down('combobox[name=fe_fin_month]').getValue();
            var fe_fin_year = this.getMainView().down('numberfield[name=fe_fin_year]').getValue();
            if(fe_fin_year < fe_ini_year){
                Ext.Msg.alert('Atencion','El año de Fin debe ser mayor o igual al año de Inicio');
                return;
            }else if(fe_fin_month < fe_ini_month){
                Ext.Msg.alert('Atencion','El mes de Fin debe ser mayor o igual al mes de Inicio');
                return;
            }
            window.open('data/reportes/reporteRegistroVentas.php?cia='+AppGlobals.CIA+'&fe_ini_month='+fe_ini_month+'&fe_ini_year='+fe_ini_year+'&fe_fin_month='+fe_fin_month+'&fe_fin_year='+fe_fin_year, '_blank');
            this.getMainView().close();
        }
    },
    onClickVerRangoFechas: function(button){
        var form = button.up('window').down('form[name=frmRangoFechas]').getForm();
        if(form.isValid()){
            var fe_ini = this.getMainView().down('datefield[name=fe_ini]').getRawValue();
            var fe_fin = this.getMainView().down('datefield[name=fe_fin]').getRawValue();
            if(fe_fin < fe_ini){
                Ext.Msg.alert('Atencion','El año de Fin debe ser mayor o igual al año de Inicio');
                return;
            }
            window.open('data/reportes/reporteRegistroVentas.php?cia='+AppGlobals.CIA+'&fe_ini='+fe_ini+'&fe_fin='+fe_fin, '_blank');
            this.getMainView().close();
        }
    }
});