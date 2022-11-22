class showgarage{
    constructor(){
        this.ul=$('<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">');
        this.div=$('<div class="tab-content" id="pills-tabContent">');
        this.build();
    }
    build(){
        var ul=this.ul;
        var div=this.div;
        $.get('../database/getgaragesale',function(data){
            data[0]['display']=true
            var count=0;
            data.forEach(element => {
                if(count>0){
                    element['display']=false;
                }
                count++;
                var newtab=new tab(element)
                ul.append(newtab.li);
                div.append(newtab.div);
                count++;
                var dis=new display1(newtab.div);
                $.get('../database/getitemlistbygsid',{gsid:element.gsid},function(data){
                    data.forEach(e=>{
                        var card=new cardbootstrap(e);
                        dis.addcard(card);
                    })
                })
            });
        })
    }
}