<script setup>
import adminProducts from "@/components/admin-products.vue";
import adminUsers from "@/components/admin-users.vue";
import adminOrders from "@/components/admin-orders.vue";
import adminMessages from "@/components/admin-messages.vue";
import router from "@/router";
</script>

<template>
  <div class="admin-layout">
    <!-- SOL TARAF -->
    <aside class="admin-sidebar">
      <!-- Admin bilgileri -->
      <div class="admin-profile text-center pb-4 mb-3 border-bottom">
        <div
          class="adminfoto mx-auto mb-3 d-flex align-items-center justify-content-center bg-white"
        >
          <i class="bi bi-person-fill"></i>
        </div>

        <h5 class="mb-0 fw-semibold">
          {{ admin.firstName }} {{ admin.lastName }}
        </h5>

        <p class="my-1 small">
          {{ admin.email }}
        </p>

        <span class="admin-role badge bg-primary"> Admin </span>
      </div>

      <!-- Admin Menü -->
      <div class="admin-menu d-flex flex-column gap-2 flex-grow-1">
        <button
          @click="secim = 'products'"
          :class="secim == 'products' ? 'active' : ''"
          class="btn text-start"
        >
          <i class="bi bi-box-seam me-2"></i>
          Ürünler
        </button>

        <button
          @click="secim = 'users'"
          :class="secim == 'users' ? 'active' : ''"
          class="btn text-start"
        >
          <i class="bi bi-people me-2"></i>
          Kullanıcılar
        </button>

        <button
          @click="secim = 'orders'"
          :class="secim == 'orders' ? 'active' : ''"
          class="btn text-start"
        >
          <i class="bi bi-cart3 me-2"></i>
          Siparişler
        </button>

        <button
          @click="secim = 'messages'"
          :class="secim == 'messages' ? 'active' : ''"
          class="btn text-start"
        >
          <i class="bi bi-chat-left-text me-2"></i>
          Mesajlar
        </button>
      </div>

      <!-- Çıkış -->
      <div class="admin-logout pt-3">
        <button
          @click="logout()"
          class="btn w-100 d-flex align-items-center gap-2 text-start"
        >
          <i class="bi bi-box-arrow-right"></i>
          <span> Çıkış Yap </span>
        </button>
      </div>
    </aside>

    <!-- SAĞ TARAF -->
    <main class="admin-content flex-grow-1">
      <!-- Ürünler -->
      <div v-if="secim == 'products'">
        <adminProducts />
      </div>

      <!-- Kullanıcılar -->
      <div v-if="secim == 'users'">
        <adminUsers />
      </div>

      <!-- Siparişler -->
      <div v-if="secim == 'orders'">
        <adminOrders />
      </div>

      <!-- Mesajlar -->
      <div v-if="secim == 'messages'">
        <adminMessages />
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
      secim: "products",
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
        alert("Çıkış yapılamadı. Lütfen tekrar deneyin.");
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
  min-height: calc(100vh - 70px);
  display: flex;
  background: #f5f6f8;
}

.admin-sidebar {
  width: 250px;
  min-width: 250px;

  min-height: 100vh;

  background: #212936;
  color: white;

  padding: 25px 15px;

  display: flex;
  flex-direction: column;
}

.admin-profile {
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.adminfoto {
  width: 90px;
  height: 90px;

  color: #212936;

  font-size: 45px;
}

.admin-profile p {
  color: #b9c0ca;

  word-break: break-word;
}

.admin-role {
  padding: 4px 12px;

  border-radius: 20px;

  font-size: 12px;
}

.admin-menu button {
  background: transparent;

  color: #c5cad1;

  padding: 12px 15px;

  border: none;

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

.admin-content {
  padding: 30px;

  overflow-x: auto;
}

.admin-logout button {
  padding: 12px 16px;

  background: transparent;

  color: #dc3545;

  border: none;

  border-radius: 8px;

  font-size: 15px;

  font-weight: 500;

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

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    min-width: 100%;
    min-height: auto;
  }

  .admin-content {
    width: 100%;
    padding: 15px;
  }
}
</style>
