import React, {useEffect, useState} from "react"
import axios  from "axios";
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import UserForm from "./UserForm.jsx";


function App() {
  const [key, setKey] = useState("")
  
  useEffect( () =>{
    const fetchKey = async  ()=>{
      const resp = await axios.post("http://localhost:5000/init_session")
      setKey(resp.data)
      console.log(key)
    }

    fetchKey()
  }, [])


  return(
    <>
      <Header/>
      <UserForm op="0" ekey={key.key}/>
      <UserForm op="1" ekey={key.key}/>
      <Footer/>
    </>
    
  );
}

export default App
//
//<UserForm op="1"/>