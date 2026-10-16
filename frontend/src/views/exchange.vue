<template>
  <div class="exchange-page">
    <!-- Başlık -->
    <section class="exchange-header">
      <div class="container">
        <h1>İade ve Değişim Şartları</h1>

        <p>
          Siparişlerinizle ilgili iade ve değişim süreçleri hakkında bilgilendirme.
        </p>
      </div>
    </section>

    <!-- İçerik -->
    <section class="exchange-content">
      <div class="container">
        <div class="exchange-card">
          <p class="update-date">
            Son Güncelleme: 25 Ağustos 2026
          </p>

          <h3>1. Genel Bilgilendirme</h3>

          <p>
            Novera Gözlük üzerinden satın aldığınız ürünlerle ilgili iade ve
            değişim işlemleri, ilgili yasal düzenlemeler ve aşağıda belirtilen
            şartlar doğrultusunda gerçekleştirilmektedir.
          </p>

          <h3>2. İade Süreci</h3>

          <p>
            Satın aldığınız ürünü teslim aldığınız tarihten itibaren geçerli
            yasal süre içerisinde iade talebinde bulunabilirsiniz.
          </p>

          <p>
            İade işleminin başlatılabilmesi için ürünün kullanılmamış, zarar
            görmemiş ve mümkünse orijinal ambalajı ile birlikte gönderilmesi
            gerekmektedir.
          </p>

          <h3>3. İade Edilemeyecek Ürünler</h3>

          <p>
            Aşağıdaki durumlarda ürünün iade işlemi kabul edilmeyebilir:
          </p>

          <ul>
            <li>Ürünün kullanılmış veya zarar görmüş olması</li>
            <li>Ürünün orijinal ambalajının ciddi şekilde zarar görmesi</li>
            <li>Kullanıcı hatası nedeniyle oluşan hasarlar</li>
            <li>Hijyen açısından tekrar satışa uygun olmayan ürünler</li>
            <li>Kişiye özel olarak hazırlanmış ürünler</li>
          </ul>

          <h3>4. Değişim İşlemleri</h3>

          <p>
            Satın aldığınız ürün için değişim talebinde bulunabilirsiniz.
            Değişim işlemleri ürünün stok durumuna bağlı olarak
            gerçekleştirilmektedir.
          </p>

          <p>
            Değişim yapılacak ürünün kullanılmamış ve tekrar satışa uygun
            durumda olması gerekmektedir.
          </p>

          <h3>5. Hasarlı veya Yanlış Gönderilen Ürünler</h3>

          <p>
            Siparişinizin hasarlı, eksik veya yanlış gönderildiğini
            düşünüyorsanız, ürünü teslim aldıktan sonra mümkün olan en kısa
            sürede bizimle iletişime geçmeniz gerekmektedir.
          </p>

          <p>
            Yapılacak incelemenin ardından gerekli iade veya değişim işlemleri
            gerçekleştirilecektir.
          </p>

          <h3>6. İade Ödemesi</h3>

          <p>
            İade işleminizin onaylanmasının ardından, ödeme tutarı kullanılan
            ödeme yöntemine uygun şekilde iade edilir.
          </p>

          <p>
            Banka ve ödeme kuruluşlarının işlem sürelerine bağlı olarak
            ücretin hesabınıza yansıma süresi değişiklik gösterebilir.
          </p>

          <h3>7. Kargo Süreci</h3>

          <p>
            İade veya değişim işlemi için ürünün tarafımıza güvenli bir şekilde
            ulaştırılması gerekmektedir. Kargo süreciyle ilgili detaylı bilgiler
            iade talebiniz sırasında tarafınıza bildirilecektir.
          </p>

          <h3>8. İletişim</h3>

          <p>
            İade ve değişim işlemleri hakkında bilgi almak veya talep oluşturmak
            için bizimle iletişime geçebilirsiniz.
          </p>

          <div class="contact-box">
            <div>
              <i class="bi bi-envelope"></i>
              <span>E-posta: info@noveragozluk.com</span>
            </div>

            <div>
              <i class="bi bi-telephone"></i>
              <span>Telefon: 05XX XXX XX XX</span>
            </div>

            <div>
              <i class="bi bi-geo-alt"></i>
              <span>Adres: Kocaeli, Türkiye</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Exchange",
};
</script>

<style scoped>
.exchange-page {
  min-height: 100vh;
  padding-bottom: 70px;
}

/* BAŞLIK */

.exchange-header {
  padding: 80px 0 50px;
  text-align: center;
}

.exchange-header h1 {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
}

.exchange-header p {
  color: #777;
  font-size: 17px;
  margin: 0;
}

/* İÇERİK */

.exchange-content {
  padding-bottom: 50px;
}

.exchange-card {
  max-width: 950px;
  margin: auto;

  padding: 45px;

  border: 1px solid #eeeeee;
  border-radius: 16px;

  background: #fff;
}

.update-date {
  color: #999;
  font-size: 14px;
  margin-bottom: 35px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eeeeee;
}

.exchange-card h3 {
  font-size: 21px;
  font-weight: 700;
  color: #222;
  margin-top: 35px;
  margin-bottom: 15px;
}

.exchange-card p {
  color: #666;
  line-height: 1.8;
  font-size: 15px;
}

.exchange-card ul {
  padding-left: 20px;
  margin-top: 15px;
}

.exchange-card li {
  color: #666;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* İLETİŞİM KUTUSU */

.contact-box {
  margin-top: 25px;
  padding: 25px;

  background: #f8f9fa;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-box div {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #555;
}

.contact-box i {
  font-size: 20px;
  color: #222;
}

/* MOBİL */

@media (max-width: 768px) {
  .exchange-header {
    padding: 55px 0 35px;
  }

  .exchange-header h1 {
    font-size: 30px;
  }

  .exchange-card {
    padding: 25px;
  }

  .exchange-card h3 {
    font-size: 19px;
  }
}

@media (max-width: 576px) {
  .exchange-header h1 {
    font-size: 27px;
  }

  .exchange-header p {
    font-size: 15px;
  }

  .exchange-card {
    padding: 20px;
    border-radius: 12px;
  }

  .exchange-card p,
  .exchange-card li {
    font-size: 14px;
  }
}
</style>