// import {axios} from 'axios'
const axios = require('axios');

export const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

// module.exports = api;
