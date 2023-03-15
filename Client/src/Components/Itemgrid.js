/* eslint-disable react/jsx-pascal-case */
import React, {  useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Itemcard from './Itemcard';
import Core from './Core';
import S_chat from './New_s_chat'

export default function Itemgrid() {
  const [list, setlist] = useState();
  const [chatshow, setchatshow] = useState(true);
  const [schat, setschat] = useState(<></>);

  var hidechat = () => {
    setchatshow(!chatshow);
  }

  var startchat = (data) => {
    setschat(<S_chat setshow={hidechat} roomid={data.email} chatname={data.chatname} />)
    setchatshow(true);
  }

  var createItemCard = () => {
    var _list = Core.item().map((val) => {
      return <Col md={3} sm={6} key={val.itid} style={{ marginBottom: '1em' }} ><Itemcard data={val} key={val.itid} startchat={startchat} /></Col>
    })
    setlist(list => _list);
  }
  if (!list)
    Core.addhook(createItemCard);


  return (<Container style={{ height: '90vh' }}>
    <Row justify-content="space-evenly" >
      {list}
    </Row>
    {chatshow ? schat : <></>}
  </Container>) 
}
