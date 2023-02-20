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
  const [islogin, setlogin] = useState(false)
  const [userpk, setuserpk] = useState()

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
      setcurrentlist(currentlist === undefined ? res.data[0] : currentlist)
    })

  }
  var updateitemtable = () => {
    Api.data.getitems((res) => {
      setitemdata(res.data);
      setcurrentitem(currentitem === undefined ? res.data[0] : currentitem)
    })
  }

  useEffect(() => {
    if (!mount) {
      Api.data.checklogin((res) => {
        if (res.data.status === 'success') {
          setuserpk(res.data.user.id);
        }
      })
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
  // useEffect(() => {
  //   if (currentlist !== undefined)
  //     setlistediter(<ListingEdit updatetable={updatelisttable} data={currentlist} />)
  // }, [currentlist])




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
  // useEffect(() => {
  //   if (currentitem !== undefined)
  //     setitemediter(<ItemEdit data={currentitem} updatetable={updateitemtable} />)
  // }, [currentitem])

  //////////////////////////////////////////////////////////////////////////////////
  // user hook

  useEffect(() => {
    if (userpk > 0) {
      setlogin(true)
    }
    if (userpk === 0) {
      setlogin(false)
    }
  }, [userpk])

  useEffect(() => {
    if (islogin) {

    } else {
      setcurrentuser('no login');
    }
  }, [islogin])


  useEffect(() => {
    if (currentuser !== 'no login')
      Api.listing.getbyowner(currentuser, (res) => {
        console.log(res.data)
        setlistdata(res.data)
      })
  }, [currentuser])


  var changeuser = (user) => {
    console.log(user)
    setcurrentuser(user.username)
    setuserpk(user.id)
  }

  var logout = () => {
    setuserpk(0)
  }

  // end of user hook
  /////////////////////////////////////////////////////////////////////////
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
              <Signin login={islogin} logout={logout} changeuser={changeuser} />
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
              {currentlist === undefined ? <></> : <ListingEdit updatetable={updatelisttable} data={currentlist} />}
            </Col>
            <Col>
              {currentitem === undefined ? <></> : <ItemEdit listingid={currentlist.id} data={currentitem} updatetable={updateitemtable} />}
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
