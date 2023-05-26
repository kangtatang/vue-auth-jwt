import { createRouter, createWebHistory } from "vue-router";
// // import HomeView from "../views/HomeView.vue";
// import Home from "./components/Home.vue";
// import Login from "./components/Login.vue";
// import Register from "./components/Register.vue";
// // lazy-loaded
// const Profile = () => import("./components/Profile.vue");
// const BoardAdmin = () => import("./components/BoardAdmin.vue");
// const BoardModerator = () => import("./components/BoardModerator.vue");
// const BoardUser = () => import("./components/BoardUser.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Home"),
  },
  {
    path: "/home",
    component: () => import("@/components/Home"),
  },
  {
    path: "/login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/register",
    component: () => import("@/components/Register"),
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: () => import("@/components/Profile"),
  },
  // {
  //   path: "/admin",
  //   name: "admin",
  //   // lazy-loaded
  //   component: () => import("@/components/BoardAdmin"),
  // },
  // {
  //   path: "/mod",
  //   name: "moderator",
  //   // lazy-loaded
  //   component: () => import("@/components/BoardModerator"),
  // },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: () => import("@/components/BoardUser"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
