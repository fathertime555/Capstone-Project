class itemform {
    constructor() {
        this.body = $('<form>')
        this.images = [];
        this.upload = $('<input class="form-control" type="file">');
        this.build();
    }
    build() {
        var div = $('<div class="mb-3">');
        div.append($('<label for="itemname" class="form-label">').text('Itemname'));
        div.append($('<input type="text" class="form-control" id="itemname">'));
        this.body.append(div);

        div = $('<div class="mb-3">');
        div.append($('<label for="brand" class="form-label">').text('brand'));
        div.append($('<input type="text" class="form-control" id="brand">'));
        this.body.append(div);

        div = $('<div class="mb-3">');
        div.append($('<label for="module" class="form-label">').text('module'));
        div.append($('<input type="text" class="form-control" id="module">'));
        this.body.append(div);

        div = $('<div class="mb-3">');
        div.append($('<label for="Qty" class="form-label">').text('Qty'));
        div.append($('<input type="text" class="form-control" id="Qty">'));
        this.body.append(div);

        div = $('<div class="mb-3">');
        div.append($('<label for="Price" class="form-label">').text('Price'));
        div.append($('<input type="text" class="form-control" id="Price">'));
        this.body.append(div);

        div = $('<div class="mb-3">');
        div.append($('<label for="description" class="form-label">').text('description'));
        div.append($('<textarea type="text" class="form-control" id="description">'));
        this.body.append(div);

        var imgbtn = $('<a id="up" class="btn btn-primary">').text('AddImage');
        var Submit = $('<a id="btn" class="btn btn-primary">').text('Submit');
        this.body.append(imgbtn);
        this.body.append(Submit);
        this.body.append($('<div id="image">'));

        var files = this.images;
        var upload = this.upload;
        this.upload.on('change', function (ev) {
            var f = ev.target.files[0];
            if (f) {
                var r = new FileReader();
                r.onload = function (e) {
                    $('#image').append($('<img class=up>').attr('src', e.target.result))
                    // var fd = new FormData();
                    // fd.append('FILES',e.target.result)
                    // $.ajax({
                    //   url: '../database/image_request/', // point to server-side controller method
                    //   dataType: 'text', // what to expect back from the server
                    //   cache: false,
                    //   contentType: false,
                    //   processData: false,
                    //   data: fd,
                    //   type: 'post',
                    //   success: function (response) {
                    //     $('#msg').html(response); // display success response from the server
                    //   },
                    //   error: function (response) {
                    //     $('#msg').html(response); // display error response from the server
                    //   }
                    // });
                    files.push(e.target.result);
                    console.log(files);
                };
                r.readAsDataURL(f);

            } else {
                console.log("failed");
            }

        })
        imgbtn.click(function () {
            upload.click();
        })
        Submit.click(function (e) {
            var param={
                    itemname: $('#itemname').val(),
                    brand: $('#brand').val(),
                    mnumber: $('#module').val(),
                    description: $('#description').val(),
                    price: $('#Price').val(),
                    qty: $('#Qty').val(),
                    gsid: $('#gs').text(),
                    imageid: 1,
                    uid: 1,
                    display: 1
                }
                console.log(param);
            $.get('../database/createitem',param
                , function (data) {
                    console.log(data[0][0]);
                    var imagecount=files.length;
                    var count=0;
                    files.forEach(element => {
                        var fd = new FormData();
                        fd.append('FILES', element);
                        fd.append('itid', data[0][0]);
                        fd.append('num', count+1);
                        $.ajax({
                            url: '../database/image_request/',
                            dataType: 'text',
                            cache: false,
                            async: false,
                            contentType: false,
                            processData: false,
                            data: fd,
                            type: 'post',
                            success: function (response) {
                                console.log('success');
                                count++;
                                if(count==imagecount){
                                    console.log('done');
                                }
                            },
                            error: function (response) {
                                console.log('error');
                            }
                        });
                    });

                })
        })
    }
}