import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/UI';
import axios from 'axios';


const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component); 
});

app.mount('#app');

const instance = axios.create({
  baseURL: 'http://194.67.93.117:80',
  headers: {
    accept: 'application/json',
    Username: 'Screxy',
  },
});