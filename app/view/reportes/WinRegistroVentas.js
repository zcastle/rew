Ext.define('rewsoft.view.reportes.WinRegistroVentas', {
    extend: 'Ext.Window',
    alias: 'widget.winregistroventas',
    title: 'Registro de Ventas',
    //width: 100,
    //height: 100,
    border: false,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            name: 'frmMeses',
            border: false,
            frame: true,
            items: [{
                xtype: 'fieldset',
                title: 'Reporte por Meses',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30
                },
                defaultType: 'combobox',
                items: [{
                    fieldLabel: 'Inicio',
                    name: 'fe_ini_month',
                    store: 'Meses',
                    displayField: 'name',
                    valueField: 'num',
                    queryMode: 'local',
                    emptyText: 'Month',
                    allowBlank: false,
                    forceSelection: true,
                    width: 130
                },{
                    xtype: 'numberfield',
                    name: 'fe_ini_year',
                    allowBlank: false,
                    value: new Date().getFullYear(),
                    maxValue: new Date().getFullYear(),
                    margins: '0 0 0 5',
                    width: 55
                },{
                    fieldLabel: 'Fin',
                    name: 'fe_fin_month',
                    store: 'Meses',
                    displayField: 'name',
                    valueField: 'num',
                    queryMode: 'local',
                    emptyText: 'Month',
                    allowBlank: false,
                    forceSelection: true,
                    margins: '0 0 0 5',
                    width: 130
                },{
                    xtype: 'numberfield',
                    name: 'fe_fin_year',
                    allowBlank: false,
                    value: new Date().getFullYear(),
                    maxValue: new Date().getFullYear(),
                    margins: '0 0 0 5',
                    width: 55
                },{
                    xtype: 'button',
                    name: 'btnVerMeses',
                    text: 'Ver',
                    margins: '0 0 0 5',
                    width: 55
                }]
            }]
        },{
            xtype: 'form',
            name: 'frmRangoFechas',
            border: false,
            frame: true,
            items: [{
                xtype: 'fieldset',
                title: 'Reporte por Rango de Fechas',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30
                },
                defaultType: 'datefield',
                items: [{
                    fieldLabel: 'Inicio',
                    name: 'fe_ini',
                    itemId: 'startdt',
                    emptyText: 'Inicio',
                    allowBlank: false,
                    width: 190,
                    vtype: 'daterange',
                    endDateField: 'enddt'
                },{
                    fieldLabel: 'Fin',
                    name: 'fe_fin',
                    itemId: 'enddt',
                    emptyText: 'Fin',
                    allowBlank: false,
                    margins: '0 0 0 5',
                    width: 190,
                    vtype: 'daterange',
                    startDateField: 'startdt'
                },{
                    xtype: 'button',
                    name: 'btnVerRangoFechas',
                    text: 'Ver',
                    margins: '0 0 0 5',
                    width: 55
                }]
            }]
        },{
            xtype: 'form',
            name: 'frmDiasTrabajo',
            border: false,
            frame: true,
            items: [{
                xtype: 'fieldset',
                title: 'Reporte por Dias de Trabajo',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30
                },
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Inicio',
                    name: 'fe_ini',
                    emptyText: 'Inicio',
                    allowBlank: false,
                    width: 190
                },{
                    fieldLabel: 'Fin',
                    name: 'fe_fin',
                    emptyText: 'Fin',
                    allowBlank: false,
                    margins: '0 0 0 5',
                    width: 190
                },{
                    xtype: 'button',
                    name: 'btnVerDiasTrabajo',
                    text: 'Ver',
                    margins: '0 0 0 5',
                    width: 55
                }]
            }]
        }];
        this.callParent(arguments);
    }
});