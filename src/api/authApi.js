import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params:{
    key: 'AIzaSyCiG-yfUOCWcVle_N173eP6lXdK49FnnfI'
  }
});

export default authApi;
