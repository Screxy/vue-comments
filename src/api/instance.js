import axios from "axios";

const instance = axios.create({
  baseURL: 'http://194.67.93.117:80',
  headers: {
    accept: 'application/json',
    Username: 'Screxy',
  },
});

export default instance