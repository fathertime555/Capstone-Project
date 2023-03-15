import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState, useRef } from 'react';
import Core from '../Core';


export default function Smallchat(props) {
    const [isload, setload] = useState(false);
    const [message, setmessahe] = useState([]);
    const [count, setcount] = useState([]);


    var input = useRef(null);
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            newmessage(true, { chatname: Core.getUser()._getuser().chatname, message: input.current.value })
        }
    }
    Core.getsocket().on('chat', (data) => {
        newmessage(false, data);
    });
    Core.Chatload.s_chat = true;
    var newmessage = (LR, data) => {
        var _style = LR ? 'right' : 'left';
        var _classname = LR ? 'text-end' : ' text-start'
        let new_message = message;
        new_message = new_message.concat(<Row key={count}>
            <p style={{ 'textAlign': _style, float: _style }} className={_classname}>
                {data.chatname}
            </p>
            <div>
                <p id="tooltip" role="tooltip" style={{ float: _style }}>
                    {data.message}
                </p>
            </div>
        </Row >)
        setcount(count => count + 1);
        setmessahe(message => new_message);
        if (LR) {
            Core.getsocket().emit('chat', { message: data.message, chatname: Core.getUser()._getuser().chatname, room: props.room })
        }
    }

    return (
        <Card style={{
            position: 'fixed',
            bottom: '2em',
            right: '2em',
            translate: 'middle',
            minWidth: '20em',
            zIndex: '9999',
            maxHeight: '60vh',
            minHeight: '30vh'
        }} >
            <Card.Header>
                {props.chatname}
            </Card.Header>
            <Card.Body
                style={{ maxHeight: '100%', overflowY: 'auto' }}>
                {message}
            </Card.Body>
            <Card.Footer>

                <Row>
                    <Col >
                        <Form.Group>
                            <Form.Control ref={input} onKeyDown={(e) => handleKeyPress(e)} type="input"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={'auto'}>
                        <Button onClick={() => newmessage(true, { chatname: Core.getUser()._getuser().chatname, message: input.current.value })}>chat</Button>
                    </Col>
                    <Col md={'auto'}>
                        <Button onClick={() => props.setshow()}>Close</Button>
                    </Col>
                </Row>

            </Card.Footer>
        </ Card>
    )
}