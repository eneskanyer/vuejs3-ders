import { createRouter, createWebHistory } from "vue-router"; //burada router kullanılsın
import Home from "../views/Home.vue"; //Home Dosyasını import ettik. Home adıyla kullanıcaz.
import About from "../views/About.vue"; //About dosyamızı import ettik. About adıyla kullanıcaz.
import Product from "../views/Product.vue";
import Contact from "../views/Contact.vue";
import Test from "../views/test.vue";
import Admin from "@/views/Admin.vue";
import Checkout from "@/views/Checkout.vue";
import Sec from "@/views/sec.vue";
import Exchange from "@/views/exchange.vue";
import UserAgreement from "@/views/useragreement.vue";
import Distance from "@/views/distance.vue";
import fav from "@/views/fav.vue";
import User from "@/views/User.vue";
import forbitten from "@/views/403.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/product",
      name: "product",
      component: Product,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true, roles: ["1"] },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/gizlilik",
      name: "gizlilik",
      component: Sec,
    },
    {
      path: "/iade-degisim",
      name: "iade-degisim",
      component: Exchange,
    },
    {
      path: "/kullanici-sozlesmesi",
      name: "kullanici-sozlesmesi",
      component: UserAgreement,
    },
    {
      path: "/mesafeli-satis",
      name: "mesafeli-satis",
      component: Distance,
    },
    {
      path: "/favori",
      name: "favori",
      component: fav,
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: { requiresAuth: true, roles: ["0"] },
    },
    {
      path: "/403",
      name: "403",
      component: forbitten,
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem("token");

  // Giriş gerektiren sayfalara tokensız erişimi engelle.
  if ((to.meta.requiresAuth || to.meta.roles) && !token) {
    return next("/");
  }

  // Rol kontrolü gerekmiyorsa devam et.
  if (!to.meta.roles) {
    return next();
  }

  try {
    const res = await fetch("http://localhost:3001/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      sessionStorage.removeItem("token");
      return next("/");
    }

    const data = await res.json();
    const role = String(data.u_role);

    // Kullanıcının rolü sayfaya uygun değilse 403'e gönder.
    if (!to.meta.roles.includes(role)) {
      return next("/403");
    }

    next();
  } catch (error) {
    console.error("Router yetki kontrolü hatası:", error);
    next("/");
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "token" && event.newValue === null) {
    router.replace("/");
  }
});

export default router;
