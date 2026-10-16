<template>
  <div class="customer-form">
    <h3 class="customer-form-title">Müşteri Bilgileri</h3>

    <div class="row g-4">
      <!-- Ad -->
      <div class="col-md-6">
        <label class="form-label"> Ad <span>*</span> </label>

        <input type="text" class="form-control" v-model="admin.u_firstName" />
      </div>

      <!-- Soyad -->
      <div class="col-md-6">
        <label class="form-label"> Soyad <span>*</span> </label>

        <input type="text" class="form-control" v-model="admin.u_lastName" />
      </div>

      <!-- E-posta -->
      <div class="col-12">
        <label class="form-label"> E-posta Adresi <span>*</span> </label>

        <input type="email" class="form-control" v-model="admin.u_email" />
      </div>

      <!-- Telefon -->
      <div class="col-12">
        <label class="form-label"> Cep Telefonu <span>*</span> </label>

        <div class="phone-input">
          <div class="country-code">+90</div>

          <input type="text" class="form-control" v-model="admin.u_tel" />
        </div>
      </div>
    </div>

    <!-- Güncelle -->
    <div class="customer-form-footer">
      <button class="btn btn-primary mt-4" @click="updateUsersset">
        <i></i>
        Değiştir
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["toast"],
  data() {
    return {
      users: [],
      admin: {
        u_id: null,
        u_firstName: "",
        u_lastName: "",
        u_email: "",
        u_tel: "",
      },

      usersMessage: null,

      baseUrl: "http://localhost:3001",
    };
  },

  mounted() {
    this.getUsersset();
  },

  methods: {
    // Kullanıcı bilgilerini getir

    async getUsersset() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/getUsersset`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcı bilgileri alınamadı.");
        }

        this.admin.u_id = data.u_id;
        this.admin.u_firstName = data.u_firstName;
        this.admin.u_lastName = data.u_lastName;
        this.admin.u_email = data.u_email;
        this.admin.u_tel = data.u_tel;
      } catch (e) {
        console.log("Kullanıcı bilgisi hatası:", e.message);
      }
    },

    // Kullanıcı bilgilerini güncelle

    async updateUsersset() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/updateUsersset`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: this.admin.u_firstName,
            lastName: this.admin.u_lastName,
            email: this.admin.u_email,
            tel: this.admin.u_tel,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcı güncellenemedi.");
        }

        this.toast(
          "Kullanıcı başarıyla güncellendi.",
          "success",
          "Kullanıcı Güncellendi",
        );

        await this.getUsersset();
      } catch (e) {
        console.log("Güncelleme hatası:", e.message);
      }
    },
  },
};
</script>
