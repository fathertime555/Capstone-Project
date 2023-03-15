import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Image, Carousel } from 'react-bootstrap';
import Core from './Core';



export default function Itemdetial(props) {
    // var go=()=>{
    //     window.open("https://www.google.com/maps/search/?api=1&query=" + currentlisting.location)
    // }
    console.log(props)
    return (

        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            autoFocus={false}
            enforceFocus={false}
        >
            <Modal.Header closeButton>
                <h4>{props.data.itid + ':' + props.data.uid}</h4>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs='auto'>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {/* <Carousel>
                                {props.data.list.map((val, index) => {
                                    return (
                                        <Carousel.Item key={index + val.itid}>
                                            <Image className="d-block w-100" src={val.src}></Image>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel> */}
                            <img src={props.data.image} ></img>
                        </Modal.Title>
                    </Col>
                    <Col >
                        <Row>
                            <h4>{props.data.itemname}</h4>
                        </Row>


                        <Row>
                            <Col>
                                {'description' + props.data.description}
                            </Col>
                        </Row>
                        <Row>
                            <Col className='send'>
                                {'Qty: ' + props.data.qty}
                            </Col>
                        </Row>
                        <Row>
                            <Col className='send'>
                                {'$' + props.data.price}
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Modal.Body>
            <Modal.Footer>
                <Col>
                    <Button >send me there</Button>
                </Col>
                <Col className='send'>
                    <Button onClick={props.onHide}>Close</Button>
                </Col>
                {/* {Core.check_dev() && Core.getUser().islogin ? <Button onClick={props.startchat}>chat</Button> : <></>} */}

            </Modal.Footer>
        </Modal>

    )
}


