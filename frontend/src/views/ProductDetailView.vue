<template>
  <!-- Ürün -->
  <div v-if="product" class="container py-5">
    <div class="row product-detail">
      <div class="col-lg-7">
        <div class="product-gallery d-flex gap-3">
          <!-- Küçük görseller -->
          <div class="thumbnail-list d-flex flex-column gap-2">
            <button
              v-for="(image, index) in images"
              :key="index"
              class="thumbnail p-0 border overflow-hidden bg-light"
              :class="{
                active: selectedImage === image,
              }"
              @click="selectedImage = image"
            >
              <img
                :src="imageUrl(image)"
                :alt="product.p_name"
                class="w-100 h-100"
              />
            </button>
          </div>

          <!-- Büyük görsel -->
          <div class="main-product-image flex-grow-1 bg-light overflow-hidden">
            <img
              :src="imageUrl(selectedImage)"
              :alt="product.p_name"
              class="w-100 h-100"
            />
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="product-information">
          <!-- Tür -->
          <div class="product-type text-secondary text-uppercase mb-2">
            {{ product.p_type }}
          </div>

          <!-- Ürün adı -->
          <h1 class="product-title m-0 fw-semibold text-dark">
            {{ product.p_name }}
          </h1>

          <!-- Model -->
          <div class="product-model text-secondary mt-2">
            Model: {{ product.p_model }}
          </div>

          <!-- Fiyat -->
          <div class="product-price text-dark fw-bold mt-4">
            <!-- İNDİRİMLİ ÜRÜN -->
            <template v-if="Number(product.p_disc) > 0">
              <div class="d-flex align-items-center gap-2 mb-1">
                <!-- Eski fiyat -->
                <span class="text-muted text-decoration-line-through fs-6">
                  {{ formatPrice(product.p_price) }} TL
                </span>

                <!-- İndirim oranı -->
                <span class="badge bg-danger">
                  %{{ Number(product.p_disc) }}
                </span>
              </div>

              <!-- İndirimli fiyat -->
              <div>
                {{
                  formatPrice(
                    Number(product.p_price) *
                      (1 - Number(product.p_disc) / 100),
                  )
                }}
                TL
              </div>
            </template>

            <!-- İNDİRİMSİZ ÜRÜN -->
            <template v-else> {{ formatPrice(product.p_price) }} TL </template>
          </div>

          <div class="divider my-4"></div>

          <!-- Kategori -->
          <div
            class="product-property d-flex justify-content-between align-items-center py-2"
          >
            <span class="text-secondary"> Cinsiyet </span>

            <strong class="text-dark">
              {{ product.p_category }}
            </strong>
          </div>

          <!-- Stok -->
          <div
            class="product-property d-flex justify-content-between align-items-center py-2"
          >
            <span class="text-secondary"> Durum </span>

            <strong
              :class="{
                'stock-ok': Number(product.p_stock) > 5,
                'stock-low':
                  Number(product.p_stock) > 0 && Number(product.p_stock) <= 5,
                'stock-none': Number(product.p_stock) <= 0,
              }"
            >
              <template v-if="Number(product.p_stock) > 5"> Stokta </template>

              <template v-else-if="Number(product.p_stock) > 0">
                Son {{ product.p_stock }} ürün
              </template>

              <template v-else> Tükendi </template>
            </strong>
          </div>

          <div class="divider my-4"></div>

          <!-- Adet -->
          <div
            class="quantity-area d-flex align-items-center justify-content-between mb-3"
          >
            <span class="text-secondary"> Adet </span>

            <div class="quantity d-flex align-items-center border">
              <button
                @click="urunAzalt"
                :disabled="adet <= 1"
                class="btn border-0 rounded-0"
              >
                −
              </button>

              <span class="text-center">
                {{ adet }}
              </span>

              <button
                @click="urunArttir"
                :disabled="adet >= Number(product.p_stock)"
                class="btn border-0 rounded-0"
              >
                +
              </button>
            </div>
          </div>

          <!-- Sepete ekle -->
          <button
            class="add-cart btn w-100 d-flex align-items-center justify-content-center gap-2"
            :disabled="Number(product.p_stock) <= 0"
            @click="sepeteEkle"
          >
            <i class="bi bi-bag-plus"></i>

            <span>
              {{ Number(product.p_stock) <= 0 ? "Tükendi" : "Sepete Ekle" }}
            </span>
          </button>

          <!-- Bilgi -->
          <div class="product-features mt-4 d-flex flex-column gap-3">
            <div class="feature">
              <div class="d-flex flex-column gap-1">
                <strong class="fs-6"> Özellikleri </strong>

                <!-- GÖZLÜK -->
                <template v-if="product.p_type === 'Gozluk'">
                  <span class="text-secondary small">
                    Cam Ölçüsü:
                    <strong>
                      {{ product.g_camOlcusu }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Çerçeve Rengi:
                    <strong>
                      {{ product.g_cerceveRengi }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Çerçeve Materyali:
                    <strong>
                      {{ product.g_cerceveMateryali }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Cam Rengi:
                    <strong>
                      {{ product.g_camRengi }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Cam Materyali:
                    <strong>
                      {{ product.g_camMateryali }}
                    </strong>
                  </span>
                </template>

                <!-- SAAT -->
                <template v-else-if="product.p_type === 'Saat'">
                  <span class="text-secondary small">
                    Kordon Materyali:
                    <strong>
                      {{ product.s_kordonMateryali }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Kordon Rengi:
                    <strong>
                      {{ product.s_kordonRengi }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Kasa Materyali:
                    <strong>
                      {{ product.s_kasaMateryali }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Kasa Rengi:
                    <strong>
                      {{ product.s_kasaRengi }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Su Geçirmezlik:
                    <strong> {{ product.s_suGecirmezlik }} ATM </strong>
                  </span>
                </template>

                <!-- AKSESUAR -->
                <template v-else-if="product.p_type === 'Aksesuar'">
                  <span class="text-secondary small">
                    Ürün Materyali:
                    <strong>
                      {{ product.a_urunMateryali }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Ürün Rengi:
                    <strong>
                      {{ product.a_urunRengi }}
                    </strong>
                  </span>

                  <span class="text-secondary small">
                    Ürün Tipi:
                    <strong>
                      {{ product.a_urunTipi }}
                    </strong>
                  </span>
                </template>
              </div>
            </div>

            <!-- WhatsApp -->
            <div class="feature">
              <a
                href="https://wa.me/905534197143"
                target="_blank"
                class="btn btn-success w-100"
              >
                <i class="bi bi-whatsapp"></i>

                <div>
                  <strong>WhatsApp Siparişi</strong>
                </div>
              </a>
            </div>

            <!-- Ücretsiz ürünler -->
            <div class="featureA d-flex flex-column align-items-start gap-2">
              <strong> Siparişinize Dahil Ücretsiz Ürünler </strong>

              <!-- GÖZLÜK -->
              <div
                v-if="product.p_type === 'Gozluk'"
                class="product-featuresA d-flex align-items-center w-100"
              >
                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-eyeglasses"></i>
                  <span>Gözlük Kılıfı</span>
                </div>

                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-droplet"></i>
                  <span>Temizleme Spreyi</span>
                </div>

                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-square"></i>
                  <span>Temizleme Bezi</span>
                </div>
              </div>

              <!-- SAAT -->
              <div
                v-else-if="product.p_type === 'Saat'"
                class="product-featuresA d-flex align-items-center w-100"
              >
                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-clock"></i>
                  <span>Saat Kılıfı</span>
                </div>

                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-droplet"></i>
                  <span>Temizleme Spreyi</span>
                </div>

                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-square"></i>
                  <span>Temizleme Bezi</span>
                </div>
              </div>

              <!-- AKSESUAR -->
              <div
                v-else-if="product.p_type === 'Aksesuar'"
                class="product-featuresA d-flex align-items-center w-100"
              >
                <div class="free-productA d-flex align-items-center">
                  <i class="bi bi-inbox"></i>
                  <span>Aksesuar Kutusu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ürün bulunamadı -->
  <div
    v-else
    class="not-found min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3 text-center"
  >
    <i class="bi bi-box-seam"></i>
    <h4>Ürün bulunamadı</h4>
  </div>
</template>

<script>
export default {
  inject: ["sepet", "toast"],

  data() {
    return {
      baseUrl: "http://localhost:3001",

      product: null,

      selectedImage: null,
      adet: 1,
    };
  },

  computed: {
    images() {
      if (!this.product) {
        return [];
      }

      return [
        this.product.p_image1,
        this.product.p_image2,
        this.product.p_image3,
      ].filter((image) => image);
    },
  },

  mounted() {
    this.getProduct();
  },

  methods: {
    async getProduct() {
      try {
        const id = this.$route.params.id;

        const res = await fetch(`${this.baseUrl}/api/product-detail/${id}`);

        if (!res.ok) {
          throw new Error("Ürün bilgileri alınamadı.");
        }

        const data = await res.json();

        this.product = data;

        if (this.images.length > 0) {
          this.selectedImage = this.images[0];
        }
      } catch (error) {
        console.log("Ürün detay hatası:", error);

        this.product = null;
      }
    },

    imageUrl(image) {
      if (!image) {
        return "/images/no-image.jpg";
      }

      if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
      }

      return `${this.baseUrl}${image}`;
    },

    formatPrice(price) {
      return Number(price).toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    urunArttir() {
      if (this.adet < Number(this.product.p_stock)) {
        this.adet++;
      }
    },

    urunAzalt() {
      if (this.adet > 1) {
        this.adet--;
      }
    },

    // Sepete ekle
    sepeteEkle() {
      const product = this.product;

      const adet = this.adet;

      // Sepette aynı ürün varsa ekleme Artır
      const mevcutUrun = this.sepet.find((item) => item.p_id === product.p_id);

      if (mevcutUrun) {
        const yeniAdet = (mevcutUrun.adet || 1) + adet;

        // Stok kontrolü
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
        // Ürünün indirimli fiyatını hesapla
        const indirimOrani = Number(product.p_disc) || 0;

        const indirimliFiyat =
          Number(product.p_price) * (1 - indirimOrani / 100);

        // Ürünü sepete ekle
        this.sepet.push({
          ...product,

          // Sepette kullanılacak gerçek satış fiyatı
          sepetFiyati: indirimliFiyat,

          adet: adet,
        });
      }

      this.toast(
        `${adet} adet ürün sepete eklendi.`,
        "success",
        "Sepete Eklendi",
      );

      // Seçimi tekrar 1'e getir
      this.adet = 1;
    },
  },
};
</script>

<style scoped>
.product-gallery {
  min-height: 600px;
}

.thumbnail-list {
  width: 90px;
  flex-shrink: 0;
}

.thumbnail {
  width: 90px;
  height: 105px;
  cursor: pointer;
  border: 1px solid #ddd !important;
  background: #f8f9fa;
}

.thumbnail.active {
  border: 2px solid #111 !important;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}

.main-product-image {
  aspect-ratio: 1 / 1.1;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 30px;
  transition: transform 0.5s ease;
}

.main-product-image:hover img {
  transform: scale(1.03);
}
.product-information {
  padding: 10px 10px 10px 45px;
}

.product-type {
  font-size: 12px;
  letter-spacing: 1.5px;
}

.product-title {
  font-size: 32px;
}

.product-model {
  font-size: 14px;
}

.product-price {
  font-size: 26px;
}

.divider {
  height: 1px;
  background: #e8e8e8;
}

.stock-ok {
  color: #198754 !important;
}

.stock-low {
  color: #c77a00 !important;
}

.stock-none {
  color: #dc3545 !important;
}

.quantity button {
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.quantity button:hover:not(:disabled) {
  background: #f5f5f5;
}

.quantity button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.quantity span {
  width: 45px;
  font-size: 14px;
}

.add-cart {
  height: 54px;
  border: 1px solid #111;
  background: #111;
  color: white;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
}

.add-cart:hover:not(:disabled) {
  background: white;
  color: #111;
}

.add-cart:disabled {
  background: #ddd;
  border-color: #ddd;
  cursor: not-allowed;
}

.product-featuresA {
  gap: 30px;
}

.free-productA {
  gap: 7px;
  white-space: nowrap;
}

.free-productA i {
  font-size: 28px;
  color: #777;
}

.free-productA span {
  font-size: 13px;
  color: #333;
}

.not-found i {
  font-size: 50px;
  color: #aaa;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 991px) {
  .product-information {
    padding: 40px 0 0;
  }

  .product-gallery {
    min-height: auto;
  }
}

@media (max-width: 576px) {
  .product-gallery {
    gap: 8px !important;
    flex-direction: column-reverse !important;
  }

  .thumbnail-list {
    width: 100%;
    flex-direction: row !important;
  }

  .thumbnail {
    width: 75px;
    height: 75px;
  }

  .product-title {
    font-size: 25px;
  }

  .product-price {
    font-size: 22px;
  }

  .product-featuresA {
    gap: 15px;
    flex-wrap: wrap;
  }

  .free-productA span {
    font-size: 12px;
  }
}
</style>
