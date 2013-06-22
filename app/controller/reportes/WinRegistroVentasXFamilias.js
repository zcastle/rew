Ext.define('rewsoft.controller.reportes.WinRegistroVentasXFamilias', {
    extend: 'Ext.app.Controller',
    views: [
    'reportes.WinRegistroVentasXFamilias'
    ],
    refs: [{
        ref: 'MainView',
        selector: 'winregistroventasxfamilias'
    }],
    stores: [
        'Meses',
        'DiasTrabajo'
    ],
    init: function() {
        this.control({
            'winregistroventasxfamilias': {
                render: this.onRenderedWinLibroVentas
            },
            'winregistroventasxfamilias button[name=btnVerMeses]': {
                click: this.onClickVerMeses
            },
            'winregistroventasxfamilias button[name=btnVerRangoFechas]': {
                click: this.onClickVerRangoFechas
            },
            'winregistroventasxfamilias button[name=btnVerDiasTrabajo]': {
                click: this.onClickVerDiasTrabajo
            },
            'winregistroventasxfamilias grid': {
                itemclick: this.onItemClickGridDias
            }
        });
    },
    onRenderedWinLibroVentas: function() {
        this.getDiasTrabajoStore().load();
    },
    onClickVerMeses: function(button){
        var form = button.up('window').down('form[name=frmMeses]').getForm();
        if(form.isValid()){
            var fe_ini_month = this.getMainView().down('combobox[name=fe_ini_month]').getValue();
            var fe_ini_year = this.getMainView().down('numberfield[name=fe_ini_year]').getValue();
            var fe_fin_month = this.getMainView().down('combobox[name=fe_fin_month]').getValue();
            var fe_fin_year = this.getMainView().down('numberfield[name=fe_fin_year]').getValue();
            if(fe_fin_year < fe_ini_year){
                Ext.Msg.alert('Atencion','El aÃ±o de Fin debe ser mayor al aÃ±o de Inicio');
                return;
            }else if(fe_fin_month < fe_ini_month){
                Ext.Msg.alert('Atencion','El mes de Fin debe ser mayor al mes de Inicio');
                return;
            }
            window.open('data/reportes/reporteRegistroVentasXFamilias.php?cia='+rewsoft.AppGlobals.CIA+'&fe_ini_month='+fe_ini_month+'&fe_ini_year='+fe_ini_year+'&fe_fin_month='+fe_fin_month+'&fe_fin_year='+fe_fin_year, '_blank');
            //this.getMainView().close();
        }
    },
    onClickVerRangoFechas: function(button){
        var form = button.up('window').down('form[name=frmRangoFechas]').getForm();
        if(form.isValid()){
            var fe_ini = this.getMainView().down('datefield[name=fe_ini]').getRawValue();
            var fe_fin = this.getMainView().down('datefield[name=fe_fin]').getRawValue();
            if(fe_fin < fe_ini){
                Ext.Msg.alert('Atencion','El aÃ±o de Fin debe ser mayor al aÃ±o de Inicio');
                return;
            }
            window.open('data/reportes/reporteRegistroVentasXFamilias.php?cia='+rewsoft.AppGlobals.CIA+'&fe_ini='+fe_ini+'&fe_fin='+fe_fin, '_blank');
            //this.getMainView().close();
        }
    },
    onClickVerDiasTrabajo: function(button){
        var form = button.up('window').down('form[name=frmDiasTrabajo]').getForm();
        if(form.isValid()){
            var dia_ini = this.getMainView().down('numberfield[name=dia_ini]').getValue();
            var dia_fin = this.getMainView().down('numberfield[name=dia_fin]').getValue();
            if(dia_fin < dia_ini){
                Ext.Msg.alert('Atencion','El dia Final no debe ser menor al dia de Inicio');
                return;
            }
            window.open('data/reportes/reporteRegistroVentasXFamilias.php?cia='+rewsoft.AppGlobals.CIA+'&dia_ini='+dia_ini+'&dia_fin='+dia_fin, '_blank');
            //this.getMainView().close();
        }
    },
    onItemClickGridDias: function(Grid, record){
        var dia = record.get('nu_diadw');
        this.getMainView().down('numberfield[name=dia_ini]').setValue(dia);
        this.getMainView().down('numberfield[name=dia_fin]').setValue(dia);
    }
});