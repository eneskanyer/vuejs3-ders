<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sepet from "@/components/sepet.vue";
import { reactive } from "vue";
import router from "./router";
import { validateRegister } from "@/utils/validation";
import { Modal } from "bootstrap/dist/js/bootstrap.min";
import Toast from "./components/Toast.vue";
import { watch } from "vue";
</script>

<template>
  <Toast ref="toast" />

  <div class="bg-dark text-white text-center py-2">
    <i class="bi bi-truck me-2"></i>
    <span class="fw-bold">2.000 TL ÜZERİ</span>
    alışverişlerinizde kargo ücretsiz
  </div>

  <!-- NAVBAR -->
  <header class="dk-header">
    <nav class="navbar navbar-expand-lg dk-navbar">
      <RouterLink class="dk-logo" to="/">
        <img src="/src/assets/img/logo.png" alt="LOGO" />
      </RouterLink>

      <button
        class="navbar-toggler dk-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse dk-collapse"
        id="navbarSupportedContent"
      >
        <!-- MENÜ -->
        <ul class="navbar-nav dk-menu">
          <li class="nav-item">
            <RouterLink class="navlink" to="/">Anasayfa</RouterLink>
          </li>

          <li class="nav-item product-dropdown">
            <RouterLink class="navlink" to="/product?type=Gozluk">
              Güneş Gözlüğü
              <i class="bi bi-chevron-down ms-1"></i>
            </RouterLink>

            <div class="product-menu">
              <RouterLink to="/product?type=Gozluk&category=Kadın"
                >Kadın</RouterLink
              >
              <RouterLink to="/product?type=Gozluk&category=Erkek"
                >Erkek</RouterLink
              >
              <RouterLink to="/product?type=Gozluk&category=Unisex"
                >Unisex</RouterLink
              >
              <RouterLink to="/product?type=Gozluk&category=Çocuk"
                >Çocuk</RouterLink
              >
            </div>
          </li>

          <li class="nav-item product-dropdown">
            <RouterLink class="navlink" to="/product?type=Saat">
              Saat
              <i class="bi bi-chevron-down ms-1"></i>
            </RouterLink>

            <div class="product-menu">
              <RouterLink to="/product?type=Saat&category=Kadın"
                >Kadın</RouterLink
              >
              <RouterLink to="/product?type=Saat&category=Erkek"
                >Erkek</RouterLink
              >
            </div>
          </li>

          <li class="nav-item product-dropdown">
            <RouterLink class="navlink" to="/product?type=Aksesuar">
              Aksesuar
              <i class="bi bi-chevron-down ms-1"></i>
            </RouterLink>

            <div class="product-menu">
              <RouterLink to="/product?type=Aksesuar&category=Kadın"
                >Kadın</RouterLink
              >
              <RouterLink to="/product?type=Aksesuar&category=Erkek"
                >Erkek</RouterLink
              >
            </div>
          </li>

          <li class="nav-item">
            <RouterLink class="navlink" to="/test"> Markalar </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="navlink" to="/contact"> Bize Ulaşın </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="navlink" to="/about"> Hakkımızda </RouterLink>
          </li>

          <!-- Admin route navbar'da görünmüyor -->
          <li class="nav-item admin-hidden">
            <RouterLink class="navlink" to="/admin"> Admin </RouterLink>
          </li>
        </ul>

        <!-- SAĞ TARAF -->
        <div class="dk-actions">
          <div class="dk-actions">
            <form class="dk-search" @submit.prevent="searchProducts">
              <input
                type="text"
                placeholder="Sitede arayın"
                v-model="searchQuery"
              />

              <button type="submit" aria-label="Ara">
                <i class="bi bi-search"></i>
              </button>
            </form>

            <a href="/favori" class="dk-icon" aria-label="Favoriler">
              <i class="bi bi-heart"></i>
            </a>
          </div>

          <!-- LOGIN MODAL -->
          <a
            href=""
            class="dk-icon"
            aria-label="Hesabım"
            data-bs-toggle="modal"
            @click.prevent="pageRouter"
          >
            <i class="bi bi-person"></i>
          </a>

          <a href="#" class="dk-icon position-relative" aria-label="Sepet">
            <RouterLink to="/checkout">
              <i style="color: black" class="bi bi-cart"></i>

              <span v-if="sepetAdedi > 0" class="sepet-badge">
                {{ sepetAdedi }}
              </span>
            </RouterLink>
          </a>
        </div>
      </div>
    </nav>
  </header>

  <div class="container">
    <!-- LOGIN MODAL -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Giriş Yap</h1>

            <button
              type="button"
              id="loginClose"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="login()">
              <div class="mb-3">
                <label class="form-label">Email*</label>

                <input
                  v-model="newUser[0].email"
                  required
                  type="email"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Parola*</label>

                <input
                  v-model="newUser[0].pass"
                  required
                  type="password"
                  class="form-control"
                />
              </div>

              <div class="mb-3 form-check">
                <input type="checkbox" required class="form-check-input" />

                <label class="form-check-label">
                  Gerçekten Robot Değilim!
                </label>
              </div>

              <button
                id="login_button"
                type="submit"
                class="btn w-100 btn-primary"
              >
                Giriş Yap
              </button>
            </form>

            <br />

            <a href="#" data-bs-toggle="modal" data-bs-target="#register">
              Hesabın yoksa kayıt olmak için tıkla
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- REGISTER MODAL -->
    <div
      class="modal fade"
      id="register"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Kayıt Ol</h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form class="row g-3" @submit.prevent="register()">
              <div class="col-md-6">
                <label class="form-label">Ad*</label>

                <input
                  type="text"
                  class="form-control"
                  v-model="newUser[0].firstName"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Soyad*</label>

                <input
                  type="text"
                  class="form-control"
                  v-model="newUser[0].lastName"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Email*</label>

                <input
                  type="email"
                  class="form-control"
                  v-model="newUser[0].email"
                  placeholder="example@hotmail.com"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Telefon*</label>

                <input
                  type="tel"
                  class="form-control"
                  v-model="newUser[0].tel"
                  placeholder="5xxxxxxxxx"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Parola*</label>

                <input
                  type="password"
                  class="form-control"
                  v-model="newUser[0].pass"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Parola Tekrar*</label>

                <input
                  type="password"
                  class="form-control"
                  v-model="newUser[0].repeatPass"
                  required
                />
              </div>

              <div class="col-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="newUser[0].check"
                    required
                  />

                  <label class="form-check-label">
                    Bilgilerimin doğruluğunu onaylıyorum.
                  </label>
                </div>
              </div>

              <div class="col-12">
                <button class="btn w-100 btn-primary" type="submit">
                  Kayıt Ol
                </button>
              </div>
            </form>

            <br />

            <a
              href="#"
              id="loginLink"
              data-bs-toggle="modal"
              data-bs-target="#login"
            >
              Hesabın varsa giriş yapmak için tıkla
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SEPET VE SAYFA İÇERİĞİ -->
  <div class="container">
    <div class="sepetsidebar">
      <Sepet />
    </div>

    <RouterView />
  </div>

  <!-- AVANTAJLAR -->
  <section class="advantages">
    <div class="advantage">
      <i class="bi bi-truck"></i>

      <div>
        <h5>Hızlı Kargo</h5>
        <p>Siparişleriniz hızlıca hazırlanır.</p>
      </div>
    </div>

    <div class="advantage">
      <i class="bi bi-shield-check"></i>

      <div>
        <h5>Güvenli Alışveriş</h5>
        <p>Güvenli ödeme seçenekleri.</p>
      </div>
    </div>

    <div class="advantage">
      <i class="bi bi-headset"></i>

      <div>
        <h5>7/24 Destek</h5>
        <p>Sorularınız için buradayız.</p>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <img src="/src/assets/img/logo.png" alt="Logo" />

        <div class="footer-contact">
          <span>
            <strong>Adres:</strong>
            Kocaeli, Türkiye
          </span>

          <span>
            <strong>Telefon:</strong>
            05XX XXX XX XX
          </span>

          <span>
            <strong>E-posta:</strong>
            info@site.com
          </span>
        </div>

        <div class="social-links">
          <a
            href="https://www.instagram.com/_noveragozluk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i class="bi bi-instagram"></i>
          </a>

          <a
            href="https://wa.me/905534197143"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i class="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>

      <div class="footer-column">
        <h5>BAĞLANTILAR</h5>

        <RouterLink to="/">Anasayfa</RouterLink>
        <RouterLink to="/about">Hakkımızda</RouterLink>
        <RouterLink to="/contact">Bize Ulaşın</RouterLink>
        <RouterLink to="/product">Ürünler</RouterLink>
        <RouterLink to="/test">Markalar</RouterLink>
      </div>

      <div class="footer-column">
        <h5>YARDIMCI LİNKLER</h5>

        <RouterLink to="/user">Hesabım</RouterLink>
        <RouterLink to="/checkout">Sepet</RouterLink>
        <RouterLink to="/user">Sipariş Takibi</RouterLink>
      </div>

      <div class="footer-column">
        <h5>ÖNEMLİ BİLGİLER</h5>

        <RouterLink to="/gizlilik"> Gizlilik Politikası </RouterLink>

        <RouterLink to="/iade-degisim"> İade Şartları & Geri Ödeme </RouterLink>

        <RouterLink to="/kullanici-sozlesmesi">
          Kullanıcı Sözleşmesi
        </RouterLink>

        <RouterLink to="/mesafeli-satis">
          Mesafeli Satış Sözleşmesi
        </RouterLink>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© Novera Gozluk. 2026. Tüm Hakları Saklıdır.</span>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      newUser: [
        {
          firstName: "",
          lastName: "",
          email: "",
          tel: "",
          pass: "",
          repeatPass: "",
          role: 0,
          check: false,
        },
      ],

      users: [],

      baseUrl: "http://localhost:3001",

      sepet: reactive([]),
      searchQuery: "",
      sepetKullaniciId: null,
    };
  },

  computed: {
    Toast,
    sepetAdedi() {
      return this.sepet.reduce((toplam, item) => {
        return toplam + (Number(item.adet) || 1);
      }, 0);
    },
  },

  provide() {
    return {
      toast: this.showToast,
      sepet: this.sepet,
    };
  },
  watch: {
    sepet: {
      deep: true,
      handler(yeniSepet) {
        if (!this.sepetKullaniciId) return;

        localStorage.setItem(
          `sepet_${this.sepetKullaniciId}`,
          JSON.stringify(yeniSepet),
        );
      },
    },
  },
  async mounted() {
    await this.kullaniciyaGoreSepetYukle();
  },

  methods: {
    showToast(message, type = "success", title = null) {
      this.$refs.toast.show(message, type, title);
    },
    async kullaniciyaGoreSepetYukle() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.sepetKullaniciId = null;
        this.sepet.splice(0, this.sepet.length);
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          this.sepetKullaniciId = null;
          this.sepet.splice(0, this.sepet.length);
          return;
        }

        const data = await res.json();

        this.sepetiYukle(data.u_id);
      } catch (error) {
        console.error("Sepet yükleme hatası:", error);
      }
    },

    sepetiYukle(userId) {
      this.sepetKullaniciId = userId;

      const kayitliSepet = JSON.parse(
        localStorage.getItem(`sepet_${userId}`) || "[]",
      );

      this.sepet.splice(0, this.sepet.length);
      this.sepet.push(...kayitliSepet);
    },

    confirmLogout() {
      sessionStorage.removeItem("token");

      this.sepetKullaniciId = null;
      this.sepet.splice(0, this.sepet.length);

      localStorage.removeItem("favoriler");

      this.showLogoutModal = false;
      this.$router.push("/");
    },

    async pageRouter() {
      const token = sessionStorage.getItem("token");

      if (token) {
        try {
          const res = await fetch(`${this.baseUrl}/api/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();

            if (Number(data.u_role) === 1) {
              router.push("/admin");
            } else {
              router.push("/user");
            }

            return;
          }

          sessionStorage.removeItem("token");
        } catch (e) {
          console.error("Kullanıcı doğrulama hatası:", e);
        }
      }

      const loginModalElement = document.getElementById("login");

      if (!loginModalElement) {
        console.error('Giriş modalı bulunamadı: id="login"');
        return;
      }

      const loginModal = Modal.getOrCreateInstance(loginModalElement);
      loginModal.show();
    },

    async register() {
      try {
        const error = validateRegister(this.newUser[0]);

        if (error) {
          this.showToast(error, "danger", "Kayıt Bilgileri");
          return;
        }

        const res = await fetch(`${this.baseUrl}/api/register`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            firstName: this.newUser[0].firstName,
            lastName: this.newUser[0].lastName,
            email: this.newUser[0].email,
            tel: this.newUser[0].tel,
            pass: this.newUser[0].pass,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Users endpoint hatası");
        }

        this.showToast(
          "Hesabınız başarıyla oluşturuldu.",
          "success",
          "Kayıt Başarılı",
        );

        this.newUser[0].firstName = "";
        this.newUser[0].lastName = "";
        this.newUser[0].tel = "";
        this.newUser[0].repeatPass = "";
        this.newUser[0].check = false;

        document.getElementById("loginLink")?.click();
      } catch (e) {
        this.showToast(
          "Kayıt sırasında bir hata oluştu.",
          "danger",
          "Kayıt Hatası",
        );
      }
    },

    async login() {
      try {
        const res = await fetch(`${this.baseUrl}/api/login`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: this.newUser[0].email,
            pass: this.newUser[0].pass,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          this.showToast(
            data.error || "Email veya şifre yanlış.",
            "danger",
            "Giriş Başarısız",
          );
          return;
        }

        if (data) {
          this.showToast(
            "Hesabınıza başarıyla giriş yaptınız.",
            "success",
            "Giriş Başarılı",
          );

          sessionStorage.setItem("token", data.token);

          await this.kullaniciyaGoreSepetYukle();

          if (data.u_role == 1) {
            router.push("/admin");
          } else {
            router.push("/user");
          }

          this.newUser[0].email = "";
          this.newUser[0].pass = "";
          this.newUser[0].check = false;

          document.getElementById("loginClose")?.click();
        }
      } catch (e) {
        this.showToast(
          "Giriş sırasında bir hata oluştu.",
          "danger",
          "Giriş Hatası",
        );
      }
    },
    searchProducts() {
      const query = this.searchQuery.trim();

      if (!query) {
        return;
      }

      this.$router.push({
        path: "/product",
        query: {
          search: query,
        },
      });
    },
  },
};
</script>

<style scoped>
/* =========================
   GENEL
========================= */

.container {
  max-width: 1400px;
}

/* =========================
   NAVBAR
========================= */

.dk-header {
  width: 100%;
  background: #f1f1f2;
  border-bottom: 1px solid #e5e5e5;
}

.dk-navbar {
  position: relative;
  width: 100%;
  min-height: 100px;
  padding: 22px 35px;
  display: flex;
  align-items: center;
  background: #f1f1f2 !important;
  box-shadow: none;
}

/* =========================
   LOGO
========================= */

.dk-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.dk-logo img {
  width: 260px;
  height: auto;
  object-fit: contain;
}

/* =========================
   ORTA ALAN
========================= */

.dk-collapse {
  flex: 1;
  display: flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/* =========================
   MENÜ
========================= */

.dk-menu {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 0;
  padding: 0;
}

.dk-menu .nav-item {
  display: flex;
  align-items: center;
}

.admin-hidden {
  display: none !important;
}

.dk-menu .navlink {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  margin: 0;
  color: #1e1e1e;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  letter-spacing: 0.1px;
  border-radius: 0;
  transition: color 0.25s ease;
}

.dk-menu .navlink:hover {
  background: transparent;
  color: #777;
  transform: none;
}

.dk-menu .navlink::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 2px;
  height: 1px;
  background: #222;
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.dk-menu .navlink:hover::after {
  transform: scaleX(1);
}

/* =========================
   NAVBAR SAĞ TARAF
========================= */

.dk-actions {
  position: static;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
  margin-left: 20px;
}

.dk-search {
  width: 280px;
  height: 45px;
  display: flex;
  align-items: center;
  margin: 0;
  border: 1px solid #222;
  border-radius: 40px;
  overflow: hidden;
  background: transparent;
}

.dk-search input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 18px;
  background: transparent;
  font-size: 14px;
  color: #222;
}

.dk-search input::placeholder {
  color: #999;
}

.dk-search button {
  width: 45px;
  height: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 22px;
  color: #222;
}

.dk-icon {
  width: 32px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  text-decoration: none;
  font-size: 27px;
  transition: 0.2s ease;
}

.dk-icon:hover {
  color: #777;
  transform: translateY(-2px);
}

.dk-toggler {
  margin-left: auto;
}

/* =========================
   ÜRÜN DROPDOWN
========================= */

.product-dropdown {
  position: relative;
}

.product-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background-color: white;
  border-radius: 12px;
  padding: 8px;
  display: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  z-index: 9999;
}

.product-dropdown:hover .product-menu {
  display: flex;
  flex-direction: column;
}

.product-menu a {
  text-decoration: none;
  color: #29272b;
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.product-menu a:hover {
  background-color: #f1f1f1;
  color: black;
}

/* =========================
   MODALLAR
========================= */

.modal-content {
  border: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  background-color: #f8f8f9;
}

.modal-title {
  font-weight: 600;
  color: #222;
}

.modal-body {
  padding: 25px;
  background-color: #fff;
}

.modal .form-label {
  margin-bottom: 7px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.modal .form-control {
  min-height: 45px;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 10px 13px;
  transition: all 0.25s ease;
}

.modal .form-control:focus {
  border-color: #888;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.modal .form-check-input,
.modal .form-check-label {
  cursor: pointer;
}

.modal .form-check-label {
  color: #555;
}

.modal .btn-primary {
  min-height: 45px;
  border: none;
  border-radius: 10px;
  background-color: #222;
  font-weight: 500;
  transition: all 0.25s ease;
}

.modal .btn-primary:hover {
  background-color: #000;
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.modal-body > a {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.modal-body > a:hover {
  color: #000;
  text-decoration: underline;
}

/* =========================
   SEPET
========================= */

.sepetsidebar {
  position: relative;
  z-index: 2000;
}

.sepet-adet {
  position: absolute;
  top: -8px;
  right: -8px;
  color: #0d6efd;
  font-size: 12px;
  font-weight: bold;
}

.sepet-icon {
  position: relative;
}

.sepet-badge {
  position: absolute;
  top: -10px;
  right: -12px;

  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #0d6efd;
  color: white;

  border-radius: 50%;

  font-size: 11px;
  font-weight: 600;

  line-height: 1;
}

/* =========================
   AVANTAJLAR
========================= */

.advantages {
  margin: 20px 5% 60px;
  padding: 30px;
  background: #f7f7f7;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  gap: 30px;
}

.advantage {
  display: flex;
  align-items: center;
  gap: 15px;
}

.advantage i {
  font-size: 30px;
}

.advantage h5 {
  margin-bottom: 4px;
  font-weight: 700;
}

.advantage p {
  margin: 0;
  color: #777;
  font-size: 14px;
}

/* =========================
   FOOTER
========================= */

.footer {
  margin-top: 70px;
  background: #222;
  color: white;
  padding: 50px 5% 20px;
}

.footer-content {
  max-width: 1400px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
  gap: 70px;
}

.footer-brand img {
  width: 150px;
  background: white;
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-contact span {
  color: #aaa;
  font-size: 14px;
}

.footer-contact strong {
  color: white;
}

.footer-brand .social-links {
  margin-top: 20px;
  justify-content: flex-start;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-column h5 {
  color: white;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
}

.footer-column a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.footer-column a:hover {
  color: white;
  transform: translateX(3px);
}

.footer-bottom {
  max-width: 1400px;
  margin: 45px auto 0;
  padding-top: 20px;
  border-top: 1px solid #3a3a3a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 14px;
}

/* =========================
   SOSYAL MEDYA
========================= */

.social-links {
  display: flex;
  gap: 10px;
}

.social-links a {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #333;
  color: white;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.social-links a:hover {
  background: #555;
  transform: translateY(-3px);
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1400px) {
  .dk-logo img {
    width: 220px;
  }

  .dk-menu {
    gap: 2px;
  }

  .dk-menu .navlink {
    font-size: 15px;
    padding: 8px 7px;
  }

  .dk-search {
    width: 240px;
  }

  .dk-actions {
    gap: 12px;
    margin-left: 10px;
  }
}

@media (max-width: 1200px) {
  .dk-logo img {
    width: 190px;
  }

  .dk-search {
    width: 210px;
  }

  .dk-menu .navlink {
    font-size: 14px;
    padding: 8px 5px;
  }

  .dk-actions {
    gap: 8px;
    margin-left: 5px;
  }

  .dk-icon {
    font-size: 24px;
  }
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 45px;
  }
}

@media (max-width: 991px) {
  .dk-navbar {
    min-height: auto;
    padding: 15px 20px;
    flex-wrap: wrap;
  }

  .dk-logo img {
    width: 190px;
  }

  .dk-toggler {
    margin-left: auto;
  }

  .dk-collapse {
    width: 100%;
    margin-top: 20px;
    flex-direction: column;
  }

  .dk-actions {
    position: static;
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
  }

  .dk-menu {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 0;
  }

  .dk-menu .nav-item {
    width: 100%;
  }

  .dk-menu .navlink {
    width: 100%;
    justify-content: center;
    padding: 12px;
    font-size: 16px;
  }

  .product-menu {
    position: static;
    width: 100%;
    box-shadow: none;
  }

  .dk-search {
    width: min(100%, 400px);
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 25px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 35px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .advantages {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .advantage {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .dk-logo img {
    width: 150px;
  }

  .dk-actions {
    gap: 10px;
  }

  .dk-search {
    order: -1;
    width: 100%;
  }

  .dk-icon {
    font-size: 24px;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    grid-column: auto;
  }

  .footer-bottom {
    margin-top: 35px;
    justify-content: center;
    text-align: center;
  }
}
</style>
