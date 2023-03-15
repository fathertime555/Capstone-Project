import React, {useEffect, useState} from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Core from "./Core"
import User from "../Object/user";
import Api from "./Api";



var ListInfo = (props) => {
  return (
      <Accordion.Item eventKey={props.data.gsid}>
          <Accordion.Header>{'#' + props.data.gsid}</Accordion.Header>
          <Accordion.Body>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Row className='d-flex justify-content-between'>
                      <Col>
                          <Form.Label >Street</Form.Label>
                      </Col>
                      <Col>
                          <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                      </Col>
                  </Row>
                  <Form.Control type="input" placeholder="Enter Street" value={props.data.street} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Row className='d-flex justify-content-between'>
                      <Col>
                          <Form.Label >City</Form.Label>
                      </Col>
                      <Col>
                          <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                      </Col>
                  </Row>
                  <Form.Control type="input" placeholder="Enter City" value={props.data.city} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Row className='d-flex justify-content-between'>
                      <Col>
                          <Form.Label >State</Form.Label>
                      </Col>
                      <Col>
                          <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                      </Col>
                  </Row>
                  <Form.Control type="input" placeholder="Enter State" value={props.data.states} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Row className='d-flex justify-content-between'>
                      <Col>
                          <Form.Label >Zip Code</Form.Label>
                      </Col>
                      <Col>
                          <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                      </Col>
                  </Row>
                  <Form.Control type="input" placeholder="Enter Zip Code" value={props.data.zip} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Button style={{ width: '100%' }}>Remove List</Button>
              </Form.Group>
          </Accordion.Body>
      </Accordion.Item>
  )
}



  function Accountpage() {
    var ismount = false;
    var user = Core.getUser();
    const [list, setList] = useState([]);
    useEffect(() => {

        /*if (!ismount) {
            ismount = true;
            var _list = user.list.map(val => {
                return <ListInfo data={val} key={val.gsid}></ListInfo>
            });
            setList(_list)
        }*/
    }, []);


    return (
        <>
            {/* {} */}
            < Container >
                <Row className="align-items-center justify-content-center">
                    <Card style={{ width: '25em' }}>
                        <Card.Header>
                            <div className="rect-img-container" >
                                <Card.Img className='rect-img' variant="top" src={user.img} />
                            </div>

                        </Card.Header>
                        <Card.Body>
                            <Tabs
                                defaultActiveKey="profile"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="profile" title="Profile">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Frist name </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control type="input" placeholder="Enter Frist name" value={user.firstname} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Last name </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control type="input" placeholder="Enter Last name" value={user.lastname} disabled />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Email </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control type="input" placeholder="Enter email" value={user.email} disabled />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Phone number </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control type="input" placeholder="Enter Phone number" value={user.phone} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Addres Line 1 </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control type="input" placeholder="Enter Address Line 1" value={user.address_line_1} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Addres Line 2 </Form.Label>
                                            </Col>
                                        </Row>
                                    <Form.Control type="input" placeholder="Enter Address Line 2" value={user.address_line_2} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >City </Form.Label>
                                            </Col>
                                        </Row>
                                    <Form.Control type="input" placeholder="Enter City" value={user.city} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >State </Form.Label>
                                            </Col>
                                        </Row>
                                    <Form.Control type="input" placeholder="Enter State" value={user.state} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Zip </Form.Label>
                                            </Col>
                                        </Row>
                                    <Form.Control type="input" placeholder="Enter Zip Code" value={user.Zip_code} disabled />
                                    </Form.Group>
                                    <Button type="submit">Save</Button>
                                    <Button>log out</Button>
                                </Tab>
                                <Tab eventKey="list" title="List">

                                    <Row className='gy-2' >
                                        <Col className='col-12'>
                                            <Accordion>
                                                {list}
                                            </Accordion>
                                        </Col>
                                        <Col className='col-12'>
                                            <Button style={{ width: '100%' }}>Add new list</Button>
                                        </Col>
                                    </Row>
                                </Tab>

                            </Tabs>


                        </Card.Body>

                    </Card>
                </Row>

            </Container ></>

    )
}


export default Accountpage;
