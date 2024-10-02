import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);      // State for the uploaded file
  const [name, setName] = useState('');        // State for the name input
  const [previewUrl, setPreviewUrl] = useState(null);  // State for the image preview
  const [message, setMessage] = useState('');  // State for success/error messages

  // Handle file input change and generate a preview
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
  };

  // Handle name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle the form submission (upload logic)
  const handleUpload = async (event) => {
    event.preventDefault();
  
    if (file && name) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('photo', file);
  
      try {
        const response = await axios.post('http://localhost:8080/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic ' + btoa('user:Animal@88'), 
          },
        });
        setMessage('User successfully uploaded!');
        console.log('Response:', response.data);
      } catch (error) {
        setMessage('Error uploading user. Please try again.');
        console.error('Error:', error);
      }
    } else {
      setMessage("Please select a file and enter a name.");
    }
  };
  

  return (
    <div className="upload-page">
      <h2>Upload an Image</h2>
      <form onSubmit={handleUpload}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={handleNameChange} 
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          required 
        />
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" width="200" />
          </div>
        )}
        <button type="submit">Upload-do not click morethan once🤧</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
