Ext.define('rewsoft.view.contabilidad.WinLibroVentas', {
    extend: 'Ext.Window',
    alias: 'widget.winlibroventas',
    title: 'Libro Ventas -> Periodo',
    //width: 100,
    //height: 100,
    modal: true,
    //resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            layout: 'hbox',
            border: false,
            frame: true,
            fieldDefaults: {
                labelWidth: 30
            },
            defaultType: 'combobox',
            width: 300,
            items: [{
                fieldLabel: 'Inicio',
                name: 'fe_ini',
                store: 'Meses',
                displayField: 'name',
                valueField: 'num',
                queryMode: 'local',
                emptyText: 'Month',
                margins: '0 0 0 5',
                allowBlank: false,
                forceSelection: true,
                flex: 1
            },{
                xtype: 'numberfield',
                name: 'fe_ini_year',
                margins: '0 0 0 5',
                allowBlank: false,
                value: new Date().getFullYear(),
                maxValue: new Date().getFullYear(),
                width: 60
            }/*,{
                fieldLabel: 'Fin',
                name: 'fe_fin',
                store: 'Meses',
                displayField: 'name',
                valueField: 'num',
                queryMode: 'local',
                emptyText: 'Month',
                margins: '0 0 0 5',
                allowBlank: false,
                forceSelection: true,
                flex: 1
            },{
                xtype: 'numberfield',
                name: 'fe_fin_year',
                margins: '0 5 0 5',
                allowBlank: false,
                value: new Date().getFullYear(),
                maxValue: new Date().getFullYear(),
                width: 55
            }*/],
            buttons: [{
                name: 'btnVer',
                text: 'Ver'
            },{
                text: 'Cerrar',
                scope: this,
                handler: this.close
            }]
        }];
        this.callParent(arguments);
    }      
});