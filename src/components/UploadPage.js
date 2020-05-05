import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {tsvJSON} from './common/utils.js'




class UploadPage extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        }

       this.onFileInputChangeHandler = this.onFileInputChangeHandler.bind(this);
       this.onUploadButtonClickHandler = this.onUploadButtonClickHandler.bind(this);
       // this.tsvJSON = this.tsvJSON.bind(this);
    }





 onFileInputChangeHandler(event){
        
        console.log(event.target.files[0])
        // document.getElementById('inputUploadButton').click();
        // document.getElementById('inputUploadButton').onchange = () =>
        this.setState({selectedFile:event.target.files[0]});

    }


  
   submitData(contentType, data, datatype){
        console.log("submitData dalled")
        axios({
            url: `/gwas/api/upload/`+datatype,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': contentType
            }}).then(response => {
            console.log(response.data)
        }).catch((error) => {
            console.log("error:" + error);
        })
    }

  

 onUploadButtonClickHandler(datatype){
        console.log("Button Clicked " + datatype);
        let file = this.state.selectedFile
        if (!file){
                    alert(`No  file Selected`);
                    return

        }

        const submitData = this.submitData;
        // document.getElementById('inputUploadButton').click();
        // document.getElementById('inputUploadButton').onchange = () =>
        // {this.setState({selectedFile:document.getElementById('inputUploadButton').value});}
        const fr = new FileReader();
        fr.onload = function(e) {
             var text = fr.result;
             const jsonData = JSON.parse(tsvJSON(text))
             console.log(jsonData)
             submitData("application/json", jsonData, datatype)

        }

        fr.readAsText(file, "utf8");
     
        // const formData = new FormData();
        // formData.append("file", this.state.selectedFile);
        // this.submitForm("multipart/form-data", formData);


   }

render() {
  return (
    <div>
    <div className="box">
        <h5>
        Phenotype Data
        </h5>
         <br />
      <div className="box">
      <input
        id="contained-button-file"
        type="file"
        onChange={this.onFileInputChangeHandler}

      />
      </div>
  
      <div>
        <Button variant="contained" color="primary" component="span" onClick={e => this.onUploadButtonClickHandler("phenotypes")}>
          Upload
        </Button>
      </div>
    </div>
    <div className="box">
        <h5>
        Variant Data
        </h5>
        <br />
   
      <div className="box">
      <input
        id="contained-button-file"
        type="file"
        onChange={this.onFileInputChangeHandler}

      />
      </div>
      <br />
      <div>
        <Button variant="contained" color="primary" component="span" onClick={e => this.onUploadButtonClickHandler("variants")}>
          Upload
        </Button>
      </div>
      </div>
    </div>
  );
 }
}

export default UploadPage;



  