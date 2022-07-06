import axios from 'axios';
import React, { useState } from 'react';
import Alert from './Alert';
import './Upload.css';

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [title,setTitle] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const data = await axios.post("/gallery",JSON.stringify({ data: base64EncodedImage,title }),config);
            console.log(data);
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form style={{width:'100%'}} onSubmit={handleSubmitFile} className="form">
                <div id='StyledDiv'>
                    <label htmlFor='inputTitle'>Enter title</label>
                    <input style={{flexGrow:'1',height:'2rem',marginLeft:'1rem',borderWidth:'1px'}}
                    type='text' id='inputTitle' onChange={(e)=>setTitle(e.target.value)} value={title} />
                </div>
                <div id="StyledDiv">
                    <label htmlFor="inputTag">
                        Select Image <br/>
                        <i class="fa fa-2x fa-camera"></i>
                        <input 
                            id="inputTag" 
                            type="file"
                            name="image"
                            onChange={handleFileInputChange}
                            value={fileInputState}
                            className="form-input"
                        />
                        <br/>
                        <span id="imageName"></span>
                    </label>
                </div>
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}