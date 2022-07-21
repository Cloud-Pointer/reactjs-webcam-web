import React, { useState } from 'react'
import './style.css'
import { Capture} from '../Scan/Capture'

const Home = () => {
    const [image,setImage]=useState();
    const [identityStatus, setIdentityStatus] = useState(""); 
    const[isLoaded,setIsLoaded] = useState(true);
    const submitForm = () => {
        setIsLoaded(false);
        var data = image.toString().replace(/^data:image\/jpg;base64,/, "");
        alert(image.length);

        var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            "imageContent" : data
        })
        };
    fetch("http://54.237.84.17:8080/uploadIdentity", requestOptions)
    .then(async response => {
        const data = await response.json();
        setIsLoaded(true);
        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            return Promise.reject(data);
        }
        console.log("data>>>" + data);
        setIdentityStatus(data.matchString)
    })
    .catch(error => {
        console.error('There was an error!', error);
        setIdentityStatus("error");
    });     
  }

    const setUploadedImage = (image) => {
      setImage(image);
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
      }
    else{ 
    return (
        <div className="home-container">
            <div className="container">
                <div className="text">
                    <h1>Take Photo!</h1>
                    <form className="form">
                        <Capture setUploadedImage = {setUploadedImage}/>
                           <button id="login-button" onClick={(e) => submitForm(e)}>Submit</button>
                    </form>
                    <p>{identityStatus}</p>
                </div>
            </div>
        </div>
    )
    }
}
export default Home
