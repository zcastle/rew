Ext.define('MG.view.mantenimiento.producto.WinProductosNuevo', {
    extend: 'Ext.window.Window',
    alias : 'widget.winproductosnuevo',
    //width: 1000,
    title: 'Producto',
    layout: 'fit',
    resizable: false,
    border: false,
    modal: true,
    initComponent: function() {
        this.items = [{
            frame: true,
            xtype: 'form',
            id: 'frmMantenimientoProductosCrear',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'fieldcontainer',
                    items:[{
                        xtype: 'hidden',
                        name: 'co_producto'
                    },{
                        xtype: 'combobox',
                        name: 'co_grupo',
                        fieldLabel: 'Grupo',
                        labelWidth: 90,
                        store: 'Grupo',
                        valueField: 'co_grupo',
                        displayField: 'no_grupo',
                        queryMode: 'local',
                        editable: false,
                        width: 355,
                        msgTarget: 'side',
                        allowBlank: false
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        items: [{
                            xtype: 'textfield',
                            name: 'co_categoria',
                            fieldLabel: 'Categoria',
                            labelWidth: 90,
                            width: 150,
                            msgTarget: 'side',
                            enableKeyEvents: true,
                            allowBlank: false
                        },{
                            xtype: 'displayfield',
                            name: 'no_categoria',
                            padding: '0 0 0 2',
                            fieldStyle: 'border: 1px solid #B5B8C8; height: 22px',
                            flex: 1
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        name: 'zonaMarca',
                        items: [{
                            xtype: 'textfield',
                            name: 'co_sub_categoria',
                            fieldLabel: 'Marca',
                            labelWidth: 90,
                            width: 150,
                            msgTarget: 'side',
                            enableKeyEvents: true,
                            allowBlank: false
                        },{
                            xtype: 'displayfield',
                            name: 'no_sub_categoria',
                            padding: '0 0 0 2',
                            fieldStyle: 'border: 1px solid #B5B8C8; height: 22px',
                            flex: 1
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        name: 'zonaPaisProcedencia',
                        items: [{
                            xtype: 'textfield',
                            name: 'co_pais_procedencia',
                            fieldLabel: 'Procedencia',
                            labelWidth: 90,
                            width: 150,
                            msgTarget: 'side',
                            enableKeyEvents: true,
                            allowBlank: false
                        },{
                            xtype: 'displayfield',
                            name: 'no_pais_procedencia',
                            padding: '0 0 0 2',
                            fieldStyle: 'border: 1px solid #B5B8C8; height: 22px',
                            flex: 1
                        }]
                    },{
                        xtype: 'textfield',
                        name: 'no_producto',
                        fieldLabel: 'Descripcion',
                        msgTarget: 'side',
                        allowBlank: false,
                        labelWidth: 90,
                        width: 355,
                        fieldStyle : 'text-transform: uppercase'
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        name: 'zonaUnidadMedida',
                        defaults: {
                            xtype: 'textfield',
                            msgTarget: 'side',
                            allowBlank: false,
                            labelWidth: 90
                        },
                        items: [{
                            xtype: 'combobox',
                            name: 'co_unidad',
                            store: 'UnidadesVenta',
                            valueField: 'id',
                            displayField: 'nombre',
                            queryMode: 'local',
                            editable: false,
                            fieldLabel: 'Unidad Medida',
                            flex: 1
                        },{
                            xtype: 'button',
                            name: 'btnCrearUnidadMedida',
                            text: 'crear',
                            margins: '0 0 0 5'
                        }]
                    }/*,{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        name: 'zonaPresentacion',
                        defaults: {
                            xtype: 'textfield',
                            msgTarget: 'side',
                            allowBlank: true,
                            labelWidth: 90
                        },
                        items: [{
                            name: 'no_presentacion',
                            fieldLabel: 'Presentacion',
                            value: 'CAJA',
                            flex: 1
                        },{
                            xtype: 'label',
                            text: 'X',
                            margin: '4 0 0 2'
                        },{
                            name: 'v_presenta',
                            width: 50,
                            margin: '0 0 0 2'
                        }]
                    }*/,{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        defaults: {
                            xtype: 'numberfield',
                            msgTarget: 'side',
                            allowBlank: false,
                            allowNegative: false,
                            minValue: 0,
                            value: 0
                        },
                        items: [{
                            name: 'va_compra',
                            fieldLabel: 'Costo S/.',
                            labelWidth: 90,
                            flex: 1
                        },{
                            name: 'precio0',
                            fieldLabel: 'Precio Publico',
                            labelWidth: 90,
                            flex: 1,
                            margin: '0 0 0 5'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        name: 'zonaPrecioCaja',
                        defaults: {
                            xtype: 'numberfield',
                            msgTarget: 'side',
                            allowBlank: false,
                            allowNegative: false,
                            minValue: 0,
                            value: 0
                        },
                        items: [{
                            xtype: 'hiddenfield',
                            flex: 1
                        },{
                            name: 'precio1',
                            fieldLabel: 'Precio X Caja',
                            labelWidth: 90,
                            flex: 1,
                            margin: '0 0 0 5'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        name: 'zonaStock',
                        defaults: {
                            xtype: 'numberfield',
                            msgTarget: 'side',
                            allowBlank: false,
                            allowNegative: false,
                            minValue: 0,
                            value: 0
                        },
                        items: [{
                            name: 'stk_min',
                            fieldLabel: 'Stock Minimo',
                            labelWidth: 90,
                            flex: 1
                        },{
                            name: 'stk_max',
                            fieldLabel: 'Stock Maximo',
                            labelWidth: 90,
                            flex: 1,
                            margin: '0 0 0 5'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        defaults: {
                            xtype: 'textfield',
                            msgTarget: 'side',
                            allowBlank: false,
                            flex: 1
                        },
                        items: [{
                            name: 'cuenta_vta',
                            fieldLabel: 'Cta. Nacional',
                            labelWidth: 90
                        },{
                            name: 'cuenta_vt2',
                            fieldLabel: 'Cta. Extranjera',
                            labelWidth: 90,
                            margin: '0 0 0 5'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        name: 'zonaOrdenDestino',
                        width: 355,
                        defaults: {
                            xtype: 'numberfield',
                            msgTarget: 'side',
                            flex: 1
                        },
                        items: [{
                            name: 'nu_orden',
                            fieldLabel: 'Orden',
                            allowNegative: false,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            labelWidth: 90
                        },{
                            xtype: 'combobox',
                            name: 'co_destino',
                            fieldLabel: 'Destino',
                            labelWidth: 90,
                            store: 'Destino',
                            valueField: 'co_destino',
                            displayField: 'no_destino',
                            queryMode: 'local',
                            editable: false,
                            width: 355
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: 355,
                        defaults: {
                            xtype: 'checkbox',
                            msgTarget: 'side',
                            inputValue: 'S',
                            uncheckedValue: 'N',
                            checked: true
                        },
                        items: [{
                            name: 'fl_igv',
                            fieldLabel: 'Afecto IGV',
                            labelWidth: 90,
                            flex: 1
                        },{
                            name: 'fl_serv',
                            fieldLabel: 'Afecto Servicio',
                            labelWidth: 90,
                            flex: 1
                        }]
                    },{
                        xtype: 'fieldset',
                        name: 'zonaPrecios',
                        title: 'Precios',
                        width: 355,
                        items: [{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                msgTarget: 'side',
                                labelWidth: 60
                            },
                            items: [{
                                xtype: 'numberfield',
                                name: 'txtPorcentajePrecio',
                                fieldLabel: 'Porcentaje',
                                minValue: 0,
                                maxValue: 100,
                                value: 0,
                                enableKeyEvents: true,
                                width: 150
                            },{
                                xtype: 'button',
                                name: 'btnPorcentajePrecio',
                                text: 'Aceptar',
                                margin: '0 0 0 3'
                            }]
                        },{
                            xtype: 'grid',
                            name: 'gridPrecios',
                            store: 'Precio',
                            flex: 1,
                            height: 100,
                            columns: [{
                                header: '%',
                                dataIndex: 'va_per',
                                width: 100
                            },{
                                header: 'Precio',
                                dataIndex: 'va_precio',
                                flex: 1,
                                renderer: function(val){
                                    return Ext.util.Format.number(val, "0,000.0000");
                                }
                            },{
                                xtype: 'actioncolumn',
                                width: 20,
                                menuDisabled: true,
                                items: [{
                                    icon: 'resources/images/remove.gif',
                                    tooltip: 'Remover',
                                    iconCls: 'mousepointer'
                                }]
                            }]
                        }]
                    }]
                },{
                    xtype: 'fieldcontainer',
                    margins: '0 0 0 10',
                    name: 'zonaRecetas',
                    items: [{
                        xtype: 'grid',
                        name: 'gridReceta',
                        store: 'Receta',
                        width: 600,
                        height: 150,
                        columns: [{
                            header: 'Codigo',
                            dataIndex: 'co_producto',
                            disableMenu: true,
                            width: 60
                        },{
                            header: 'Productos',
                            dataIndex: 'no_producto',
                            disableMenu: true,
                            flex: 1
                        },{
                            header: 'Cantidad',
                            dataIndex: 'ca_producto',
                            width: 60,
                            align: 'right',
                            renderer: function(val){
                                return Ext.util.Format.number(val, "0,000.0000");
                            }
                        },{
                            header: 'Unidad',
                            dataIndex: 'no_unidad',
                            width: 80
                        },{
                            header: 'Costo',
                            dataIndex: 'va_compra',
                            width: 60,
                            align: 'right',
                            renderer: function(val){
                                return Ext.util.Format.number(val, "0,000.0000");
                            }
                        },{
                            header: 'Total',
                            dataIndex: 'va_total',
                            width: 60,
                            align: 'right',
                            renderer: function(val){
                                return Ext.util.Format.number(val, "0,000.0000");
                            }
                        },{
                            header: 'Almacen',
                            dataIndex: 'no_almacen',
                            width: 60
                        },{
                            xtype: 'actioncolumn',
                            width: 20,
                            menuDisabled: true,
                            items: [{
                                icon: 'resources/images/remove.gif',
                                tooltip: 'Remover',
                                iconCls: 'mousepointer'
                            }]
                        }],
                        bbar: [{
                            name: 'btnAdd',
                            text: 'Añadir'
                        },{
                            name: 'btnEliminarTodo',
                            text: 'Eliminar todo'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        style: 'margin-top: 10px',
                        items: [{
                            xtype: 'displayfield',
                            name: 'totalCosto',
                            fieldLabel: 'Total Costo',
                            labelWidth: 130,
                            width: 250,
                            fieldStyle: 'border: 1px solid #B5B8C8; color: red; text-align: right;',
                            value: '0.0000'
                        },{
                            xtype: 'button',
                            name: 'btnAplicarCosto',
                            text: 'Aplicar',
                            margin: '0 0 0 5'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'displayfield',
                            name: 'ventaSugerido',
                            fieldLabel: 'Precio Venta Sugerido',
                            labelWidth: 130,
                            width: 250,
                            fieldStyle: 'border: 1px solid #B5B8C8; color: red; text-align: right',
                            value: '0.0000'
                        },{
                            xtype: 'button',
                            name: 'btnAplicarVentaSugerido',
                            text: 'Aplicar',
                            margin: '0 0 0 5'
                        },{
                            xtype: 'checkboxfield',
                            name: 'chkMostrarFormula',
                            //checked: true,
                            width: 70,
                            boxLabel  : 'Formula',
                            margin: '0 0 0 5'
                        },{
                            xtype: 'displayfield',
                            name: 'formula',
                            hidden: true,
                            fieldStyle: 'color: red; text-align: right',
                            value: '(costo * 100) / 23'
                        }]
                    }]
                }]
            }],
            buttons: [{
                name: 'btnCrear',
                text : 'Grabar',
                iconCls: 'ico-aceptar-medium',
                scale: 'medium'
            },{
                name: 'btnEditar',
                text : 'Editar',
                iconCls: 'ico-aceptar-medium',
                scale: 'medium'
            },{
                text : 'Cancelar',
                scope : this,
                iconCls: 'ico-cancelar',
                scale: 'medium',
                handler: this.close
            }]
        }]
        this.callParent(arguments);
    }
});