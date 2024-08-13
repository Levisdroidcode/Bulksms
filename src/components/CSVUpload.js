import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (results) => {
          const phoneNumbers = results.data.map(row => row[0]);
          onFileUpload(phoneNumbers);
        }
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default CSVUpload;
