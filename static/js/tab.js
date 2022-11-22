class tab{
    constructor(data){
        this.li=$('<li class="nav-item" role="presentation">');
        this.div;
        this.gsid=data.gsid;
        this.divid='gsid_'+data.gsid;
        this.tabid=this.divid+'_tab';
        this.display=data.display;
        this.build();
    }
    build(){
        var liclass="nav-link ";
        var divclass="tab-pane fade ";
        var gsid=this.gsid;
        if(this.display){
            liclass+='active';
            divclass+='show active';
        }
        this.li.append(
            $('<button>',{
                class:liclass,
                id:this.tabid,
                'data-bs-toggle':"pill",
                'data-bs-target':'#'+this.divid,
                type:'button',
                role:"tab",
                'aria-controls':this.divid,
                'aria-selected':this.display,
                click:function(){
                    $('#gs').text(gsid);
                }
            }
        ).text('garage:'+this.gsid))
        this.div=$('<div>',{
            class:divclass,
            id:this.divid,
            role:'tabpanel',
            'aria-labelledby':this.tabid
        })
    }
}