import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import Api from '../Api'

export default function Register() {
    var register = {
        username: useRef(null),
        email: useRef(null),
        password: useRef(null),
        re_password: useRef(null)
    }
    var onsubmit = (event) => {

        event.preventDefault();
        var data = {
            username: register.username.current.value,
            email: register.email.current.value,
            password: register.password.current.value,
            re_password: register.re_password.current.value
        }
        Api.user.register(data, register_callback)
    }
    var register_callback = (res) => {
        console.log(res);
    }
    return (<Card>
        <Card.Header>
            User register
        </Card.Header>
        <Card.Body>
            <Form id='reg_form' onSubmit={onsubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={register.email} required type="email" placeholder="Enter email" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>User name</Form.Label>
                            <Form.Control ref={register.username} required type="input" placeholder="Enter username" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={register.password} required type="password" placeholder="Enter password" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="re_password">
                            <Form.Label>Re_Password</Form.Label>
                            <Form.Control ref={register.re_password} required type="password" placeholder="Re_enter password" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
        <Card.Footer>
            <Button type="submit" value='submit' form='reg_form'>register</Button>
        </Card.Footer>
    </Card>)
}