import { Button, Card, Container, Form, FormGroup, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState, useRef } from 'react';
import Chatlobby from "../Chatlobby";
import Core from '../Core';
import Chatwindow from './Chatwindow'
import axios from 'axios'




function ChatApp(props) {
    var create_chat = (touser) => {
        console.log('click')
        axios.get('/create_room', { params: touser }).then(res => {
            new_chat(res.data);
        })
    }

    const [chatwindow, setchatwindow] = useState({ userlist: <Tab.Pane key={'userlist'} eventKey="Users"><Chatlobby socket={()=>Core.getsocket()} newchat={create_chat}></Chatlobby></Tab.Pane> });
    const [chattab, setchattab] = useState({ userlist: <Nav.Item key={'userlist'}><Nav.Link eventKey="Users">User List</Nav.Link></Nav.Item> });
    const [chathistory, setchathistory] = useState({})
    var [count, setcount] = useState(0);
    var [ismount, setmount] = useState(false);



    function handleKeyPress(e) {
        if (e.key === 'Enter') {

            handleRightchat();
        }
    }

    var new_tab = (data) => {
        let _chattab = chattab;
        _chattab[data.room] = <Nav.Item key={data.room}><Nav.Link eventKey={data.room} onClick={() => { changeroom(data.room) }}>{data.chatname}</Nav.Link></Nav.Item>;
        setcount(count => count + 1);
        setchattab(chattab => _chattab);
    }

    var new_window = (data, c_history) => {
        let _chatwindow = chatwindow;
        _chatwindow[data.room] = <Tab.Pane key={data.room} eventKey={data.room}><Chatwindow room={data.room} >{c_history}</Chatwindow></Tab.Pane>;
        setcount(count => count + 1);
        setchatwindow(_chatwindow);
    }

    var new_message = (LR, chatname, message, room) => {
        var _style = LR ? 'right' : 'left';
        var _classname = LR ? 'text-end' : ' text-start'
        let _chathistory = chathistory;
        if (!_chathistory[room]) {
            _chathistory[room] = [];
        }

        _chathistory[room] = _chathistory[room].concat([
            <Row key={count}>
                <p style={{ 'textAlign': _style, float: _style }} className={_classname}>
                    {chatname}
                </p>
                <div>
                    <p id="tooltip" role="tooltip" style={{ float: _style }}>
                        {message}
                    </p>
                </div>
            </Row >
        ])
        setcount(count => count + 1);
        setchathistory(_chathistory);
    }

    var new_chat = (data) => {
        new_tab(data);
        setchathistory(chathistory[data.room] = []);
        new_window(data, chathistory[data.room])
        setcount(count => count + 1)
        console.log(chattab)
    }


    if (!ismount) {
        new_chat({ chatname: "publicroom", room: "publicroom" });

        Core.getsocket().on('chat', (data) => {
            console.log(data);
            if (chathistory[data.room] === undefined) {
                new_chat(data);
            }
            new_message(false, data.chatname, data.message, data.room);
            let e = chatwindow
            e[data.room] = <Tab.Pane key={data.room} eventKey={data.room}><Chatwindow room={data.room} th={chathistory[data.room]} >{chathistory[data.room]}</Chatwindow></Tab.Pane>;
            setchatwindow(chatwindow => e);
            setcount(count => count + 1);
        })

        setmount(true)
    }


    var textbox = useRef(null);
    const [room, setroom] = useState('publicroom');
    var User = Core.getUser();


    var changeroom = (_room) => {
        textbox.current.focus();
        setroom(_room);
        setcount(count => count + 1)
    }

    var handleRightchat = () => {
        var _user = User._getuser();
        new_message(true, _user.chatname, textbox.current.value, room)
        chatwindow[room] = <Tab.Pane key={room} eventKey={room}><Chatwindow room={room} th={chathistory[room]} >{chathistory[room]}</Chatwindow></Tab.Pane>;
        setchatwindow(chatwindow);
        var data = { chatname: _user.chatname, room: room, message: textbox.current.value }
        Core.getsocket().emit('chat', data);
    }
    // useEffect(() => {
    //     textbox.current.focus();
    // }, []);


    return (
        <Container fluid="md" style={{}}>
            <Card style={{ width: '100%', maxHeight: props.fullscreen ? '90vh' : '40vh', height: props.fullscreen ? '90vh' : '' }}>
                <Card.Header>
                    {'Chat: ' + count + room}
                </Card.Header>
                <Card.Body >
                    <Tab.Container id="left-tabs-example" defaultActiveKey="publicroom">
                        <Row>
                            <Col sm={3} className='border-end' >
                                <Nav variant="pills" className="flex-column">
                                    {Object.values(chattab)}
                                </Nav>
                            </Col>
                            <Col sm={9} style={{ maxHeight: '78vh', overflowY: 'auto' }}>
                                <Tab.Content>
                                    {Object.values(chatwindow)}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
                <Card.Footer>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Form.Control type="input" placeholder="Enter Here" ref={textbox} onKeyDown={(e) => handleKeyPress(e)} />
                            </Col>
                            <Col xs md lg="4">
                                <Button onClick={handleRightchat}>submit</Button>
                                {!props.btn ? <></> : props.btn}
                            </Col>
                        </Row>
                    </FormGroup>
                </Card.Footer>
            </Card>

        </Container>

    )
}

export default ChatApp;