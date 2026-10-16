<script setup>
import fav from "./fav.vue";
import adminOrders from "@/components/admin-orders.vue";
import userSet from "@/components/user-set.vue";
import adminProducts from "@/components/admin-products.vue";
import router from "@/router";
import addAdress from "@/components/addAdress.vue";
</script>

<template>
  <div class="admin-layout">
    <!-- SOL TARAF -->
    <aside class="admin-sidebar">
      <!-- Admin bilgileri -->
      <div class="admin-profile">
        <div class="adminfoto">
          <i class="bi bi-person-fill"></i>
        </div>

        <h5>{{ admin.firstName }} {{ admin.lastName }}</h5>

        <p>{{ admin.email }}</p>

        <span class="admin-role"> Kullanıcı </span>
      </div>

      <!-- Admin Menü -->
      <div class="admin-menu">
        <button
          @click="secim = 'userset'"
          :class="secim == 'userset' ? 'active' : ''"
        >
          <i class="bi bi-person"></i>
          Kullanıcı Bilgilerim
        </button>
        <button
          @click="secim = 'adress'"
          :class="secim == 'adress' ? 'active' : ''"
        >
          <i class="bi bi-geo-alt-fill"></i>
          Adres Bilgilerim
        </button>

        <button
          @click="secim = 'orders'"
          :class="secim == 'orders' ? 'active' : ''"
        >
          <i class="bi bi-cart3"></i>
          Siparişlerim
        </button>
        <button @click="secim = 'fav'" :class="secim == 'fav' ? 'active' : ''">
          <i class="bi bi-heart-fill"></i>
          Favorilerim
        </button>
      </div>
      <!-- Çıkış -->
      <div class="admin-logout">
        <button @click="logout()">
          <i class="bi bi-box-arrow-right"></i>
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>

    <!-- SAĞ TARAF -->
    <main class="admin-content">
      <div v-if="secim == 'products'">
        <adminProducts />
      </div>
      <!-- Kullanıcı Bilgileri -->
      <div v-if="secim == 'userset'">
        <userSet />
      </div>
      <!-- Adreslerim -->
      <div v-if="secim == 'adress'">
        <addAdress />
      </div>
      <!-- Siparişler -->
      <div v-if="secim == 'orders'">
        <adminOrders />
      </div>
      <!-- Favorilerim -->
      <div v-if="secim == 'fav'">
        <fav />
      </div>
    </main>
  </div>
  <!-- ÇIKIŞ ONAY MODALI -->
  <div
    v-if="showLogoutModal"
    class="logout-modal-backdrop"
    @click.self="cancelLogout"
  >
    <div class="logout-modal">
      <div class="logout-modal-icon">
        <i class="bi bi-box-arrow-right"></i>
      </div>

      <h4>Çıkış Yap</h4>

      <p>Hesabınızdan çıkış yapmak istediğinize emin misiniz?</p>

      <div class="logout-modal-buttons">
        <button type="button" class="logout-cancel-btn" @click="cancelLogout">
          Vazgeç
        </button>

        <button type="button" class="logout-confirm-btn" @click="confirmLogout">
          <i class="bi bi-box-arrow-right me-2"></i>
          Çıkış Yap
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "http://localhost:3001",

      // Açık olan admin sayfası
      secim: "orders",
      // Çıkış modalı
      showLogoutModal: false,
      // Giriş yapan admin
      admin: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },

  mounted() {
    this.getUserName();

    if (this.$route.query.secim === "adress") {
      this.secim = "adress";
    }
  },

  computed: {},

  methods: {
    async getUserName() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/getUserName`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcı bilgileri alınamadı.");
        }

        this.admin = data;
      } catch (e) {
        console.log("Kullanıcı bilgisi hatası:", e.message);
      }
    },

    logout() {
      this.showLogoutModal = true;
    },

    async confirmLogout() {
      const token = sessionStorage.getItem("token");

      try {
        if (token) {
          const res = await fetch(`${this.baseUrl}/api/logout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error("Sunucuda oturum kapatılamadı.");
          }
        }
      } catch (error) {
        console.error("Çıkış hatası:", error);
        this.toast?.(
          "Çıkış yapılamadı. Lütfen tekrar deneyin.",
          "danger",
          "Çıkış Hatası",
        );
        return;
      }

      sessionStorage.removeItem("token");
      this.showLogoutModal = false;
      this.$router.replace("/").then(() => window.location.reload());
    },

    cancelLogout() {
      this.showLogoutModal = false;
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: calc(100vh - 70px);
  background: #f5f6f8;
}

