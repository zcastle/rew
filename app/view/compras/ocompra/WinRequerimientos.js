Ext.define('rewsoft.view.compras.ocompra.WinRequerimientos', {
    extend: 'Ext.Window',
    alias: 'widget.winrequerimientos',
    title: 'Requerimientos',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridRequerimientos',
            height: 150,
            store: 'RequerimientoC',
            columns: [{
                header: 'Fecha',
                dataIndex: 'fe_requerimiento',
                menuDisabled: true,
                sortable: false,
                width: 85
            },{
                header: 'Numero',
                dataIndex: 'nu_requerimiento',
                menuDisabled: true,
                sortable: false,
                flex: 1
            },{
                header: 'Usuario',
                dataIndex: 'co_usuario',
                menuDisabled: true,
                sortable: false,
                flex: 1,
                width: 100
            }]
        }],
        this.callParent(arguments);
    }      
});