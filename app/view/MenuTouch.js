Ext.define('rewsoft.view.MenuTouch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menutouch',
    initComponent: function() {
        this.items = [{
            xtype: 'dataview',
            store: 'Launcher',
            tpl: [
            '<tpl for=".">',
            '<div class="thumb-wrap">',
            '<img src="{src}" />',
            '<br/><span>{caption}</span>',
            '</div>',
            '</tpl>'
            ],
            itemSelector: 'div.thumb-wrap',
            overItemCls : 'item-hover',
            emptyText: 'No se encontro la imagen'
        }],
        this.callParent(arguments);
    }      
});