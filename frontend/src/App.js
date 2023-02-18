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
import ItemEdit from './Components/Example_Edit_item';
import Usertable from './Components/Example_usertable';

function App() {

  const [usertable, setusetable] = useState(<></>)
  const [itemtable, setitemtable] = useState(<></>)
  const [table, settable] = useState(<></>);

  const [userdata, setuserdata] = useState([])
  const [itemdata, setitemdata] = useState([])
  const [listdata, setlistdata] = useState([])

  const [currentlist, setcurrentlist] = useState();
  const [currentitem, setcurrentitem] = useState()


  const [itemediter, setitemediter] = useState(<></>)
  const [listediter, setlistediter] = useState(<></>)

  const [mount, setmount] = useState(false);
  const [result, setresult] = useState('null')


  var updatetable = () => {
    Api.data.getuser((res) => {
      setuserdata(res.data);
    })
    Api.data.getlist((res) => {
      setlistdata(res.data)
      setcurrentlist(res.data[0])
    })
    Api.data.getitems((res) => {
      setitemdata(res.data);
    })
  }


  // var changetable = (callback) => {
  //   callback(newdata);
  // }



  useEffect(() => {
    if (!mount) {
      updatetable();
      setmount(true);
    }
  })


  useEffect(() => {
    if (itemdata.length > 0)
      setitemtable(<ItemTable setitem={changeitem} data={itemdata} />)
  }, [itemdata])
  useEffect(() => {
    if (listdata.length > 0)
      settable(<ListingTable setlisting={changelisting} data={listdata} />)
  }, [listdata])
  useEffect(() => {
    setusetable(<Usertable setuser={changeuser} data={userdata} />)
  }, [userdata])


  useEffect(() => {

  }, [usertable])
  useEffect(() => {
    if (currentlist !== undefined)
      setlistediter(<ListingEdit updatetable={updatetable} data={currentlist} />)
  }, [currentlist])
  useEffect(() => {
    if (currentitem !== undefined)
      setitemediter(<ItemEdit data={currentitem} updatetable={updatetable} />)
  }, [currentitem])
  // var changeediter = () => {
  //   setlistediter(<ListingEdit key={count} updatetable={updatetable} data={currentlist} />)
  // }


  var changelisting = (data) => {
    setcurrentlist(currentlist => data)
  }

  var changeitem = (data) => {
    setcurrentitem(data);
  }
  var changeuser = (data) => {
    console.log(data)
  }


  return (
    <Container>
      <Tabs style={{ marginBottom: '1vh' }}>
        <Tab eventKey={'user'} title={'User'}>
          <Row>
            {usertable}
          </Row>
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
              {currentitem === undefined ? <></> : itemediter}
            </Col>
          </Row>



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
