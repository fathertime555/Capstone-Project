import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'

export default function ListingEdit(prop) {
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
        listing_id: useRef(null),
        listing_title: useRef(null),
        listing_description: useRef(null),
        listing_location: useRef(null),
        listing_main_photo: useRef(null),
        listing_lat: useRef(null),
        listing_lng: useRef(null)
    }
    var edit_listing = (event) => {
        event.preventDefault();
        var data = {
            title: inputs.listing_title.current.value,
            description: inputs.listing_description.current.value,
            location: inputs.listing_location.current.value,
            lat: inputs.listing_lat.current.value,
            lng: inputs.listing_lng.current.value
        }
        Api.listing.update(data, (res) => {

            //update list table
            props.updatetable();
        })
    }
    var delete_listing = () => {
        Api.listing.delete(props.data.id, (res) => {
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
                title: '',
                description: '',
                location: '',
                lat: '',
                lng: ''
            })
        } else {
            setdata(props.data)
        }
    }

    var req_address = 'https://maps.googleapis.com/maps/api/geocode/json'
    var key = 'AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws'
    var inputs = {
        listing_title: useRef(null),
        listing_description: useRef(null),
        listing_location: useRef(null)
    }
    var create_listing = (event) => {
        event.preventDefault();

        var data = {
            address: inputs.listing_location.current.value,
            key: key
        }
        Api.map.getgeo(req_address, data, (res) => {
            var data = {
                title: inputs.listing_title.current.value,
                description: inputs.listing_description.current.value,
                location: inputs.listing_location.current.value,
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng
            }
            Api.listing.create(data, (res) => {

                //update list table
                props.updatetable();
            })
        })
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
            <Form id='edit_listing' onSubmit={createmode ? create_listing : edit_listing}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control value={data.id} required={true} ref={inputs.listing_title} type="input" disabled={true} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={data.title} required={true} ref={inputs.listing_title} type="input" placeholder="Enter Title" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_description">
                            <Form.Label>description</Form.Label>
                            <Form.Control value={data.description} required={true} ref={inputs.listing_description} type="input" placeholder="Enter description" />
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
                            <Form.Label>Location</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control value={data.location} required={true} ref={inputs.listing_location} type="input" placeholder="Enter Location" />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Get coordinate
                                </Button>
                            </InputGroup>

                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_lat">
                            <Form.Label>Lat</Form.Label>
                            <Form.Control required={true} value={data.lat} ref={inputs.listing_lat} type="input" placeholder="lat from google" disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_lng">
                            <Form.Label>Lng</Form.Label>
                            <Form.Control required={true} value={data.lng} ref={inputs.listing_lng} type="input" placeholder="lat from google" disabled />
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