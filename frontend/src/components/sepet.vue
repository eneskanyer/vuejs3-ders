<template>
  <!-- SEPET İKONU -->
  <a
    data-bs-toggle="offcanvas"
    href="#sepetsidebar"
    style="margin-right: 20px"
    class="sepet-icon position-fixed top-50 end-0 translate-middle-y me-3 bg-white text-dark rounded-circle d-flex align-items-center justify-content-center text-decoration-none fs-5 shadow z-3 p-3"
  >
    <i class="bi bi-cart"></i>

    <span
      v-if="sepetAdedi > 0"
      class="sepet-sayi position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1"
    >
      {{ sepetAdedi }}
    </span>
  </a>

  <!-- SEPET -->
  <div
    class="offcanvas offcanvas-end cart-sidebar"
    tabindex="-1"
    id="sepetsidebar"
  >
    <!-- HEADER -->
    <div class="offcanvas-header cart-header">
      <div>
        <h5 class="offcanvas-title fw-bold mb-1">Sepetim</h5>

        <small class="text-muted"> Ürünlerin burada </small>
      </div>

      <div class="d-flex align-items-center gap-3">
        <span class="cart-count"> {{ sepetAdedi }} Ürün </span>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
    </div>

    <!-- BODY -->
    <div class="offcanvas-body cart-body">
      <!-- ÜRÜNLER -->
      <div class="cart-products">
        <!-- SEPET BOŞ -->
        <div v-if="sepet.length === 0" class="empty-cart text-center">
          <i class="bi bi-cart-x"></i>

          <h6 class="fw-bold mt-3">Sepetin boş</h6>

          <p class="text-muted small mb-0">
            Beğendiğin ürünleri sepete ekleyebilirsin.
          </p>
        </div>

        <!-- ÜRÜN -->
        <div
          v-for="(item, index) in sepet"
          :key="item.id || index"
          class="cart-item"
        >
          <!-- RESİM -->
          <div class="cart-image">
            <img :src="'http://localhost:3001' + item.p_image1" alt="Ürün" />
          </div>

          <!-- ÜRÜN BİLGİLERİ -->
          <div class="cart-info">
            <div class="cart-product-top">
              <div class="cart-product-text">
                <div class="cart-product-name">
                  {{ item.p_name }}
                </div>

                <div class="cart-product-model">
                  {{ item.p_model }}
                </div>
              </div>

              <!-- FİYAT -->
              <div class="cart-price">
                <template v-if="Number(item.p_disc) > 0">
                  <div class="cart-old-price">
                    {{
                      (Number(item.p_price) * (item.adet || 1)).toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )
                    }}
                    ₺
                  </div>

                  <div class="cart-discount">-%{{ item.p_disc }}</div>

                  <div class="cart-new-price">
                    {{
                      (
                        Number(item.p_price) *
                        (1 - Number(item.p_disc) / 100) *
                        (item.adet || 1)
                      ).toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                    ₺
                  </div>
                </template>

                <template v-else>
                  <div class="cart-new-price">
                    {{
                      (Number(item.p_price) * (item.adet || 1)).toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )
                    }}
                    ₺
                  </div>
                </template>
              </div>
            </div>

            <!-- ALT SATIR -->
            <div class="cart-product-bottom">
              <!-- ADET -->
              <div class="quantity-control">
                <button type="button" @click="azalt(item, index)">
                  <i class="bi bi-dash"></i>
                </button>

                <span>
                  {{ item.adet || 1 }}
                </span>

                <button type="button" @click="artir(item)">
                  <i class="bi bi-plus"></i>
                </button>
              </div>

              <!-- SİL -->
              <button
                type="button"
                class="delete-button"
                @click="sil(index)"
                title="Ürünü kaldır"
              >
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ALT BÖLÜM -->
      <div class="cart-footer">
        <!-- TOPLAM -->
        <div class="cart-total">
          <span> Toplam Tutar </span>

          <strong>
            {{
              toplamTutar.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
            ₺
          </strong>
        </div>

        <!-- ÖDEME -->
        <button
          class="cart-checkout"
          @click="Checkout()"
          :disabled="sepet.length === 0"
        >
          <span> Ödeme Sayfasına Geç </span>

          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["sepet", "toast"],

  computed: {
    toplamTutar() {
      if (!this.sepet || !Array.isArray(this.sepet)) return 0;

      return this.sepet.reduce((toplam, item) => {
        const adet = Number(item.adet) || 1;
        const fiyat = Number(item.p_price) || 0;
        const indirim = Number(item.p_disc) || 0;

        const indirimliFiyat = fiyat * (1 - indirim / 100);

        return toplam + indirimliFiyat * adet;
      }, 0);
    },
    sepetAdedi() {
      return this.sepet.reduce((toplam, item) => {
        return toplam + (Number(item.adet) || 1);
      }, 0);
    },
  },

  methods: {
    Checkout() {
      this.$router.push("/checkout");
    },

    artir(item) {
      if (item.adet < Number(item.p_stock)) {
        item.adet++;
      } else {
        this.toast(
          `Bu üründen en fazla ${item.p_stock} adet alabilirsiniz.`,
          "danger",
          "Stok Limiti",
        );
      }
    },

    azalt(item, index) {
      if (item.adet && item.adet > 1) {
        item.adet--;
      } else {
        this.sil(index);
      }
    },

    sil(index) {
      this.sepet.splice(index, 1);
      this.toast("Ürün sepetten kaldırıldı.", "success", "Sepet Güncellendi");
    },
  },
};
</script>
<style scoped>
.cart-sidebar {
  width: 430px;
  max-width: 100%;
  background: #fff;
}

.cart-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.cart-count {
  background: #f5f5f5;
  color: #333;
  padding: 6px 11px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.cart-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 89px);
}

.cart-products {
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;
}

/* ÜRÜN */
.cart-item {
  display: flex;
  gap: 13px;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background: #fff;
}

.cart-item:last-child {
  margin-bottom: 0;
}

/* RESİM */
.cart-image {
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cart-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}

/* BİLGİ */
.cart-info {
  flex: 1;
  min-width: 0;
}

.cart-product-top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.cart-product-text {
  min-width: 0;
}

.cart-product-name {
  font-size: 14px;
  font-weight: 600;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-product-model {
  font-size: 12px;
  color: #888;
  margin-top: 3px;
}

.cart-price {
  font-size: 14px;
  font-weight: 700;
  color: #222;
  white-space: nowrap;
}

/* ALT SATIR */
.cart-product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}

/* ADET */
.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 7px;
  overflow: hidden;
  height: 31px;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  border: 0;
  background: #fff;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.quantity-control button:hover {
  background: #f5f5f5;
}

