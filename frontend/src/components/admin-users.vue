<template>
  <h3>Kullanıcılar</h3>

  <div class="d-flex flex-wrap gap-2 mb-3">
    <button
      type="button"
      class="btn btn-sm"
      :class="activeUsersRole === 'Tümü' ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeUsersRole = 'Tümü'"
    >
      <i class="bi bi-grid me-1"></i>
      Tümü
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="activeUsersRole === 0 ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeUsersRole = 0"
    >
      <i class="bi bi-person me-1"></i>
      Kullanıcı
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="activeUsersRole === 1 ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeUsersRole = 1"
    >
      <i class="bi bi-person-gear me-1"></i>
      Admin
    </button>

    <button
      type="button"
      class="btn btn-sm btn-outline-success ms-auto"
      data-bs-toggle="modal"
      data-bs-target="#adduser"
    >
      <i class="bi bi-plus-lg me-1"></i>
      Kullanıcı Ekle
    </button>
  </div>

  <div class="table-responsive">
    <table class="table align-middle text-nowrap admin-table">
      <thead>
        <tr>
          <th scope="col">Ad</th>
          <th scope="col">Soyad</th>
          <th scope="col">Email</th>
          <th scope="col">Telefon</th>
          <th scope="col">Parola</th>

          <th scope="col">İşlem</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.u_id">
          <td>
            <input
              class="form-control"
              type="text"
              v-model="user.u_firstName"
              style="width: 180px"
            />
          </td>

          <td>
            <input class="form-control" type="text" v-model="user.u_lastName" style="width: 190px" />
          </td>

          <td>
            <input class="form-control" type="text" v-model="user.u_email" style="width: 300px"/>
          </td>

          <td>
            <input class="form-control" type="text" v-model="user.u_tel" style="width: 115px"/>
          </td>

          <td>
            <input class="form-control" type="text" v-model="user.u_pass" style="width: 70px"/>
          </td>

          <td>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="updateUsers(user)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>

            <button
              type="button"
              style="margin-left: 10px"
              class="btn btn-sm btn-outline-danger"
              @click="deleteUser(user.u_id)"
            >
              <i class="bi bi-x-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Kullanıcı ekle modalı -->
  <div class="modal fade" id="adduser" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Kullanıcı Ekle</h1>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <form @submit.prevent="addUsers()">
          <div class="modal-body row">
            <div class="col-md-6 mb-2">
              <label class="form-label">Ad*</label>

              <input
                type="text"
                class="form-control"
                v-model="newUser[0].firstName"
                required
              />
            </div>

            <div class="col-md-6 mb-2">
              <label class="form-label">Soyad*</label>

              <input
                type="text"
                class="form-control"
                v-model="newUser[0].lastName"
                required
              />
            </div>

            <div class="col-md-6 mb-2">
              <label class="form-label">Email*</label>

              <input
                type="email"
                class="form-control"
                v-model="newUser[0].email"
                placeholder="example@hotmail.com"
                required
              />
            </div>

            <div class="col-md-6 mb-2">
              <label class="form-label">Telefon*</label>

              <input
                type="tel"
                class="form-control"
                v-model="newUser[0].tel"
                placeholder="5xxxxxxxxx"
                required
              />
            </div>

            <div class="col-md-12 mb-2">
              <label class="form-label">Parola*</label>

              <input
                type="password"
                class="form-control"
                v-model="newUser[0].pass"
                required
              />
            </div>

            <div class="col-md-12 mb-2">
              <label class="form-label">Rol</label>

              <select class="form-control" v-model="newUser[0].role">
                <option value="0">Kullanıcı</option>
                <option value="1">Admin</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-success" type="submit">
              Kullanıcı Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validateAdminUser } from "@/utils/validation";

export default {
  inject: ["toast"],

  data() {
    return {
      newUser: [
        {
          firstName: "",
          lastName: "",
          email: "",
          tel: "",
          pass: "",
          role: 0,
          check: true,
        },
      ],

      users: [],
      activeUsersRole: "Tümü",

      usersMessage: null,

      baseUrl: "http://localhost:3001",
    };
  },

  mounted() {
    this.getUsers();
  },
  computed: {
    filteredUsers() {
      if (this.activeUsersRole === "Tümü") {
        return this.users;
      }

      return this.users.filter((user) => user.u_role === this.activeUsersRole);
    },
  },
  methods: {
    async getUsers() {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcılar alınamadı.");
        }

        this.users = data;
      } catch (e) {
        console.error(e.message);

        this.toast(e.message, "danger", "Kullanıcılar Alınamadı");
      }
    },

    async addUsers() {
      try {
        const error = validateAdminUser(this.newUser[0]);

        if (error) {
          this.toast(error, "danger", "Eksik veya Hatalı Bilgi");
          return;
        }

        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: this.newUser[0].firstName,
            lastName: this.newUser[0].lastName,
            email: this.newUser[0].email,
            tel: this.newUser[0].tel,
            pass: this.newUser[0].pass,
            role: this.newUser[0].role,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcı eklenemedi.");
        }

        this.usersMessage = data.message;

        await this.getUsers();

        this.newUser[0].firstName = "";
        this.newUser[0].lastName = "";
        this.newUser[0].email = "";
        this.newUser[0].tel = "";
        this.newUser[0].pass = "";
        this.newUser[0].role = 0;

        this.toast(
          "Kullanıcı başarıyla eklendi.",
          "success",
          "Kullanıcı Eklendi",
        );
      } catch (e) {
        console.error(e.message);
        this.usersMessage = e.message;

        this.toast(e.message, "danger", "Kullanıcı Eklenemedi");
      }
    },

    async updateUsers(user) {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/users/${user.u_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: user.u_firstName,
            lastName: user.u_lastName,
            email: user.u_email,
            tel: user.u_tel,
            pass: user.u_pass,
            role: user.u_role,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcı güncellenemedi.");
        }

        await this.getUsers();

        this.toast(
          "Kullanıcı başarıyla güncellendi.",
          "success",
          "Kullanıcı Güncellendi",
        );
      } catch (e) {
        console.error(e.message);

        this.toast(e.message, "danger", "Güncelleme Hatası");
      }
    },

    async deleteUser(id) {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Kullanıcı silinemedi.");
        }

        await this.getUsers();

        this.toast(
          "Kullanıcı başarıyla silindi.",
          "success",
          "Kullanıcı Silindi",
        );
      } catch (e) {
        console.error(e.message);

        this.toast(e.message, "danger", "Silme Hatası");
      }
    },
  },
};
</script>

<style scoped>
.admin-table {
  min-width: 1000px;
}

.admin-table input {
  min-width: 50px;
}
</style>
