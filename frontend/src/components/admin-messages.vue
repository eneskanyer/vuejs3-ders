<template>
  <h3>Mesajlar</h3>
  <div class="d-flex flex-wrap gap-2 mb-3">
    <button
      type="button"
      class="btn btn-sm"
      :class="activeMessagesStatus === 'Tümü' ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeMessagesStatus = 'Tümü'"
    >
      <i class="bi bi-grid me-1"></i>
      Tümü
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="activeMessagesStatus === 1 ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeMessagesStatus = 1"
    >
      <i class="bi bi-person-check-fill"></i>
      Yanıtlananlar
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="activeMessagesStatus === 0 ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeMessagesStatus = 0"
    >
      <i class="bi bi-person-x-fill"></i>
      Yanıtlanmayanlar
    </button>
  </div>
  <div class="table-responsive">
    <table class="table align-middle text-nowrap admin-table">
      <thead>
        <tr>
          <th scope="col">Tarih</th>
          <th scope="col">Ad Soyad:</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Telefon</th>
          <th scope="col">Konu</th>
          <th scope="col">Mesaj</th>
          <th scope="col">Durum</th>
          <th scope="col">İşlem</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(m, index) in filteredMessages">
          <td>
            <label>{{ m.m_created_at.split("T")[0] }}</label>
          </td>

          <td>
            <label>{{ m.m_firstName }} {{ m.m_lastName }}</label>
          </td>
          <td>
            <label>{{ m.m_email }}</label>
          </td>
          <td>
            <label>{{ m.m_code }}{{ m.m_tel }}</label>
          </td>
          <td>
            <label>{{ m.m_subject }}</label>
          </td>
          <td>
            <label>{{ m.m_messages }}</label>
          </td>
          <td>
            <select
              :style="m.m_status == 0 ? 'color:red' : 'color:green'"
              class="form-select shadow-sm"
              v-model="m.m_status"
              @change="updateMessage(m)"
            >
              <option style="color: black" :value="0">Yanıtlanmadı</option>

              <option style="color: black" :value="1">Yanıtlandı</option>
            </select>
          </td>

          <td>
            <!-- E-POSTA -->
            <a
              :href="`mailto:${m.m_email}?subject=${encodeURIComponent('Mesajınıza Yanıt')}&body=${encodeURIComponent(`Merhaba ${m.m_firstName} ${m.m_lastName},

Novera Gözlük olarak mesajınızla ilgili size dönüş yapmak istedim.

İyi günler.`)}`"
              class="btn btn-sm btn-outline-success m-2"
            >
              <i class="bi bi-envelope-at"></i>
            </a>

            <!-- WHATSAPP -->
            <a
              :href="`https://wa.me/90${m.m_tel}?text=${encodeURIComponent(`Merhaba ${m.m_firstName} ${m.m_lastName},

Novera Gözlük olarak mesajınızla ilgili size ulaşıyorum.`)}`"
              target="_blank"
              class="btn btn-sm btn-outline-success"
            >
              <i class="bi bi-whatsapp"></i>
            </a>

            <!-- SİL -->
            <button
              style="margin-left: 10px"
              class="btn-sm btn btn-outline-danger"
              @click="deleteMessage(m.m_id)"
            >
              <i class="bi bi-x-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ["toast"],

  data() {
    return {
      detailID: 0,
      messages: [],
      activeMessagesStatus: "Tümü",
      baseUrl: "http://localhost:3001",
      error: null,
    };
  },

  mounted() {
    this.getMessages();
  },
  computed: {
    filteredMessages() {
      if (this.activeMessagesStatus === "Tümü") {
        return this.messages;
      }

      return this.messages.filter(
        (message) => message.m_status === this.activeMessagesStatus,
      );
    },
  },
  methods: {
    // Get

    async getMessages() {
      this.error = null;

      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Mesajlar getirilemedi.");
        }

        this.messages = data;
      } catch (e) {
        this.error = e.message;
      }
    },

    async deleteMessage(id) {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/messages/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Mesaj silinemedi.");
        }

        this.toast("Mesaj başarıyla silindi.", "success", "Mesaj Silindi");

        this.getMessages();
      } catch (e) {
        console.error("MESAJ SİLME HATASI:", e.message);

        this.toast(e.message, "danger", "Mesaj Silinemedi");
      }
    },

    async updateMessage(m) {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${this.baseUrl}/api/messages/${m.m_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            m_status: m.m_status,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Durum güncellenemedi.");
        }

        this.toast(
          m.m_status == 1
            ? "Mesaj YANITLANDI olarak işaretlendi."
            : "Mesaj YANITLANMADI olarak işaretlendi.",
          "success",
          "Durum Güncellendi",
        );
      } catch (e) {
        console.error("STATUS UPDATE HATASI:", e.message);

        this.toast(e.message, "danger", "Durum Güncellenemedi");

        this.getMessages();
      }
    },
  },
};
</script>

<style scoped>
.admin-table {
  min-width: 1200px;
}
.admin-table input {
  min-width: 100px;
}
</style>
