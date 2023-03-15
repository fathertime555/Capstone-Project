import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import Api from '../Api'

export default function Createlisting(props) {
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
            Create listing
        </Card.Header>
        <Card.Body>
            <Form id='create_listing' onSubmit={create_listing}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required={true} ref={inputs.listing_title} type="input" placeholder="Enter Title" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_description">
                            <Form.Label>description</Form.Label>
                            <Form.Control required={true} ref={inputs.listing_description} type="input" placeholder="Enter description" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control required={true} ref={inputs.listing_location} type="input" placeholder="Enter Location" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col>
                    <Button form='create_listing' type="submit" value='submit' style={{ width: '100%' }} >Create</Button>
                </Col>
            </Row>
        </Card.Footer>
    </Card>)
}