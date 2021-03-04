const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const cors = require('cors');

const PORT = 8000;
app.use(cors())
const fs = require('fs')
app.use('/form', express.static(path.join(__dirname, '../frontend/index.html')));
app.use('/pub', express.static(path.join(__dirname, '../frontend/public'))); 
app.use('/upload', express.static(path.join(__dirname, '../backend/upload'))); 
app.use('/upload', express.static(path.join(__dirname, '../backend/Data'))); 

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let sampleFile;
  let userData;
  let userDataRead;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log(req.body);
userData = req.body.userData;
sampleFile = req.files.userFile;



  var x = fs.readFileSync('Data/data.json');
  userDataRead = JSON.parse(x)
  console.log(userDataRead)


userDataRead.push(JSON.parse(userData));
fs.writeFile(
  'Data/data.json',
  JSON.stringify(userDataRead, null, 2),
  function(err) {
    if (err) return console.log(err);
    console.log('JSON Updated');
  }
  )
  
  uploadPath = __dirname + '/upload/' + sampleFile.name; 

  userData = JSON.parse(req.body.userData);
  dataUploadPath = __dirname + "/Data/" + userData.email.toString().replace("@", "_").replace(",", "_") + ".json";
  

   sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(499).send(err);    
    }

    res.send('File uploaded to ' + uploadPath);
  }); 
  dataUploadPath, function(err) {
    if (err) {
      return res.status(501).send(err);    
    }

    res.send('File uploaded to ' + dataUploadPath);
  };
});




app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
