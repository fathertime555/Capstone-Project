import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { useRef, useState } from 'react'
import Api from '../Api'

export default function Signin() {
    const [disabled, setdisabled] = useState(false)
    const [result, setresult] = useState('null')
    var inputs = {
        username: useRef(null),
        password: useRef(null)
    }

    var _login = (event) => {
        event.preventDefault();
        var data = {
            "username": inputs.username.current.value,
            "password": inputs.password.current.value
        }
        console.log(data)
        Api.user.signin(data, (res) => {
            console.log(res);
            setresult(JSON.stringify(res.data))
            setdisabled(true)
        })
    }

    var _signout = () => {
        Api.user.signout((res) => {
            console.log(res);
            setresult(JSON.stringify(res.data))
            setdisabled(false);
        })
    }

    return (<Card>
        <Card.Header>
            User login
        </Card.Header>
        <Card.Body>
            <Row>
                <Form id='login_form' onSubmit={_login}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="login_username">
                                <Form.Label>User name</Form.Label>
                                <Form.Control ref={inputs.username} disabled={disabled} type="input" placeholder="Enter username" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="login_password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled={disabled} ref={inputs.password} type="password" placeholder="Enter password" />
                            </Form.Group>
                        </Col>

                    </Row>
                </Form>
            </Row>
            <Row>
            <Col>{'result:' + result}</Col>
            </Row>
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col>
                    <Button disabled={disabled} style={{ width: '100%' }} type="submit" form='login_form'>login</Button>

                </Col>
                <Col>
                    <Button disabled={!disabled} style={{ width: '100%' }} onClick={_signout}>logout</Button>
                </Col>
            </Row>


        </Card.Footer>
    </Card>)
}