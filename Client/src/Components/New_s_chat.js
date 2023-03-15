import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react';
import Core from './Core';


export default function Smallchat(props) {
    var input = useRef(null);
    var roomid = props.roomid
    var _history = [...Core.getrooms().getroom(roomid).gethistory()].reverse();
    const [history, sethistory] = useState(_history);
    const [count, setcount] = useState(0);
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            newmessage();
        }
    }

    var newmessage = () => {
        Core.getrooms().setcurrentroom(roomid);
        Core.getrooms().sendmessage(input.current.value);

    }

    var changehistory = () => {
        sethistory([...Core.getrooms().getroom(roomid).gethistory()].reverse());
        setcount(count => count + 1);
    }

    useEffect(() => {
        console.log('start update')
        Core.getrooms().getroom(roomid).setupdatesmall(changehistory);
    }, [])

    return (
        <Card style={{
            position: 'fixed',
            bottom: '2em',
            right: '2em',
            translate: 'middle',
            minWidth: '20em',
            zIndex: '9999',
            maxHeight: '60vh',
            minHeight: '30vh',
        }} >
            <Card.Header>
                {props.chatname + count}
            </Card.Header>
            <Card.Body
                style={{ maxHeight: '100%', 
                overflowY: 'auto',
                display: 'flex',
                'flex-direction': 'column-reverse' }}>
                {history}
            </Card.Body>
            <Card.Footer>

                <Row>
                    <Col >
                        <Form.Group>
                            <Form.Control ref={input} onKeyDown={(e) => handleKeyPress(e)} type="input"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={'auto'}>
                        <Button onClick={() => newmessage()}>chat</Button>
                    </Col>
                    <Col md={'auto'}>
                        <Button onClick={() => props.setshow()}>Close</Button>
                    </Col>
                </Row>

            </Card.Footer>
        </ Card >
    )
}