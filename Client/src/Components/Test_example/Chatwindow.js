import { Container, Row, Col, Card } from "react-bootstrap";
import { Children } from 'react';

function Chatwindow(props) {
    const roomname = props.room;

    return (<Container style={{ maxHeight: '100%' }}>
        <div style={{ 'textAlign': 'center' }}>{props.room}</div>
        {props.children}
    </Container>)
}

export default Chatwindow