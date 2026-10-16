<template>
  <div class="privacy-page">
    <!-- Başlık -->
    <section class="privacy-header">
      <div class="container">
        <h1>Gizlilik Politikası</h1>

        <p>
          Kişisel verilerinizin gizliliği ve güvenliği bizim için önemlidir.
        </p>
      </div>
    </section>

    <!-- İçerik -->
    <section class="privacy-content">
      <div class="container">
        <div class="privacy-card">

          <p class="update-date">
            Son Güncelleme: 25 Ağustos 2026
          </p>

          <h3>1. Genel Bilgilendirme</h3>

          <p>
            Novera Gözlük olarak ziyaretçilerimizin ve müşterilerimizin kişisel
            verilerinin gizliliğine önem veriyoruz. Bu gizlilik politikası,
            web sitemizi kullanırken toplanabilecek bilgilerin nasıl
            kullanıldığını ve korunduğunu açıklamaktadır.
          </p>

          <h3>2. Toplanan Bilgiler</h3>

          <p>
            Web sitemizi kullanırken aşağıdaki bilgiler tarafımızca
            toplanabilir:
          </p>

          <ul>
            <li>Ad ve soyad bilgisi</li>
            <li>E-posta adresi</li>
            <li>Telefon numarası</li>
            <li>Teslimat ve fatura adresi</li>
            <li>Sipariş ve alışveriş bilgileri</li>
            <li>Web sitesi kullanım bilgileri</li>
          </ul>

          <h3>3. Bilgilerin Kullanımı</h3>

          <p>
            Toplanan bilgiler, hizmetlerimizi sunmak ve geliştirmek amacıyla
            kullanılabilir. Bu bilgiler özellikle aşağıdaki amaçlarla
            işlenebilir:
          </p>

          <ul>
            <li>Sipariş süreçlerinin gerçekleştirilmesi</li>
            <li>Müşteri hizmetlerinin sağlanması</li>
            <li>Ürün ve hizmetlerin geliştirilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Site güvenliğinin sağlanması</li>
          </ul>

          <h3>4. Kişisel Verilerin Korunması</h3>

          <p>
            Kişisel bilgilerinizin güvenliğini sağlamak için gerekli teknik ve
            idari önlemler alınmaktadır. Bilgileriniz yetkisiz erişim, kayıp,
            değiştirme veya kötüye kullanıma karşı korunmaya çalışılır.
          </p>

          <h3>5. Çerezler</h3>

          <p>
            Web sitemizde kullanıcı deneyimini geliştirmek amacıyla çerezler
            kullanılabilir. Çerezler, ziyaretçilerin site kullanım
            tercihlerini hatırlamaya ve web sitesinin daha verimli çalışmasına
            yardımcı olur.
          </p>

          <p>
            Tarayıcı ayarlarınız üzerinden çerezleri engelleyebilir veya
            silebilirsiniz. Ancak bazı çerezlerin devre dışı bırakılması,
            sitenin bazı özelliklerinin düzgün çalışmamasına neden olabilir.
          </p>

          <h3>6. Üçüncü Taraf Hizmetler</h3>

          <p>
            Web sitemiz, üçüncü taraf web sitelerine veya hizmetlerine bağlantı
            verebilir. Bu bağlantılara yönlendirilen kullanıcıların ilgili
            üçüncü tarafların gizlilik politikalarını incelemeleri
            önerilmektedir.
          </p>

          <h3>7. Bilgilerin Paylaşılması</h3>

          <p>
            Kişisel bilgileriniz, yasal zorunluluklar dışında üçüncü kişilerle
            izinsiz olarak paylaşılmaz. Hizmetlerin sunulabilmesi amacıyla
            gerekli durumlarda ödeme, kargo veya teknik hizmet sağlayıcılarıyla
            sınırlı bilgiler paylaşılabilir.
          </p>

          <h3>8. Gizlilik Politikasında Değişiklikler</h3>

          <p>
            Bu gizlilik politikası gerektiğinde güncellenebilir. Yapılan
            değişiklikler bu sayfa üzerinden yayınlanarak yürürlüğe girer.
          </p>

          <h3>9. İletişim</h3>

          <p>
            Gizlilik politikamız veya kişisel verileriniz ile ilgili
            sorularınız için bizimle iletişime geçebilirsiniz.
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
  name: "Sec",
};
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  padding-bottom: 70px;
}

/* BAŞLIK */

.privacy-header {
  padding: 80px 0 50px;
  text-align: center;
}

.privacy-header h1 {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
}

.privacy-header p {
  color: #777;
  font-size: 17px;
  margin: 0;
}

/* İÇERİK */

.privacy-content {
  padding-bottom: 50px;
}

.privacy-card {
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

.privacy-card h3 {
  font-size: 21px;
  font-weight: 700;
  color: #222;
  margin-top: 35px;
  margin-bottom: 15px;
}

.privacy-card p {
  color: #666;
  line-height: 1.8;
  font-size: 15px;
}

.privacy-card ul {
  padding-left: 20px;
  margin-top: 15px;
}

.privacy-card li {
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
  .privacy-header {
    padding: 55px 0 35px;
  }

  .privacy-header h1 {
    font-size: 30px;
  }

  .privacy-card {
    padding: 25px;
  }

  .privacy-card h3 {
    font-size: 19px;
  }
}

@media (max-width: 576px) {
  .privacy-header h1 {
    font-size: 27px;
  }

  .privacy-header p {
    font-size: 15px;
  }

  .privacy-card {
    padding: 20px;
    border-radius: 12px;
  }

  .privacy-card p,
  .privacy-card li {
    font-size: 14px;
  }
}
</style>