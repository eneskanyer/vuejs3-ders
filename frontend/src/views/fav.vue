<template>
  <div class="container py-4">
    <main>
      <!-- BAŞLIK -->
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 class="fw-bold mb-1">
            <i class="bi bi-heart-fill text-danger me-2"></i>
            Favorilerim
          </h2>

          <p class="text-secondary mb-0">Favorilerinize eklediğiniz ürünler</p>
        </div>

        <span class="badge bg-danger rounded-pill px-3 py-2">
          {{ fav.length }} Ürün
        </span>
      </div>

      <!-- FAVORİLER BOŞ -->
      <div
        v-if="fav.length === 0"
        class="border rounded-3 bg-white text-center py-5"
      >
        <i class="bi bi-heart text-secondary" style="font-size: 60px"></i>

        <h5 class="mt-3">Henüz favori ürününüz yok</h5>

        <p class="text-secondary mb-3">
          Beğendiğiniz ürünleri favorilerinize ekleyebilirsiniz.
        </p>

        <button class="btn btn-primary" @click="$router.push('/')">
          <i class="bi bi-shop me-2"></i>
          Alışverişe Başla
        </button>
      </div>

      <!-- FAVORİ ÜRÜNLER -->
      <div v-else>
        <!-- TABLO BAŞLIĞI -->
        <div class="border rounded-top bg-light px-3 py-3 d-none d-md-block">
          <div class="row align-items-center fw-semibold text-secondary">
            <div class="col-md-5">Ürün</div>

            <div class="col-md-2 text-center">Fiyat</div>

            <div class="col-md-2 text-center">Stok</div>

            <div class="col-md-3 text-end">İşlem</div>
          </div>
        </div>

        <!-- ÜRÜNLER -->
        <div
          v-for="(value, index) in fav"
          :key="value.p_id || index"
          class="border border-top-0 bg-white px-3 py-3"
        >
          <div class="row align-items-center g-3">
            <!-- ÜRÜN -->
            <div class="col-12 col-md-5">
              <div class="d-flex align-items-center">
                <!-- FOTOĞRAF -->
                <div
                  class="border rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                  style="width: 85px; height: 85px; overflow: hidden"
                >
                  <img
                    v-if="value.p_image1"
                    :src="getImage(value.p_image1)"
                    :alt="value.p_name"
                    class="img-fluid"
                    style="width: 100%; height: 100%; object-fit: contain"
                  />

                  <i v-else class="bi bi-image text-secondary fs-3"></i>
                </div>

                <!-- BİLGİ -->
                <div class="ms-3 text-truncate">
                  <div class="fw-semibold text-truncate" :title="value.p_name">
                    {{ value.p_name }}
                  </div>

                  <div class="small text-secondary mt-1">
                    Model:
                    {{ value.p_model }}
                  </div>
                </div>
              </div>
            </div>

            <!-- FİYAT -->
            <!-- FİYAT -->
            <div class="col-6 col-md-2 text-md-center">
              <div class="small text-secondary d-md-none mb-1">Fiyat</div>

              <template v-if="Number(value.p_disc) > 0">
                <!-- ESKİ FİYAT -->
                <div class="favorite-old-price">
                  {{ formatPrice(value.p_price) }} TL
                </div>

                <!-- İNDİRİM -->
                <span class="favorite-discount"> -%{{ value.p_disc }} </span>

                <!-- İNDİRİMLİ FİYAT -->
                <div class="favorite-new-price">
                  {{ formatDiscountedPrice(value.p_price, value.p_disc) }} TL
                </div>
              </template>

              <!-- İNDİRİM YOK -->
              <template v-else>
                <strong> {{ formatPrice(value.p_price) }} TL </strong>
              </template>
            </div>

            <!-- STOK -->
            <div class="col-6 col-md-2 text-md-center">
              <div class="small text-secondary d-md-none">Stok</div>

              <span
                v-if="Number(value.p_stock) > 0"
                class="badge bg-success-subtle text-success border border-success-subtle"
              >
                Stokta
              </span>

              <span
                v-else
                class="badge bg-danger-subtle text-danger border border-danger-subtle"
              >
                Tükendi
              </span>
            </div>

            <!-- İŞLEMLER -->
            <div class="col-12 col-md-3">
              <div class="d-flex justify-content-md-end gap-2">
                <!-- SEPET -->
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  :disabled="Number(value.p_stock) <= 0"
                  @click="sepeteEkle(value)"
                >
                  <i class="bi bi-cart-plus me-1"></i>
                  Sepete Ekle
                </button>

                <!-- FAVORİDEN ÇIKAR -->
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  title="Favorilerden çıkar"
                  @click="deleteProduct(index)"
                >
                  <i class="bi bi-heart-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  inject: ["sepet", "toast"],
  data() {
    return {
      baseUrl: "http://localhost:3001",
      fav: [],
    };
  },

  mounted() {
    this.getFavorites();
  },

  methods: {
    // FAVORİLERİ GETİR

    async getFavorites() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.fav = [];
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/favoriler`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Favoriler getirilemedi.");
        }

        this.fav = data;
      } catch (e) {
        console.error("FAVORİLER GETİRME HATASI:", e);

        this.toast("Favoriler yüklenemedi.", "danger", "Hata");
      }
    },

    // RESİM
    getImage(image) {
      if (!image) {
        return "";
      }

      if (image.startsWith("http")) {
        return image;
      }

      return `${this.baseUrl}${image}`;
    },

    // FİYAT
    formatPrice(price) {
      return Number(price).toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    formatDiscountedPrice(price, discount) {
      const normalPrice = Number(price) || 0;
      const discountRate = Number(discount) || 0;

      const discountedPrice = normalPrice * (1 - discountRate / 100);

      return discountedPrice.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    // FAVORİDEN SİL

    async deleteProduct(index) {
      const product = this.fav[index];
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.toast(
          "Favorilerden ürün silmek için giriş yapmalısınız.",
          "danger",
          "Giriş Gerekli",
        );
        return;
      }

      try {
        const res = await fetch(
          `${this.baseUrl}/api/favoriler/${product.p_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Ürün favorilerden çıkarılamadı.");
        }

        this.fav.splice(index, 1);

        this.toast("Ürün favorilerden çıkarıldı.", "success", "Favoriler");
      } catch (e) {
        console.error("FAVORİ SİLME HATASI:", e);

        this.toast(
          e.message || "Ürün favorilerden çıkarılamadı.",
          "danger",
          "Hata",
        );
      }
    },

    // SEPETE EKLE
    sepeteEkle(product) {
      const adet = product.adet || 1;

      const mevcutUrun = this.sepet.find((item) => item.p_id === product.p_id);

      if (mevcutUrun) {
        const yeniAdet = (mevcutUrun.adet || 1) + adet;

        if (yeniAdet > Number(product.p_stock)) {
          this.toast(
            `Bu üründen en fazla ${product.p_stock} adet ekleyebilirsiniz.`,
            "danger",
            "Stok Limiti",
          );
          return;
        }

        mevcutUrun.adet = yeniAdet;
      } else {
        this.sepet.push({
          ...product,
          adet: adet,
        });
      }

      this.toast(
        `${adet} adet ürün sepete eklendi.`,
        "success",
        "Sepete Eklendi",
      );

      product.adet = 1;
    },
  },
};
</script>
<style scoped>
.favorite-old-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.favorite-discount {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  color: #198754;
  background: #eaf7ef;
  padding: 2px 5px;
  border-radius: 4px;
  margin: 2px 0;
}

.favorite-new-price {
  font-size: 15px;
  font-weight: 700;
  color: #198754;
}
</style>
