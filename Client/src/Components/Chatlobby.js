import { Container, ListGroup } from "react-bootstrap";
import { useState, useEffect } from 'react'
import Core from './Core';
import axios from "axios";


function Chatlobby(props) {
    const [count, setcount] = useState(0);
    const [userlist, setUserlist] = useState([<ListGroup.Item key={count}>{'You-' + Core.getchatname()}</ListGroup.Item>])
    const [ismound, setmound] = useState(false);
    const [list, setlist] = useState([]);

    useEffect(() => {
        setcount(count + 1);
        console.log("Mounted");
        if (!ismound) {
            axios.get('/getchatuser').then((res) => {
                console.log(res);
                setlist(res.data.alluser)
                setUserlist(userlist.concat(res.data.Users.map(val => {
                    var c = []
                    if (val.chatname !== Core.getchatname()) {
                        console.log(val);
                        c = [<ListGroup.Item key={val.chatname} action onClick={() => { props.newchat({ email: val.email, chatname: val.chatname }) }}>{val.chatname}</ListGroup.Item>];
                        setcount(count => count + 1);
                    }
                    return c
                })))
            })

            Core.getUser().socket.on('login', (data) => {
                console.log(data);
                if (!list.includes(data.chatname)) {
                    var newlogin = [<ListGroup.Item key={data.chatname} action onClick={() => { props.newchat({ email: data.email, chatname: data.chatname }) }}>{data.chatname}</ListGroup.Item>];
                    setcount(count => count + 1);
                    setUserlist(userlist.concat(newlogin))
                }

            })

            setmound(true);
        }
    }, []);



    return (
        <Container>
            <ListGroup>
                {userlist}
            </ListGroup>

        </Container>
    )
}

export default Chatlobby