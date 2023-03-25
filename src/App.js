import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { FileService, operandClient, uploadFile, OperandService, IndexingStatus  } from '@operandinc/sdk';

// const API_KEY = '<api key>'; // Replace with your actual API key

const fileService = operandClient(
  FileService,
  "5vj670g8z69tnbkmsi3rpr1nmqt6bp0s",
  'https://mcp.operand.ai'
);

const operandService = operandClient(
  OperandService,
  "5vj670g8z69tnbkmsi3rpr1nmqt6bp0s",
  'https://mcp.operand.ai'
);

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      if (file.type === 'application/pdf' || file.type === 'video/mp4') {
        const fileBuffer = await file.arrayBuffer();
        const response = await uploadFile( "5vj670g8z69tnbkmsi3rpr1nmqt6bp0s", file.name, '', new Uint8Array(fileBuffer));
        console.log(response);
      } else {
        alert('Please upload a PDF file.');
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'video/mp4'  });

  const searchFiles = async () => {
    try {
      const res = await operandService.search({
        query: "what is a hero ",
        parentId: "", // Search over files at the root.
        maxResults: 5,
      });
  
      if (res.matches && Array.isArray(res.matches)) {
        for (const match of res.matches) {
          console.log("- " + match.snippet);
          setSearchResults(res.matches.map(match => match.snippet));
        }
      } else {
        console.log("No matches found");
      }
    } catch (error) {
      console.error("Error searching files:", error);
    }
  };
  return (
    <div className="App">
      <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px', textAlign: 'center', width: '50%', margin: 'auto', marginTop: '100px' }}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the PDF files here...</p> :
            <p>Drag and drop PDF files here, or click to select files</p>
        }
      </div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button onClick={searchFiles}>Search Files</button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3>Search Results:</h3>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}



export default App;
