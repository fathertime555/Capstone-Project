import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Api from './Api'
import { Button, Col, Container, Tab, Tabs, Row, Form, Card } from 'react-bootstrap';
import { useState, useRef } from 'react';

function App() {
  const [listingsdata, setlistingtext] = useState('no data')
  const [disabled, setdisabled] = useState(false)
  const [result, setresult] = useState('null')
  var req_address = 'https://maps.googleapis.com/maps/api/geocode/json'
  var key = 'AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws'
  var create_listing = () => {
    var data = {
      address: inputs.listing_create.listing_location.current.value,
      key: key
    }
    Api.map.getgeo(req_address, data, (res) => {
      var data = {
        title: inputs.listing_create.listing_title.current.value,
        description: inputs.listing_create.listing_description.current.value,
        location: inputs.listing_create.listing_location.current.value,
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng
      }
      Api.listing.create(data, (res) => {
        console.log(res);
      })
    })
  }

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
    },
    listing_create: {
      listing_title: useRef(null),
      listing_description: useRef(null),
      listing_location: useRef(null)
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
      setdisabled(true)
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
                          <Form.Control ref={inputs.login.username} disabled={disabled} type="input" placeholder="Enter username" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="login_password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control disabled={disabled} ref={inputs.login.password} type="password" placeholder="Enter password" />
                        </Form.Group>
                      </Col>

                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col>
                      <Button disabled={disabled} style={{ width: '100%' }} type="submit" form='login_form'>login</Button>

                    </Col>
                    <Col>
                      <Button disabled={!disabled} style={{ width: '100%' }} onClick={() => {
                        Api.user.signout((res) => {
                          console.log(res);
                          setresult(JSON.stringify(res))
                          setdisabled(false);
                        })
                      }}>logout</Button>
                    </Col>
                  </Row>


                </Card.Footer>
              </Card>
            </Col>
          </Row>

        </Tab>
        <Tab eventKey={'listings'} title={'Listings'}>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  Create listing
                </Card.Header>
                <Card.Body>
                  <Form id='create_listing' onSubmit={login}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="create_listing_title">
                          <Form.Label>Title</Form.Label>
                          <Form.Control ref={inputs.listing_create.listing_title} type="input" placeholder="Enter Title" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="create_listing_description">
                          <Form.Label>description</Form.Label>
                          <Form.Control ref={inputs.listing_create.listing_description} type="input" placeholder="Enter description" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="create_listing_location">
                          <Form.Label>Location</Form.Label>
                          <Form.Control ref={inputs.listing_create.listing_location} type="input" placeholder="Enter Location" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col>
                      <Button style={{ width: '100%' }} onClick={create_listing}>Create</Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
            <Col>

            </Col>
          </Row>
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
