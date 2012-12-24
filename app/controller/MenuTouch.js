Ext.define('MG.controller.MenuTouch', {
    extend: 'Ext.app.Controller',
    views: [
    'MenuTouch'
    ],
    stores: [
    'Launcher'
    ],
    init: function() {
        this.control({
            'menutouch dataview': {
                itemclick: this.onDataViewItemClick
            }
        });
    },
    onDataViewItemClick: function(dataview, record){
        var menuitem = {
            action: record.data.action,
            text: record.data.caption
        }
        this.getController('MainView').onMenuItemClick(menuitem);
    }
});
