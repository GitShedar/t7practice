function pageLoad() { 
  console.log("Client is running"); 
  // document.getElementById('uploadForm').addEventListener('submit', function(e) {
  //   e.preventDefault()
  //   console.log('the file upload process is blocked')
  // })

  document.getElementById('uploadForm').addEventListener('submit', function(e) {
    
    let one = document.getElementById('textInput');
    let two = document.getElementById('filenameInput');
    let formData = new FormData(); 
    
    formData.append("username", one.value )
    formData.append('userfile', two.files[0])
    
    console.log(two.files)

    fetch('/upload', {
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

      e.preventDefault();
  })

} 

window.addEventListener("load", pageLoad); 