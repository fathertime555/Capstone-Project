import Api from './../Components/Api';

export default class Item {
    constructor(item, server = false) {
        this.Id = item.id || item.itid; //
        this.Name = item.name || item.itemname; //
        this.Item_main_photo = item.item_main_photo || item.image || item.src;  //
        this.Date = item.date || item.posttime; //
        this.Owner = item.owner || item.uid;    //
        this.Listing = item.listing || item.gsid; //
        this.Quantity = item.quantity || item.qty; //
        this.Price = item.price || 0;
        this.Tags = item.tags || 'none';
        this.Zip_code = item.zip_code || '';
        this.Lat = item.lat || '';
        this.Lng = item.lng || '';
        this.Description = item.description || '';
        this.Display = item.display || 0;
        this.Imageid = item.imageid || 0;
        this.Brand = item.brand || '';
        this.Isdelete = item.isdelete || 0;
        this.Mnumber = item.mnumber || 0;
        this.Detail = item.detail || '';
        this.Imagelist = item.list || [];
        this.List = [];
        this.servertype = server;
    }
    get table() {
        return this.servertype ? {
            itid: this.Id,
            uid: this.Owner,
            gsid: this.Listing,
            itemname: this.Name,
            brand: this.Brand,
            description: this.Description,
            price: this.Price,
            qty: this.Quantity,
            imageid: this.Imageid,

        } : {
            id: this.Id,
            owner: this.Owner,
            listing: this.Listing,
            name: this.Name,
            // photo: this.Item_main_photo,
            description: this.Description,
            quantity: this.Quantity,
            price: this.Price,
            lat: this.Lat,
            lng: this.Lng,

        }
    }
    get json() {
        return this.servertype ? {
            itid: this.Id,
            itemname: this.Name,
            brand: this.Brand,
            mnumber: this.Mnumber,
            description: this.Description,
            price: this.Price,
            qty: this.Quantity,
            detail: this.Detail,
            gsid: this.Listing,
            posttime: this.Date,
            imageid: this.Imageid,
            image: this.Item_main_photo,
            uid: this.Owner,
            display: this.Display,
            isdelete: this.Isdelete
        } : {
            id: this.Id,
            name: this.Name,
            item_main_photo: this.Item_main_photo,
            description: this.Description,
            quantity: this.Quantity,
            price: this.Price,
            owner: this.Owner,
            listing: this.Listing,
            tags: this.Tags,
            lat: this.Lat,
            lng: this.Lng,
            date: this.Date
        }
    }

    update(callback) {
        console.log(this.json);
        Api.item.update(this.json, res => callback(res));
    }
    create(callback) {
        console.log(this.json);
        Api.item.create(this.json, res => callback(res));
    }
    delete(callback) {
        Api.item.delete(this.json, res => callback(res));
    }



    // get() {
    //     return this.
    // }
    // set(val) {
    //     this.= val;
    // }
    ////////////////////////////////////////////////////
    //
    get list() {
        return this.List;
    }
    set list(val) {
        this.List = val
    }

    get imagelist() {
        return this.Imagelist;
    }
    set imagelist(val) {
        this.Imagelist = val
    }

    get detail() {
        return this.Detail
    }
    set detail(val) {
        this.Detail = val;
    }

    get mnumber() {
        return this.Mnumber
    }
    set mnumber(val) {
        this.Mnumber = val;
    }

    get isdelete() {
        return this.Isdelete
    }
    set isdelete(val) {
        this.Isdelete = val;
    }

    get brand() {
        return this.Brand
    }
    set brand(val) {
        this.Brand = val;
    }

    get imageid() {
        return this.Imageid
    }
    set imageid(val) {
        this.Imageid = val;
    }

    get display() {
        return this.Display
    }
    set display(val) {
        this.Display = val;
    }

    get description() {
        return this.Description
    }
    set description(val) {
        this.Description = val;
    }

    get lng() {
        return this.Lng
    }
    set lng(val) {
        this.Lng = val;
    }

    get lat() {
        return this.Lat
    }
    set lat(val) {
        this.Lat = val;
    }

    get zip_code() {
        return this.Zip_code
    }
    set zip_code(val) {
        this.Zip_code = val;
    }

    get tags() {
        return this.Tags
    }
    set tags(val) {
        this.Tags = val;
    }

    get price() {
        return this.Price
    }
    set price(val) {
        this.Price = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get quantity() {
        return this.Quantity
    }
    set quantity(val) {
        this.Quantity = val;
    }

    get qty() {
        return this.Quantity
    }
    set qty(val) {
        this.Quantity = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get listing() {
        return this.Listing
    }
    set listing(val) {
        this.Listing = val;
    }

    get gsid() {
        return this.Listing
    }
    set gsid(val) {
        this.Listing = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get owner() {
        return this.Owner
    }
    set owner(val) {
        this.Owner = val;
    }

    get uid() {
        return this.Owner
    }
    set uid(val) {
        this.Owner = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get posttime() {
        return this.Date
    }
    set posttime(val) {
        this.Date = val;
    }

    get date() {
        return this.Date
    }
    set date(val) {
        this.Date = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get item_main_photo() {
        return this.Item_main_photo
    }
    set item_main_photo(val) {
        this.Item_main_photo = val;
    }

    get image() {
        return this.Item_main_photo
    }
    set image(val) {
        this.Item_main_photo = val;
    }
    get src() {
        return this.Item_main_photo
    }
    set src(val) {
        this.Item_main_photo = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get name() {
        return this.Name
    }
    set name(val) {
        this.Name = val;
    }

    get itemname() {
        return this.Name
    }
    set itemname(val) {
        this.Name = val;
    }

    get title() {
        return this.Name
    }
    set title(val) {
        this.Name = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get pk() {
        return this.Id
    }
    set pk(val) {
        this.Id = val;
    }

    get itid() {
        return this.Id
    }
    set itid(val) {
        this.Id = val;
    }

    get id() {
        return this.Id
    }
    set id(val) {
        this.Id = val;
    }

    ///////////////////////////////////////////////////
}