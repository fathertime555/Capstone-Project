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

  const [currentuser, setcurrentuser] = useState('no login');


  var updatelisttable = () => {
    Api.data.getlist((res) => {
      setlistdata(res.data)
      setcurrentlist(res.data[0])
    })

  }
  var updateitemtable = () => {
    Api.data.getitems((res) => {
      setitemdata(res.data);
      setcurrentitem(res.data[0])
    })
  }

  useEffect(() => {
    if (!mount) {
      updatelisttable();
      updateitemtable();
      setmount(true);
    }
  })

  //when the list of listdata updated, update list table.
  useEffect(() => {
    if (listdata.length > 0)
      settable(<ListingTable setlisting={changelisting} data={listdata} />)
  }, [listdata])

  //pass to ListingTable, use to update current list that clicked in list table.
  var changelisting = (data) => {
    setcurrentlist(currentlist => data)
  }

  // update list editer after current list has been change by click on the list table
  useEffect(() => {
    if (currentlist !== undefined)
      setlistediter(<ListingEdit updatetable={updatelisttable} data={currentlist} />)
  }, [currentlist])




  //when the list of itemdata updated, update item table
  useEffect(() => {
    if (itemdata.length > 0)
      setitemtable(<ItemTable setitem={changeitem} data={itemdata} />)
  }, [itemdata])

  // pass to ItemTable, use to update current item that clicked in item table
  var changeitem = (data) => {
    setcurrentitem(data);
  }

  // update item editer after current item has been change by click on the item table
  useEffect(() => {
    if (currentitem !== undefined)
      setitemediter(<ItemEdit data={currentitem} updatetable={updateitemtable} />)
  }, [currentitem])






  // var changeediter = () => {
  //   setlistediter(<ListingEdit key={count} updatetable={updatetable} data={currentlist} />)
  // }

  // useEffect(() => {
  //   if (userdata.length > 0) {
  //     console.log(userdata)
  //     setusetable(<Usertable setuser={changeuser} data={userdata} />)
  //   }
  // }, [userdata])

  // var changeuser = (data) => {
  //   console.log(data)
  // }
  // useEffect(() => {

  // }, [usertable])

  useEffect(() => {
    Api.listing.getbyowner(currentuser, (res) => {
      console.log(res.data)
      setlistdata(res.data)
    })
  }, [currentuser])


  var changeuser = (user) => {
    console.log(user)
    setcurrentuser(user)
  }

  return (
    <Container>
      <Tabs style={{ marginBottom: '1vh' }}>
        <Tab eventKey={'user'} title={'User'}>
          <Row>
            {/* {usertable} */}
            <Col>{currentuser}</Col>
          </Row>
          <Row>
            <Col>
              <Register />
            </Col>
            <Col>
              <Signin changeuser={changeuser} />
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
