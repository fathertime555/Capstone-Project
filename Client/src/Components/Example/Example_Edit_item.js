import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'
import Item from '../../Object/item'
import Core from './../Core';

export default function ItemEdit(prop) {
    const [createmode, setcreatemode] = useState(true)
    const [props, setprops] = useState(prop)
    const [data, setdata] = useState();

    const [listid, setlistid] = useState('');
    const [itemid, setitemid] = useState('');
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [price, setprice] = useState('');
    const [owner, setowner] = useState('');
    const [image, setimage] = useState('')

    //update props when props change by parent component
    useEffect(() => {
        setprops(prop)
    }, [prop])

    useEffect(() => {
        if (props.listing) {
            setowner(props.userid);
            setlistid(props.listing.id);
        }
        if (props.data) {
            setdata(props.data);
            setcreatemode(false)
        } else {
            setcreatemode(true)
        }
    }, [props])

    useEffect(() => {
        if (data) {
            setprice(data.price || '');
            setlistid(data.gsid || '');
            setname(data.itemname || '')
            setdescription(data.description || '');
            setquantity(data.qty || '')
            setprice(data.price || '')
            setitemid(data.itid || '');
            setowner(data.uid || '')
        }
    }, [data])

    // setup inputs
    var inputs = {
        Listing_ID: useRef(null),
        Item_id: useRef(null),
        Item_name: useRef(null),
        Item_description: useRef(null),
        Item_quantity: useRef(null),
        Item_price: useRef(null),
        Item_image: useRef(null)
    }

    // input onChange onchangehandler
    var onchange = (event, keys) => {

        switch (keys) {
            case 'itemid':
                data.itid = event.target.value;
                setitemid(data.itid);
                break;
            case 'listid':
                data.gsid = event.target.value;
                setlistid(data.gsid);
                break;
            case 'description':
                data.description = event.target.value;
                setdescription(data.description);
                break;
            case 'quantity':
                data.quantity = event.target.value;
                setquantity(data.quantity);
                break;
            case 'price':
                data.price = event.target.value;
                setprice(data.price);
                break;
            case 'name':
                data.name = event.target.value;
                setname(data.name);
                break;
            case 'image':
                data.image = event.target.files[0];
                setimage(data.image);
                break;
            default:
        }
    }

    // item contry
    var edit_item = (event) => {
        event.preventDefault();
        data.update(() => props.updatetable())
    }
    var create_item = (event) => {
        event.preventDefault();
        data.create(() => props.updatetable())
    }
    var delete_item = () => {
        data.delete(() => props.updatetable())
    }

    var startcreate = () => {
        setcreatemode(!createmode);
        if (!createmode) {
            setdata(new Item({ gsid: props.listing.id, uid: props.userid }, Core.check_dev()))

        } else {
            setdata(props.data)
        }
    }


    return (<Card>
        <Card.Header>
            <Row>
                <Col>
                    Read/Edit/Delete item
                </Col>
                <Col>
                    <Button size="sm" style={{ float: 'right' }} onClick={startcreate}>{createmode ? 'Cancel' : 'New'}</Button>
                </Col>
            </Row>

        </Card.Header>
        <Card.Body>
            <Form id='edit_item' onSubmit={createmode ? create_item : edit_item}>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="list_id">
                                    <Form.Label>Listing ID</Form.Label>
                                    <Form.Control onChange={(e) => onchange(e, 'listid')} value={listid} required={true} ref={inputs.Listing_ID} type="input" disabled={true} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="item_id">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control onChange={(e) => onchange(e, 'itemid')} value={itemid} required={true} ref={inputs.Item_pk} type="input" disabled={true} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="item_owner">
                                    <Form.Label>owner</Form.Label>
                                    <Form.Control onChange={(e) => onchange(e, 'owner')} value={owner} required={true} type="input" disabled={true} />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Col>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="item_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'name')} value={name} required={true} ref={inputs.Item_name} type="input" placeholder="Enter Name" />
                            </Form.Group>
                        </Col>
                    </Row>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="item_description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'description')} value={description} required={true} ref={inputs.Item_description} type="input" placeholder="Enter Description" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="item_image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'image')} ref={inputs.Item_image} type="file" placeholder="Select a image" />
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
                            <Form.Control onChange={(e) => onchange(e, 'quantity')} value={quantity} required={true} ref={inputs.Item_quantity} type="input" placeholder="Enter Quantity" />

                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="item_price">

                            <Form.Label>Price</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control onChange={(e) => onchange(e, 'price')} required={true} value={price} ref={inputs.Item_price} type="input" placeholder="Enter Price" />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
        <Card.Footer>
            {!createmode ? <Row>
                <Col>
                    <Button form='edit_item' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                </Col>
                <Col>
                    <Button onClick={delete_item} style={{ width: '100%' }} >Delete</Button>
                </Col>
            </Row> : <Row>
                <Col>
                    <Button form='edit_item' type="submit" value='submit' style={{ width: '100%' }}>submit</Button>
                </Col>
            </Row>}
        </Card.Footer>
    </Card>)
}