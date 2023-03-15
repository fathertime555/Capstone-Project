import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'

export default function AccountEdit(prop) {
    const [data, setdata] = useState({})
    const [props, setprops] = useState(prop)
    const [uid, setuid] = useState(0);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [imageurl, setimageurl] = useState('')
    const [image, setimage] = useState({})
    const [imagepre, setimagepre] = useState([])
    const [login, setlogin] = useState(false)
    const [states, setstates] = useState('')
    const [zip, setzip] = useState('')

    useEffect(() => {
        setprops(prop)
    }, [prop])

    useEffect(() => {
        if (props.data) {
            setdata(props.data || '');
            setlogin(!props.login || '')
        } else {
            setlogin(false)
        }
    }, [props])

    useEffect(() => {
        if (data) {
            setuid(data.uid || '');
            setusername(data.username || '');
            setemail(data.email || '')
            setphone(data.phone || '');
            setfirstname(data.firstname || '')
            setlastname(data.lastname || '');
            setstates(data.state || '')
            setzip(data.zip_code || '')
        }
    }, [data])
    var inputs = {
        user_uid: useRef(null),
        user_username: useRef(null),
        user_email: useRef(null),
        user_phone: useRef(null),
        user_firstname: useRef(null),
        user_lastname: useRef(null),
        user_zip: useRef(null),
        user_state: useRef(null)
    }
    var edit_user = (event) => {
        event.preventDefault();
        data.update(props.update());
    }
    var delete_user = () => {
        // Api.user.delete({ uid: uid }, (res) => {
        //     console.log(res);
        //     //props.updatetable();
        // })
    }


    var onchange = (event, keys) => {

        switch (keys) {
            case 'username':
                data.username = event.target.value
                setusername(data.username);
                break;
            case 'firstname':
                data.firstname = event.target.value
                setfirstname(data.firstname);
                break;
            case 'lastname':
                data.lastname = event.target.value
                setlastname(data.lastname);
                break;
            case 'email':
                data.email = event.target.value
                setemail(data.email);
                break;
            case 'phone':
                data.phone = event.target.value
                setphone(data.phone);
                break;
            case 'zip_code':
                data.zip_code = event.target.value
                setzip(data.zip_code);
                break;
            case 'state':
                data.state = event.target.value
                setstates(data.state);
                break;
            default:
        }
    }

    return (<Card>
        <Card.Header>
            <Row>
                <Col>
                    Read/Edit/Delete listing
                </Col>

            </Row>

        </Card.Header>
        <Card.Body>
            <Form id='edit_user' onSubmit={edit_user}>
                <fieldset disabled={login}>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="edit_user_uid">
                                        <Form.Label>UID</Form.Label>
                                        <Form.Control onChange={(e) => onchange(e, 'uid')} value={uid} required={true} ref={inputs.user_uid} type="input" disabled={true} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="edit_user_username">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control onChange={(e) => onchange(e, 'username')} value={username} required={true} ref={inputs.user_username} type="input" placeholder="Enter username" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="edit_user_phone">
                                        <Form.Label>phone</Form.Label>
                                        <Form.Control onChange={(e) => onchange(e, 'phone')} value={phone} required={true} ref={inputs.user_phone} type="input" placeholder="Enter phone" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Card style={{ height: '100%' }} onClick={() => {
                                document.getElementById('user_image').click()

                            }}>

                                <img alt='img' style={{ width: '100%', height: '100%' }} src={imagepre ? imagepre : data.src}></img>
                                <Form.Control style={{ display: 'none' }} id='user_image' type='file' onChange={(event) => {

                                    if (event.target.files && event.target.files[0]) {
                                        setimagepre(URL.createObjectURL(event.target.files[0]))
                                        data.imagepreview = event.target.files[0];
                                    }

                                }}></Form.Control>

                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_email">
                                <Form.Label>email</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'email')} value={email} required={true} ref={inputs.user_email} type="input" placeholder="Enter email" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_firstname">
                                <Form.Label>firstname</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'firstname')} required={true} value={firstname} ref={inputs.user_firstname} type="input" placeholder="enter firstname" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_lastname">
                                <Form.Label>lastname</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'lastname')} required={true} value={lastname} ref={inputs.user_lastname} type="input" placeholder="enter lastname" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_zip_code">
                                <Form.Label>zip_code</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'zip_code')} required={true} value={zip} ref={inputs.user_zip} type="input" placeholder="enter zip" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_state">
                                <Form.Label>state</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'state')} required={true} value={states} ref={inputs.user_state} type="input" placeholder="enter state" />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
        </Card.Body>
        <Card.Footer>
            <fieldset disabled={login}>
                <Row>
                    <Col>
                        <Button form='edit_user' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                    </Col>
                    <Col>
                        <Button onClick={delete_user} style={{ width: '100%' }} >Delete</Button>
                    </Col>
                </Row>
            </fieldset>
        </Card.Footer>
    </Card>)
}