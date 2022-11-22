class cardbootstrap{
    constructor(data){
        this.data=data;
        this.body=$('<div class="card mb-4 rounded-3 shadow-sm">');
        this.image=$('<img class="rounded img-fluid">');
        this.itemname=$('<h1  class="card-title pricing-card-title text-truncate">');
        this.itemdetial=$('<ul class="list-unstyled mt-3 mb-4">');
        this.cardbody=$('<div class="card-body">');
        this.cardfoot=$('<div class="card-footer text-muted">')
        this.build();
    }
    build(){
        this.itemname.text(this.data.itemname);
        this.image.attr('src',"../"+this.data.src);
        var ul=$('<ul class="list-unstyled mt-3 mb-4">');
        ul.append($('<li>').text('tag'));
        ul.append($('<li class="text-truncate">').text(this.data.description));
        ul.append($('<li>').text(this.data.price));
        this.body.append($('<div class="card-header py-3">').append(this.image));
        this.body.append(this.cardbody);
        this.cardbody.append(this.itemname);
        this.body.append(ul);
        this.body.append(this.cardfoot);
        var da=this.data;
        this.cardfoot.append($('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>').click(function(){
            $.get('database/changedisplay',{"itid":da.itid,"display":da.display==1?2:1});
        }));
        this.image.wrap($('<a>').attr({href:"/item?itid="+this.data.itid}));
    }
    
}

class card1{
    constructor(data){
        this.data=data;
        this.body=$('<div class="card w-96  shadow-xl">');
        this.image=$('<img>');
        this.itemname=$('<h2 class="card-title">');
        this.itemdetial=$('<ul>');
        this.cardbody=$('<div class="card-body">');
        this.build();
    }
    build(){
        this.itemname.text(this.data.itemname);
        this.image.attr('src',this.data.src);
        var ul=$('<ul>');
        ul.append($('<li>').text('tag'));
        ul.append($('<li>').text('Some introduction'));
        ul.append($('<li>').text(this.data.price));
        this.body.append($('<figure>').append(this.image));
        this.body.append(this.cardbody);
        this.cardbody.append(this.itemname);
        this.body.append(ul);
    }
    
}