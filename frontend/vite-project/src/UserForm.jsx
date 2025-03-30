import React, {useState, useEffect} from "react";
import axios from "axios";

function UserForm(props){
    const [data, setData] = useState({message: "", key : props.ekey})
    const [inData, setInData] = useState({})
    const [isSubmitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const operation = ["encrypt", "decrypt"];

    const handleSubmit = (e)=> {
        e.preventDefault()
        setSubmitted(true)
    }

    const handleClose = (e)=>{
        e.preventDefault()

        setSubmitted(false)
    }

    const handleCopy = (e) => {
        setCopied(true)
    }

    useEffect((e)=>{
        const copy = async () => {
            if(copied){
            navigator.clipboard.writeText(inData.message)
            setTimeout(()=>{
                setCopied(false)
            },5000)
           }
        }

        copy()
    }, [copied])

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const resp = await axios.post(`http://localhost:5000/api/${operation[props.op]}_message`, data)
                setInData(resp.data)
            }  catch (err) {
                console.log(err)// Store any error that occurs
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        }
        if(isSubmitted){
            fetchData()
        }
    }, [isSubmitted]);


    const handleChange = (e) => {
       const value = e.target.value

        setData({
            message: value, 
            key: props.ekey
        });
    }

    if(!isSubmitted){
        return(
            <div className="card">

                <h2 className="card-title">Enter the message you want to {operation[props.op]}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="message" value={data.message} onChange={handleChange}/><br/>
                    <input className="card-button" type="submit" value={operation[props.op].toUpperCase()}/>
                </form>
            </div>
        );
    } else {
        if(loading){
            return(
                <h1>LOADING...</h1>
            )
        } else{
            return(
                <div className="card">
                    <h2 className="card-title">{operation[props.op].toUpperCase()}ED MESSAGE: </h2>
                    <p>{inData.message}</p>

                    <button className="card-button2" onClick={handleClose}>GO BACK</button>
                    <button disabled={copied} className="card-button2" onClick={handleCopy}>{copied ? "COPIED" : "COPY" }</button>
                </div>
            );
        }
    }
}

export default UserForm