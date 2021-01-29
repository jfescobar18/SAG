import home from "./components/home.js";
import navbar from "./components/navbar.js";
import carrousel from "./components/carrousel.js";

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        }
    ]
});

export default router;