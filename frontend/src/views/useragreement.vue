<template>
  <div class="agreement-page">
    <!-- Başlık -->
    <section class="agreement-header">
      <div class="container">
        <h1>Kullanıcı Sözleşmesi</h1>

        <p>
          Web sitemizi kullanırken geçerli olan kullanım koşulları ve kurallar.
        </p>
      </div>
    </section>

    <!-- İçerik -->
    <section class="agreement-content">
      <div class="container">
        <div class="agreement-card">
          <p class="update-date">
            Son Güncelleme: 25 Ağustos 2026
          </p>

          <h3>1. Taraflar</h3>

          <p>
            İşbu Kullanıcı Sözleşmesi, Novera Gözlük web sitesini kullanan
            kullanıcı ile site hizmetlerini sunan Novera Gözlük arasında,
            kullanıcının web sitesini ziyaret etmesi ve kullanmasıyla birlikte
            yürürlüğe girer.
          </p>

          <h3>2. Sözleşmenin Konusu</h3>

          <p>
            Bu sözleşmenin konusu, kullanıcıların web sitesinden
            faydalanmasına ilişkin kullanım şartlarının, hakların ve
            yükümlülüklerin belirlenmesidir.
          </p>

          <h3>3. Kullanıcı Yükümlülükleri</h3>

          <p>
            Kullanıcı, web sitesini kullanırken yürürlükteki yasalara ve genel
            ahlak kurallarına uygun hareket etmeyi kabul eder.
          </p>

          <ul>
            <li>Web sitesini hukuka aykırı amaçlarla kullanmamayı,</li>
            <li>Diğer kullanıcıların haklarını ihlal etmemeyi,</li>
            <li>Sitenin güvenliğini tehlikeye atacak işlemler yapmamayı,</li>
            <li>Yanıltıcı veya yanlış bilgi paylaşmamayı,</li>
            <li>Site hizmetlerinin çalışmasını engelleyecek davranışlardan kaçınmayı kabul eder.</li>
          </ul>

          <h3>4. Üyelik ve Hesap Güvenliği</h3>

          <p>
            Kullanıcı, üyelik işlemleri sırasında verdiği bilgilerin doğru ve
            güncel olduğunu kabul eder. Kullanıcı hesabına ait kullanıcı adı,
            şifre ve diğer giriş bilgilerinin güvenliğinden kendisi sorumludur.
          </p>

          <p>
            Kullanıcının hesabı üzerinden gerçekleştirilen işlemlerin, aksi
            kanıtlanmadıkça hesap sahibi tarafından gerçekleştirildiği kabul
            edilir.
          </p>

          <h3>5. Hizmetlerde Değişiklik</h3>

          <p>
            Novera Gözlük, web sitesinde sunulan hizmetleri, içerikleri,
            ürünleri veya özellikleri gerekli gördüğü durumlarda değiştirme,
            güncelleme veya kaldırma hakkını saklı tutar.
          </p>

          <h3>6. Fikri Mülkiyet Hakları</h3>

          <p>
            Web sitesinde yer alan logo, tasarım, metin, görsel, marka ve diğer
            içeriklere ilişkin fikri ve sınai mülkiyet hakları ilgili hak
            sahiplerine aittir.
          </p>

          <p>
            Kullanıcılar, web sitesinde bulunan içerikleri izin almadan
            kopyalayamaz, çoğaltamaz, değiştiremez veya ticari amaçlarla
            kullanamaz.
          </p>

          <h3>7. Üçüncü Taraf Bağlantıları</h3>

          <p>
            Web sitemiz üçüncü taraf internet sitelerine bağlantılar
            içerebilir. Bu bağlantılar yalnızca kullanıcıya kolaylık sağlamak
            amacıyla sunulmaktadır.
          </p>

          <p>
            Novera Gözlük, üçüncü taraf web sitelerinin içeriklerinden,
            hizmetlerinden veya gizlilik uygulamalarından sorumlu değildir.
          </p>

          <h3>8. Sorumluluğun Sınırlandırılması</h3>

          <p>
            Web sitesinin kesintisiz, hatasız veya tamamen güvenli şekilde
            çalışacağı garanti edilmemektedir. Teknik bakım, güncelleme veya
            beklenmeyen durumlar nedeniyle hizmetlerde geçici kesintiler
            yaşanabilir.
          </p>

          <h3>9. Sözleşmede Değişiklik</h3>

          <p>
            Novera Gözlük, gerekli gördüğü durumlarda bu kullanıcı
            sözleşmesinde değişiklik yapabilir. Güncel sözleşme metni web
            sitesinde yayınlandığı tarihten itibaren geçerli olur.
          </p>

          <h3>10. Uygulanacak Hukuk</h3>

          <p>
            Bu sözleşmenin uygulanmasında Türkiye Cumhuriyeti kanunları
            geçerlidir. Taraflar arasında doğabilecek uyuşmazlıklarda ilgili
            yasal düzenlemeler çerçevesinde yetkili mahkeme ve icra daireleri
            yetkilidir.
          </p>

          <h3>11. İletişim</h3>

          <p>
            Kullanıcı sözleşmesi hakkında sorularınız veya talepleriniz için
            bizimle iletişime geçebilirsiniz.
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
  name: "UserAgreement",
};
</script>

<style scoped>
.agreement-page {
  min-height: 100vh;
  padding-bottom: 70px;
}

/* BAŞLIK */

.agreement-header {
  padding: 80px 0 50px;
  text-align: center;
}

.agreement-header h1 {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
}

.agreement-header p {
  color: #777;
  font-size: 17px;
  margin: 0;
}

/* İÇERİK */

.agreement-content {
  padding-bottom: 50px;
}

.agreement-card {
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

.agreement-card h3 {
  font-size: 21px;
  font-weight: 700;
  color: #222;
  margin-top: 35px;
  margin-bottom: 15px;
}

.agreement-card p {
  color: #666;
  line-height: 1.8;
  font-size: 15px;
}

.agreement-card ul {
  padding-left: 20px;
  margin-top: 15px;
}

.agreement-card li {
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
  .agreement-header {
    padding: 55px 0 35px;
  }

  .agreement-header h1 {
    font-size: 30px;
  }

  .agreement-card {
    padding: 25px;
  }

  .agreement-card h3 {
    font-size: 19px;
  }
}

@media (max-width: 576px) {
  .agreement-header h1 {
    font-size: 27px;
  }

  .agreement-header p {
    font-size: 15px;
  }

  .agreement-card {
    padding: 20px;
    border-radius: 12px;
  }

  .agreement-card p,
  .agreement-card li {
    font-size: 14px;
  }
}
</style>