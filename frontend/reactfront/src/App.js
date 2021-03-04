import {useState} from 'react';
import './App.css';
import React from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();

        let userData = {};
        
        const ls = document.querySelectorAll('.toJson');

   for (const l of ls) {
      userData[l.name] = l.value;
    }
    userData.selectedFile = selectedFile.name;
        
        console.log(selectedFile.name);
        console.log(userData);

        formData.append("userFile", selectedFile);
        formData.append("userData", JSON.stringify(userData));

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
  <h1>Join US</h1>
  <div className="simpleform">
  <label htmlFor="textInput">Név: </label>
  <input className="toJson" id="textInput" type="text" name="name" />
  </div>
  <div className="simpleform">
  <label htmlFor="cityInput">Város: </label>
  <input className="toJson" id="cityInput" type="text" name="city" />
  </div>
  <div className="simpleform">
  <label htmlFor="streetInput">Utca: </label>
  <input className="toJson" id="streetInput" type="text" name="street" />
  </div>
  <div className="simpleform">
  <label htmlFor="housenumberInput">Házszám: </label>
  <input className="toJson" id="housenumberInput" type="text" name="housenumber" />
  </div>
  <div className="simpleform">
  <label htmlFor="streetInput">Email: </label>
  <input className="toJson" type="email" name="email" />
  </div>

  <label htmlFor="filenameInput">---Fájlnév: </label>
  <input id="filenameInput" type="file" name="file" onChange={changeHandler}/> 
</form> 
  <button type='submit' onClick={handleSubmission} value='Upload!'> Kattints </button>
    {/*   <input type="file" name="file" onChange={onChangeHandler} /> */}
    </div>
  );
}

export default App;
