Ext.define('rewsoft.view.ventas.WinSeries', {
    extend: 'Ext.Window',
    alias: 'widget.winseries',
    title: 'Series',
    width: 300,
    modal: true,
    resizable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'grid',
            name: 'gridSeries',
            height: 150,
            store: 'Series',
            columns: [{
                header: 'Serie',
                dataIndex: 'nu_serie',
                menuDisabled: true,
                sortable: false,
                width: 60
            },{
                header: 'Secuencia',
                dataIndex: 'nu_secuencia',
                menuDisabled: true,
                sortable: false,
                flex: 1
            },{
                xtype: 'actioncolumn',
                width: 20,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/editar-16x16.png',
                    tooltip: 'Editar',
                    iconCls: 'mousepointer'
                }]
            }]
        }],
        this.callParent(arguments);
    }      
});