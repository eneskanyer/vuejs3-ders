<template>
  <h3>Siparişler</h3>
  <div class="d-flex flex-wrap gap-2 mb-3">
    <button
      type="button"
      class="btn btn-sm"
      :class="activeOrderStatus === 'Tümü' ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeOrderStatus = 'Tümü'"
    >
      <i class="bi bi-grid me-1"></i>
      Tümü
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="
        activeOrderStatus === 'Hazırlanıyor' ? 'btn-dark' : 'btn-outline-dark'
      "
      @click="activeOrderStatus = 'Hazırlanıyor'"
    >
      <i class="bi bi-hourglass-split"></i>
      Bekleyenler
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="
        activeOrderStatus === 'Kargoya Verildi'
          ? 'btn-dark'
          : 'btn-outline-dark'
      "
      @click="activeOrderStatus = 'Kargoya Verildi'"
    >
      <i class="bi bi-box-seam"></i>
      Kargoya Verilenler
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="
        activeOrderStatus === 'Teslim Edildi' ? 'btn-dark' : 'btn-outline-dark'
      "
      @click="activeOrderStatus = 'Teslim Edildi'"
    >
      <i class="bi bi-check-circle-fill"></i>
      Teslim Edilenler
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="
        activeOrderStatus === 'İptal Edildi' ? 'btn-dark' : 'btn-outline-dark'
      "
      @click="activeOrderStatus = 'İptal Edildi'"
    >
      <i class="bi bi-x-circle-fill"></i>
      İptal Edilenler
    </button>
  </div>
  <div>
    <div class="table-responsive">
      <table class="table align-middle text-nowrap admin-table">
        <thead>
          <tr>
            <th scope="col">Sipariş No</th>
            <th scope="col">Toplam Tutar(₺)</th>
            <th scope="col">Verilen Tarihi</th>
            <th scope="col">Sipariş Durumu</th>
            <th scope="col">İşlem</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(order, index) in filteredOrders" :key="order.o_id">
            <td>
              <label>{{ order.o_no }}</label>
            </td>

            <td>
              <label>{{ order.o_amount }}</label>
            </td>

            <td>
              <label>{{ order.o_date }}</label>
            </td>

            <td>
              <!-- Admin -->
              <select v-if="Admin" class="form-select" v-model="order.o_status">
                <option value="Hazırlanıyor">Hazırlanıyor</option>
                <option value="Kargoya Verildi">Kargoya Verildi</option>
                <option value="Teslim Edildi">Teslim Edildi</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>

              <!-- Normal kullanıcı -->
              <span v-else>
                {{ order.o_status }}
              </span>
            </td>

            <td>
              <!-- Güncelle -->
              <button
                v-if="Admin"
                @click="updateOrder(order.o_id, order.o_status)"
                class="btn-sm btn btn-outline-primary"
              >
                <i class="bi bi-pencil-square"></i>
              </button>

              <!-- Sil -->
              <button
                v-if="Admin"
                style="margin-left: 10px"
                class="btn-sm btn btn-outline-danger"
                @click="deleteOrder(order.o_id)"
              >
                <i class="bi bi-x-square"></i>
              </button>

              <!-- Detaylar -->
              <button
                style="margin-left: 10px"
                @click="detailID = index"
                type="button"
                class="btn-sm btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#details"
              >
                <i class="bi bi-info-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Order Details Modal -->
    <div v-if="orders.length > 0" class="modal fade" id="details" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Sipariş Detayları</h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <p>
              <strong>Sipariş ID:</strong>
              {{ orders[detailID].o_id }}
            </p>

            <p>
              <strong>Sipariş No:</strong>
              {{ orders[detailID].o_no }}
            </p>

            <p>
              <strong>Ürünler:</strong>
            </p>

            <ul>
              <li
                v-for="(product, index) in orders[detailID].o_products"
                :key="index"
              >
                {{ product.p_name }} {{ product.p_model }}

                <span class="adet"> Adet: {{ product.adet }} </span>
              </li>
            </ul>

            <p>
              <strong>Sipariş Veren:</strong>
              {{ orders[detailID].o_person }}
            </p>

            <p>
              <strong>Sipariş Adresi:</strong>
              {{ orders[detailID].o_address }}
            </p>

            <p>
              <strong>TC No:</strong>
              {{ orders[detailID].o_tc }}
            </p>

            <p>
              <strong>Telefon Numarası:</strong>
              {{ orders[detailID].o_phone }}
            </p>

            <p>
              <strong>Toplam Tutar:</strong>
              {{ orders[detailID].o_amount }} ₺
            </p>

            <p>
              <strong>Sipariş Tarihi:</strong>
              {{ orders[detailID].o_date }}
            </p>

            <p>
              <strong>Sipariş Durumu:</strong>
              {{ orders[detailID].o_status }}
            </p>
          </div>
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
      detailID: 0,
      orders: [],
      activeOrderStatus: "Tümü",
      error: null,
      baseUrl: "http://localhost:3001",
      Admin: false,
    };
  },

  async mounted() {
    await this.adminKontrol();
    await this.getOrders();
  },
  computed: {
    filteredOrders() {
      if (this.activeOrderStatus === "Tümü") {
        return this.orders;
      }

      return this.orders.filter(
        (order) => order.o_status === this.activeOrderStatus,
      );
    },
  },

  methods: {
    // GET ORDERS
    async adminKontrol() {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          this.Admin = false;
          return;
        }

        const res = await fetch(`${this.baseUrl}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          this.Admin = false;
          return;
        }

        const data = await res.json();
        this.Admin = Number(data.u_role) === 1;
      } catch (error) {
        console.error("Admin kontrol hatası:", error);
        this.Admin = false;
      }
    },
    async getOrders() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Siparişler alınamadı.");
        }

        this.orders = data;

        this.orders = data.map((order) => ({
          ...order,
          o_products:
            typeof order.o_products === "string"
              ? JSON.parse(order.o_products)
              : order.o_products,
        }));
      } catch (error) {
        console.error("Siparişleri getirme hatası:", error);
      }
    },

    async deleteOrder(id) {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/orders/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Sipariş silinemedi.");
        }

        this.toast("Sipariş başarıyla silindi.", "success", "Sipariş Silindi");

        await this.getOrders();
      } catch (e) {
        console.error("Sipariş silme hatası:", e.message);

        this.toast(
          e.message || "Sipariş silinemedi.",
          "danger",
          "Silme Hatası",
        );
      }
    },

    async updateOrder(id, o_status) {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const res = await fetch(`${this.baseUrl}/api/orders/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            o_status: o_status,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Sipariş güncellenemedi.");
        }

        this.toast(
          "Sipariş durumu başarıyla güncellendi.",
          "success",
          "Sipariş Güncellendi",
        );

        await this.getOrders();
      } catch (e) {
        console.error("Sipariş güncelleme hatası:", e.message);

        this.toast(e.message, "danger", "Güncelleme Hatası");
      }
    },
  },
};
</script>

<style scoped>
.adet {
  color: red;
  font-weight: bold;
}
.admin-table {
  min-width: 1000px;
}
.admin-table input {
  min-width: 50px;
}
</style>
