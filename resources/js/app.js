import './bootstrap';

import {createApp} from "vue";
import App from "./src/app.vue";
import router from "./src/router/router.js";
import {i18n} from "./src/router/i18n.js";
import {mountAventaAgent} from "./src/lib/aventaAgent.js";
import { createHead } from "@vueuse/head";
import aos from "aos";

import '@flaticon/flaticon-uicons/css/regular/rounded.css'

const app = createApp(App);
const head = createHead();

app.use(i18n);
app.use(router);
app.use(head);

app.mount("#app");

// Floating AI advisor. Created once, outside the app root, and driven by the
// router from there. See src/lib/aventaAgent.js.
mountAventaAgent(router);

aos.init();
