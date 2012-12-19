Ext.define('Ext.ux.Exporter', {
    extend: 'Ext.Button',
    alias: 'widget.exporterbutton',
    iconCls: 'ico-exportar-medium',
    scale: 'medium',
    text: 'Exportar',
    data: null,
    initComponent: function(){
        this.handler = function() {
            Ext.getBody().mask('Exportando...');
            var jsonData = Ext.encode(Ext.pluck(this.data.getStore().data.items, 'data'));
            //console.log(jsonData);
            Ext.Ajax.request({
                url: 'data/exportarExcel.php',
                params: {
                    data: jsonData
                },
                success: function(response){
                    var obj = Ext.decode(response.responseText);
                    if(obj.success) {
                        //console.log('Exportado con exito');
                        //console.log(obj.data);
                    } else {
                        Ext.Msg.alert('Error!!!', 'Error al exportar contenido');
                    }
                    Ext.getBody().unmask();
                }
            });
        }
        this.callParent(arguments);
    }
});
