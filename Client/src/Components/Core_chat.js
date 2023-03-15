
import { Nav, Tab, Row } from 'react-bootstrap';
import Chatlobby from "./Chatlobby";
import Core from './Core';
import Chatroom from './chat_room'
import Api from './Api';

export default function Core_chat(_history) {
    var currentroom = 'publicroom';
    var changeactive;
    var updateactive = (roomid) => {
        changeactive(roomid);
    }
    var create_room = (user) => {
        if (rooms[user.email] === undefined) {
            Api.chat.startchat((res) => {
                console.log(res);
                var rid = res.data.email;
                rooms[rid] = Chatroom();
                rooms[rid].load({ roomid: rid, user: { email: res.data.email, chatname: res.data.chatname }, history: [] })
                console.log(res);
                update();
            })
        } else {
            updateactive(user.email);
        }

    }

    var rooms = {
        userlist: {
            tab: () => { return <Nav.Item key={'userlist'}><Nav.Link eventKey="Users">User List</Nav.Link></Nav.Item> },
            window: () => { return <Tab.Pane key={'userlist'} eventKey="Users"><Chatlobby newchat={create_room}></Chatlobby></Tab.Pane> }
        },
    };
    var socket = Core.getUser().socket;

    socket.on('publicroom', (data) => {
        console.log(data);
    })
    socket.on('chat', (data) => {
        console.log(data);
        if (rooms[data.roomid] === undefined) {
            rooms[data.roomid] = Chatroom();
            rooms[data.roomid].load({ roomid: data.roomid, user: { email: data.roomid, chatname: data.chatname }, history: [] })
            update()
        }
        new_message(false, data.chatname, data.message, data.roomid);
    })
    socket.on('unauthorized', data => {
        Core.getUser().logout();
    })

    var new_message = (LR, chatname, message, roomid) => {
        var _room = rooms[roomid];
        var _style = LR ? 'right' : 'left';
        var _classname = LR ? 'text-end send' : ' text-start recive'

        _room.newmessage(
            <Row key={_room.gethistorycount()}>
                <p className={_classname}>
                    {chatname}
                </p>
                <div>
                    <p id="tooltip" role="tooltip" className={_classname}>
                        {message}
                    </p>
                </div>
            </Row >
        )

    }


    var fpage;

    var update = () => {
        fpage();
        console.log(rooms)
    }
    var loadrooms = (history) => {
        rooms['publicroom'] = Chatroom();
        rooms['publicroom'].load({ roomid: 'publicroom', user: { email: 'publicroom', chatname: 'Publicroom' }, history: [] })
        Object.keys(history).forEach(val => {
            rooms[val] = Chatroom();
            rooms[val].load({ roomid: val, user: { email: val, chatname: history[val].chatname }, history: [] })
            history[val].history.forEach(message => {
                new_message(message.sender_email !== val, !(message.sender_email === val) ? Core.getchatname() : history[val].chatname, message.message, val)
            })
        })
        console.log(rooms);
    }
    loadrooms(_history);

    return {
        create_room: create_room,

        sendmessage: (message) => {
            var data;

            if (currentroom === 'publicroom') {
                data = { chatname: Core.getchatname(), roomid: currentroom, message: message };
            } else {
                data = { chatname: Core.getchatname(), roomid: currentroom, message: message };

            }
            new_message(true, data.chatname, message, currentroom)
            Core.getUser().socket.emit('chat', data);
            // update()
        },
        setpage: (fun) => {
            fpage = fun;
        },
        setactivetab: (fun) => {
            changeactive = fun
        },
        updatepage: () => {
            return update()
        },
        getrooms: () => {
            return rooms;
        },
        getroom: (roomid) => {
            return rooms[roomid];
        },
        setcurrentroom: (roomid) => {
            currentroom = roomid;
        },
        loadrooms: (history) => {
            rooms['publicroom'] = Chatroom();
            rooms['publicroom'].load({ roomid: 'publicroom', user: { email: 'publicroom', chatname: 'Publicroom' }, history: [] })
            Object.keys(history).forEach(val => {
                rooms[val] = Chatroom();
                rooms[val].load({ roomid: val, user: { email: val, chatname: history[val].chatname }, history: [] })
                history[val].history.forEach(message => {
                    new_message(message.sender_email === val, history[val].chatname, message.message, val)
                })
            })
            update()
            console.log(rooms);
        }
    }

}