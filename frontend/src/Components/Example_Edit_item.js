import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'

export default function ItemEdit(prop) {
    const [createmode, setcreatemode] = useState(false)
    const [data, setdata] = useState(prop.data)
    const [updatetable, setupdatetable] = useState(prop.updatetable)
    const [props, setprops] = useState(prop)

    const [listid, setlistid] = useState('');
    const [itemid, setitemid] = useState('');
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [price, setprice] = useState('');
    const [owner, setowner] = useState('');

    var onchange = (event, keys) => {

        switch (keys) {
            case 'itemid':
                setitemid(event.target.value);
                break;
            case 'listid':
                setlistid(event.target.value);
                break;
            case 'description':
                setdescription(event.target.value);
                break;
            case 'quantity':
                setquantity(event.target.value);
                break;
            case 'price':
                setprice(event.target.value);
                break;
            case 'name':
                setname(event.target.value);
                break;
            default:
        }
    }


    useEffect(() => {
        setprops(prop)
    }, [prop])

    useEffect(() => {
        setdata(props.data);
        setprice(props.data.price);
        setlistid(props.data.listing);
        setname(props.data.name)
        setdescription(props.data.description);
        setquantity(props.data.quantity)
        setprice(props.data.price)
        setitemid(props.data.id);
        setupdatetable(props.setupdatetable);
        setowner(props.data.owner)
    }, [props])
    // useEffect(() => {
    //     setdata(props.data);
    //     setupdatetable(props.setupdatetable);
    // }, [props])

    var inputs = {
        Listing_ID: useRef(null),
        Item_id: useRef(null),
        Item_name: useRef(null),
        Item_description: useRef(null),
        Item_quantity: useRef(null),
        Item_price: useRef(null),
    }
    var edit_item = (event) => {
    }
    var delete_item = () => {
        Api.item.delete(props.data.id, (res) => {
            console.log(res);
            props.updatetable();
        })
    }

    var create_item = () => {
        var new_item = {
            name: name,
            description: description,
            quantity: quantity,
            price: price,
            listid: listid
        }
        Api.item.create(new_item, listid, (res) => {
            props.updatetable();
        })
    }

    var startcreate = (event) => {
        event.preventDefault();
        setcreatemode(!createmode);
        if (!createmode) {
            setitemid('');
            setname('')
            setdescription('');
            setquantity('')
            setprice('')
            setprice('');
        } else {
            setdata(props.data);
            setprice(props.data.price);
            setlistid(props.data.listing);
            setname(props.data.name)
            setdescription(props.data.description);
            setquantity(props.data.quantity)
            setprice(props.data.price)
            setitemid(props.data.id);
            setupdatetable(props.setupdatetable);
            setowner(props.data.owner)
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
                                    <Form.Control onChange={(e) => onchange(e, 'owner')} value={owner} required={true}  type="input" disabled={true} />
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
                    <Button style={{ width: '100%' }}>submit</Button>
                </Col>
            </Row>}
        </Card.Footer>
    </Card>)
}