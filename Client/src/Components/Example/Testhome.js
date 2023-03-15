
import Api from '../Api'
import { Col, Container, Tab, Tabs, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Register from './Example_register';
import Signin from './Example_Signin';
import AccountEdit from './Example_Edit_Account';
import ListingTable from './Example_Listingtable';

import ItemTable from './Example_itemtable';
import ItemEdit from './Example_Edit_item';

import ListingEdit from './Example_Edit_listing';
import Listing from '../../Object/listing';
import Item from '../../Object/item';
import Core from '../Core';
function TestApp() {

  const [islogin, setlogin] = useState(false)
  const [userpk, setuserpk] = useState(0)
  const [userdata, setuserdata] = useState(Core.getUser())
  // var userdata = Core.getUser();
  // const [usertable, setusetable] = useState(<></>)
  // const [itemtable, setitemtable] = useState(<></>)
  // const [table, settable] = useState(<></>);


  const [itemdata, setitemdata] = useState([])
  const [listdata, setlistdata] = useState([])

  const [currentlist, setcurrentlist] = useState();
  const [currentitem, setcurrentitem] = useState()


  // const [itemediter, setitemediter] = useState(<></>)
  // const [listediter, setlistediter] = useState(<></>)

  const [mount, setmount] = useState(false);
  // const [result, setresult] = useState('null')

  const [currentuser, setcurrentuser] = useState('no login');




  var updatelisttable = () => {
    if (userpk > 0) {
      Api.listing.getbyowner((res) => {
        var list = []
        res.data.list.forEach(element => {
          list.push(new Listing(element, Core.check_dev()))
        });
        console.log(list)
        setlistdata(list)
        setcurrentlist(currentlist || res.data.list[0])
      })
    }
  }

  var updateitemtable = () => {
    if (currentlist) {
      Api.item.bylisting(currentlist.json, (res) => {
        var items = [];
        res.data.items.forEach(element => {
          items.push(new Item(element, Core.check_dev()))
        })
        setitemdata(items);
        setcurrentitem(items.length > 0 ? (currentitem || res.data[0]) : new Item({ uid: userpk, gsid: currentlist.id }, true));
      })
    }
  }

  var updateuser = () => {
    setcurrentuser(userdata.username)
  }

  useEffect(() => {

    if (!mount && userdata.islogin) {
      setuserpk(userdata.uid);
    }
    setmount(true)
  })


  //pass to ListingTable, use to update current list that clicked in list table.
  var changelisting = (data) => {
    setcurrentlist(currentlist => data)
  }

  // update list editer after current list has been change by click on the list table
  useEffect(() => {
    if (currentlist) {
      updateitemtable()
    }
  }, [currentlist])



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
      Api.listing.getbyowner((res) => {
        var list = []
        res.data.list.forEach(element => {
          list.push(new Listing(element, Core.check_dev()))
        });
        console.log(list)
        setlistdata(list)
      })
      setlogin(true)
    }
    if (userpk === 0) {
      setlogin(false)
    }
  }, [userpk])

  useEffect(() => {
    if (islogin) {
      setuserdata(Core.getUser())
    } else {
      setcurrentuser('no login');
    }
  }, [islogin])

  useEffect(() => {
    if (userdata.islogin) {
      setcurrentuser(userdata.username)
    }
  }, [userdata])

  var changeuser = (user) => {
    console.log(user)
    setuserpk(user.uid)
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
          <Stack gap={3}>
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
            <Row>
              <Col>
                <AccountEdit login={islogin} data={userdata} update={updateuser} />
              </Col>
              <Col>
              </Col>
            </Row>
          </Stack>

        </Tab>
        <Tab eventKey={'listings'} title={'Listings'} disabled={!islogin}>
          <Row>
            <Col>
              <ListingTable setlisting={changelisting} data={listdata} />
            </Col>
          </Row>
          <Row>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col>
              <ListingEdit updatetable={updatelisttable} data={currentlist} owner={userpk} />
            </Col>
            <Col>
              {/* {currentitem === undefined ? <></> : <ItemEdit listingid={currentlist.id} data={currentitem} updatetable={updateitemtable} />} */}
            </Col>
          </Row>
        </Tab>
        <Tab disabled={currentlist === undefined} eventKey={'item'} title={'item'}>
          <Row>
            <ItemTable setitem={changeitem} data={itemdata} />
          </Row>
          <Row>
            <Col>
              <ItemEdit data={currentitem} userid={userpk} listing={currentlist} updatetable={updateitemtable} />
            </Col>
            <Col>
            </Col>
          </Row>
        </Tab>
      </Tabs>

    </Container>

  );
}

export default TestApp;
