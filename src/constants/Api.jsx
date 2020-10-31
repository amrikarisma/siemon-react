import Axios from 'axios';

export default Axios.create({
    baseURL: `http://localhost:8000/api/`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('_token')
    },
    withCredentials: true
  });

