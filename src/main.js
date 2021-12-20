import {
  createApp
} from 'vue'
import App from './App.vue'

import 'highlight.js/styles/default.css';
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
createApp(App).use(hljsVuePlugin).mount('#app')