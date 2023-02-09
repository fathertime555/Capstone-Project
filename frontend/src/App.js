import logo from './logo.svg';
import './App.css';
import Api from './Api'

function App() {
  console.log(Api);
  return (
    <div>
      <button onClick={() => {
        Api.data.getlist().then(data => {
          console.log(data);
        })
      }}>get listings list test</button>
      <button onClick={() => {
      Api.data.getitems().then(data => {
        console.log(data);
      })
    }}>get listings items test</button>
    </div>

  );
}

export default App;
