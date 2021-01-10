import { createApp } from 'vue';

import App from './App.vue';
import './index.scss';

import store from './store';
import router from './routes';

createApp(App).use(store).use(router).mount('#app');
