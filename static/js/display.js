class display{
    constructor(){
        this.displaynum=0;
        this.body=$('<div class="container card-deck">');
        this.row;
        this.cardnum=0;
        this.build();
    }
    build(){
        $('main').addClass("flex-shrink-0");
        $('main').append(this.body);
    }
    addcard(card){
        if (card.data.display==2){
            return
        }
        if(this.cardnum/3==0){
            this.row=$('<div class="row row-cols-1 row-cols-md-3 mb-3 text-center card-deck">');
            this.body.append(this.row);
        }
        this.row.append($('<div class="col">').append(card.body));
        this.cardnum++;
    }
}

class display1{
    constructor(data){
        this.div=data;
        this.displaynum=0;
        this.body=$('<div class="container card-deck">');
        this.row;
        this.cardnum=0;
        this.build();
    }
    build(){
        //this.div.addClass("flex-shrink-0");
        this.div.append(this.body);
    }
    addcard(card){
        if (card.data.display==2){
            return
        }
        if(this.cardnum/3==0){
            this.row=$('<div class="row row-cols-1 row-cols-md-3 mb-3 text-center card-deck">');
            this.body.append(this.row);
        }
        this.row.append($('<div class="col">').append(card.body));
        this.cardnum++;
    }
}
