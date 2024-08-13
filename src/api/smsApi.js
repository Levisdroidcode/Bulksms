import axios from 'axios';

const sendBulkSMS = async () => {
  const options = {
    method: 'POST',
    url: 'https://textflow-sms-api.p.rapidapi.com/send-sms',
    headers: {
      'x-rapidapi-key': 'fdfed2c3f1mshf45337900bb9531p1146b8jsna5610f699a62', 
      'x-rapidapi-host': 'textflow-sms-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      phone_number: '+254745340493',
      text: 'Text Message'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle API response errors
      console.error('Error response from API:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else {
      // Handle other types of errors
      console.error('Error sending SMS:', error.message);
    }
  }
};

export default sendBulkSMS;
