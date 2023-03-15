import { Nav, Tab, Row } from 'react-bootstrap';
import Chatwindow from './Newchatwindow'
import Core from './Core';

var room = () => {
    var roomid
    var history = [];
    var to;
    var tab;
    var window;
    var updatewindows;
    var updatesamllwindow;
    var updatehistory = [];

    var load = (data) => {
        roomid = data.user.email;
        to = data.user;
        history = data.history;
        var cw = <Chatwindow roomid={roomid} history={history} />;
        tab = <Nav.Item key={roomid} onClick={() => { Core.getrooms().setcurrentroom(roomid) }}><Nav.Link eventKey={roomid}>{to.chatname}</Nav.Link></Nav.Item>;
        window = <Tab.Pane key={roomid} eventKey={roomid}>{cw}</Tab.Pane>;
        console.log(cw)
    }

    return {
        load: load,
        roomid: () => { return roomid },
        tab: () => { return tab },
        window: () => { return window },
        setupdatewindow: (fun) => {
            updatewindows = fun
        },
        setupdatehistory: (fun) => {
            updatehistory = fun;
        },
        setupdatesmall: (fun) => {
            updatesamllwindow = fun;
        },
        update: () => {
            return updatehistory(history);
        },
        updatewindows: () => {
            updatewindows(window);
        },
        gethistory: () => {
            return history;
        },
        gethistorycount: () => {
            return history.length;
        },
        newmessage: (data) => {
            history.push(data);
            if (typeof updatehistory === 'function')
                updatehistory()
            if (typeof updatesamllwindow === 'function')
                updatesamllwindow()
        },
        getreciver: () => {
            return to;
        }
    }
}

export default room;