
import Api from './../Components/Api';

export default class Listing {
    constructor(listing, server = false) {
        this.Id = listing.id || listing.gsid || 0;
        this.Title = listing.title || '';
        this.Description = listing.description || '';
        this.Location = listing.location || '';
        this.Date = listing.date || '';
        this.Starttime = listing.starttime || listing.start_time || (new Date()).toISOString();
        this.Endtime = listing.endtime || listing.end_time || (new Date()).toISOString();
        this.Zip_code = listing.zip_code || '';
        this.Theme = listing.theme || 'none';
        this.Owner = listing.owner || listing.uid || 0;
        this.Lat = listing.lat || 0
        this.Lng = listing.lng || 0;
        this.Photo = listing.listing_main_photo || listing.image || '';
        this.Isdelete = listing.isdelete || 0;
        this.Servertype = server || false;
        this.List = listing.list || [];
        var sdate = new Date(Date.parse(this.Starttime))
        var edate = new Date(Date.parse(this.Endtime))
        this.Start_date = sdate.toISOString().split('T')[0]
        this.Start_time = sdate.getHours();
        this.End_date = edate.toISOString().split('T')[0]
        this.End_time = edate.getHours();
    }
    update(callback) {
        console.log(this.json);
        Api.listing.update(this.json, res => { if (callback) callback(res) });
    }
    create(callback) {
        console.log(this.json);
        Api.listing.create(this.createjson, res => { if (callback) callback(res) });
    }
    delete(callback) {
        console.log(this.json);
        Api.listing.delete(this.Id, res => callback(res));
    }


    
    get table() {
        return this.Servertype ?
            {
                "gsid": this.Id,
                "uid": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
            }
            :
            {
                "id": this.Id,
                "owner": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
            }
    }
    get createjson() {
        return this.Servertype ?
            {
                "gsid": this.Id,
                "uid": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
                "starttime": Date.parse(this.Starttime),
                "endtime": Date.parse(this.Endtime),
                "isdelete": this.Isdelete,
                "image": this.Photo
            }
            :
            {

                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "theme": this.Theme,
                "start_time": this.Starttime,
                "end_time": this.Endtime
            }
    }
    get json() {
        return this.Servertype ?
            {
                "gsid": this.Id,
                "uid": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
                "starttime": Date.parse(this.Starttime),
                "endtime": Date.parse(this.Endtime),
                "isdelete": this.Isdelete,
                "image": this.Photo
            }
            :
            {
                "id": this.Id,
                "owner": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
                "date": this.Date,
                "theme": this.Theme,
                "start_time": this.Starttime,
                "end_time": this.Endtime,
                "listing_main_photo":this.image
            }
    }
    ////////////////////////////////////
    // list
    get list() {
        return this.List;
    }
    set list(list) {
        this.List = list;
    }
    ////////////////////////////////////

    ////////////////////////////////////
    // theme
    get theme() {
        return this.Theme;
    }
    set theme(theme) {
        this.Theme = theme;
    }
    ////////////////////////////////////

    ////////////////////////////////////
    // start end time
    get starttime() {
        return this.Start_time;
    }
    set starttime(val) {
        this.Start_time = val;
        this.Starttime = this.Start_date + 'T' + val+'Z'
    }
    get endtime() {
        return this.End_time;
    }
    set endtime(val) {
        this.End_time = val;
        this.Endtime = this.End_date + 'T' + val+'Z'
    }

    get startdate() {
        return this.Start_date;
    }
    set startdate(val) {
        this.Start_date = val;
        this.Starttime = val + 'T' + this.Start_time+'Z'
    }
    get enddate() {
        return this.End_date;
    }
    set enddate(val) {
        this.End_date = val;
        this.Endtime = val + 'T' + this.End_time+'Z'
    }

    get start() {
        return this.Starttime;
    }
    set start(starttime) {
        this.Starttime = starttime;
    }
    get end() {
        return this.Endtime;
    }
    set end(endtime) {
        this.Endtime = endtime;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // isdelete

    get isdelete() {
        return this.Isdelete;
    }
    set isdelete(isdelete) {
        this.Isdelete = isdelete;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // photo

    get image() {
        return this.Photo;
    }
    set image(image) {
        this.Photo = image;
    }
    get listing_main_photo() {
        return this.Photo;
    }
    set listing_main_photo(listing_main_photo) {
        this.Photo = listing_main_photo;
    }
    ////////////////////////////////////
    // zip code

    get zip_code() {
        return this.Zip_code;
    }
    set zip_code(zip_code) {
        this.Zip_code = zip_code;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // date
    get date() {
        return this.Date;
    }
    set date(date) {
        this.Date = date;
    }
    ////////////////////////////////////
    // owner

    get uid() {
        return this.Owner;
    }
    get owner() {
        return this.Owner;
    }
    set uid(uid) {
        this.Owner = uid;
    }
    set owner(owner) {
        this.Owner = owner;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // Id

    get listingid() {
        return this.Id;
    }
    get pk() {
        return this.Id;
    }
    get id() {
        return this.Id;
    }
    get gsid() {
        return this.Id;
    }
    set listingid(listingid) {
        this.Id = listingid;
    }
    set pk(pk) {
        this.Id = pk;
    }
    set id(id) {
        this.Id = id;
    }
    set gsid(gsid) {
        this.Id = gsid;
    }
    //////////////////////////////////

    //////////////////////////////////
    // title
    get title() {
        return this.Title;
    }
    get name() {
        return this.Title;
    }
    set title(title) {
        this.Title = title;
    }
    set name(name) {
        this.Title = name;
    }

    //////////////////////////////////

    //////////////////////////////////
    // Description

    get description() {
        return this.Description;
    }
    set description(description) {
        this.Description = description;
    }

    ///////////////////////////////////

    //////////////////////////////////
    // location 

    get location() {
        return this.Location;
    }

    set location(location) {
        this.Location = location;
    }

    //////////////////////////////////

    /////////////////////////////////
    // lat lng

    get lat() {
        return this.Lat;
    }

    get lng() {
        return this.Lng;
    }

    set lat(lat) {
        this.Lat = lat;
    }

    set lng(lng) {
        this.Lng = lng;
    }

    //////////////////////////////////
}