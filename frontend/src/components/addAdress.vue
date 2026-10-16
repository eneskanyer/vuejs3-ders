<template>
  <div class="container py-5">
    <div class="mb-4">
      <h2 class="mb-1 fs-3 fw-semibold text-dark">Adreslerim</h2>
      <p class="mb-0 small text-secondary">
        Kayıtlı teslimat adreslerinizi buradan yönetebilirsiniz.
      </p>
    </div>

    <div class="row g-4 align-items-start">
      <div class="col-12 col-lg-4 col-xl-3">
        <div class="border bg-white p-3">
          <div
            class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3"
          >
            <div>
              <h4 class="mb-1 fs-6 fw-semibold">Kayıtlı Adresler</h4>
              <span class="small text-secondary">
                {{ addresses.length }} adres
              </span>
            </div>
            <button
              class="btn btn-dark btn-sm rounded-0"
              @click="addAdress(true)"
            >
              <i class="bi bi-plus-lg me-1"></i> Yeni
            </button>
          </div>

          <div v-if="addresses.length > 0" class="d-flex flex-column gap-2">
            <div
              v-for="address in addresses"
              :key="address.a_id"
              class="border bg-light p-3"
            >
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="bi bi-geo-alt-fill"></i>
                <strong class="small"> {{ address.a_title }} </strong>
              </div>

              <div class="small fw-medium">{{ address.a_person }}</div>

              <div class="small text-secondary mt-1">{{ address.a_phone }}</div>

              <div class="small text-body-secondary mt-2">
                {{ address.a_address }}
              </div>

              <div class="small text-secondary mt-1">
                {{ address.a_neighborhood }}, {{ address.a_district }} /
                {{ address.a_city }}
              </div>

              <div class="d-flex gap-2 mt-3">
                <button
                  class="btn btn-outline-dark btn-sm rounded-0 flex-fill"
                  @click="updateAdress(address)"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-outline-danger btn-sm rounded-0 flex-fill"
                  @click="deleteAdress(address)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-secondary py-4">
            <i class="bi bi-geo-alt fs-2 d-block mb-2"></i>
            <span class="small"> Kayıtlı adresiniz bulunmamaktadır. </span>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8 col-xl-9">
        <div
          v-if="showAddForm"
          class="address-form-wrapper border bg-white p-3 p-md-4"
        >
          <div class="d-flex align-items-center gap-3">
            <div
              class="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style="width: 45px; height: 45px"
            >
              <i class="bi bi-plus-lg"></i>
            </div>
            <div>
              <h3 class="mb-1 fs-5 fw-semibold">Yeni Adres Ekle</h3>
              <p class="mb-0 small text-secondary">
                Yeni teslimat adresinizi ekleyin.
              </p>
            </div>
          </div>
          <hr class="my-4" />

          <form @submit.prevent="addAdress()">
            <div class="mb-4">
              <label class="form-label small fw-medium">
                Adres Başlığı <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control rounded-0"
                v-model="newAddress.a_title"
                placeholder="Örn: Ev, İş, Aile"
              />
            </div>

            <div class="row">
              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  Ad Soyad <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="newAddress.a_person"
                  placeholder="Ad Soyad"
                />
              </div>

              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  E-Mail <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="newAddress.a_email"
                  placeholder="mailto@gmail.com"
                />
              </div>

              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  Telefon <span class="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  class="form-control rounded-0"
                  v-model="newAddress.a_phone"
                  placeholder="05XX XXX XX XX"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  İl <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="newAddress.a_city"
                  placeholder="İl"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  İlçe <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="newAddress.a_district"
                  placeholder="İlçe"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-medium">
                Mahalle <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control rounded-0"
                v-model="newAddress.a_neighborhood"
                placeholder="Mahalle"
              />
            </div>

            <div class="mb-4">
              <label class="form-label small fw-medium">
                Açık Adres <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control rounded-0"
                rows="5"
                v-model="newAddress.a_address"
                placeholder="Cadde, sokak, bina no, daire no vb."
              ></textarea>
            </div>

            <div class="col-md-6 mb-4">
              <label class="form-label small fw-medium">
                Posta Kodu <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control rounded-0"
                v-model="newAddress.a_zip"
                placeholder="00000"
              />
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                class="btn btn-light rounded-0 px-3"
                @click="showAddForm = false"
              >
                Vazgeç
              </button>
              <button type="submit" class="btn btn-dark rounded-0 px-3">
                <i class="bi bi-check-lg me-2"></i> Adresi Kaydet
              </button>
            </div>
          </form>
        </div>

        <div
          v-if="showUpdateForm"
          class="address-form-wrapper border bg-white p-3 p-md-4"
        >
          <div class="d-flex align-items-center gap-3">
            <div
              class="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style="width: 45px; height: 45px"
            >
              <i class="bi bi-pencil"></i>
            </div>
            <div>
              <h3 class="mb-1 fs-5 fw-semibold">Adresi Güncelle</h3>
              <p class="mb-0 small text-secondary">
                Adres bilgilerinizi güncelleyin.
              </p>
            </div>
          </div>
          <hr class="my-4" />

          <form @submit.prevent="updateAdress()">
            <div class="mb-4">
              <label class="form-label small fw-medium">
                Adres Başlığı <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control rounded-0"
                v-model="updateAddress.a_title"
                placeholder="Örn: Ev, İş, Aile"
              />
            </div>

            <div class="row">
              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  Ad Soyad <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="updateAddress.a_person"
                  placeholder="Ad Soyad"
                />
              </div>

              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  E-Mail <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="updateAddress.a_email"
                  placeholder="mailto@gmail.com"
                />
              </div>

              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  Telefon <span class="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  class="form-control rounded-0"
                  v-model="updateAddress.a_phone"
                  placeholder="05XX XXX XX XX"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  İl <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="updateAddress.a_city"
                  placeholder="İl"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="form-label small fw-medium">
                  İlçe <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  v-model="updateAddress.a_district"
                  placeholder="İlçe"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-medium">
                Mahalle <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control rounded-0"
                v-model="updateAddress.a_neighborhood"
                placeholder="Mahalle"
              />
            </div>

            <div class="mb-4">
              <label class="form-label small fw-medium">
                Açık Adres <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control rounded-0"
                rows="5"
                v-model="updateAddress.a_address"
                placeholder="Cadde, sokak, bina no, daire no vb."
              ></textarea>
            </div>

            <div class="col-md-6 mb-4">
              <label class="form-label small fw-medium">
                Posta Kodu <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control rounded-0"
                v-model="updateAddress.a_zip"
                placeholder="00000"
              />
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                class="btn btn-light rounded-0 px-3"
                @click="showUpdateForm = false"
              >
                Vazgeç
              </button>
              <button type="submit" class="btn btn-dark rounded-0 px-3">
                <i class="bi bi-check-lg me-2"></i> Adresi Güncelle
              </button>
            </div>
          </form>
        </div>

        <div
          v-if="!showAddForm && !showUpdateForm"
          class="border d-flex flex-column align-items-center justify-content-center text-center p-4 p-md-5"
        >
          <i class="bi bi-geo-alt fs-1 text-secondary mb-3"></i>
          <h4 class="fs-5 mb-2">Adres seçin veya yeni adres ekleyin</h4>
          <p class="small text-secondary mb-3">
            Sol taraftan mevcut adresinizi güncelleyebilir veya yeni bir adres
            ekleyebilirsiniz.
          </p>
          <button class="btn btn-dark rounded-0" @click="addAdress(true)">
            <i class="bi bi-plus-lg me-2"></i> Yeni Adres Ekle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["toast"],
  data() {
    return {
      baseUrl: "http://localhost:3001",

      addresses: [],

      showAddForm: false,
      showUpdateForm: false,

      newAddress: {
        a_title: "",
        a_person: "",
        a_email: "",
        a_phone: "",
        a_city: "",
        a_district: "",
        a_neighborhood: "",
        a_address: "",
        a_zip: "",
      },

      updateAddress: {
        a_id: null,
        a_title: "",
        a_person: "",
        a_email: "",
        a_phone: "",
        a_city: "",
        a_district: "",
        a_neighborhood: "",
        a_address: "",
        a_zip: "",
      },
    };
  },

  async mounted() {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.toast("Önce giriş yapmalısınız.", "warning", "Giriş Gerekli");
        return;
      }

      const res = await fetch(`${this.baseUrl}/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Adresler alınamadı.");
      }

      this.addresses = data;
    } catch (error) {
      this.toast(error.message, "danger", "Adresler Alınamadı");
    }
  },

  methods: {
    async addAdress(openForm = false) {
      try {
        if (openForm) {
          this.showAddForm = true;
          this.showUpdateForm = false;

          this.newAddress = {
            a_title: "",
            a_person: "",
            a_email: "",
            a_phone: "",
            a_city: "",
            a_district: "",
            a_neighborhood: "",
            a_address: "",
            a_zip: "",
          };

          return;
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
          this.toast("Önce giriş yapmalısınız.", "warning", "Giriş Gerekli");
          return;
        }

        if (
          !this.newAddress.a_title.trim() ||
          !this.newAddress.a_person.trim() ||
          !this.newAddress.a_email.trim() ||
          !this.newAddress.a_phone.trim() ||
          !this.newAddress.a_city.trim() ||
          !this.newAddress.a_district.trim() ||
          !this.newAddress.a_neighborhood.trim() ||
          !this.newAddress.a_address.trim() ||
          !this.newAddress.a_zip.trim()
        ) {
          this.toast("Lütfen tüm alanları doldurun.", "warning", "Eksik Bilgi");
          return;
        }

        const res = await fetch(`${this.baseUrl}/api/addresses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            a_title: this.newAddress.a_title.trim(),
            a_person: this.newAddress.a_person.trim(),
            a_email: this.newAddress.a_email.trim(),
            a_phone: this.newAddress.a_phone.trim(),
            a_city: this.newAddress.a_city.trim(),
            a_district: this.newAddress.a_district.trim(),
            a_neighborhood: this.newAddress.a_neighborhood.trim(),
            a_address: this.newAddress.a_address.trim(),
            a_zip: this.newAddress.a_zip.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Adres eklenemedi.");
        }

        this.addresses.push({
          a_id: data.a_id,
          ...this.newAddress,
        });

        this.toast("Adres başarıyla eklendi.", "success", "Adres Eklendi");

        this.showAddForm = false;

        this.newAddress = {
          a_title: "",
          a_person: "",
          a_email: "",
          a_phone: "",
          a_city: "",
          a_district: "",
          a_neighborhood: "",
          a_address: "",
          a_zip: "",
        };
      } catch (error) {
        this.toast(error.message, "danger", "Adres Eklenemedi");
      }
    },

    async updateAdress(address = null) {
      try {
        if (address) {
          this.showUpdateForm = true;
          this.showAddForm = false;

          this.updateAddress = {
            a_id: address.a_id,
            a_title: address.a_title,
            a_person: address.a_person,
            a_email: address.a_email,
            a_phone: address.a_phone,
            a_city: address.a_city,
            a_district: address.a_district,
            a_neighborhood: address.a_neighborhood,
            a_address: address.a_address,
            a_zip: address.a_zip,
          };

          this.$nextTick(() => {
            document.querySelector(".address-form-wrapper")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });

          return;
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
          this.toast("Önce giriş yapmalısınız.", "warning", "Giriş Gerekli");
          return;
        }

        if (!this.updateAddress.a_id) {
          this.toast(
            "Güncellenecek adres bulunamadı.",
            "warning",
            "Adres Bulunamadı",
          );
          return;
        }

        if (
          !this.updateAddress.a_title.trim() ||
          !this.updateAddress.a_person.trim() ||
          !this.updateAddress.a_email.trim() ||
          !this.updateAddress.a_phone.trim() ||
          !this.updateAddress.a_city.trim() ||
          !this.updateAddress.a_district.trim() ||
          !this.updateAddress.a_neighborhood.trim() ||
          !this.updateAddress.a_address.trim() ||
          !this.updateAddress.a_zip.trim()
        ) {
          this.toast("Lütfen tüm alanları doldurun.", "warning", "Eksik Bilgi");
          return;
        }

        const res = await fetch(
          `${this.baseUrl}/api/addresses/${this.updateAddress.a_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              a_title: this.updateAddress.a_title.trim(),
              a_person: this.updateAddress.a_person.trim(),
              a_email: this.updateAddress.a_email.trim(),
              a_phone: this.updateAddress.a_phone.trim(),
              a_city: this.updateAddress.a_city.trim(),
              a_district: this.updateAddress.a_district.trim(),
              a_neighborhood: this.updateAddress.a_neighborhood.trim(),
              a_address: this.updateAddress.a_address.trim(),
              a_zip: this.updateAddress.a_zip.trim(),
            }),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Adres güncellenemedi.");
        }

        const index = this.addresses.findIndex(
          (item) => item.a_id === this.updateAddress.a_id,
        );

        if (index !== -1) {
          this.addresses[index] = {
            ...this.addresses[index],
            ...this.updateAddress,
          };
        }

        this.toast(
          "Adres başarıyla güncellendi.",
          "success",
          "Adres Güncellendi",
        );

        this.showUpdateForm = false;

        this.updateAddress = {
          a_id: null,
          a_title: "",
          a_person: "",
          a_email: "",
          a_phone: "",
          a_city: "",
          a_district: "",
          a_neighborhood: "",
          a_address: "",
          a_zip: "",
        };
      } catch (error) {
        this.toast(error.message, "danger", "Adres Güncellenemedi");
      }
    },

    async deleteAdress(address) {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          this.toast("Önce giriş yapmalısınız.", "warning", "Giriş Gerekli");
          return;
        }

        const onay = confirm(
          `"${address.a_title}" adresini silmek istediğinize emin misiniz?`,
        );

        if (!onay) {
          return;
        }

        const res = await fetch(
          `${this.baseUrl}/api/addresses/${address.a_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Adres silinemedi.");
        }

        this.addresses = this.addresses.filter(
          (item) => item.a_id !== address.a_id,
        );

        this.toast("Adres başarıyla silindi.", "success", "Adres Silindi");
      } catch (error) {
        this.toast(error.message, "danger", "Adres Silinemedi");
      }
    },
  },
};
</script>

<style scoped></style>
