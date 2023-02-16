import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Api from './Api'
import { Button, Col, Container, Tab, Tabs, Row, Form, Card } from 'react-bootstrap';
import { useState, useRef } from 'react';

function App() {
  const [listingsdata, setlistingtext] = useState('no data')
  const [enable, setenable] = useState(false)
  const [validated, setValidated] = useState(false);
  const [result, setresult] = useState('null')

  var inputs = {
    register: {
      username: useRef(null),
      email: useRef(null),
      password: useRef(null),
      re_password: useRef(null)
    },
    login: {
      username: useRef(null),
      password: useRef(null)
    }
  }

  var showdata = (data) => {
    setlistingtext(JSON.stringify(data.data))
    console.log(data);
  }

  var login = (event) => {
    event.preventDefault();
    var data = {
      "username": inputs.login.username.current.value,
      "password": inputs.login.password.current.value
    }
    console.log(data)
    Api.user.signin(data, (res) => {
      console.log(res);
      setresult(JSON.stringify(res))
    })
  }

  var register = (event) => {

    event.preventDefault();
    var data = {
      username: inputs.register.username.current.value,
      email: inputs.register.email.current.value,
      password: inputs.register.password.current.value,
      re_password: inputs.register.re_password.current.value
    }
    Api.user.register(data, register_callback)
  }
  var register_callback = (res) => {
    console.log(res);
    setresult(JSON.stringify(res))
  }

  return (
    <Container>
      <Tabs style={{ marginBottom: '1vh' }}>
        <Tab eventKey={'user'} title={'User'}>

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  User register
                </Card.Header>
                <Card.Body>
                  <Form id='reg_form' onSubmit={register}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control ref={inputs.register.email} required type="email" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="username">
                          <Form.Label>User name</Form.Label>
                          <Form.Control ref={inputs.register.username} required type="input" placeholder="Enter username" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control ref={inputs.register.password} required type="password" placeholder="Enter password" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="re_password">
                          <Form.Label>Re_Password</Form.Label>
                          <Form.Control ref={inputs.register.re_password} required type="password" placeholder="Re_enter password" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit" value='submit' form='reg_form'>register</Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>
                  User login
                </Card.Header>
                <Card.Body>
                  <Form id='login_form' onSubmit={login}>
                    <Row>
                      {/* <Col>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                      </Col> */}
                      <Col>
                        <Form.Group className="mb-3" controlId="login_username">
                          <Form.Label>User name</Form.Label>
                          <Form.Control ref={inputs.login.username} disabled={enable} type="input" placeholder="Enter username" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group disabled={enable} className="mb-3" controlId="login_password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control ref={inputs.login.password} type="password" placeholder="Enter password" />
                        </Form.Group>
                      </Col>

                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit" form='login_form'>login</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

        </Tab>
        <Tab eventKey={'listings'} title={'Listings'}>
          <Row>
            <Col>
              <Button onClick={() => {
                Api.data.getlist(showdata)
              }}>get listings list test</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                Api.data.getitems(showdata)
              }}>get listings items test</Button>
            </Col>
          </Row>
          <Row>
            {listingsdata}
          </Row>

        </Tab>
        <Tab eventKey={'Result'} title={'Result'}>
          <Row>
            {result}
          </Row>

        </Tab>
      </Tabs>

    </Container>

  );
}

export default App;
