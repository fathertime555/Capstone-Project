import axios from "axios";
import Core from './Core';

var Api = (function Api() {
    var axiosApi = axios;
    axiosApi.defaults.xsrfCookieName = 'csrftoken';
    axiosApi.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axiosApi.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    axiosApi.defaults.headers.put['Content-Type'] = 'multipart/form-data'
    var test_server = false;

    var form_data = (json) => {
        var formdata = new FormData();
        Object.keys(json).forEach(key => {
            formdata.append(key, json[key])
        })
        return formdata;
    }

    var data = async (callback) => {
        return axiosApi.get('/data/').then(res => {
            console.log(res)
            if (callback) {
                callback(res.data)
            }
        })
    }
    var userCheck = async (callback, data) => {
        if (test_server)
            return _checklogin(callback)
        else
            return user_read(data, callback)
    }

    var userRegister = async (data, callback) => {
        if (test_server)
            return test_register(data, callback)
        else
            return user_register(data, callback)
    }
    var userLogin = async (data, callback) => {
        if (test_server)
            test_login(data, callback)
        else
            return user_login(data, (res) => { console.log(res); if (callback) callback(res) })

    }
    var userLogout = async (callback) => {
        if (test_server)
            test_logout(callback)
        else
            return user_logout(callback);

    }
    var userUpdate = async (data, callback) => {
        if (test_server)
            test_user_edit(data, callback)
        else
            return user_change(data, callback)

    }
    var userRead = async (data, callback) => {
        if (test_server)
            test_user_read(data, callback)
        else
            return user_read(data, callback)

    }


    var listingCreate = async (data, callback) => {
        if (test_server)
            return test_listing_create(data, callback)
        else
            return listings_create(data, callback)
    }
    var listingUpdate = async (data, callback) => {
        if (test_server)
            return test_listing_update(data, callback)
        else
            return listings_update(data, callback)
    }
    var listingDelete = async (data, callback) => {
        if (test_server)
            return test_listing_delete(data, callback)
        else
            return listings_delete(data, callback)
    }
    var listingOwner = async (callback) => {
        if (test_server)
            return test_listing_owner(callback)
        else
            return listings_read(callback)
    }


    var itemCreate = async (data, callback) => {
        if (test_server)
            return test_item_create(data, callback)
        else
            return item_create(data, callback)
    }
    var itemUpdate = async (data, callback) => {
        if (test_server)
            return test_item_update(data, callback)
        else
            return item_update(data, callback)
    }
    var itemDelete = async (data, callback) => {
        if (test_server)
            return test_item_delete(data, callback)
        else
            return item_delete(data, callback)
    }
    var itemListing = async (data, callback) => {
        if (test_server)
            return test_item_list(data, callback)
        else
            return item_owner(data, callback)
    }
    var itemRead = async (data, callback) => {
        if (test_server)
            return
        else
            return
    }


    /**
     * @param {data type of data} param name - description of param.
     */
    var user_register = async (data, callback) => {

        return axiosApi.post('/users/register/', data).then(res => { callback(res) })
    }

    var user_login = async (data, callback) => {
        var json = {
            email: data.email,
            username: data.email,
            password: data.password
        };

        return axiosApi.post('/users/login/', json, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }

        }).then(res => {
            if (res.data.status === "success")
                axiosApi.get('/users/' + res.data.user.id + '/').then(res => {
                    console.log(res)
                    callback(res)
                })
        })
    }
    var user_logout = async (callback) => {
        return axiosApi.post('/users/logout/').then(res => { callback(res) })
    }
    /**
     * @param {data type of data} param User-.
     */
    var user_change = async (data, callback) => {
        var req = form_data(data)
        console.log(data)
        console.log(req)
        return axiosApi.put('/users/' + data.id + '/', data).then((res) => { callback(res) })
    }

    var user_read = async (callback, pk) => {
        return axiosApi.get('/users/' + pk + '/').then(res => callback(res));
    }


    ////////////////////////////////////////////////////
    // listings
    var listings_create = async (data, callback) => {
        console.log(data)
        var postdata=form_data(data)
        return axiosApi.post('/listings/create/', postdata).then(res => { console.log(res); if (callback) callback(res) })
    }

    var listings_delete = async (data, callback) => {
        return axiosApi.delete('/listings/' + data + '/delete').then(res => callback(res))
    }

    var listings_update = async (data, callback) => {

        return axiosApi.post(
            '/listings/' + data.id + '/update/',
            form_data(data)
        ).then(res => callback(res))
    }

    var listings_read = async (callback) => {
        console.log(Core.getUser().pk);

        return axiosApi.get('/listings/profile/' + Core.getUser().pk + '/').then(res => {
            var data = {};
            data.data = {}
            data.data.list = res.data;
            console.log(res);
            if (callback)
                callback(data)
        });
    }


    ////////////////////////////////////////////////////
    // item
    // var item_read = async (listPK, itemPK) => {
    //     // return axiosApi.post('/listings/' + listingspk + '/createitem', _item).then(res => callback(res))
    // }

    var item_owner = async (data, callback) => {
        return axiosApi.get('/listings/sort/items/listing/' + data.id + '/').then(res => {
            var data = { data: { items: res.data } }
            if (callback)
                callback(data)
        }
        )
    }

    var item_create = async (data, callback) => {
        return axiosApi.post('/listings/' + data.listing + '/createitem/', form_data(data)).then(res => callback(res))
    }

    var item_delete = async (data, callback) => {
        return axiosApi.delete('/listings/' + data.listing + '/' + data.id + '/delete').then(res => { if (callback) callback(res) })
    }
    var item_update = async (data, callback) => {
        // const formData = new FormData();
        // Object.keys(data).forEach(key => {
        //     if (key !== 'item_main_photo')
        //         formData.append(key, data[key])
        // })
        // formData.append('item_main_photo', data.item_main_photo[0])
        return axiosApi.post(
            '/listings/' + data.listing + '/' + data.id + '/update/',
            form_data(data)
        ).then(res => callback(res))
        // return axiosApi.put('/listings/' + data.listing + '/' + data.id + '/update/', data).then(res => { if (callback) callback(res) })
    }


    /////////////////////////////////////////////

    // var _getlist = async (callback) => {
    //     return axiosApi.get('/data/listings').then(res => { callback(res) })
    // }

    // var _getitems = (callback) => {
    //     return axiosApi.get('/data/items').then(res => { callback(res) })
    // }

    // var _getuser = (callback) => {
    //     return axiosApi.get('/users/').then(res => callback(res))
    // }

    var _checklogin = (callback) => {
        return axiosApi.get('/users/authenticated/').then(res => {
            if (res.data.isAuthenticated === 'success')
                axiosApi.get('/users/' + res.data.user.id + '/').then(res => { callback(res) })
        })
    }




    ///////////////////////////////////////////////////////////////////////
    // test api
    // var getdata = async () => {
    //     // var data = {
    //     //     listings: [],
    //     //     items: [],
    //     //     user: {},
    //     //     isdev: false,
    //     //     islogin: false
    //     // }
    //     return axiosApi.get('/data').then(res => {
    //         // data.listings = res.data.data.listings;
    //         // data.items = res.data.data.items;
    //         // if (res.data.server) {
    //         //     data.isdev = true;
    //         // }
    //         // data.islogin = res.data.islogin;
    //         // data.user = res.data.user
    //         return res.data;
    //     })
    // }
    // test user api
    var test_login = async (data, callback) => {
        return axiosApi.get('/user/login', { params: data }).then(res => callback(res))
    }
    var test_logout = async (callback) => {
        return axiosApi.get('/user/logout').then(res => callback(res))
    }
    var test_register = async (data, callback) => {
        return axiosApi.get('/user/register', { params: data }).then(res => callback(res))
    }
    var test_user_edit = async (data, callback) => {
        return axiosApi.get('/user/edit', { params: data }).then(res => callback(res))
    }

    var test_user_read = async (callback) => {
        return axiosApi.get('/user/read').then(res => callback(res))
    }
    // test listing api
    var test_listing_create = async (data, callback) => {
        return axiosApi.get('/listing/create', { params: data }).then(res => callback(res))
    }
    var test_listing_update = async (data, callback) => {
        return axiosApi.get('/listing/edit', { params: data }).then(res => callback(res))
    }
    var test_listing_delete = async (data, callback) => {
        return axiosApi.get('/listing/delete', { params: data }).then(res => callback(res))
    }
    // var test_listing_read = async (data, callback) => {
    //     return axiosApi.get('/listing/read', { params: data }).then(res => callback(res))
    // }
    var test_listing_owner = async (callback) => {
        return axiosApi.get('/listing/owner').then(res => callback(res))
    }
    // test item api
    var test_item_create = async (data, callback) => {
        return axiosApi.get('/item/create', { params: data }).then(res => callback(res))
    }
    var test_item_update = async (data, callback) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'image')
                formData.append(key, data[key])
        })
        formData.append('image', data.item_main_photo[0])
        return axiosApi.get('/item/edit', { params: formData }).then(res => callback(res))
    }
    var test_item_delete = async (data, callback) => {
        return axiosApi.get('/item/delete', { params: data }).then(res => callback(res))
    }
    // var test_item_read = async (data, callback) => {
    //     return axiosApi.get('/item/read', { params: data }).then(res => callback(res))
    // }
    var test_item_list = async (data, callback) => {
        return axiosApi.get('/item/listing', { params: data }).then(res => callback(res))
    }

    // test chat api

    var test_chat_startchat = async (user, callback) => {
        return axios.get('/create_room', { params: { user } }).then(res => callback(res))
    }

    ////////////////////////////////////////////////////////////////////////
    // map
    var getgeo = async (path, data, callback) => {
        return axiosApi.get(path, { params: data }).then(res => { callback(res) })
    }

    /////////////////////////////////////////////////////////////////////
    var Api = {
        testserver: test_server,
        user: {
            checklogin: userCheck,
            register: userRegister,
            sign_in: userLogin,
            sign_out: userLogout,
            update: userUpdate,
            get: userRead
        },
        listing: {
            create: listingCreate,
            update: listingUpdate,
            delete: listingDelete,
            getbyowner: listingOwner
        },
        item: {
            create: itemCreate,
            update: itemUpdate,
            delete: itemDelete,
            get: itemRead,
            bylisting: itemListing,
        },
        data: {
            getlodingdata: data,
        },
        map: {
            getgeo: getgeo
        },
        chat: {
            startchat: test_chat_startchat
        },
        setdev: (isdev) => {
            test_server = isdev
        }
    }

    return Api;
})()

export default Api;