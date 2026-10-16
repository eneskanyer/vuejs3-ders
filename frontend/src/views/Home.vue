<template>
  <div
    id="carouselExampleIndicators"
    class="carousel slide mt-3 rounded-4 overflow-hidden shadow"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>

      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>

      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>

    <div class="carousel-inner">
      <!-- SLIDER 1 -->
      <div class="carousel-item active" @click="$router.push('/product')">
        <img
          src="../assets/img/slider1.jpg"
          class="d-block w-100 slider-image"
          alt="slider1"
        />

        <div class="slider-content text-white">
          <h2 class="fw-bold mb-2">Tarzını Tamamla</h2>

          <p class="mb-3">Modayı Yüzüne Yansıt.</p>

          <button
            class="btn btn-light px-4 py-2"
            @click="$router.push('/product')"
          >
            Gözlükleri Keşfet
          </button>
        </div>
      </div>

      <!-- SLIDER 2 -->
      <div class="carousel-item" @click="$router.push('/product')">
        <img
          src="../assets/img/slider2.jpg"
          class="d-block w-100 slider-image"
          alt="slider2"
        />

        <div class="slider-content text-white">
          <h2 class="fw-bold mb-2">Her Anında Şık</h2>

          <p class="mb-3">Şıklığı Bileğine Taşı.</p>

          <button
            class="btn btn-light px-4 py-2"
            @click="$router.push('/product')"
          >
            Saatleri Keşfet
          </button>
        </div>
      </div>

      <!-- SLIDER 3 -->
      <div class="carousel-item" @click="$router.push('/product')">
        <img
          src="../assets/img/slider3.jpg"
          class="d-block w-100 slider-image"
          alt="slider3"
        />

        <div class="slider-content text-white">
          <h2 class="fw-bold mb-2">Detaylarda Saklı Şıklık</h2>

          <p class="mb-3">Tarzını tamamlayan dokunuşları hisset.</p>

          <button
            class="btn btn-light px-4 py-2"
            @click="$router.push('/product')"
          >
            Aksesuarları Keşfet
          </button>
        </div>
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>

      <span class="visually-hidden">Previous</span>
    </button>

    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>

      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <!-- İNDİRİMLERİ KAÇIRMA -->
  <section class="container-fluid px-4 px-md-5 pt-4">
    <div
      class="position-relative overflow-hidden rounded-4 shadow-sm"
      style="cursor: pointer; min-height: 220px"
      @click="$router.push('/product?sort=disc')"
    >
      <!-- ARKA PLAN FOTOĞRAFI -->

      <img
        src="../assets/img/advantage.png"
        class="position-absolute top-0 start-0 w-100 h-100"
        style="object-fit: cover; filter: blur(4px); transform: scale(1.03)"
        alt=""
      />
      <div
        class="position-absolute top-0 start-0 w-100 h-100"
        style="background: rgba(0, 0, 0, 0.18)"
      ></div>

      <!-- İÇERİK -->
      <div class="position-relative p-4 p-md-5 text-white">
        <div class="row align-items-center">
          <div class="col-md-8 text-center text-md-start">
            <span class="badge bg-danger rounded-pill mb-2 px-3 py-2">
              🔥 ÖZEL FIRSATLAR
            </span>

            <h2 class="fw-bold mb-2">
              İndirimli Tüm Ürünleri Görmek İçin Tıkla!
            </h2>

            <p class="text-white-50 mb-md-0">
              Sevdiğin ürünlerdeki fırsatları keşfet. Avantajlı fiyatlarla
              tarzını tamamla.
            </p>
          </div>

          <div class="col-md-4 text-center text-md-end mt-3 mt-md-0">
            <button
              class="btn btn-light btn-lg rounded-pill px-4 fw-semibold"
              @click.stop="$router.push('/product?sort=disc')"
            >
              İndirimleri Keşfet
              <i class="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ÇOK SATILAN GÖZLÜKLER -->

  <section class="container-fluid px-4 px-md-5 py-5">
    <div
      class="d-flex align-items-center justify-content-between mb-4 section-title"
    >
      <div>
        <h2 class="fw-bold fs-3 mb-1">Çok Satılan Gözlükler</h2>

        <p class="text-secondary mb-0">
          En çok dikkat çeken modellerimizi keşfedin.
        </p>
      </div>

      <router-link
        to="/product?type=Gozluk"
        class="text-dark text-decoration-none fw-semibold"
      >
        Tüm Ürünler
        <i class="bi bi-arrow-right ms-1"></i>
      </router-link>
    </div>

    <div class="row g-4">
      <div
        v-for="product in featuredGlasses"
        :key="product.p_id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <div
          class="home-product-card h-100 border rounded-4 overflow-hidden bg-white"
          @click="goToProduct(product)"
        >
          <!-- RESİM -->
          <div
            class="home-product-image position-relative bg-light d-flex align-items-center justify-content-center"
          >
            <div
              :id="`homeGlassesCarousel${product.p_id}`"
              class="carousel slide w-100 h-100"
              data-bs-ride="false"
            >
              <div class="carousel-inner h-100">
                <div v-if="product.p_image1" class="carousel-item active h-100">
                  <img
                    :src="`${baseUrl}${product.p_image1}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>

                <div v-if="product.p_image2" class="carousel-item h-100">
                  <img
                    :src="`${baseUrl}${product.p_image2}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>

                <div v-if="product.p_image3" class="carousel-item h-100">
                  <img
                    :src="`${baseUrl}${product.p_image3}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>
              </div>

              <button
                v-if="product.p_image2 || product.p_image3"
                class="carousel-control-prev"
                type="button"
                :data-bs-target="`#homeGlassesCarousel${product.p_id}`"
                data-bs-slide="prev"
                @click.stop
              >
                <span class="carousel-control-prev-icon"></span>
              </button>

              <button
                v-if="product.p_image2 || product.p_image3"
                class="carousel-control-next"
                type="button"
                :data-bs-target="`#homeGlassesCarousel${product.p_id}`"
                data-bs-slide="next"
                @click.stop
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>

            <span
              v-if="Number(product.p_stock) > 0"
              class="badge rounded-pill bg-success position-absolute top-0 end-0 m-2"
            >
              Stokta
            </span>

            <span
              v-else
              class="badge rounded-pill bg-danger position-absolute top-0 end-0 m-2"
            >
              Tükendi
            </span>
          </div>

          <div class="p-3">
            <span class="small text-secondary">
              {{ product.p_name }}
            </span>

            <h5 class="fw-bold my-1">
              {{ product.p_model }}
            </h5>

            <div class="d-flex justify-content-between align-items-center mt-3">
              <div>
                <!-- İNDİRİM VARSA -->
                <template v-if="Number(product.p_disc) > 0">
                  <div class="d-flex align-items-center gap-2">
                    <!-- Eski fiyat -->
                    <span
                      class="text-secondary text-decoration-line-through small"
                    >
                      {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                    </span>

                    <!-- İndirim oranı -->
                    <span class="badge bg-danger">
                      %{{ Number(product.p_disc) }}
                    </span>
                  </div>

                  <!-- İndirimli fiyat -->
                  <strong class="fs-5 text-dark">
                    {{
                      (
                        Number(product.p_price) *
                        (1 - Number(product.p_disc) / 100)
                      ).toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                    ₺
                  </strong>
                </template>

                <!-- İNDİRİM YOKSA -->
                <template v-else>
                  <strong class="fs-5 text-dark">
                    {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                  </strong>
                </template>
              </div>

              <!-- STOK -->
              <span class="small text-secondary">
                {{ product.p_stock }} adet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ÇOK SATILAN SAATLER -->

  <section class="container-fluid px-4 px-md-5 py-5">
    <div
      class="d-flex align-items-center justify-content-between mb-4 section-title"
    >
      <div>
        <h2 class="fw-bold fs-3 mb-1">Çok Satılan Saatler</h2>

        <p class="text-secondary mb-0">
          En çok dikkat çeken modellerimizi keşfedin.
        </p>
      </div>

      <router-link
        to="/product?type=Saat"
        class="text-dark text-decoration-none fw-semibold"
      >
        Tüm Ürünler
        <i class="bi bi-arrow-right ms-1"></i>
      </router-link>
    </div>

    <div class="row g-4">
      <div
        v-for="product in featuredWatches"
        :key="product.p_id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <div
          class="home-product-card h-100 border rounded-4 overflow-hidden bg-white"
          @click="goToProduct(product)"
        >
          <!-- RESİM -->
          <div
            class="home-product-image position-relative bg-light d-flex align-items-center justify-content-center"
          >
            <div
              :id="`homeWatchesCarousel${product.p_id}`"
              class="carousel slide w-100 h-100"
              data-bs-ride="false"
            >
              <div class="carousel-inner h-100">
                <div v-if="product.p_image1" class="carousel-item active h-100">
                  <img
                    :src="`${baseUrl}${product.p_image1}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>

                <div v-if="product.p_image2" class="carousel-item h-100">
                  <img
                    :src="`${baseUrl}${product.p_image2}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>

                <div v-if="product.p_image3" class="carousel-item h-100">
                  <img
                    :src="`${baseUrl}${product.p_image3}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>
              </div>

              <button
                v-if="product.p_image2 || product.p_image3"
                class="carousel-control-prev"
                type="button"
                :data-bs-target="`#homeWatchesCarousel${product.p_id}`"
                data-bs-slide="prev"
                @click.stop
              >
                <span class="carousel-control-prev-icon"></span>
              </button>

              <button
                v-if="product.p_image2 || product.p_image3"
                class="carousel-control-next"
                type="button"
                :data-bs-target="`#homeWatchesCarousel${product.p_id}`"
                data-bs-slide="next"
                @click.stop
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>

            <span
              v-if="Number(product.p_stock) > 0"
              class="badge rounded-pill bg-success position-absolute top-0 end-0 m-2"
            >
              Stokta
            </span>

            <span
              v-else
              class="badge rounded-pill bg-danger position-absolute top-0 end-0 m-2"
            >
              Tükendi
            </span>
          </div>

          <div class="p-3">
            <span class="small text-secondary">
              {{ product.p_name }}
            </span>

            <h5 class="fw-bold my-1">
              {{ product.p_model }}
            </h5>

            <div class="d-flex justify-content-between align-items-center mt-3">
              <div>
                <!-- İNDİRİM VARSA -->
                <template v-if="Number(product.p_disc) > 0">
                  <div class="d-flex align-items-center gap-2">
                    <!-- Eski fiyat -->
                    <span
                      class="text-secondary text-decoration-line-through small"
                    >
                      {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                    </span>

                    <!-- İndirim oranı -->
                    <span class="badge bg-danger">
                      %{{ Number(product.p_disc) }}
                    </span>
                  </div>

                  <!-- İndirimli fiyat -->
                  <strong class="fs-5 text-dark">
                    {{
                      (
                        Number(product.p_price) *
                        (1 - Number(product.p_disc) / 100)
                      ).toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                    ₺
                  </strong>
                </template>

                <!-- İNDİRİM YOKSA -->
                <template v-else>
                  <strong class="fs-5 text-dark">
                    {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                  </strong>
                </template>
              </div>

              <!-- STOK -->
              <span class="small text-secondary">
                {{ product.p_stock }} adet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ÇOK SATILAN AKSESUARLAR -->

  <section class="container-fluid px-4 px-md-5 py-5">
    <div
      class="d-flex align-items-center justify-content-between mb-4 section-title"
    >
      <div>
        <h2 class="fw-bold fs-3 mb-1">Çok Satılan Aksesuarlar</h2>

        <p class="text-secondary mb-0">
          En çok dikkat çeken modellerimizi keşfedin.
        </p>
      </div>

      <router-link
        to="/product?type=Aksesuar"
        class="text-dark text-decoration-none fw-semibold"
      >
        Tüm Ürünler
        <i class="bi bi-arrow-right ms-1"></i>
      </router-link>
    </div>

    <div class="row g-4">
      <div
        v-for="product in featuredAccessories"
        :key="product.p_id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <div
          class="home-product-card h-100 border rounded-4 overflow-hidden bg-white"
          @click="goToProduct(product)"
        >
          <!-- RESİM -->
          <div
            class="home-product-image position-relative bg-light d-flex align-items-center justify-content-center"
          >
            <div
              :id="`homeAccessoriesCarousel${product.p_id}`"
              class="carousel slide w-100 h-100"
              data-bs-ride="false"
            >
              <div class="carousel-inner h-100">
                <div v-if="product.p_image1" class="carousel-item active h-100">
                  <img
                    :src="`${baseUrl}${product.p_image1}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>

                <div v-if="product.p_image2" class="carousel-item h-100">
                  <img
                    :src="`${baseUrl}${product.p_image2}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>

                <div v-if="product.p_image3" class="carousel-item h-100">
                  <img
                    :src="`${baseUrl}${product.p_image3}`"
                    :alt="product.p_name"
                    class="w-100 h-100"
                  />
                </div>
              </div>

              <button
                v-if="product.p_image2 || product.p_image3"
                class="carousel-control-prev"
                type="button"
                :data-bs-target="`#homeAccessoriesCarousel${product.p_id}`"
                data-bs-slide="prev"
                @click.stop
              >
                <span class="carousel-control-prev-icon"></span>
              </button>

              <button
                v-if="product.p_image2 || product.p_image3"
                class="carousel-control-next"
                type="button"
                :data-bs-target="`#homeAccessoriesCarousel${product.p_id}`"
                data-bs-slide="next"
                @click.stop
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>

            <span
              v-if="Number(product.p_stock) > 0"
              class="badge rounded-pill bg-success position-absolute top-0 end-0 m-2"
            >
              Stokta
            </span>

            <span
              v-else
              class="badge rounded-pill bg-danger position-absolute top-0 end-0 m-2"
            >
              Tükendi
            </span>
          </div>

          <div class="p-3">
            <span class="small text-secondary">
              {{ product.p_name }}
            </span>

            <h5 class="fw-bold my-1">
              {{ product.p_model }}
            </h5>

            <div class="d-flex justify-content-between align-items-center mt-3">
              <div>
                <!-- İNDİRİM VARSA -->
                <template v-if="Number(product.p_disc) > 0">
                  <div class="d-flex align-items-center gap-2">
                    <!-- Eski fiyat -->
                    <span
                      class="text-secondary text-decoration-line-through small"
                    >
                      {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                    </span>

                    <!-- İndirim oranı -->
                    <span class="badge bg-danger">
                      %{{ Number(product.p_disc) }}
                    </span>
                  </div>

                  <!-- İndirimli fiyat -->
                  <strong class="fs-5 text-dark">
                    {{
                      (
                        Number(product.p_price) *
                        (1 - Number(product.p_disc) / 100)
                      ).toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                    ₺
                  </strong>
                </template>

                <!-- İNDİRİM YOKSA -->
                <template v-else>
                  <strong class="fs-5 text-dark">
                    {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                  </strong>
                </template>
              </div>

              <!-- STOK -->
              <span class="small text-secondary">
                {{ product.p_stock }} adet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- KATEGORİLER -->

  <section class="container-fluid px-4 px-md-5 py-5">
    <div class="text-center mb-5">
      <h2 class="fw-bold fs-3 mb-2">Kategoriler</h2>
      <p class="text-secondary mb-0">Tarzına uygun kategoriyi keşfet.</p>
    </div>

    <div class="row g-4">
      <!-- GÖZLÜK -->
      <div class="col-12 col-md-4">
        <router-link
          to="/product?type=Gozluk"
          class="category-card d-block position-relative overflow-hidden rounded-4 text-decoration-none"
        >
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"
            alt="Gözlük"
            class="category-image"
          />

          <div class="category-overlay"></div>

          <div class="category-content">
            <span class="category-small"> KOLEKSİYON </span>

            <h3 class="fw-bold mb-1">Gözlük</h3>

            <p class="mb-3">Gözlük Modelleri</p>

            <span class="category-button">
              Keşfet
              <i class="bi bi-arrow-right ms-2"></i>
            </span>
          </div>
        </router-link>
      </div>

      <!-- SAAT -->
      <div class="col-12 col-md-4">
        <router-link
          to="/product?type=Saat"
          class="category-card d-block position-relative overflow-hidden rounded-4 text-decoration-none"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
            alt="Saat"
            class="category-image"
          />

          <div class="category-overlay"></div>

          <div class="category-content">
            <span class="category-small"> KOLEKSİYON </span>

            <h3 class="fw-bold mb-1">Saat</h3>

            <p class="mb-3">Saat Modelleri</p>

            <span class="category-button">
              Keşfet
              <i class="bi bi-arrow-right ms-2"></i>
            </span>
          </div>
        </router-link>
      </div>

      <!-- AKSESUAR -->
      <div class="col-12 col-md-4">
        <router-link
          to="/product?type=Aksesuar"
          class="category-card d-block position-relative overflow-hidden rounded-4 text-decoration-none"
        >
          <img
            src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80"
            alt="Aksesuar"
            class="category-image"
          />

          <div class="category-overlay"></div>

          <div class="category-content">
            <span class="category-small"> KOLEKSİYON </span>

            <h3 class="fw-bold mb-1">Aksesuar</h3>

            <p class="mb-3">Aksesuar Modelleri</p>

            <span class="category-button">
              Keşfet
              <i class="bi bi-arrow-right ms-2"></i>
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ["sepet"],

  data() {
    return {
      products: [],
      baseUrl: "http://localhost:3001",
    };
  },

  computed: {
    featuredGlasses() {
      return this.products
        .filter((product) => {
          return product.p_type === "Gozluk" && Number(product.p_stock) > 0;
        })
        .slice(0, 4);
    },

    featuredWatches() {
      return this.products
        .filter((product) => {
          return product.p_type === "Saat" && Number(product.p_stock) > 0;
        })
        .slice(0, 4);
    },

    featuredAccessories() {
      return this.products
        .filter((product) => {
          return product.p_type === "Aksesuar" && Number(product.p_stock) > 0;
        })
        .slice(0, 4);
    },
  },

  methods: {
    async getProducts() {
      try {
        const response = await fetch(`${this.baseUrl}/api/products`);

        if (!response.ok) {
          throw new Error("Ürünler alınamadı.");
        }

        const data = await response.json();

        this.products = data.map((product) => ({
          ...product,
          adet: 1,
          favori: false,
          currentImage: 0,
        }));

        console.log("Ürünler:", this.products);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      }
    },

    getImageList(product) {
      const images = [];

      if (product.p_image1) {
        images.push(product.p_image1);
      }

      if (product.p_image2) {
        images.push(product.p_image2);
      }

      if (product.p_image3) {
        images.push(product.p_image3);
      }

      return images;
    },

    getImageUrl(image) {
      if (!image) {
        return "";
      }

      if (image.startsWith("http")) {
        return image;
      }

      return `${this.baseUrl}${image}`;
    },

    getProductImage(product) {
      const images = this.getImageList(product);

      if (images.length === 0) {
        return "";
      }

      return this.getImageUrl(images[product.currentImage || 0]);
    },

    previousImage(product) {
      const images = this.getImageList(product);

      if (images.length <= 1) {
        return;
      }

      if (product.currentImage > 0) {
        product.currentImage--;
      } else {
        product.currentImage = images.length - 1;
      }
    },

    nextImage(product) {
      const images = this.getImageList(product);

      if (images.length <= 1) {
        return;
      }

      if (product.currentImage < images.length - 1) {
        product.currentImage++;
      } else {
        product.currentImage = 0;
      }
    },

    favori(product) {
      product.favori = !product.favori;
    },

    artir(product) {
      if (product.adet < Number(product.p_stock)) {
        product.adet++;
      }
    },

    azalt(product) {
      if (product.adet > 1) {
        product.adet--;
      }
    },

    sepeteEkle(product) {
      const mevcut = this.sepet.find((item) => item.p_id === product.p_id);

      if (mevcut) {
        if (mevcut.adet + product.adet <= Number(product.p_stock)) {
          mevcut.adet += product.adet;
        }
      } else {
        this.sepet.push({
          ...product,
          adet: product.adet,
        });
      }

      product.adet = 1;
    },

    goToProduct(product) {
      this.$router.push(`/product/${product.p_id}`);
    },
  },

  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
.category-card {
  height: 390px;
  color: white;
  background: #111;
  cursor: pointer;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.15));
  transition: background 0.4s ease;
}

.category-content {
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 30px;
  z-index: 2;
}

.category-small {
  display: block;
  font-size: 11px;
  letter-spacing: 3px;
  margin-bottom: 8px;
  opacity: 0.8;
}

.category-content h3 {
  font-size: 30px;
}

.category-content p {
  font-size: 15px;
  opacity: 0.85;
}

.category-button {
  display: inline-flex;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  color: white;
  font-weight: 600;
  transition: gap 0.3s ease;
}

.category-card:hover .category-image {
  transform: scale(1.07);
}

.category-card:hover .category-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.25));
}

.category-card:hover .category-button {
  padding-right: 8px;
}
.slider-image {
  height: 430px;
  object-fit: cover;
}

.carousel-item::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.05));
  pointer-events: none;
}

.slider-content {
  position: absolute;
  z-index: 3;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 430px;
}

.slider-content h2 {
  font-size: 42px;
}

.slider-content p {
  font-size: 18px;
}

.carousel-control-prev,
.carousel-control-next {
  width: 55px;
  height: 55px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 20px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.carousel:hover .carousel-control-prev,
.carousel:hover .carousel-control-next {
  opacity: 1;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: white;
  transform: translateY(-50%) scale(1.08);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1) grayscale(1);
  width: 22px;
  height: 22px;
}

.home-product-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.home-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.home-product-image {
  height: 220px;
}

.home-product-image img {
  object-fit: contain;
  padding: 25px;
  transition: transform 0.3s ease;
}

.home-product-card:hover .home-product-image img {
  transform: scale(1.06);
}

.home-product-image .carousel-control-prev,
.home-product-image .carousel-control-next {
  width: 35px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.home-product-image:hover .carousel-control-prev,
.home-product-image:hover .carousel-control-next {
  opacity: 1;
}

.home-product-image .carousel-control-prev-icon,
.home-product-image .carousel-control-next-icon {
  width: 18px;
  height: 18px;
  filter: invert(1);
}

.category-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* MOBİL */

@media (max-width: 768px) {
  .slider-image {
    height: 280px;
  }

  .slider-content {
    left: 7%;
  }

  .slider-content h2 {
    font-size: 28px;
  }

  .slider-content p {
    font-size: 14px;
    max-width: 280px;
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 42px;
    height: 42px;
    margin: 0 10px;
  }

  .section-title {
    align-items: flex-start;
    gap: 15px;
  }

  .section-title h2 {
    font-size: 24px;
  }

  .section-title > a {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
