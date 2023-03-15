
import Api from './../Components/Api';
import { io } from 'socket.io-client';
import Core_chat from './../Components/Core_chat';
import Core from '../Components/Core';



export default class User {
    constructor(user = {}, server = false) {
        this.Username = user.username || '';  //
        this.Id = user.id || user.uid || 0;  //
        this.First_name = user.first_name || user.firstname || '';
        this.Last_name = user.last_name || user.lastname || '';
        this.Phone_number = user.phone_number || user.phone || '';
        this.Email = user.email || '';
        this.Password = user.password || '';
        this.Re_password = user.re_password || '';
        this.Address_line_1 = user.address_line_1 || '';
        this.Address_line_2 = user.address_line_2 || '';
        this.City = user.city || '';
        this.State = user.state || '';
        this.Zip_code = user.zip_code || ''
        this.Registertime = user.registertime || '';
        this.Profilepicture = user.profilepicture || user.profile_picture || '';
        this.Imagepreview = '';
        this.Changedimage = '';
        this.Islogin = false;
        this.Chathistory = user.chathistory || [];
        this.Socket = {};
        this.Rooms = {};
        this.servertype = server || false;
    }

    get loginjson() {
        return this.servertype ? {
            username: this.username,
            password: this.password
        } : {

        }
    }

    login(email, password, callback) {
        var json = {
            email: email,
            username: email,
            password: password
        };

        Api.user.sign_in(json, (res) => {
            if (res.data.result) {
                this.load(res.data.user)
                callback(res)
            }
        })
    }

    logout(callback) {
        Api.user.sign_out((res) => {
            this.Socket.disconnect();
            callback(res)
        });
    }

    update(callback) {
        Api.user.update(this.json, res => {
            if (res.result) {
                var user = res.user.data
                this.Username = user.username;
                this.Id = user.id || user.uid;
                this.First_name = user.first_name || user.firstname;
                this.Last_name = user.last_name || user.lastname;
                this.Phone_number = user.phone_number || user.phone;
                this.Email = user.email || '';
                this.Password = user.password || '';
                this.Address_line_1 = user.address_line_1 || '';
                this.Address_line_2 = user.address_line_2 || '';
                this.City = user.city || '';
                this.State = user.state || '';
                this.Zip_code = user.zip_code || ''
                this.Registertime = user.registertime || '';
                this.Profilepicture = user.profilepicture || '';
                this.Chathistory = user.chathistory || [];
            } else {
                console.log(res);
            }
            if (callback) callback(res)
        })
    }

    signup(callback) {
        Api.user.register(this.json, (res) => {
            if (res.result) {
                this.load(res.user)
            }
            if (callback)
                callback(res);
        })
    }

    setdev(dev) {
        this.servertype = dev;
    }

    form_data(json) {
        var formdata = new FormData();
        Object.keys(json).forEach(key => {
            formdata.append(key, json[key])
        })
        return formdata;
    }

    load_from_form(formdata) {
        var user = formdata
        this.Username = user.username;
        this.Id = user.id || user.uid;
        this.First_name = user.first_name || user.firstname;
        this.Last_name = user.last_name || user.lastname;
        this.Phone_number = user.phone_number || user.phone;
        this.Email = user.email || '';
        this.Password = user.password || '';
        this.Address_line_1 = user.address_line_1 || '';
        this.Address_line_2 = user.address_line_2 || '';
        this.City = user.city || '';
        this.State = user.state || '';
        this.Zip_code = user.zip_code || ''
        this.Registertime = user.registertime || '';
        this.Profilepicture = user.profilepicture || '';
    }

    load(user, callback) {
        this.Username = user.username;
        this.Id = user.id || user.uid;
        this.First_name = user.first_name || user.firstname;
        this.Last_name = user.last_name || user.lastname;
        this.Phone_number = user.phone_number || user.phone;
        this.Email = user.email || '';
        this.Password = user.password || '';
        this.Address_line_1 = user.address_line_1 || '';
        this.Address_line_2 = user.address_line_2 || '';
        this.City = user.city || '';
        this.State = user.state || '';
        this.Zip_code = user.zip_code || ''
        this.Registertime = user.registertime || '';
        this.Profilepicture = user.profilepicture || user.profile_picture || '';
        this.Chathistory = user.chathistory || [];
        this.Islogin = true;
        if (this.servertype) {
            this.Socket = new io('/', {
                autoConnect: false,
                query: {
                    user_email: this.Email,
                    user_uid: this.Id,
                }
            })
            this.Socket.connect();
            this.Socket.emit('passuser', this.chatinfo);
            this.Rooms = new Core_chat(user.chathistory)
        }
        if (callback)
            callback();
    }

