import {useState, useEffect} from 'react';
import './App.css';
import React from 'react'

function App() {

const [username, setUsername] = useState("")
const [cityname, setCityname] = useState("")
const [streetname, setStreetname] = useState("")
const [housenumber, sethousenumber] = useState("")
const [file, setFile] = useState([])

  console.log("Client is running"); 


 function onClickHandler (e) {
   e.preventDefault();
  let username = document.getElementById('textInput').value;
  let cityname = document.getElementById('cityInput').value;
  let streetname = document.getElementById('streetInput').value;
  let housenumber = document.getElementById('housenumberInput').value;
  let file = document.getElementById('filenameInput');
  let formData = new FormData(); 
  
  formData.append("username", username );
  formData.append("cityname", cityname );
  formData.append("streetname", streetname );
  formData.append("housenumber", housenumber );
  formData.append('userfile', file.files[0]);
  
  console.log(file.files);

  fetch('http://127.0.0.1:8000/upload', {
    method: 'POST',
    body: formData
  })
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });


  for (const iterator of formData) {
      console.log(iterator)
    }

} 

  
  return (
    <div className="App">
<form id='uploadForm'>
  <div className="simpleform">
  <label htmlFor="textInput">Név: </label>
  <input id="textInput" type="text" onChange={setUsername}/>
  </div>
  <div className="simpleform">
  <label htmlFor="cityInput">Város: </label>
  <input id="cityInput" type="name" onChange={setCityname}/>
  </div>
  <div className="simpleform">
  <label htmlFor="streetInput">Utca: </label>
  <input id="streetInput" type="name" onChange={setStreetname}/>
  </div>
  <div className="simpleform">
  <label htmlFor="housenumberInput">Házszám: </label>
  <input id="housenumberInput" type="name" onChange={sethousenumber}/>
  </div>

  <label htmlFor="filenameInput">---Fájlnév: </label>
  <input id="filenameInput" type="file" name="sampleFile" /> 
  <input type='submit' onClick={onClickHandler} value='Upload!'/> 
</form> 
    {/*   <input type="file" name="file" onChange={onChangeHandler} /> */}
    </div>
  );
}

export default App;
