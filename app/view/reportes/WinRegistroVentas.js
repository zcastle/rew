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
            collapsible: true,
            collapsed: true,
            width: 455,
            name: 'frmMeses',
            title: 'Reporte por Meses',
            border: false,
            frame: true,
            items: [{
                xtype: 'fieldcontainer',
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
            collapsible: true,
            collapsed: true,
            width: 455,
            name: 'frmRangoFechas',
            title: 'Reporte por Rango de Fechas',
            border: false,
            frame: true,
            items: [{
                xtype: 'fieldcontainer',
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
                    width: 190//,
                    //vtype: 'daterange',
                    //endDateField: 'enddt'
                },{
                    fieldLabel: 'Fin',
                    name: 'fe_fin',
                    itemId: 'enddt',
                    emptyText: 'Fin',
                    allowBlank: false,
                    margins: '0 0 0 5',
                    width: 190//,
                    //vtype: 'daterange',
                    //startDateField: 'startdt'
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
            collapsible: true,
            //collapsed: true,
            width: 455,
            name: 'frmDiasTrabajo',
            title: 'Reporte por Dias de Trabajo',
            border: false,
            frame: true,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30
                },
                defaultType: 'numberfield',
                items: [{
                    fieldLabel: 'Inicio',
                    name: 'dia_ini',
                    emptyText: 'Inicio',
                    allowBlank: false,
                    width: 190
                },{
                    fieldLabel: 'Fin',
                    name: 'dia_fin',
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
            },{
                xtype: 'grid',
                height: 400,
                width: 445,
                store: 'DiasTrabajo',
                columns: [{
                    header: 'Dia',
                    dataIndex: 'nu_diadw',
                    width: 80
                },{
                    header: 'Fecha Inicio',
                    dataIndex: 'fe_ini',
                    flex: 1
                },{
                    header: 'Fecha Fin',
                    dataIndex: 'fe_fin',
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'DiasTrabajo',
                    displayInfo: true,
                    displayMsg: 'Mostrando registros {0} - {1} de {2}',
                    emptyMsg: "No hay registros para mostrar"
                })
            }]
        }];
        this.callParent(arguments);
    }
});