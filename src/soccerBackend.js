import axios from 'axios';

export const soccerBackend = () => {
  let instance = axios.create({
    baseURL: 'https://soccer-backend-app.herokuapp.com',
    timeout: 20000,
    headers: {'X-API-Auth-Token': '0504cbc82578b19935239ea870f87bf6'}
  });
  return instance;
}
