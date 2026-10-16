<template>
  <div class="container-fluid py-4">
    <!-- Başlık -->
    <h3>ÜRÜNLER</h3>

    <div class="filter-bar mt-3">
      <!-- GÖZLÜK -->
      <template v-if="$route.query.type === 'Gozluk'">
        <div class="filter-item">
          <div class="filter-title">
            Cinsiyet
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="category in ['Kadın', 'Erkek', 'Unisex', 'Çocuk']"
              :key="category"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="category"
                v-model="selectedFilters.categories"
              />

              {{ category }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Cam Ölçüsü
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(gozlukFilters.map((x) => x.g_camOlcusu)),
              ]"
              :key="'cam-olcusu-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.camOlculeri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Çerçeve Rengi
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(gozlukFilters.map((x) => x.g_cerceveRengi)),
              ]"
              :key="'cerceve-rengi-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.cerceveRenkleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Çerçeve Materyali
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(gozlukFilters.map((x) => x.g_cerceveMateryali)),
              ]"
              :key="'cerceve-materyali-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.cerceveMateryalleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Cam Rengi
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(gozlukFilters.map((x) => x.g_camRengi)),
              ]"
              :key="'cam-rengi-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.camRenkleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Cam Materyali
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(gozlukFilters.map((x) => x.g_camMateryali)),
              ]"
              :key="'cam-materyali-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.camMateryalleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Fiyat Aralığı
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown price-dropdown">
            <input
              type="number"
              class="form-control"
              placeholder="Min ₺"
              v-model="selectedFilters.minPrice"
            />

            <input
              type="number"
              class="form-control"
              placeholder="Max ₺"
              v-model="selectedFilters.maxPrice"
            />
          </div>
        </div>
      </template>

      <!-- SAAT -->
      <template v-else-if="$route.query.type === 'Saat'">
        <div class="filter-item">
          <div class="filter-title">
            Cinsiyet
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="category in ['Kadın', 'Erkek']"
              :key="category"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="category"
                v-model="selectedFilters.categories"
              />

              {{ category }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Kordon Materyali
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(saatFilters.map((x) => x.s_kordonMateryali)),
              ]"
              :key="'kordon-materyali-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.kordonMateryalleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Kordon Rengi
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(saatFilters.map((x) => x.s_kordonRengi)),
              ]"
              :key="'kordon-rengi-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.kordonRenkleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Kasa Materyali
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(saatFilters.map((x) => x.s_kasaMateryali)),
              ]"
              :key="'kasa-materyali-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.kasaMateryalleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Kasa Rengi
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(saatFilters.map((x) => x.s_kasaRengi)),
              ]"
              :key="'kasa-rengi-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.kasaRenkleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Su Geçirmezlik
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(saatFilters.map((x) => x.s_suGecirmezlik)),
              ]"
              :key="'su-gecirmezlik-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.suGecirmezlik"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Fiyat Aralığı
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown price-dropdown">
            <input
              type="number"
              class="form-control"
              placeholder="Min ₺"
              v-model="selectedFilters.minPrice"
            />

            <input
              type="number"
              class="form-control"
              placeholder="Max ₺"
              v-model="selectedFilters.maxPrice"
            />
          </div>
        </div>
      </template>

      <!-- AKSESUAR -->
      <template v-else-if="$route.query.type === 'Aksesuar'">
        <div class="filter-item">
          <div class="filter-title">
            Cinsiyet
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="category in ['Kadın', 'Erkek']"
              :key="category"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="category"
                v-model="selectedFilters.categories"
              />

              {{ category }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Ürün Tipi
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(aksesuarFilters.map((x) => x.a_urunTipi)),
              ]"
              :key="'urun-tipi-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.urunTipleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Ürün Materyali
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(aksesuarFilters.map((x) => x.a_urunMateryali)),
              ]"
              :key="'urun-materyali-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.urunMateryalleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Ürün Rengi
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <label
              v-for="(item, index) in [
                ...new Set(aksesuarFilters.map((x) => x.a_urunRengi)),
              ]"
              :key="'urun-rengi-' + index"
              class="filter-option"
            >
              <input
                type="checkbox"
                :value="item"
                v-model="selectedFilters.urunRenkleri"
              />

              {{ item }}
            </label>
          </div>
        </div>

        <div class="filter-item">
          <div class="filter-title">
            Fiyat Aralığı
            <i class="bi bi-chevron-down"></i>
          </div>

          <div class="filter-dropdown price-dropdown">
            <input
              type="number"
              class="form-control"
              placeholder="Min ₺"
              v-model="selectedFilters.minPrice"
            />

            <input
              type="number"
              class="form-control"
              placeholder="Max ₺"
              v-model="selectedFilters.maxPrice"
            />
          </div>
        </div>
      </template>

      <!-- SIRALA -->
      <div class="sort-area">
        <div class="dropdown">
          <button
            type="button"
            class="btn btn-outline-dark sort-button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-sort-down me-2"></i>

            Sırala

            <i class="bi bi-chevron-down ms-2"></i>
          </button>

          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="sortType = 'default'"
              >
                Varsayılan
              </button>
            </li>

            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="sortType = 'newest'"
              >
                En Yeniler
              </button>
            </li>

            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="sortType = 'priceAsc'"
              >
                Fiyat: Düşükten Yükseğe
              </button>
            </li>

            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="sortType = 'priceDesc'"
              >
                Fiyat: Yüksekten Düşüğe
              </button>
            </li>

            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="sortType = 'nameAsc'"
              >
                İsim: A-Z
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Ürünler -->
    <div class="row g-4 mt-3">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="(product, index) in displayedProducts"
        :key="product.p_id"
      >
        <div class="product-card" @click="goToProduct(product)">
          <!-- Ürün Resmi -->
          <div class="product-image">
            <img :src="getProductImage(product)" :alt="product.p_name" />

            <!-- Önceki resim -->
            <button
              class="image-arrow image-arrow-left"
              v-if="getImageList(product).length > 1"
              @click.stop="previousImage(product)"
            >
              <i class="bi bi-chevron-left"></i>
            </button>

            <!-- Sonraki resim -->
            <button
              v-if="getImageList(product).length > 1"
              class="image-arrow image-arrow-right"
              @click.stop="nextImage(product)"
            >
              <i class="bi bi-chevron-right"></i>
            </button>

            <!-- Favori -->
            <button class="favorite-btn" @click.stop="favori(product)">
              <i
                :class="
                  product.favori
                    ? 'bi bi-heart-fill text-danger'
                    : 'bi bi-heart'
                "
              ></i>
            </button>

            <!-- Stok -->
            <span
              v-if="Number(product.p_stock) > 0"
              class="badge bg-success stock-badge"
            >
              Stokta
            </span>

            <span v-else class="badge bg-danger stock-badge"> Tükendi </span>
          </div>

          <!-- Ürün Bilgileri -->
          <div class="p-3">
            <div
              class="d-flex justify-content-between align-items-center text-muted small mb-1"
            >
              <span>{{ product.p_name }}</span>
              <span>{{ product.p_category }}</span>
            </div>

            <h5 class="fw-bold mb-2">
              {{ product.p_model }}
            </h5>

            <!-- Fiyat ve stok -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div v-if="Number(product.p_stock)">
                <!-- İNDİRİM VAR -->
                <template v-if="Number(product.p_disc) > 0">
                  <div class="d-flex align-items-center gap-2 mb-1">
                    <span class="text-muted text-decoration-line-through small">
                      {{ Number(product.p_price).toLocaleString("tr-TR") }} ₺
                    </span>

                    <span class="badge bg-danger">
                      %{{ Number(product.p_disc) }}
                    </span>
                  </div>

                  <span class="price">
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
                  </span>
                </template>

                <!-- İNDİRİM YOK -->
                <template v-else>
                  <span class="price">
                    {{ Number(product.p_price).toLocaleString("tr-TR") }}
                    ₺
                  </span>
                </template>
              </div>

              <small v-if="Number(product.p_stock)" class="text-muted">
                {{ product.p_stock }} adet
              </small>
            </div>

            <!-- Adet seçimi -->
            <div v-if="Number(product.p_stock) > 0" class="quantity-box mb-3">
              <button class="quantity-btn" @click.stop="azalt(product)">
                <i class="bi bi-dash"></i>
              </button>

              <span class="quantity-number">
                {{ product.adet || 1 }}
              </span>

              <button class="quantity-btn" @click.stop="artir(product)">
                <i class="bi bi-plus"></i>
              </button>
            </div>

            <!-- Sepete Ekle -->
            <button
              v-if="Number(product.p_stock) > 0"
              class="btn btn-dark w-100"
              @click.stop="sepeteEkle(product)"
            >
              <i class="bi bi-cart-plus me-2"></i>
              Sepete Ekle
            </button>

            <button v-else class="btn btn-secondary w-100" disabled>
              <i class="bi bi-x-circle me-2"></i>
              Stokta Yok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürün yok -->
    <div v-if="displayedProducts.length === 0" class="text-center py-5">
      <i class="bi bi-box-seam fs-1 text-muted"></i>

      <h5 class="mt-3">Aradığınız kriterlere uygun ürün bulunamadı.</h5>

      <p class="text-muted">
        Filtrelerinizi değiştirerek tekrar deneyebilirsiniz.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["sepet", "toast"],

  data() {
    return {
      gozlukFilters: [],
      saatFilters: [],
      aksesuarFilters: [],

      selectedFilters: {
        categories: [],
        camOlculeri: [],
        cerceveRenkleri: [],
        cerceveMateryalleri: [],
        camRenkleri: [],
        camMateryalleri: [],

        kordonMateryalleri: [],
        kordonRenkleri: [],
        kasaMateryalleri: [],
        kasaRenkleri: [],
        suGecirmezlik: [],

        urunTipleri: [],
        urunMateryalleri: [],
        urunRenkleri: [],

        minPrice: null,
        maxPrice: null,
      },
      products: [],

      sortType: "default",

      baseUrl: "http://localhost:3001",
    };
  },

  computed: {
    filteredProducts() {
      const type = this.$route.query.type;
      const category = this.$route.query.category;
      const search = this.$route.query.search;

      return this.products.filter((product) => {
        // ÜRÜN TİPİ
        const typeMatch = !type || product.p_type === type;
        // CİNSİYET
        const categoryMatch =
          (!category || product.p_category === category) &&
          (this.selectedFilters.categories.length === 0 ||
            this.selectedFilters.categories.includes(product.p_category));
        // ARAMA
        const normalizeSearch = (text) => {
          return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[-\s]/g, "");
        };

        const searchQuery = normalizeSearch(search);

        const searchMatch =
          !searchQuery ||
          normalizeSearch(product.p_name).includes(searchQuery) ||
          normalizeSearch(product.p_model).includes(searchQuery) ||
          normalizeSearch(product.p_type).includes(searchQuery) ||
          normalizeSearch(product.p_category).includes(searchQuery) ;

        // FİYAT
        const minPrice =
          this.selectedFilters.minPrice === "" ||
          this.selectedFilters.minPrice === null
            ? null
            : Number(this.selectedFilters.minPrice);

        const maxPrice =
          this.selectedFilters.maxPrice === "" ||
          this.selectedFilters.maxPrice === null
            ? null
            : Number(this.selectedFilters.maxPrice);

        const productPrice = Number(product.p_price);

        const minPriceMatch = minPrice === null || productPrice >= minPrice;

        const maxPriceMatch = maxPrice === null || productPrice <= maxPrice;

        const priceMatch = minPriceMatch && maxPriceMatch;

        // GÖZLÜk
        const camOlcusuMatch =
          this.selectedFilters.camOlculeri.length === 0 ||
          this.selectedFilters.camOlculeri.includes(product.g_camOlcusu);

        const cerceveRengiMatch =
          this.selectedFilters.cerceveRenkleri.length === 0 ||
          this.selectedFilters.cerceveRenkleri.includes(product.g_cerceveRengi);

        const cerceveMateryaliMatch =
          this.selectedFilters.cerceveMateryalleri.length === 0 ||
          this.selectedFilters.cerceveMateryalleri.includes(
            product.g_cerceveMateryali,
          );

        const camRengiMatch =
          this.selectedFilters.camRenkleri.length === 0 ||
          this.selectedFilters.camRenkleri.includes(product.g_camRengi);

        const camMateryaliMatch =
          this.selectedFilters.camMateryalleri.length === 0 ||
          this.selectedFilters.camMateryalleri.includes(product.g_camMateryali);

        // SAAT
        const kordonMateryaliMatch =
          this.selectedFilters.kordonMateryalleri.length === 0 ||
          this.selectedFilters.kordonMateryalleri.includes(
            product.s_kordonMateryali,
          );

        const kordonRengiMatch =
          this.selectedFilters.kordonRenkleri.length === 0 ||
          this.selectedFilters.kordonRenkleri.includes(product.s_kordonRengi);

        const kasaMateryaliMatch =
          this.selectedFilters.kasaMateryalleri.length === 0 ||
          this.selectedFilters.kasaMateryalleri.includes(
            product.s_kasaMateryali,
          );

        const kasaRengiMatch =
          this.selectedFilters.kasaRenkleri.length === 0 ||
          this.selectedFilters.kasaRenkleri.includes(product.s_kasaRengi);

        const suGecirmezlikMatch =
          this.selectedFilters.suGecirmezlik.length === 0 ||
          this.selectedFilters.suGecirmezlik.includes(product.s_suGecirmezlik);

        // AKSESUAR
        const urunTipiMatch =
          this.selectedFilters.urunTipleri.length === 0 ||
          this.selectedFilters.urunTipleri.includes(product.a_urunTipi);

        const urunMateryaliMatch =
          this.selectedFilters.urunMateryalleri.length === 0 ||
          this.selectedFilters.urunMateryalleri.includes(
            product.a_urunMateryali,
          );

        const urunRengiMatch =
          this.selectedFilters.urunRenkleri.length === 0 ||
          this.selectedFilters.urunRenkleri.includes(product.a_urunRengi);

        // SONUÇ
        return (
          typeMatch &&
          categoryMatch &&
          searchMatch &&
          priceMatch &&
          camOlcusuMatch &&
          cerceveRengiMatch &&
          cerceveMateryaliMatch &&
          camRengiMatch &&
          camMateryaliMatch &&
          kordonMateryaliMatch &&
          kordonRengiMatch &&
          kasaMateryaliMatch &&
          kasaRengiMatch &&
          suGecirmezlikMatch &&
          urunTipiMatch &&
          urunMateryaliMatch &&
          urunRengiMatch
        );
      });
    },
    displayedProducts() {
      const products = [...this.filteredProducts];

      if (this.sortType === "newest") {
        products.sort((a, b) => Number(b.p_id) - Number(a.p_id));
      }

      if (this.sortType === "priceAsc") {
        products.sort((a, b) => Number(a.p_price) - Number(b.p_price));
      }

      if (this.sortType === "priceDesc") {
        products.sort((a, b) => Number(b.p_price) - Number(a.p_price));
      }

      if (this.sortType === "nameAsc") {
        products.sort((a, b) =>
          String(a.p_name).localeCompare(String(b.p_name), "tr"),
        );
      }

      return products;
    },
  },

  watch: {
    selectedFilters: {
      deep: true,

      handler() {
        console.log("FİLTRE DEĞİŞTİ:", this.selectedFilters);
      },
    },
  },
  mounted() {
    this.getProducts();
    this.getGozlukFilters();
    this.getSaatFilters();
    this.getAksesuarFilters();
  },

  methods: {
    // Ürünleri backend'den getir
    async getProducts() {
      try {
        const res = await fetch(`${this.baseUrl}/api/products`);

        if (!res.ok) {
          throw new Error("Ürünler alınamadı.");
        }

        this.products = await res.json();

        // Her ürüne başlangıç değerleri ekle
        this.products.forEach((product) => {
          product.adet = 1;
          product.favori = false;
          product.currentImage = 0;
        });

        await this.getUserFavorites();
      } catch (e) {
        console.log(e.message);
      }
    },

    async getUserFavorites() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.products.forEach((product) => {
          product.favori = false;
        });
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
          throw new Error(data.error || "Favoriler alınamadı.");
        }

        this.products.forEach((product) => {
          product.favori = data.some(
            (fav) => Number(fav.p_id) === Number(product.p_id),
          );
        });
      } catch (e) {
        console.error("FAVORİLER ALINAMADI:", e);
      }
    },

    async getGozlukFilters() {
      try {
        const response = await fetch(`${this.baseUrl}/api/gozluk-filtreleri`);

        this.gozlukFilters = await response.json();
      } catch (err) {
        console.error("Gözlük filtreleri alınamadı:", err);
      }
    },

    // SAAT FİLTRELERİ
    async getSaatFilters() {
      try {
        const response = await fetch(`${this.baseUrl}/api/saat-filtreleri`);

        this.saatFilters = await response.json();
      } catch (err) {
        console.error("Saat filtreleri alınamadı:", err);
      }
    },

    // AKSESUAR FİLTRELERİ
    async getAksesuarFilters() {
      try {
        const response = await fetch(`${this.baseUrl}/api/aksesuar-filtreleri`);

        this.aksesuarFilters = await response.json();
      } catch (err) {
        console.error("Aksesuar filtreleri alınamadı:", err);
      }
    },

    //Product sayfasında Ürünün resimlerini oluştur
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

    // Aktif ürün resmini getir
    getProductImage(product) {
      const images = this.getImageList(product);

      if (images.length === 0) {
        return null;
      }

      const currentIndex = product.currentImage || 0;

      const image = images[currentIndex];

      if (!image) {
        return null;
      }

      if (image.startsWith("/uploads/")) {
        return `${this.baseUrl}${image}`;
      }

      return image;
    },
    // Önceki resim
    previousImage(product) {
      const images = this.getImageList(product);

      if (images.length <= 1) {
        return;
      }

      if (product.currentImage <= 0) {
        product.currentImage = images.length - 1;
      } else {
        product.currentImage--;
      }
    },

    nextImage(product) {
      const images = this.getImageList(product);

      if (images.length <= 1) {
        return;
      }

      if (product.currentImage >= images.length - 1) {
        product.currentImage = 0;
      } else {
        product.currentImage++;
      }
    },

    async favori(product) {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.toast(
          "Favorilere eklemek için giriş yapmalısınız.",
          "warning",
          "Giriş Gerekli",
        );
        return;
      }

      try {
        // Ürün zaten favorideyse → FAVORİDEN ÇIKAR
        if (product.favori) {
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
            throw new Error(data.error || "Favoriden çıkarılamadı.");
          }

          product.favori = false;

          this.toast("Ürün favorilerden çıkarıldı.", "success", "Favoriler");

          return;
        }

        // Ürün favoride değilse → FAVORİYE EKLE
        const res = await fetch(`${this.baseUrl}/api/favoriler`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            p_id: Number(product.p_id),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Favoriye eklenemedi.");
        }

        product.favori = true;

        this.toast("Ürün favorilere eklendi.", "success", "Favorilere Eklendi");
      } catch (e) {
        console.error("FAVORİ HATASI:", e);

        this.toast(e.message || "Favori işlemi başarısız.", "danger", "Hata");
      }
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
      const adet = product.adet || 1;

      const fiyat = Number(product.p_price) || 0;
      const indirim = Number(product.p_disc) || 0;

      const sepetFiyati = fiyat * (1 - indirim / 100);

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
        mevcutUrun.p_price = fiyat;
        mevcutUrun.p_disc = indirim;
        mevcutUrun.sepetFiyati = sepetFiyati;
      } else {
        this.sepet.push({
          ...product,
          p_price: fiyat,
          p_disc: indirim,
          sepetFiyati: sepetFiyati,
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

    goToProduct(product) {
      this.$router.push(`/product/${product.p_id}`);
    },
  },
};
</script>

<style scoped>
/* =========================
   ÜRÜN KARTI
========================= */

.product-card {
  height: 100%;
  background: white;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

/* =========================
   ÜRÜN RESMİ
========================= */

.product-image {
  position: relative;
  height: 240px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 25px;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

/* =========================
   RESİM OKLARI
========================= */

.image-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.image-arrow:hover {
  background: white;
}

.image-arrow-left {
  left: 10px;
}

.image-arrow-right {
  right: 10px;
}

/* =========================
   FAVORİ
========================= */

.favorite-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.favorite-btn i {
  transition: transform 0.2s ease;
}

.favorite-btn:active i {
  transform: scale(1.3);
}

/* =========================
   STOK
========================= */

.stock-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 7px 11px;
  border-radius: 20px;
}

/* =========================
   FİYAT
========================= */

.price {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

/* =========================
   ADET
========================= */

.quantity-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.quantity-btn {
  width: 45px;
  height: 100%;
  border: none;
  background: #f5f5f5;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.quantity-btn:hover {
  background: #e5e5e5;
}

.quantity-number {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
}

/* =========================
   BUTON
========================= */

.btn-dark {
  border-radius: 10px;
  padding: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* =========================
   FİLTRE VE SIRALAMA
========================= */

.product-tools {
  flex-shrink: 0;
}

.filter-button {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 14px;
  color: #222;
  transition: 0.2s;
}

.filter-button:hover {
  border-color: #222;
  background: #fafafa;
}

/* FİLTRE MENÜSÜ */

.filter-menu {
  width: 330px;
  max-height: 650px;
  overflow-y: auto;
  padding: 0;
  border: 1px solid #eee;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

/* FİLTRE BAŞLIĞI */

.filter-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 18px;
  border-bottom: 1px solid #eee;
}

.filter-menu-header strong {
  font-size: 17px;
}

.filter-menu-header button {
  border: none;
  background: none;
  color: #777;
  font-size: 13px;
  text-decoration: underline;
}

/* FİLTRE BÖLÜMLERİ */

.filter-section {
  padding: 17px 18px;
  border-bottom: 1px solid #eee;
}

.filter-section-title {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 12px;
}

/* CHECKBOX */

.filter-check {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 14px;
}

.filter-check:last-child {
  margin-bottom: 0;
}

.filter-check input {
  width: 17px;
  height: 17px;
  cursor: pointer;
}

/* FİYAT */

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-inputs input {
  width: 120px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 13px;
}

/* UYGULA */

.filter-apply {
  width: calc(100% - 36px);
  margin: 18px;
  padding: 11px;
  border: none;
  border-radius: 9px;
  background: #202428;
  color: white;
  font-size: 14px;
}

/* SIRALAMA */

.sort-menu {
  min-width: 250px;
  padding: 7px;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.sort-menu .dropdown-item {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
}

.sort-menu .dropdown-item:hover {
  background: #f5f5f5;
}

.filter-hover {
  position: relative;
}

.filter-hover-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.filter-hover:hover .filter-hover-menu {
  display: block;
}

.filter-hover-menu label {
  padding: 5px;
  white-space: nowrap;
  cursor: pointer;
}

.filter-hover-menu label:hover {
  background: #f5f5f5;
  border-radius: 5px;
}

.price-menu {
  width: 180px;
}

/* =========================
   FİLTRE BAR
========================= */

.filter-bar {
  display: flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
  overflow: visible;
}

/* Her filtre */
.filter-item {
  position: relative;
  flex: 1;
  min-width: 0;
  border-right: 1px solid #ddd;
}

/* Filtre başlığı */
.filter-title {
  height: 48px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  white-space: nowrap;
}

.filter-title i {
  font-size: 13px;
  margin-left: 10px;
}

/* Hover */
.filter-item:hover {
  background: #fafafa;
}

.filter-item:hover .filter-title {
  color: #111;
}

/* Açılan kutu */
.filter-dropdown {
  display: none;

  position: absolute;
  top: calc(100% + 1px);
  left: -1px;

  min-width: 220px;
  max-height: 350px;

  overflow-y: auto;

  padding: 14px;

  background: #fff;

  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;

  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);

  z-index: 1000;
}

/* Hover olunca aç */
.filter-item:hover .filter-dropdown {
  display: block;
}

/* Checkbox seçenekleri */
.filter-option {
  display: flex;
  align-items: center;

  gap: 9px;

  padding: 8px 6px;

  margin: 0;

  border-radius: 5px;

  font-size: 14px;

  cursor: pointer;
}

.filter-option:hover {
  background: #f5f5f5;
}

.filter-option input {
  width: 16px;
  height: 16px;

  cursor: pointer;
}

/* Fiyat */
.price-dropdown {
  width: 220px;
}

.price-dropdown input + input {
  margin-top: 8px;
}

/* =========================
   SIRALAMA
========================= */

.sort-area {
  margin-left: auto;

  display: flex;
  align-items: center;

  padding-left: 10px;

  background: #fff;
}

.sort-button {
  height: 48px;
  border: none;
  border-left: 1px solid #ddd;
  border-radius: 0;
  padding: 0 18px;
  white-space: nowrap;
}

/* =========================
   MOBİL
========================= */

@media (max-width: 1000px) {
  .filter-bar {
    overflow-x: auto;
  }

  .filter-item {
    flex: 0 0 auto;
  }

  .filter-title {
    min-width: 140px;
  }

  .sort-area {
    flex: 0 0 auto;
  }
}

/* MOBİL */

@media (max-width: 768px) {
  .product-tools {
    margin-top: 15px;
    width: 100%;
  }

  .filter-button {
    flex: 1;
    justify-content: center;
  }
}

/* =========================
   MOBİL
========================= */

@media (max-width: 576px) {
  .product-image {
    height: 210px;
  }

  .price {
    font-size: 18px;
  }
}
</style>
