import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Api from './Api'
import { Button, Col, Container, Tab, Tabs, Row } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [listingsdata, setlistingtext] = useState('no data')
  console.log(Api);
  return (
    <Container>
      <Tabs>
        <Tab eventKey={'user'} title={'User'}>
          <div>user</div>
        </Tab>
        <Tab eventKey={'listings'} title={'Listings'}>
          <Row>
            <Col>
              <Button onClick={() => {
                Api.data.getlist().then(data => {
                  setlistingtext(JSON.stringify(data.data))
                  console.log(data);
                })
              }}>get listings list test</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                Api.data.getitems().then(data => {
                  setlistingtext(JSON.stringify(data.data));
                  console.log(data);
                })
              }}>get listings items test</Button>
            </Col>
          </Row>
          <Row>
            {listingsdata}
          </Row>

        </Tab>
      </Tabs>

    </Container>

  );
}

export default App;