/* SOL MENÜ */

.admin-sidebar {
  width: 250px;
  min-width: 250px;

  background: #212936;
  color: white;

  padding: 25px 15px;

  display: flex;
  flex-direction: column;
}

/* ADMIN PROFİLİ */

.admin-profile {
  text-align: center;

  padding-bottom: 25px;
  margin-bottom: 20px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.adminfoto {
  width: 90px;
  height: 90px;

  margin: 0 auto 15px;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #212936;

  font-size: 45px;
}

.admin-profile h5 {
  margin: 0;

  font-weight: 600;
}

.admin-profile p {
  margin: 6px 0;

  font-size: 13px;

  color: #b9c0ca;

  word-break: break-word;
}

.admin-role {
  display: inline-block;

  padding: 4px 12px;

  border-radius: 20px;

  background: #0d6efd;

  color: white;

  font-size: 12px;
}

/* MENÜ */

.admin-menu {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

.admin-menu button {
  border: none;

  background: transparent;

  color: #c5cad1;

  text-align: left;

  padding: 12px 15px;

  border-radius: 8px;

  font-size: 15px;

  transition: 0.2s;
}

.admin-menu button:hover {
  background: rgba(255, 255, 255, 0.08);

  color: white;
}

.admin-menu button.active {
  background: #0d6efd;

  color: white;
}

.admin-menu i {
  width: 25px;

  display: inline-block;
}

/* SAĞ TARAF */

.admin-content {
  flex: 1;

  padding: 30px;

  overflow-x: auto;
}

/*ÇIKIŞ */
.admin-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-menu {
  flex: 1;
}

.admin-logout {
  padding: 20px;
  margin-top: auto;
}

.admin-logout button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px 16px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: #dc3545;

  font-size: 15px;
  font-weight: 500;

  cursor: pointer;
  transition: 0.2s;
}

.admin-logout button i {
  font-size: 18px;
}

.admin-logout button:hover {
  background: #dc3545;
  color: white;
}

/* =========================
   ÇIKIŞ ONAY MODALI
========================= */

.logout-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;

  padding: 20px;

  animation: logoutFadeIn 0.2s ease;
}

.logout-modal {
  width: 100%;
  max-width: 420px;

  background: white;
  border-radius: 18px;

  padding: 30px;

  text-align: center;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);

  animation: logoutModalIn 0.25s ease;
}

.logout-modal-icon {
  width: 65px;
  height: 65px;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #fff1f1;
  color: #dc3545;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
}

.logout-modal h4 {
  margin-bottom: 10px;

  font-weight: 700;

  color: #212529;
}

.logout-modal p {
  margin-bottom: 25px;

  color: #6c757d;

  font-size: 15px;
}

.logout-modal-buttons {
  display: flex;
  gap: 10px;
}

.logout-modal-buttons button {
  flex: 1;

  height: 44px;

  border-radius: 9px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.logout-cancel-btn {
  background: #f1f3f5;

  border: 1px solid #dee2e6;

  color: #495057;
}

.logout-cancel-btn:hover {
  background: #e9ecef;
}

.logout-confirm-btn {
  background: #dc3545;

  border: 1px solid #dc3545;

  color: white;
}

.logout-confirm-btn:hover {
  background: #bb2d3b;

  border-color: #bb2d3b;

  transform: translateY(-1px);
}

@keyframes logoutFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes logoutModalIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 576px) {
  .logout-modal {
    padding: 25px 20px;
  }

  .logout-modal-buttons {
    flex-direction: column;
  }
}
/* MOBİL */

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    min-width: 100%;
    min-height: auto;
    height: auto;
  }

  .admin-content {
    width: 100%;
    padding: 15px;
  }
}
</style>
