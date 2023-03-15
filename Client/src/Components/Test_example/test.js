import AllData from './Data';
import { useState,useEffect } from 'react';
import Homepage from './Homepage'


function Home(){
    const [load,setLoad]=useState(false)

    var set=()=>{
        setLoad(true);
    }
    

    useEffect(() => {
        AllData.addhook(set);
    })


    return load?(<Homepage/>):(<></>)
}

export default Home;