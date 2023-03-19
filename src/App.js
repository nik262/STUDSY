import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileService, operandClient, uploadFile, OperandService, IndexingStatus  } from '@operandinc/sdk';

// const API_KEY = '<api key>'; // Replace with your actual API key

const fileService = operandClient(
  FileService,
  process.env.REACT_APP_API_KEY,
  'https://mcp.operand.ai'
);

const operandService = operandClient(
  OperandService,
  process.env.REACT_APP_API_KEY,
  'https://mcp.operand.ai'
);

function App() {
  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      if (file.type === 'application/pdf') {
        const fileBuffer = await file.arrayBuffer();
        const response = await uploadFile(process.env.REACT_APP_API_KEY, file.name, '', new Uint8Array(fileBuffer));
        console.log(response);
      } else {
        alert('Please upload a PDF file.');
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf' });

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
    </div>
  );
}

export default App;

//function that handles the drag and drop of file from the users local machine
