import Core from '../Core';

var User = (function () {
    var islogin = false;
    var uid = 0;
    var firstname = '';
    var lastname = '';
    var email = '';
    var phone = '';
    var img = '';
    var chathistory = {};
    var list = [];

    var login = (val) => {
        uid = val.uid;
        firstname = val.firstname;
        lastname = val.lastname;
        email = val.email;
        phone = val.phone;
        img = val.profilepicture;
        chathistory = val.chathistory;
        islogin = true;
        getlist();
        Core.opensocket();
        Core.loadrooms(chathistory);
    }
    var getlist = () => {
        list = []
        Core.list().forEach(val => {
            if (val.uid === uid) {
                list.push(val)
            }
        })
    }
    var logout = (val) => {
        Core.socketclose();
        islogin = false;
    }
    var getuser = () => {
        return {
            uid: uid,
            chatname: firstname,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            img: img,
            list: list,
            type: islogin ? 1 : 0
        }
    }

    var getislogin = () => {
        return islogin;
    }

    return {
        _login: login,
        _logout: logout,
        _getuser: getuser,
        _islogin: getislogin,
    };
})()

export default User;