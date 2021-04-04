import Vue from "vue";
import VueRouter from "vue-router";
import Goods from "@/views/goods/Goods";
import Seller from "@/views/seller/Seller";
import Ratings from "@/views/ratings/Ratings";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/goods",
  },
  {
    path: "/goods",
    component: Goods,
  },
  {
    path: "/ratings",
    component: Ratings,
  },
  {
    path: "/seller",
    component: Seller,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
});

export default router;
