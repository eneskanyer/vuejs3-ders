<template>
  <!--! Contact-İçerik -->
  <h1 style="text-align: center; margin-top: 50px">Bize Mesaj Gönderin!</h1>
  <div class="row mt-5">
    <div class="social-links">
      <!-- Instagram -->
      <a
        href="https://www.instagram.com/_noveragozluk/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <i class="bi bi-instagram"></i>
      </a>

      <!-- Facebook -->
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <i class="bi bi-facebook"></i>
      </a>

      <!-- WhatsApp -->
      <a
        href="https://wa.me/905534197143"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <i class="bi bi-whatsapp"></i>
      </a>
    </div>
    <div class="col-md-6">
      <!--! Contact-Form  -->
      <form class="row g-3" @submit.prevent="sendMessage()">
        <div class="col-md-4">
          <label class="form-label">Ad*</label>
          <input
            v-model="newMessage[0].firstName"
            type="text"
            class="form-control"
            required
          />
        </div>

        <div class="col-md-4">
          <label class="form-label">Soyad*</label>
          <input
            v-model="newMessage[0].lastName"
            type="text"
            class="form-control"
            required
          />
        </div>

        <div class="col-md-4">
          <label class="form-label">Email*</label>
          <input
            v-model="newMessage[0].email"
            type="email"
            class="form-control"
            placeholder="example@hotmail.com"
            required
          />
        </div>

        <div class="col-md-3">
          <label class="form-label">Ülke*</label>
          <select v-model="newMessage[0].code" class="form-select" required>
            <option value="+90" selected>TR (+90)</option>
            <option value="+971">BAE (+971)</option>
            <option value="+34">ES (+34)</option>
          </select>
        </div>

        <div class="col-md-5">
          <label class="form-label">Telefon*</label>
          <input
            v-model="newMessage[0].tel"
            type="tel"
            class="form-control"
            required
          />
        </div>

        <div class="col-md-4">
          <label class="form-label">Konu*</label>
          <select v-model="newMessage[0].subject" class="form-select" required>
            <option value="Şikayet">Şikayet</option>
            <option value="Öneri">Öneri</option>
            <option value="Teşekkür" selected>Teşekkür</option>
          </select>
        </div>

        <div class="col-md-12">
          <label class="form-label">Mesaj*</label>
          <textarea
            v-model="newMessage[0].message"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="col-12">
          <div class="form-check">
            <input
              v-model="newMessage[0].check"
              class="form-check-input"
              type="checkbox"
              required
            />
            <label class="form-check-label">
              Bilgilerimin doğruluğunu onaylıyorum.
            </label>
          </div>
        </div>
        <div v-if="status != 'isleniyor'" class="col-12">
          <button class="btn w-100 btn-primary" type="submit">Gönder</button>
        </div>
      </form>
    </div>

    <div class="col-md-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.747303461633!2d28.896969900000002!3d41.0089038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbbc0bff6f61%3A0xa7eb38abd6daa152!2sUNITYVERSE%20ACADEMY!5e0!3m2!1str!2str!4v1774789842170!5m2!1str!2str"
        width="100%"
        height="400"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <!--!Mesaj kısmı-->
    <div class="row">
      <div
        v-if="status == 'basarili'"
        class="alert alert-success alert-dismissible fade show col-6 mt-3 text-center"
        role="alert"
      >
         Mesajınızı Başarıyla Aldık! Düşünceleriniz bizim için değerli. Geri Bildiriminiz için Teşekkürler..
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div
        v-if="status == 'basarisiz'"
        class="alert alert-danger alert-dismissible fade show col-6 mt-3 text-center"
        role="alert"
      >
        Mesajınız Gönderilemedi!
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newMessage: [
        {
          firstName: "",
          lastName: "",
          email: "",
          code: "+90",
          tel: "",
          subject: "Teşekkür",
          message: "",
          check: false,
        },
      ],
      status: "",
      baseUrl: "http://localhost:3001",
    };
  },

  mounted() {},

  methods: {
    async sendMessage() {
      try {
        
        this.status="isleniyor";
        const res = await fetch(`${this.baseUrl}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: this.newMessage[0].firstName,
            lastName: this.newMessage[0].lastName,
            email: this.newMessage[0].email,
            code: this.newMessage[0].code,
            tel: this.newMessage[0].tel,
            subject: this.newMessage[0].subject,
            message: this.newMessage[0].message,
          }),
        });
        if (!res.ok) throw new Error("Contanct endpoint hatası");
        const data = await res.json();

        this.status = "basarili";

        this.newMessage[0].firstName = "";
        this.newMessage[0].lastName = "";
        this.newMessage[0].email = "";
        this.newMessage[0].code = "+90";
        this.newMessage[0].tel = "";
        this.newMessage[0].subject = "Teşekkür";
        this.newMessage[0].message = "";
        this.newMessage[0].check = false;
      } catch (e) {
        this.status = "basarisiz";
        console.log(e.message);
      }
    },
  },
};
</script>

<style>
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  width: 100%;
  margin-bottom: 25px;
}

.social-links a {
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #333;
  color: white;

  text-decoration: none;

  font-size: 28px;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.social-links a:hover {
  background: #555;
  transform: translateY(-5px) scale(1.08);
}
</style>
