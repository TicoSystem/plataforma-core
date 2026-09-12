//import './bootstrap';
import "../css/app.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./pages/App.vue";

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/Home.vue"),
        },
    ],
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
