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
        Listing_ID: useRef(null),
        Item_id: useRef(null),
        Item_name: useRef(null),
        Item_description: useRef(null),
        Item_quantity: useRef(null),
        Item_price: useRef(null),
    }
    var edit_listing = (event) => {
        updatetable();
    }
    var delete_item = () => {
        Api.item.delete(props.data.id, (res) => {
            console.log(res);
            props.updatetable();
        })
    }

    var startcreate = (event) => {
        event.preventDefault();
        setcreatemode(!createmode);
        if (!createmode) {
            setdata({
                id: '',
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
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="item_id">
                                    <Form.Label>Listing ID</Form.Label>
                                    <Form.Control value={data.listing} required={true} ref={inputs.Listing_ID} type="input" disabled={true} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="item_id">
                                    <Form.Label>PK</Form.Label>
                                    <Form.Control value={data.id} required={true} ref={inputs.Item_pk} type="input" disabled={true} />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="item_name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={data.name} required={true} ref={inputs.Item_name} type="input" placeholder="Enter Name" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="item_description">
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
                        <Form.Group className="mb-3" controlId="item_quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control value={data.quantity} required={true} ref={inputs.Item_quantity} type="input" placeholder="Enter Quantity" />

                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="item_price">

                            <Form.Label>Price</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control required={true} value={data.price} ref={inputs.Item_price} type="input" placeholder="Enter Price" />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
        <Card.Footer>
            {!createmode ? <Row>
                <Col>
                    <Button form='create_listing' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                </Col>
                <Col>
                    <Button onClick={delete_item} style={{ width: '100%' }} >Delete</Button>
                </Col>
            </Row> : <Row>
                <Col>
                    <Button style={{ width: '100%' }}>submit</Button>
                </Col>
            </Row>}
        </Card.Footer>
    </Card>)
}