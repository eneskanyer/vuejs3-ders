<script setup>
import { validateCheckout } from "@/utils/validation";
import { cities } from "@/utils/cities";
</script>
<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <i class="bi bi-credit-card-2-front" style="font-size: 100px"></i>
        <h1 class="h2">Ödeme Sayfası</h1>
      </div>
      <div class="row g-5">
        <!-- Sepet Kısmı -->
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Sepetim</span>
            <span class="badge bg-primary rounded-pill">
              {{ sepet.length }} Adet
            </span>
          </h4>
          <ul class="checkout-cart">
            <!-- ÜRÜNLER -->
            <li
              v-for="(value, index) in sepet"
              :key="value.id || index"
              class="checkout-product"
            >
              <!-- ÜST KISIM -->
              <div class="checkout-product-main">
                <!-- FOTOĞRAF -->
                <div class="checkout-product-image">
                  <img :src="baseUrl + value.p_image1" :alt="value.p_name" />
                </div>

                <!-- ÜRÜN BİLGİLERİ -->
                <div class="checkout-product-info">
                  <div class="checkout-product-name">
                    {{ value.p_name }}
                  </div>

                  <div class="checkout-product-model">
                    {{ value.p_model }}
                  </div>
                </div>

                <!-- FİYATLAR -->
                <div class="checkout-product-price">
                  <template v-if="Number(value.p_disc) > 0">
                    <div class="checkout-old-price">
                      {{
                        (
                          Number(value.p_price) * (value.adet || 1)
                        ).toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                      ₺
                    </div>

                    <span class="checkout-discount">
                      -%{{ value.p_disc }}
                    </span>

                    <div class="checkout-new-price">
                      {{
                        (
                          Number(value.p_price) *
                          (1 - Number(value.p_disc) / 100) *
                          (value.adet || 1)
                        ).toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                      ₺
                    </div>
                  </template>

                  <template v-else>
                    <div class="checkout-new-price">
                      {{
                        (
                          Number(value.p_price) * (value.adet || 1)
                        ).toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                      ₺
                    </div>
                  </template>
                </div>
              </div>

              <!-- ALT KISIM -->
              <div class="checkout-product-bottom">
                <!-- ADET -->
                <div class="checkout-quantity">
                  <button type="button" @click="azalt(value, index)">
                    <i class="bi bi-dash"></i>
                  </button>

                  <span>
                    {{ value.adet || 1 }}
                  </span>

                  <button type="button" @click="artir(value)">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>

                <!-- SİL -->
                <button
                  type="button"
                  class="checkout-delete"
                  @click="deleteProduct(index)"
                >
                  <i class="bi bi-trash3"></i>
                  Kaldır
                </button>
              </div>
            </li>

            <!-- TOPLAM -->
            <li class="checkout-summary">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted"> Ara Toplam </span>

                <span>
                  {{
                    normalToplam.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                  ₺
                </span>
              </div>

              <div class="d-flex justify-content-between mb-3">
                <span class="text-muted"> İndirim </span>

                <span class="text-success fw-semibold">
                  -{{
                    toplamIndirim.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                  ₺
                </span>
              </div>

              <hr />

              <div class="d-flex justify-content-between align-items-center">
                <strong> Toplam </strong>

                <strong class="checkout-final-price">
                  {{
                    toplamTutar.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                  ₺
                </strong>
              </div>
            </li>
          </ul>
        </div>

        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Adresiniz</h4>
          <div v-if="adresSecimi" class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Kayıtlı Adreslerim</h5>

              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="$router.push('/user?secim=adress')"
              >
                <i class="bi bi-plus-lg me-1"></i>
                Yeni Adres Ekle
              </button>
            </div>

            <div v-if="adresler.length > 0" class="list-group">
              <label
                v-for="adres in adresler"
                :key="adres.a_id"
                class="list-group-item list-group-item-action"
              >
                <div class="d-flex align-items-start gap-2">
                  <input
                    class="form-check-input mt-1"
                    type="radio"
                    name="adres"
                    :value="adres.a_id"
                    v-model="secilenAdresId"
                    @change="adresiSec(adres)"
                  />

                  <div>
                    <div class="fw-bold">
                      {{ adres.a_title }}
                    </div>

                    <div>
                      {{ adres.a_person }}
                    </div>

                    <div>
                      {{ adres.a_email }}
                    </div>

                    <div class="text-muted small">
                      {{ adres.a_phone }}
                    </div>

                    <div class="text-muted small">
                      {{ adres.a_city }} / {{ adres.a_district }}
                    </div>

                    <div class="text-muted small">
                      {{ adres.a_neighborhood }}
                      {{ adres.a_address }}
                    </div>
                    <div>
                      {{ adres.a_zip }}
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <div v-else class="alert alert-info mb-0">
              <i class="bi bi-info-circle me-2"></i>

              Kayıtlı adresiniz bulunmuyor.
              <button
                type="button"
                class="btn btn-link p-0 align-baseline"
                @click="$router.push('/user?secim=adress')"
              >
                Adres kaydetmek için tıklayınız.
              </button>
            </div>
          </div>
          <form class="needs-validation" @submit.prevent="checkOut()">
            <div class="row g-3">
              <div class="col-sm-12">
                <label class="form-label">Tc Kimlik No:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Fatura içindir.."
                  v-model="order[0].TC"
                  required
                />
                <div class="invalid-feedback">Fatura İçin Gereklidir.</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label">Adınız:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  v-model="order[0].firstName"
                  required
                />
                <div class="invalid-feedback">Geçerli bir ad gereklidir.</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label">Soyadınız:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  v-model="order[0].lastName"
                  required
                />
                <div class="invalid-feedback">
                  Geçerli bir soyad gereklidir.
                </div>
              </div>
              <div class="col-6">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="you@gmail.com"
                  v-model="order[0].email"
                />
                <div class="invalid-feedback">
                  Gönderim güncellemeleri için lütfen geçerli bir e-posta adresi
                  girin.
                </div>
              </div>
              <div class="col-6">
                <label class="form-label">Telefon</label>
                <div class="input-group">
                  <span class="input-group-text">+90</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="5004003020"
                    v-model="order[0].phone"
                  />
                </div>
                <div class="invalid-feedback">
                  Gönderim güncellemeleri için lütfen geçerli bir telefon
                  numarası girin.
                </div>
              </div>
              <div class="col-12">
                <label class="form-label">Adres</label>
                <textarea
                  class="form-control"
                  placeholder="Abc Sok. Apt No:0"
                  v-model="order[0].address"
                  required
                ></textarea>
                <div class="invalid-feedback">
                  Lütfen teslimat adresinizi girin.
                </div>
              </div>
              <div class="col-md-5">
                <label class="form-label">Ülke</label>
                <select v-model="order[0].country" class="form-select" required>
                  <option value="Türkiye">Türkiye</option>
                  <option value="ABD">ABD</option>
                </select>
                <div class="invalid-feedback">
                  Lütfen geçerli bir ülke seçin.
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">Şehir</label>
                <select v-model="order[0].state" class="form-select" required>
                  <option value="">Seçiniz...</option>
                  <option v-for="city in cities" :key="city" :value="city">
                    {{ city }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  Lütfen geçerli bir şehir seçin.
                </div>
              </div>
              <div class="col-md-3">
                <label class="form-label">Posta Kodu</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  v-model="order[0].zip"
                  required
                />
                <div class="invalid-feedback">Posta kodu gerekli.</div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="form-check">
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label" for="same-address"
                >Gönderim adresim ile fatura adresim aynıdır...</label
              >
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label" for="save-info"
                >Bu bilgiyi bir dahaki sefere kullanmak üzere saklayın.</label
              >
            </div>
            <hr class="my-4" />
            <h4 class="mb-3">Ödeme Yöntemi</h4>
            <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Kart İsim</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-name"
                  placeholder=""
                  v-model="payment[0].name"
                  required
                />
                <small class="text-body-secondary"
                  >Kartta Yazılı Olan Tam Adınız</small
                >
                <div class="invalid-feedback">
                  Kart isminin yazılması zorunludur.
                </div>
              </div>
              <div class="col-md-6">
                <label for="cc-number" class="form-label"
                  ><i class="bi bi-credit-card-2-front"></i> Kredi Kart
                  Numarası</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="cc-number"
                  placeholder=""
                  v-model="payment[0].number"
                  required
                />

                <div class="invalid-feedback">
                  Kredi kartı numarası gereklidir.
                </div>
              </div>
              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">
                  <i class="bi bi-calendar-date"></i>
                  Son Kullanma Tarihi
                </label>

                <input
                  id="cc-expiration"
                  type="text"
                  class="form-control"
                  v-model="payment.exp"
                  placeholder="AA/YY"
                  maxlength="5"
                  inputmode="numeric"
                  autocomplete="cc-exp"
                  @input="formatExpiration"
                />
                <div class="invalid-feedback">Son kullanma tarihi gerekli</div>
              </div>
              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">
                  <i class="bi bi-shield-lock"></i> CVC (Güvenlik Kodu)</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="cc-cvv"
                  placeholder=""
                  v-model="payment[0].cvv"
                  required
                />
                <small class="text-body-secondary"
                  >Kartın Arkasındaki Üç Haneli Sayı</small
                >
                <div class="invalid-feedback">Güvenlik kodu gerekli</div>
              </div>
            </div>
            <hr class="my-4" />
            <button class="w-100 btn btn-primary btn-lg" type="submit">
              Siparişi Tamamla
            </button>
          </form>
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
      cities,
      adresler: [],
      secilenAdresId: null,
      adresSecimi: false,
      yeniAdresFormu: false,
      order: [
        {
          TC: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          country: "Türkiye",
          state: "İstanbul",
          zip: "",
        },
      ],
      payment: [{ name: "", number: "", exp: "", cvv: "" }],
    };
  },
  mounted() {
    this.kullaniciKontrol();
  },
  computed: {
    // İNDİRİMSİZ TOPLAM
    normalToplam() {
      return this.sepet.reduce((toplam, urun) => {
        const fiyat = Number(urun.p_price) || 0;
        const adet = Number(urun.adet) || 1;

        return toplam + fiyat * adet;
      }, 0);
    },

    // TOPLAM İNDİRİM
    toplamIndirim() {
      return this.sepet.reduce((toplam, urun) => {
        const fiyat = Number(urun.p_price) || 0;
        const indirim = Number(urun.p_disc) || 0;
        const adet = Number(urun.adet) || 1;

        const normalFiyat = fiyat * adet;

        const indirimliFiyat = fiyat * (1 - indirim / 100) * adet;

        return toplam + (normalFiyat - indirimliFiyat);
      }, 0);
    },

    // İNDİRİMLİ TOPLAM
    toplamTutar() {
      return this.sepet.reduce((toplam, urun) => {
        const fiyat = Number(urun.p_price) || 0;
        const indirim = Number(urun.p_disc) || 0;
        const adet = Number(urun.adet) || 1;

        const indirimliFiyat = fiyat * (1 - indirim / 100);

        return toplam + indirimliFiyat * adet;
      }, 0);
    },
  },
  methods: {
    async kullaniciKontrol() {
      const token = sessionStorage.getItem("token");

      if (token) {
        this.adresSecimi = true;
        await this.adresleriGetir();
      } else {
        this.adresSecimi = false;
      }
    },

    async adresleriGetir() {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Adresler getirilemedi.");
        }

        this.adresler = data;
      } catch (e) {
        console.error("ADRES GETİRME HATASI:", e);

        this.toast("Kayıtlı adresler getirilemedi.", "danger", "Adres Hatası");
      }
    },

    adresiSec(adres) {
      const parcalar = adres.a_person.trim().split(" ");

      this.order[0].firstName = parcalar.shift() || "";
      this.order[0].lastName = parcalar.join(" ");
      this.order[0].email = adres.a_email;
      this.order[0].phone = adres.a_phone;
      this.order[0].address = `${adres.a_neighborhood}, ${adres.a_address}`;

      this.order[0].state = adres.a_city;
      this.order[0].zip = adres.a_zip;

      this.secilenAdresId = adres.a_id;
    },
    async checkOut() {
      try {
        // Doğrulama
        const error = validateCheckout(this.order[0], this.payment[0]);

        if (error) {
          this.toast(error, "danger", "Eksik veya Hatalı Bilgi");
          return;
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
          this.toast(
            "Sipariş vermek için giriş yapmalısınız.",
            "danger",
            "Giriş Gerekli",
          );
          return;
        }

        const res = await fetch(`${this.baseUrl}/api/orders`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            sepet: this.sepet,
            order: this.order[0],
            o_amount: this.toplamTutar,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Sipariş oluşturulamadı.");
        }

        // Sipariş başarılı
        this.toast(
          "Siparişiniz başarıyla oluşturuldu.",
          "success",
          "Sipariş Alındı",
        );

        // Sepeti temizle
        this.sepet.splice(0, this.sepet.length);

        // Checkout sayfasından çık
        this.$router.push("/");
      } catch (e) {
        console.error("SİPARİŞ HATASI:", e);

        this.toast(e.message, "danger", "Sipariş Oluşturulamadı");
      }
    },

    deleteProduct(index) {
      this.sepet.splice(index, 1);
      this.toast("Ürün sepetten kaldırıldı.", "success", "Sepet Güncellendi");
    },

    artir(value) {
      if (value.adet) {
        value.adet++;
      } else {
        value.adet = 2;
      }
    },

    azalt(value, index) {
      if (value.adet && value.adet > 1) {
        value.adet--;
      } else {
        this.deleteProduct(index);
      }
    },

    formatExpiration(event) {
      let value = event.target.value.replace(/\D/g, "");

      if (value.length > 4) {
        value = value.substring(0, 4);
      }

      if (value.length >= 3) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }

      this.payment.exp = value;
    },
  },
};
</script>

<style scoped>
.checkout-cart {
  list-style: none;
  padding: 0;
  margin: 0;
}

.checkout-product {
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  background: #fff;
}

/* ÜST KISIM */

.checkout-product-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.checkout-product-image {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 9px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.checkout-product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}

.checkout-product-info {
  flex: 1;
  min-width: 0;
  padding-top: 2px;
}

.checkout-product-name {
  font-size: 14px;
  font-weight: 600;
  color: #222;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.checkout-product-model {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

/* FİYAT */

.checkout-product-price {
  text-align: right;
  flex-shrink: 0;
  min-width: 85px;
}

.checkout-old-price {
  font-size: 11px;
  color: #999;
  text-decoration: line-through;
}

.checkout-discount {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  color: #198754;
  background: #eaf7ef;
  padding: 2px 5px;
  border-radius: 4px;
  margin: 2px 0;
}

.checkout-new-price {
  font-size: 14px;
  font-weight: 700;
  color: #198754;
  white-space: nowrap;
}

/* ALT KISIM */

.checkout-product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

/* ADET */

.checkout-quantity {
  display: flex;
  align-items: center;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 7px;
  overflow: hidden;
}

.checkout-quantity button {
  width: 32px;
  height: 32px;
  border: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.checkout-quantity button:hover {
  background: #f5f5f5;
}

.checkout-quantity span {
  width: 34px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
}

/* SİL */

.checkout-delete {
  border: 0;
  background: transparent;
  color: #999;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.checkout-delete:hover {
  color: #dc3545;
}

/* TOPLAM */

.checkout-summary {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  background: #fff;
}

.checkout-final-price {
  color: #198754;
  font-size: 20px;
}

/* MOBİL */

@media (max-width: 576px) {
  .checkout-product {
    padding: 12px;
  }

  .checkout-product-image {
    width: 62px;
    height: 62px;
  }

  .checkout-product-name {
    font-size: 13px;
  }

  .checkout-product-price {
    min-width: 78px;
  }

  .checkout-new-price {
    font-size: 13px;
  }
}
</style>
