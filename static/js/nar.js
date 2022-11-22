class navbar{
    constructor(){
        this.logo=$('<a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">')
        this.logoimage=$('<img class="bi me-2" width="40" height="32" src="../static/src/bootstrap-stack.png">');
        this.bodyup=$('<div class="px-3 py-2 bg-dark text-white">');
        this.bodydown=$('<div class="px-3 py-2 border-bottom mb-3">');
        this.build();
    }
    build(){
        this.logo.text("project")
        var ul=$('<ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">')
        var body=$('<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">');
        ul.append($('<li>').append($('<a href="/map" class="nav-link text-white">').text('Garage sale near by')));
        ul.append($('<li>').append($('<a href="/" class="nav-link text-white">').text('Watch List')));
        var dropdownli=$('<li class="nav-item dropdown">');
        dropdownli.append($('<a a class="nav-link dropdown-toggle text-white" href="#" id="dropdown10" data-bs-toggle="dropdown" aria-expanded="false">').text('Setting'));
        var dropdownul=$('<ul class="dropdown-menu" aria-labelledby="dropdown10">');
        dropdownul.append($('<li>').append($('<a class="dropdown-item" href="/login">').text('Account')));
        dropdownul.append($('<li>').append($('<a class="dropdown-item" href="/additem">').text('create form')));
        dropdownul.append($('<li>').append($('<a class="dropdown-item" href="/newmap">').text('map demo')));
        dropdownli.append(dropdownul);
        ul.append(dropdownli);
        
        this.logo.text('Project');
        this.bodyup.append($('<div class="container">').append(body));
        body.append(this.logo);
        body.append(ul);

        var bodyd=$('<div class=" d-flex flex-wrap justify-content-center">');
        //var nav=$('<nav aria-label="breadcrumb" class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto col-md-3">');
        bodyd.append($('<div class="col-md-3 text-end">').append($('<input type="text" class="form-control input-sm" placeholder="" aria-label="" aria-describedby="basic-addon1">')))
        bodyd.append($('<div class="input-group-prepend">').append($('<button class="btn btn-outline-secondary" type="button">').text('Search')));
        this.bodydown.append(bodyd.appendTo($('<div class="container">'))); 
        


        $('header').append(this.bodyup)
        $('header').append(this.bodydown)
    }
}

$(function(){
    var nav=new navbar();
})