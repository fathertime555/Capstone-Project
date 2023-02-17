import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'

export default function ItemEdit(prop) {
    const [createmode, setcreatemode] = useState(false)
    const [data, setdata] = useState(prop.data)
    const [updatetable, setupdatetable] = useState(prop.updatetable)
    const [props, setprops] = useState(prop)

    useEffect(() => {
        setprops(prop)
    }, [prop])
    useEffect(() => {
        setdata(props.data);
        setupdatetable(props.setupdatetable);
    }, [props])

    var inputs = {
        Item_pk: useRef(null),
        Item_name: useRef(null),
        Item_description: useRef(null),
        Item_quantity: useRef(null),
        Item_price: useRef(null),
    }
    var edit_listing = (event) => {
        updatetable();
    }
    var delete_listing = () => {
        // Api.listing.delete(props.data.id, (res) => {
        //     console.log(res);
        //     props.updatetable();
        // })
    }

    var startcreate = (event) => {
        event.preventDefault();
        setcreatemode(!createmode);
        if (!createmode) {
            setdata({
                pk: '',
                name: '',
                description: '',
                quantity: '',
                price: ''
            })
        } else {
            setdata(props.data)
        }


    }

    return (<Card>
        <Card.Header>
            <Row>
                <Col>
                    Read/Edit/Delete listing
                </Col>
                <Col>
                    <Button size="sm" style={{ float: 'right' }} onClick={startcreate}>{createmode ? 'Cancel' : 'New'}</Button>
                </Col>
            </Row>

        </Card.Header>
        <Card.Body>
            <Form id='edit_listing' onSubmit={edit_listing}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_id">
                            <Form.Label>PK</Form.Label>
                            <Form.Control value={data.pk} required={true} ref={inputs.Item_pk} type="input" disabled={true} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_title">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={data.name} required={true} ref={inputs.Item_name} type="input" placeholder="Enter Name" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={data.description} required={true} ref={inputs.Item_description} type="input" placeholder="Enter Description" />
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="listing_main_photo">
                            <Form.Label>Main Photo</Form.Label>
                            <Form.Control required={true} ref={inputs.listing_main_photo} type="file" placeholder="Pick image" />
                        </Form.Group>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_location">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control value={data.location} required={true} ref={inputs.Item_quantity} type="input" placeholder="Enter Quantity" />

                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_lat">
                            <Form.Label>Price</Form.Label>
                            <Form.Control required={true} value={data.lat} ref={inputs.Item_price} type="input" placeholder="Enter Price" />
                        </Form.Group>
                    </Col>
                    {/* <Col>
                        <Form.Group className="mb-3" controlId="create_lng">
                            <Form.Label>Lng</Form.Label>
                            <Form.Control required={true} value={data.lng} ref={inputs.listing_lng} type="input" placeholder="lat from google" disabled />
                        </Form.Group>
                    </Col> */}
                </Row>
            </Form>
        </Card.Body>
        <Card.Footer>
            {!createmode ? <Row>
                <Col>
                    <Button form='create_listing' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                </Col>
                <Col>
                    <Button onClick={delete_listing} style={{ width: '100%' }} >Delete</Button>
                </Col>
            </Row> : <Row>
                <Col>
                    <Button style={{ width: '100%' }}>submit</Button>
                </Col>
            </Row>}
        </Card.Footer>
    </Card>)
}