.quantity-control span {
  width: 32px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
}

/* SİL */
.delete-button {
  border: 0;
  background: transparent;
  color: #999;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;
}

.delete-button:hover {
  color: #dc3545;
}

/* BOŞ SEPET */
.empty-cart {
  padding: 70px 20px;
  color: #555;
}

.empty-cart i {
  font-size: 42px;
  color: #bbb;
}

.empty-cart h6 {
  color: #333;
}

/* ALT */
.cart-footer {
  border-top: 1px solid #eee;
  padding-top: 16px;
  margin-top: 16px;
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.cart-total span {
  font-size: 15px;
  color: #666;
}

.cart-total strong {
  font-size: 20px;
  color: #198754;
}

/* ÖDEME */
.cart-checkout {
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background: #198754;
  color: white;
  font-size: 15px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  cursor: pointer;
  transition: 0.2s ease;
}

.cart-checkout:hover:not(:disabled) {
  background: #157347;
}

.cart-checkout:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cart-checkout i {
  font-size: 18px;
}

.cart-price {
  text-align: right;
  white-space: nowrap;
}

.cart-old-price {
  font-size: 11px;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 1px;
}

.cart-discount {
  display: inline-block;
  font-size: 10px;
  color: #198754;
  background: #eaf7ef;
  padding: 2px 5px;
  border-radius: 4px;
  margin-bottom: 2px;
}

.cart-new-price {
  font-size: 14px;
  font-weight: 700;
  color: #222;
}

/* MOBİL */
@media (max-width: 576px) {
  .cart-sidebar {
    width: 100%;
  }

  .cart-body {
    padding: 14px;
  }

  .cart-image {
    width: 70px;
    height: 70px;
  }

  .cart-product-name {
    font-size: 13px;
  }

  .cart-price {
    font-size: 13px;
  }
}
</style>
