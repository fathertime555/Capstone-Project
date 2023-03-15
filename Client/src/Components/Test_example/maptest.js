import axios from "axios";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import { useRef, useState } from 'react'
import JsonFile from '../address.json'

function Testmap() {
    const [lat, setlat] = useState(0);
    const [lng, setlng] = useState(0);
    var req_address = 'https://maps.googleapis.com/maps/api/geocode/json'
    var key = "";
    var address = useRef(null);

    console.log(JsonFile);

    var click = () => {
        var data = {
            address: address.current.value,
            key: key
        }
        axios.get(req_address, { params: data }).then(res => {
            console.log(res);
            setlat(res.data.results[0].geometry.location.lat);
            setlng(res.data.results[0].geometry.location.lng);
        })
    }
    return (
        <Container>
            <Form.Group className="mb-3" >
                <Form.Label>address</Form.Label>
                <Form.Control ref={address} type="input" placeholder="Enter address" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>lat</Form.Label>
                <Form.Control disabled={true} value={'lat='+lat} type="input"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>lng</Form.Label>
                <Form.Control disabled={true} value={'lng='+lng} type="input"/>
            </Form.Group>
            <Button onClick={click}>submit</Button>
        </Container>
    )
}

export default Testmap;