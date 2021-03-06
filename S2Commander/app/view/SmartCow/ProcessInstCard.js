Ext.define('SeamlessC2.view.SmartCow.ProcessInstCard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.smart_cow_proc_inst_card',    
    id:'smart_cow_proc_inst_card',
    width: '100%',
    //height:300,
    flex:1,
    title: 'SmartCOW Workflows',
    //autoScroll:true,
    defaults: {
        // applied to each contained panel
        border: false
    },
    layout:'card',
    activeItem: 0, // index or id
    navigate:function( direction){
        var layout = this.getLayout();
        layout[direction]();
        Ext.getCmp('smart_cow_proc_inst_card_move_prev').setDisabled(!layout.getPrev());
        Ext.getCmp('smart_cow_proc_inst_card_move_next').setDisabled(!layout.getNext());
    },
    tbar: ['->', {
        id: 'smart_cow_proc_inst_card_move_prev',
        text: '&laquo; Previous',
        disabled: true,
        handler: function(btn) {
           btn.up("panel").navigate("prev");
        }
    },{
        id: 'smart_cow_proc_inst_card_move_next',
        text: 'Next &raquo;',
        disabled: true,
        handler: function(btn) {
                btn.up("panel").navigate("next");
            }
    }],
    items: []
});