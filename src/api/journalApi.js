import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-22393-default-rtdb.firebaseio.com',
});

export default journalApi;
