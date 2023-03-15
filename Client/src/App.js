import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './Components/Newhome'
import Core from './Components/Core';
import { createContext } from 'react';

const itemdetial = createContext(false);
const Signincont = createContext(false);

function App() {
  // state that control page show
  const [load, setLoad] = useState(false)
  const [page, setpage] = useState(<></>);
  const [signinshow, setsigninshow] = useState(false);
  const [itemdetialshow, setitemdetialshow] = useState(false)
  var set = () => {
    setLoad(true);
  }

  if (!load) {
    Core.addhook(set);
  }


  useEffect(() => {
    if (load)
      setpage(Core.gethomepage())
  }, [load])

  return (
    <itemdetial.Provider value={{signinshow, setsigninshow}}>
      <Signincont.Provider value={{itemdetialshow, setitemdetialshow}}>
        {page}
      </Signincont.Provider>
    </itemdetial.Provider>

  )
}

export default App;
