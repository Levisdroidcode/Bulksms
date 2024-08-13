import React, { useState } from 'react';
import sendBulkSMS from '../api/smsApi';
import '../styles/App.css';

const BulkSmsForm = () => {
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    let numbers = [];

    if (csvFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target.result;
        numbers = text.split('\n').map(num => num.trim()).filter(num => num);
        try {
          const response = await sendBulkSMS(numbers, message);
          setResponseMessage(response.message || 'Messages sent successfully');
        } catch (error) {
          setResponseMessage('Failed to send messages.');
        }
        setLoading(false);
      };
      reader.readAsText(csvFile);
    } else if (phoneNumbers) {
      numbers = phoneNumbers.split(',').map(num => num.trim()).filter(num => num);
      try {
        const response = await sendBulkSMS(numbers, message);
        setResponseMessage(response.message || 'Messages sent successfully');
      } catch (error) {
        setResponseMessage('Failed to send messages.');
      }
      setLoading(false);
    } else {
      setLoading(false);
      setResponseMessage('Please provide phone numbers or upload a CSV file.');
    }
  };

  return (
    <div className="bulk-sms-form">
      <h2>Send Bulk SMS</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Numbers (comma separated):
          <input
            type="text"
            value={phoneNumbers}
            onChange={(e) => setPhoneNumbers(e.target.value)}
          />
        </label>
        <label>
          Or upload a CSV file:
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send SMS'}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default BulkSmsForm;
