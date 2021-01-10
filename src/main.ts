import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import './index.scss';

library.add(faGithub, faLinkedin);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
