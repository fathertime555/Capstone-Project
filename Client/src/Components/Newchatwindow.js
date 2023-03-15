import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Core from './Core';

export default function Chatwindow(props) {
    var h = [...Core.getrooms().getroom(props.roomid).gethistory()].reverse()
    const [history, sethistory] = useState(h);
    const [count, setcount] = useState(0);
    var roomid = props.roomid
    var room = Core.getrooms().getroom(roomid);
    var set = () => {
        h = [...Core.getrooms().getroom(props.roomid).gethistory()].reverse()
        sethistory(history => h);
        setcount(count => count + 1)
    }
    room.setupdatehistory(set);
    useEffect(() => {
        room.setupdatehistory(set);
    }, [])

    return (<Container style={{
        maxHeight: '100%',
    }}>
        <div style={{ 'textAlign': 'center' }}>{props.roomid}</div>
        <div style={{
            maxHeight: '100%',
            maxWidth:'100%',
            display: 'flex',
            flexDirection: 'column-reverse'
        }}>
            {history}
        </div>

    </Container>)
}
