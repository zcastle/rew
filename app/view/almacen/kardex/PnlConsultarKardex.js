Ext.define('rewsoft.view.almacen.kardex.PnlConsultarKardex', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pnlconsultarkardex',
    store: 'Kardex',
    initComponent: function() {
        this.columns = [{
            header: 'Fecha',    
            dataIndex: 'fe_creacion',
            menuDisabled: true,
            sortable: false,
            width: 85
        },{
            header: 'Operacion',
            dataIndex: 'no_movimiento',
            menuDisabled: true,
            sortable: false,
            width: 250
        },{
            header: 'Tipo',
            dataIndex: 'tipo_movimiento',
            menuDisabled: true,
            sortable: false,
            width: 50
        },{
            header: 'Documento',
            dataIndex: 'nu_comprobante',
            menuDisabled: true,
            sortable: false,
            width: 150
        },{
            header: 'Cantidad',
            dataIndex: 'ca_movimiento',
            menuDisabled: true,
            sortable: false,
            width: 60
        },{
            header: 'Saldo',
            dataIndex: 'ca_stock_actual',
            menuDisabled: true,
            sortable: false,
            width: 60
        },{
            header: 'Cliente o Razon Social',
            dataIndex: 'no_cliente',
            menuDisabled: true,
            sortable: false,
            flex: 1
        },{
            header: 'Promedio S/.',
            dataIndex: 'va_promedio',
            menuDisabled: true,
            sortable: false,
            width: 70,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        },{
            header: 'Costo S/.',
            dataIndex: 'va_costo',
            menuDisabled: true,
            sortable: false,
            width: 80,
            align: 'right',
            renderer: function(val){
                return Ext.util.Format.number(val, rewsoft.AppGlobals.FORMA_NUMBER);
            }
        }];
        this.tbar = [{
            xtype: 'form',
            frame: true,
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start'
            },
            defaults: {
                xtype: 'container',
                flex: 1,
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 80,
                    fieldStyle: 'border: 1px solid #B5B8C8; color: red;'
                }
            },
            items: [{
                items: [{
                    xtype: 'textfield',
                    name: 'co_producto',
                    fieldLabel: 'Codigo',
                    enableKeyEvents: true,
                    width: 180
                },{
                    fieldLabel: 'Producto',
                    name: 'no_producto'
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'co_almacen',
                        fieldLabel: 'Almacen',
                        labelWidth: 80,
                        enableKeyEvents: true,
                        width: 180
                    },{
                        xtype: 'displayfield',
                        name: 'no_almacen',
                        fieldStyle: 'border: 1px solid #B5B8C8; color: red;',
                        style: 'margin-left: 5px'
                    }]
                },{
                    xtype: 'container',
                    style: 'margin-top: 5px',
                    name: 'zoneLotes',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'no_lote',
                        fieldLabel: 'Lote',
                        labelWidth: 80,
                        enableKeyEvents: true,
                        width: 180
                    },{
                        xtype: 'displayfield',
                        name: 'fe_vencimiento',
                        fieldLabel: 'Vencimiento',
                        fieldStyle: 'border: 1px solid #B5B8C8; color: red;',
                        style: 'margin-left: 5px'
                    }]
                }]
            },{
                items: [{
                    fieldLabel: 'Grupo',
                    name: 'no_grupo'
                },{
                    fieldLabel: 'Categoria',
                    name: 'no_categoria'
                },{
                    fieldLabel: 'Sub Categoria',
                    name: 'no_sub_categoria'
                }]
            }]
        }]
        this.callParent(arguments);
    }      
});