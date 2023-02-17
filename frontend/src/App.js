import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Api from './Api'
import { Button, Col, Container, Tab, Tabs, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Register from './Components/Example_register';
import Signin from './Components/Example_Signin';
import ListingTable from './Components/Example_Listingtable';
import ListingEdit from './Components/Example_Edit_listing';
import ItemTable from './Components/Example_itemtable';
import ItemEdit`` from './Components/Example_Edit_item';

function App() {

  const [itemtable, setitemtable] = useState(<></>)
  const [itemdata, setitemdata] = useState([])
  const [table, settable] = useState(<></>);
  const [mount, setmount] = useState(false);
  const [result, setresult] = useState('null')
  const [listdata, setlistdata] = useState([])
  const [currentlist, setcurrentlist] = useState();
  const [count, setcount] = useState(0)

  var updatetable = () => {
    Api.data.getlist((res) => {
      setlistdata(res.data)
      setcurrentlist(res.data[0])
    })
    Api.data.getitems((res) => {
      setitemdata(res.data);
    })
  }
  const [listediter, setlistediter] = useState(<></>)


  // var changetable = (callback) => {
  //   callback(newdata);
  // }

  useEffect(() => {
    if (itemdata.length > 0)
      setitemtable(<ItemTable data={itemdata} />)
  }, [itemdata])

  useEffect(() => {
    if (!mount) {
      updatetable();
      setmount(true);
    }
  })

  useEffect(() => {
    if (listdata.length > 0)
      settable(<ListingTable setlisting={changelisting} data={listdata} />)
  }, [listdata])
  useEffect(() => {
    if (currentlist !== undefined)
      setlistediter(<ListingEdit updatetable={updatetable} data={currentlist} />)
  }, [currentlist])

  // var changeediter = () => {
  //   setlistediter(<ListingEdit key={count} updatetable={updatetable} data={currentlist} />)
  // }


  var changelisting = (data) => {
    setcurrentlist(currentlist => data)
  }


  // var showdata = (data) => {
  //   settable(<ListingTable data={data.data} />);
  //   //setlistingtext(JSON.stringify(data.data))
  //   console.log(data);
  // }



  return (
    <Container>
      <Tabs style={{ marginBottom: '1vh' }}>
        <Tab eventKey={'user'} title={'User'}>

          <Row>
            <Col>
              <Register />
            </Col>
            <Col>
              <Signin />
            </Col>
          </Row>

        </Tab>
        <Tab eventKey={'listings'} title={'Listings'}>
          <Row>
            <Col>
              {table}
            </Col>
          </Row>
          <Row>
            <Col>
              {itemtable}
            </Col>
          </Row>
          <Row>
            <Col>
              {currentlist === undefined ? <></> : listediter}
            </Col>
            <Col>

            </Col>
          </Row>
          {/* <Row>
            <Col>
              <Button onClick={() => {
                Api.data.getlist(showdata)
              }}>get listings list test</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                Api.data.getitems(showdata)
              }}>get listings items test</Button>
            </Col>
          </Row> */}


        </Tab>
        <Tab eventKey={'Result'} title={'Result'}>
          <Row>
            {result}
          </Row>

        </Tab>
      </Tabs>

    </Container>

  );
}

export default App;
