import logo from './logo.svg';
import './App.css';
import Api from './Api'

function App() {
  console.log(Api);
  return (
    <button onClick={() => {
      Api.homepage.getdata().then(data => {
        console.log(data);
      })
    }}>get listings list test</button>
  );
}

export default App;
