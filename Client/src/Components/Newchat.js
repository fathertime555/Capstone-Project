import { Button, Card, Container, Form, FormGroup, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react';
import Core from './Core';


export default function Newchat() {
    var user = Core.getUser();
    var room = user.rooms.getrooms();
    console.log(room)
    const [roomid, setroomid] = useState('publicroom');
    const [tabs, settabs] = useState(Object.values(room).map(value => {
        return value.tab();
    }));
    const [wins, setwins] = useState(Object.values(room).map(value => {
        return value.window();
    }));
    const [count, setcount] = useState(0);
    var textbox = useRef(null);
    function handleKeyPress(e) {
        if (e.key === 'Enter') {

            handleRightchat();
        }
    }
    var p = () => {
        var tab = Object.values(room).map(value => {
            return value.tab();
        })
        var win = Object.values(room).map(value => {
            return value.window();
        })
        setwins(win);
        settabs(tab);
        setcount(count => count + 1);

    }
    var changeact = (id) => {
        setroomid(id)
        console.log('done1')
        setcount(count => count + 1);

    }
    var handleRightchat = () => {
        Core.getrooms().sendmessage(textbox.current.value);
    }
    Core.getrooms().setpage(p);
    useEffect(() => {
        console.log('start update')
        Core.getrooms().setpage(p);
        Core.getrooms().setactivetab(changeact);
    }, [])
    return (
        <Container fluid="md" style={{}}>
            <Card style={{ width: '100%', maxHeight: '90vh', height: '90vh' }}>
                <Card.Header>
                    {'Chat: ' + count}
                </Card.Header>
                <Card.Body >
                    <Tab.Container id="left-tabs-example" defaultActiveKey={roomid}>
                        <Row>
                            <Col sm={3} className='border-end' >
                                <Nav variant="pills" className="flex-column">
                                    {tabs}
                                </Nav>
                            </Col>
                            <Col sm={9} style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                                <Tab.Content>
                                    {wins}
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
                                <Button onClick={p}>update</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Card.Footer>
            </Card>

        </Container>

    )

}