    get chatinfo() {
        return {
            uid: this.Id,
            email: this.Email,
            chatname: this.First_name
        }
    }

    get json() {
        var json = this.servertype ? {
            uid: this.Id,
            firstname: this.First_name,
            lastname: this.Last_name,
            email: this.Email,
            phone: this.Phone_number,
            password: this.Password,
            registertime: this.Registertime,
            username: this.Username,
            profilepicture: this.Profilepicture,
            re_password: this.Re_password
        } : {
            id: this.Id,
            username: this.Username,
            first_name: this.First_name,
            last_name: this.Last_name,
            email: this.Email,
            password: this.Password,
            address_line_1: this.Address_line_1,
            address_line_2: this.Address_line_2,
            city: this.City,
            state: this.State,
            zip_code: this.Zip_code,
            phone_number: this.Phone_number,
            re_password: this.Re_password
        }
        if (this.Imagepreview !== '') {
            json['profile_picture'] = this.Imagepreview
        }
        return json
    }


    ////////////////////////////////////////////////////
    //

    // get() {
    //     return this.
    // }
    // set(val) {
    //     this.= val;
    // }

    ///////////////////////////////////////////////////


    ////////////////////////////////////////////////////
    //
    get imagepreview() {
        return this.Imagepreview
    }
    set imagepreview(val) {
        this.Imagepreview = val;
    }

    get rooms() {
        return this.Rooms
    }
    set rooms(val) {
        this.Rooms = val;
    }

    get socket() {
        return this.Socket
    }
    set socket(val) {
        this.Socket = val;
    }

    get re_password() {
        return this.Re_password
    }
    set re_password(val) {
        this.Re_password = val;
    }

    get islogin() {
        return this.Islogin
    }
    set islogin(val) {
        this.Islogin = val;
    }

    get email() {
        return this.Email
    }
    set email(val) {
        this.Email = val;
    }

    get password() {
        return this.Password
    }
    set password(val) {
        this.Password = val;
    }

    get address_line_1() {
        return this.Address_line_1
    }
    set address_line_1(val) {
        this.Address_line_1 = val;
    }

    get address_line_2() {
        return this.Address_line_2
    }
    set address_line_2(val) {
        this.Address_line_2 = val;
    }

    get state() {
        return this.State
    }
    set state(val) {
        this.State = val;
    }

    get city() {
        return this.City
    }
    set city(val) {
        this.City = val;
    }

    get zip_code() {
        return this.Zip_code
    }
    set zip_code(val) {
        this.Zip_code = val;
    }

    get registertime() {
        return this.Registertime
    }
    set registertime(val) {
        this.Registertime = val;
    }

    get image() {
        return this.Changedimage
    }
    set image(val) {
        this.Changedimage = val;
    }

    get src() {
        return this.Profilepicture
    }
    set src(val) {
        this.Profilepicture = val;
    }

    get imageurl() {
        return this.Profilepicture
    }
    set imageurl(val) {
        this.Profilepicture = val;
    }

    get profilepicture() {
        return this.Profilepicture
    }
    set profilepicture(val) {
        this.Profilepicture = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // phone

    get history() {
        return this.Chathistory
    }
    set history(val) {
        this.Chathistory = val;
    }

    get chathistory() {
        return this.Chathistory
    }
    set chathistory(val) {
        this.Chathistory = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // phone

    get phone() {
        return this.Phone_number
    }
    set phone(val) {
        this.Phone_number = val;
    }

    get phone_number() {
        return this.Phone_number
    }
    set phone_number(val) {
        this.Phone_number = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // lastname

    get last_name() {
        return this.Last_name;
    }
    set last_name(val) {
        this.Last_name = val;
    }

    get lastname() {
        return this.Last_name;
    }
    set lastname(val) {
        this.Last_name = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // firstname

    get first_name() {
        return this.First_name;
    }
    set first_name(val) {
        this.First_name = val;
    }

    get firstname() {
        return this.First_name;
    }
    set firstname(val) {
        this.First_name = val;
    }

    get chatname() {
        return this.First_name
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get id() {
        return this.Id
    }
    set id(val) {
        this.Id = val;
    }

    get uid() {
        return this.Id
    }
    set uid(val) {
        this.Id = val;
    }

    get pk() {
        return this.Id
    }
    set pk(val) {
        this.Id = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // username

    get username() {
        return this.Username
    }
    set username(val) {
        this.Username = val;
    }

    ///////////////////////////////////////////////////

}