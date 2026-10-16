<template>
  <h3>Ürünler</h3>
  <!-- ÜRÜN TÜRÜ FİLTRESİ -->
  <div class="d-flex flex-wrap gap-2 mb-3">
    <button
      type="button"
      class="btn btn-sm"
      :class="activeProductType === 'Tümü' ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeProductType = 'Tümü'"
    >
      <i class="bi bi-grid me-1"></i>
      Tümü
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="activeProductType === 'Gozluk' ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeProductType = 'Gozluk'"
    >
      <i class="bi bi-eyeglasses me-1"></i>
      Gözlük
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="activeProductType === 'Saat' ? 'btn-dark' : 'btn-outline-dark'"
      @click="activeProductType = 'Saat'"
    >
      <i class="bi bi-watch me-1"></i>
      Saat
    </button>

    <button
      type="button"
      class="btn btn-sm"
      :class="
        activeProductType === 'Aksesuar' ? 'btn-dark' : 'btn-outline-dark'
      "
      @click="activeProductType = 'Aksesuar'"
    >
      <i class="bi bi-gem me-1"></i>
      Aksesuar
    </button>

    <button
      type="button"
      class="btn btn-sm btn-outline-success ms-auto"
      data-bs-toggle="modal"
      data-bs-target="#addproduct"
    >
      <i class="bi bi-plus-lg me-1"></i>
      Ürün Ekle
    </button>
    <button
      type="button"
      class="btn btn-sm btn-outline-warning"
      data-bs-toggle="modal"
      data-bs-target="#bulkPriceModal"
    >
      <i class="bi bi-percent me-1"></i>
      Toplu Fiyat
    </button>
    <button
      type="button"
      class="btn btn-sm btn-outline-primary s"
      @click="updateAllProducts"
    >
      <i class="bi bi-check2-all me-1"></i>
      Tümünü Güncelle
    </button>
  </div>

  <!--Genel Tablom -->
  <div class="table-responsive">
    <table class="table align-middle text-nowrap admin-table">
      <thead>
        <tr>
          <th scope="col">Ad</th>
          <th scope="col">Model</th>
          <th scope="col">Tipi</th>
          <th scope="col">Kategori</th>
          <th scope="col">Stok</th>
          <th scope="col">Fiyat</th>
          <th scope="col">İndirim</th>
          <th scope="col">İşlem</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product.p_id">
          <td>
            <input class="form-control" type="text" v-model="product.p_name" style="width: 155px"/>
          </td>

          <td>
            <input class="form-control" type="text" v-model="product.p_model" style="width: 155px" />
          </td>
          <td>
            <select style="width: 90px" v-model="product.p_type" class="form-control" required>
              <option value="">Seçiniz...</option>
              <option value="Gozluk">Gözlük</option>
              <option value="Saat">Saat</option>
              <option value="Aksesuar">Aksesuar</option>
            </select>
          </td>
          <td>
            <select
            style="width: 90px"
              v-if="product.p_type === 'Gozluk'"
              v-model="product.p_category"
              class="form-control"
              required
            >
              <option value="">Seçiniz...</option>
              <option value="Kadın">Kadın</option>
              <option value="Erkek">Erkek</option>
              <option value="Unisex">Unisex</option>
              <option value="Çocuk">Çocuk</option>
            </select>

            <select
            style="width: 90px"
              v-if="product.p_type === 'Saat'"
              v-model="product.p_category"
              class="form-control"
              required
            >
              <option value="">Seçiniz...</option>
              <option value="Kadın">Kadın</option>
              <option value="Erkek">Erkek</option>
            </select>

            <select
            style="width: 90px"
              v-if="product.p_type === 'Aksesuar'"
              v-model="product.p_category"
              class="form-control"
              required
            >
              <option value="">Seçiniz...</option>
              <option value="Kadın">Kadın</option>
              <option value="Erkek">Erkek</option>
            </select>
          </td>

          <td>
            <input
              class="form-control"
              type="number"
              min="0"
              v-model="product.p_stock"
              style="width: 60px"
            />
          </td>

          <td>
            <input class="form-control" type="text" v-model="product.p_price" style="width: 100px" />
          </td>
          <td>
            <div class="input-group">
              <input
                class="form-control"
                type="number"
                min="0"
                max="100"
                step="0.01"
                v-model.number="product.p_disc"
                style="width: 60px"
              />
              <span class="input-group-text">%</span>
            </div>
          </td>

          <td>
            <button
              @click="
                updateProduct(
                  product.p_id,
                  product.p_name,
                  product.p_model,
                  product.p_type,
                  product.p_category,
                  product.p_stock,
                  product.p_price,
                  product.p_disc,
                )
              "
              class="btn-sm btn btn-outline-primary"
            >
              <i class="bi bi-pencil-square"></i>
            </button>

            <button
              style="margin-left: 10px"
              class="btn-sm m-2 btn btn-outline-danger"
              @click="deleteProduct(product.p_id)"
            >
              <i class="bi bi-x-square"></i>
            </button>
            <button
              v-if="product.p_type === 'Gozluk'"
              @click="getGlassDetail(product)"
              data-bs-toggle="modal"
              data-bs-target="#productDetail"
              class="btn-sm btn btn-outline-dark"
            >
              <i class="bi bi-info-square"></i>
            </button>

            <button
              v-else-if="product.p_type === 'Saat'"
              @click="getWatchDetail(product)"
              data-bs-toggle="modal"
              data-bs-target="#productDetail"
              class="btn-sm btn btn-outline-dark"
            >
              <i class="bi bi-info-square"></i>
            </button>

            <button
              v-else-if="product.p_type === 'Aksesuar'"
              @click="getAccaDetail(product)"
              data-bs-toggle="modal"
              data-bs-target="#productDetail"
              class="btn-sm btn btn-outline-dark"
            >
              <i class="bi bi-info-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--DETAYLAR -->
  <div class="modal fade" id="productDetail" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ selectedProduct?.p_name }} - Ürün Detayları
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <!-- =================================
             GÖZLÜK
        ================================== -->

          <div v-if="selectedProduct?.p_type === 'Gozluk'">
            <h6 class="fw-bold mb-3">Gözlük Detayları</h6>

            <div class="row">
              <!-- CAM ÖLÇÜSÜ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Cam Ölçüsü</label>

                <select class="form-select" v-model="gozlukDetail.g_camOlcusu">
                  <option value="" disabled>Cam ölçüsü seçin</option>

                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                </select>
              </div>

              <!-- ÇERÇEVE RENGİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Çerçeve Rengi</label>

                <select
                  class="form-select"
                  v-model="gozlukDetail.g_cerceveRengi"
                >
                  <option value="" disabled>Renk seçin</option>

                  <option value="Siyah">Siyah</option>
                  <option value="Beyaz">Beyaz</option>
                  <option value="Gri">Gri</option>
                  <option value="Kahverengi">Kahverengi</option>
                  <option value="Mavi">Mavi</option>
                  <option value="Kırmızı">Kırmızı</option>
                  <option value="Yeşil">Yeşil</option>
                  <option value="Sarı">Sarı</option>
                  <option value="Turuncu">Turuncu</option>
                  <option value="Mor">Mor</option>
                  <option value="Pembe">Pembe</option>
                  <option value="Gold">Gold</option>
                  <option value="Gümüş">Gümüş</option>
                </select>
              </div>

              <!-- ÇERÇEVE MATERYALİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Çerçeve Materyali</label>

                <select
                  class="form-select"
                  v-model="gozlukDetail.g_cerceveMateryali"
                >
                  <option value="" disabled>Materyal seçin</option>

                  <option value="Plastik">Plastik</option>
                  <option value="Metal">Metal</option>
                  <option value="Asetat">Asetat</option>
                  <option value="Titanyum">Titanyum</option>
                </select>
              </div>

              <!-- CAM RENGİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Cam Rengi</label>

                <select class="form-select" v-model="gozlukDetail.g_camRengi">
                  <option value="" disabled>Renk seçin</option>

                  <option value="Gri">Gri</option>
                  <option value="Siyah">Siyah</option>
                  <option value="Kahverengi">Kahverengi</option>
                  <option value="Mavi">Mavi</option>
                  <option value="Yeşil">Yeşil</option>
                  <option value="Şeffaf">Şeffaf</option>
                </select>
              </div>

              <!-- CAM MATERYALİ -->

              <div class="col-12 mb-3">
                <label class="form-label">Cam Materyali</label>

                <select
                  class="form-select"
                  v-model="gozlukDetail.g_camMateryali"
                >
                  <option value="" disabled>Cam materyali seçin</option>

                  <option value="Mineral">Mineral</option>
                  <option value="Plastik">Plastik</option>
                  <option value="Polikarbonat">Polikarbonat</option>
                  <option value="Trivex">Trivex</option>
                </select>
              </div>
            </div>
          </div>

          <!-- =================================
             SAAT
        ================================== -->

          <div v-else-if="selectedProduct?.p_type === 'Saat'">
            <h6 class="fw-bold mb-3">Saat Detayları</h6>

            <div class="row">
              <!-- KORDON MATERYALİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Kordon Materyali</label>

                <select
                  class="form-select"
                  v-model="saatDetail.s_kordonMateryali"
                >
                  <option value="" disabled>Materyal seçin</option>

                  <option value="Deri">Deri</option>
                  <option value="Çelik">Çelik</option>
                  <option value="Silikon">Silikon</option>
                  <option value="Kauçuk">Kauçuk</option>
                  <option value="Tekstil">Tekstil</option>
                </select>
              </div>

              <!-- KORDON RENGİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Kordon Rengi</label>

                <select class="form-select" v-model="saatDetail.s_kordonRengi">
                  <option value="" disabled>Renk seçin</option>

                  <option value="Siyah">Siyah</option>
                  <option value="Beyaz">Beyaz</option>
                  <option value="Gri">Gri</option>
                  <option value="Kahverengi">Kahverengi</option>
                  <option value="Mavi">Mavi</option>
                  <option value="Kırmızı">Kırmızı</option>
                  <option value="Yeşil">Yeşil</option>
                  <option value="Gold">Gold</option>
                  <option value="Gümüş">Gümüş</option>
                </select>
              </div>

              <!-- KASA MATERYALİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Kasa Materyali</label>

                <select
                  class="form-select"
                  v-model="saatDetail.s_kasaMateryali"
                >
                  <option value="" disabled>Materyal seçin</option>

                  <option value="Çelik">Çelik</option>
                  <option value="Titanyum">Titanyum</option>
                  <option value="Plastik">Plastik</option>
                  <option value="Seramik">Seramik</option>
                </select>
              </div>

              <!-- KASA RENGİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Kasa Rengi</label>

                <select class="form-select" v-model="saatDetail.s_kasaRengi">
                  <option value="" disabled>Renk seçin</option>

                  <option value="Siyah">Siyah</option>
                  <option value="Beyaz">Beyaz</option>
                  <option value="Gri">Gri</option>
                  <option value="Gümüş">Gümüş</option>
                  <option value="Gold">Gold</option>
                  <option value="Rose Gold">Rose Gold</option>
                  <option value="Mavi">Mavi</option>
                </select>
              </div>

              <!-- SU GEÇİRMEZLİK -->

              <div class="col-12 mb-3">
                <label class="form-label">Su Geçirmezlik</label>

                <select
                  class="form-select"
                  v-model="saatDetail.s_suGecirmezlik"
                >
                  <option value="" disabled>Su geçirmezlik seçin</option>

                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>
          </div>

          <!-- =================================
             AKSESUAR
        ================================== -->

          <div v-else-if="selectedProduct?.p_type === 'Aksesuar'">
            <h6 class="fw-bold mb-3">Aksesuar Detayları</h6>

            <div class="row">
              <!-- ÜRÜN MATERYALİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Ürün Materyali</label>

                <select
                  class="form-select"
                  v-model="aksesuarDetail.a_urunMateryali"
                >
                  <option value="" disabled>Materyal seçin</option>

                  <option value="Altın">Altın</option>
                  <option value="Gümüş">Gümüş</option>
                  <option value="Çelik">Çelik</option>
                  <option value="Titanyum">Titanyum</option>
                  <option value="Plastik">Plastik</option>
                  <option value="Deri">Deri</option>
                </select>
              </div>

              <!-- ÜRÜN RENGİ -->

              <div class="col-md-6 mb-3">
                <label class="form-label">Ürün Rengi</label>

                <select
                  class="form-select"
                  v-model="aksesuarDetail.a_urunRengi"
                >
                  <option value="" disabled>Renk seçin</option>

                  <option value="Siyah">Siyah</option>
                  <option value="Beyaz">Beyaz</option>
                  <option value="Gri">Gri</option>
                  <option value="Kahverengi">Kahverengi</option>
                  <option value="Mavi">Mavi</option>
                  <option value="Kırmızı">Kırmızı</option>
                  <option value="Yeşil">Yeşil</option>
                  <option value="Gold">Gold</option>
                  <option value="Gümüş">Gümüş</option>
                  <option value="Rose Gold">Rose Gold</option>
                </select>
              </div>

              <!-- ÜRÜN TİPİ -->

              <div class="col-12 mb-3">
                <label class="form-label">Ürün Tipi</label>

                <select class="form-select" v-model="aksesuarDetail.a_urunTipi">
                  <option value="" disabled>Ürün tipi seçin</option>

                  <option value="Küpe">Küpe</option>
                  <option value="Kolye">Kolye</option>
                  <option value="Bilezik">Bilezik</option>
                  <option value="Yüzük">Yüzük</option>
                  <option value="Bileklik">Bileklik</option>
                  <option value="Broş">Broş</option>
                  <option value="Halhal">Halhal</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!--MODAL FOOTER -->

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Kapat
          </button>

          <!-- GÖZLÜK -->

          <button
            v-if="selectedProduct && selectedProduct.p_type === 'Gozluk'"
            class="btn btn-primary"
            @click="
              uptadeGlass(
                selectedProduct.p_id,
                gozlukDetail.g_camOlcusu,
                gozlukDetail.g_cerceveRengi,
                gozlukDetail.g_cerceveMateryali,
                gozlukDetail.g_camRengi,
                gozlukDetail.g_camMateryali,
              )
            "
          >
            Güncelle
          </button>

          <!-- SAAT -->

          <button
            v-if="selectedProduct && selectedProduct.p_type === 'Saat'"
            class="btn btn-primary"
            @click="
              uptadeWatch(
                selectedProduct.p_id,
                saatDetail.s_kordonMateryali,
                saatDetail.s_kordonRengi,
                saatDetail.s_kasaMateryali,
                saatDetail.s_kasaRengi,
                saatDetail.s_suGecirmezlik,
              )
            "
          >
            Güncelle
          </button>

          <!-- AKSESUAR -->

          <button
            v-if="selectedProduct && selectedProduct.p_type === 'Aksesuar'"
            class="btn btn-primary"
            @click="
              updateAcca(
                selectedProduct.p_id,
                aksesuarDetail.a_urunMateryali,
                aksesuarDetail.a_urunRengi,
                aksesuarDetail.a_urunTipi,
              )
            "
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--! ürün ekle  -->
  <div class="modal fade" id="addproduct" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Ürün Ekle</h1>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <form @submit.prevent="addProduct()">
          <div class="modal-body">
            <!--! Ürün ekleme -->
            <div class="row">
              <div class="col-12 mb-3">
                <label class="form-label"> Ürün Adı: </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="newProduct[0].p_name"
                  required
                />
              </div>

              <div class="col-12 mb-3">
                <label class="form-label"> Ürün Model: </label>

                <input
                  type="text"
                  class="form-control"
                  v-model="newProduct[0].p_model"
                  required
                />
              </div>
              <div class="col-12 mb-3">
                <label class="form-label">Tipi</label>

                <select
                  v-model="newProduct[0].p_type"
                  class="form-select"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="Gozluk">Gözlük</option>
                  <option value="Saat">Saat</option>
                  <option value="Aksesuar">Aksesuar</option>
                </select>
              </div>
              <!--GÖZLÜK -->
              <div v-if="newProduct[0].p_type === 'Gozluk'" class="col-12 mb-3">
                <h6 class="fw-bold mb-3">Gözlük Detayları</h6>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label"> Cam Ölçüsü </label>

                    <select
                      class="form-select"
                      v-model="gozlukDetail.g_camOlcusu"
                    >
                      <option value="" disabled>Cam ölçüsü seçin</option>

                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                      <option value="60">60</option>
                    </select>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Çerçeve Rengi</label>

                    <select
                      class="form-select"
                      v-model="gozlukDetail.g_cerceveRengi"
                    >
                      <option value="" disabled>Renk Seçin..</option>
                      <option value="Siyah">Siyah</option>
                      <option value="Beyaz">Beyaz</option>
                      <option value="Gri">Gri</option>
                      <option value="Kahverengi">Kahverengi</option>
                      <option value="Mavi">Mavi</option>
                      <option value="Kırmızı">Kırmızı</option>
                      <option value="Yeşil">Yeşil</option>
                      <option value="Sarı">Sarı</option>
                      <option value="Turuncu">Turuncu</option>
                      <option value="Mor">Mor</option>
                      <option value="Pembe">Pembe</option>
                      <option value="Gold">Gold</option>
                      <option value="Gümüş">Gümüş</option>
                    </select>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Çerçeve Materyali</label>

                    <select
                      class="form-select"
                      v-model="gozlukDetail.g_cerceveMateryali"
                    >
                      <option value="" disabled>Materyal Seçin..</option>
                      <option value="Plastik">Plastik</option>
                      <option value="Metal">Metal</option>
                      <option value="Asetat">Asetat</option>
                      <option value="Titanyum">Titanyum</option>
                    </select>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label"> Cam Rengi </label>
                    <select
                      class="form-select"
                      v-model="gozlukDetail.g_camRengi"
                    >
                      <option value="" disabled>Renk Seçin..</option>
                      <option value="Siyah">Siyah</option>
                      <option value="Beyaz">Beyaz</option>
                      <option value="Gri">Gri</option>
                      <option value="Kahverengi">Kahverengi</option>
                      <option value="Mavi">Mavi</option>
                      <option value="Kırmızı">Kırmızı</option>
                      <option value="Yeşil">Yeşil</option>
                      <option value="Sarı">Sarı</option>
                      <option value="Turuncu">Turuncu</option>
                      <option value="Mor">Mor</option>
                      <option value="Pembe">Pembe</option>
                      <option value="Gold">Gold</option>
                      <option value="Gümüş">Gümüş</option>
                    </select>
                  </div>

                  <div class="col-12 mb-3">
                    <label class="form-label">Cam Materyali</label>

                    <select
                      class="form-select"
                      v-model="gozlukDetail.g_camMateryali"
                    >
                      <option value="" disabled>Materyal Seçin..</option>
                      <option value="Mineral">Mineral</option>
                      <option value="Plastik">Plastik</option>
                      <option value="Polikarbonat">Polikarbonat</option>
                      <option value="Trivex">Trivex</option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- SAAT  -->
              <div v-if="newProduct[0].p_type === 'Saat'" class="col-12 mb-3">
                <h6 class="fw-bold mb-3">Saat Detayları</h6>

                <div class="row">
                  <!-- KORDON MATERYALİ -->

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Kordon Materyali</label>

                    <select
                      class="form-select"
                      v-model="saatDetail.s_kordonMateryali"
                    >
                      <option value="" disabled>Materyal seçin</option>
                      <option value="Deri">Deri</option>
                      <option value="Çelik">Çelik</option>
                      <option value="Silikon">Silikon</option>
                      <option value="Kauçuk">Kauçuk</option>
                      <option value="Tekstil">Tekstil</option>
                    </select>
                  </div>

                  <!-- KORDON RENGİ -->

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Kordon Rengi</label>

                    <select
                      class="form-select"
                      v-model="saatDetail.s_kordonRengi"
                    >
                      <option value="" disabled>Renk seçin</option>
                      <option value="Siyah">Siyah</option>
                      <option value="Beyaz">Beyaz</option>
                      <option value="Gri">Gri</option>
                      <option value="Kahverengi">Kahverengi</option>
                      <option value="Mavi">Mavi</option>
                      <option value="Kırmızı">Kırmızı</option>
                      <option value="Yeşil">Yeşil</option>
                      <option value="Gold">Gold</option>
                      <option value="Gümüş">Gümüş</option>
                    </select>
                  </div>

                  <!-- KASA MATERYALİ -->

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Kasa Materyali</label>

                    <select
                      class="form-select"
                      v-model="saatDetail.s_kasaMateryali"
                    >
                      <option value="" disabled>Materyal seçin</option>
                      <option value="Çelik">Çelik</option>
                      <option value="Titanyum">Titanyum</option>
                      <option value="Plastik">Plastik</option>
                      <option value="Seramik">Seramik</option>
                    </select>
                  </div>

                  <!-- KASA RENGİ -->

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Kasa Rengi</label>

                    <select
                      class="form-select"
                      v-model="saatDetail.s_kasaRengi"
                    >
                      <option value="" disabled>Renk seçin</option>
                      <option value="Siyah">Siyah</option>
                      <option value="Beyaz">Beyaz</option>
                      <option value="Gri">Gri</option>
                      <option value="Gümüş">Gümüş</option>
                      <option value="Gold">Gold</option>
                      <option value="Rose Gold">Rose Gold</option>
                      <option value="Mavi">Mavi</option>
                    </select>
                  </div>

                  <!-- SU GEÇİRMEZLİK -->

                  <div class="col-12 mb-3">
                    <label class="form-label">Su Geçirmezlik</label>

                    <select
                      class="form-select"
                      v-model="saatDetail.s_suGecirmezlik"
                    >
                      <option value="" disabled>Su geçirmezlik seçin</option>
                      <option value="3 ATM">3</option>
                      <option value="5 ATM">5</option>
                      <option value="10 ATM">10</option>
                      <option value="20 ATM">20</option>
                      <option value="30 ATM">30</option>
                    </select>
                  </div>
                </div>
              </div>
              <!--AKSESUAR-->
              <div
                v-if="newProduct[0].p_type === 'Aksesuar'"
                class="col-12 mb-3"
              >
                <h6 class="fw-bold mb-3">Aksesuar Detayları</h6>

                <div class="row">
                  <!-- ÜRÜN MATERYALİ -->

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Ürün Materyali</label>

                    <select
                      class="form-select"
                      v-model="aksesuarDetail.a_urunMateryali"
                    >
                      <option value="" disabled>Materyal seçin</option>
                      <option value="Altın">Altın</option>
                      <option value="Gümüş">Gümüş</option>
                      <option value="Çelik">Çelik</option>
                      <option value="Titanyum">Titanyum</option>
                      <option value="Plastik">Plastik</option>
                      <option value="Deri">Deri</option>
                    </select>
                  </div>

                  <!-- ÜRÜN RENGİ -->

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Ürün Rengi</label>

                    <select
                      class="form-select"
                      v-model="aksesuarDetail.a_urunRengi"
                    >
                      <option value="" disabled>Renk seçin</option>
                      <option value="Siyah">Siyah</option>
                      <option value="Beyaz">Beyaz</option>
                      <option value="Gri">Gri</option>
                      <option value="Kahverengi">Kahverengi</option>
                      <option value="Mavi">Mavi</option>
                      <option value="Kırmızı">Kırmızı</option>
                      <option value="Yeşil">Yeşil</option>
                      <option value="Gold">Gold</option>
                      <option value="Gümüş">Gümüş</option>
                      <option value="Rose Gold">Rose Gold</option>
                    </select>
                  </div>

                  <!-- ÜRÜN TİPİ -->

                  <div class="col-12 mb-3">
                    <label class="form-label">Ürün Tipi</label>

                    <select
                      class="form-select"
                      v-model="aksesuarDetail.a_urunTipi"
                    >
                      <option value="" disabled>Ürün tipi seçin</option>
                      <option value="Küpe">Küpe</option>
                      <option value="Kolye">Kolye</option>
                      <option value="Bilezik">Bilezik</option>
                      <option value="Yüzük">Yüzük</option>
                      <option value="Bileklik">Bileklik</option>
                      <option value="Broş">Broş</option>
                      <option value="Halhal">Halhal</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                </div>
              </div>

              <!--GÖZLÜK -->
              <div v-if="newProduct[0].p_type === 'Gozluk'" class="col-12 mb-3">
                <label class="form-label">Kategori</label>

                <select
                  v-model="newProduct[0].p_category"
                  class="form-select"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Çocuk">Çocuk</option>
                </select>
              </div>
              <!-- SAAT  -->
              <div v-if="newProduct[0].p_type === 'Saat'" class="col-12 mb-3">
                <label class="form-label">Kategori</label>

                <select
                  v-model="newProduct[0].p_category"
                  class="form-select"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Erkek">Erkek</option>
                </select>
              </div>
              <!--Aksesuar -->
              <div
                v-if="newProduct[0].p_type === 'Aksesuar'"
                class="col-12 mb-3"
              >
                <label class="form-label">Kategori</label>

                <select
                  v-model="newProduct[0].p_category"
                  class="form-select"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Erkek">Erkek</option>
                </select>
              </div>

              <div class="col-6">
                <label class="form-label"> Stok: </label>

                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model="newProduct[0].p_stock"
                  required
                />
              </div>

              <div class="col-6">
                <label class="form-label"> Fiyat: </label>

                <input
                  type="text"
                  class="form-control"
                  v-model.number="newProduct[0].p_price"
                  pattern="[0-9]+([.][0-9]{1,2})?"
                  required
                />
              </div>

              <!--! RESİMLER -->

              <div class="col-12 mt-4">
                <label class="form-label fw-bold"> Ürün Fotoğrafları </label>

                <!-- Resim 1 -->
                <div class="mb-3">
                  <label class="form-label"> Fotoğraf 1: </label>

                  <input
                    ref="imageInput1"
                    type="file"
                    class="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    @change="handleImageChange($event, 1)"
                    required
                  />

                  <div v-if="imagePreview1" class="image-preview">
                    <img :src="imagePreview1" alt="Fotoğraf 1" />
                  </div>
                </div>

                <!-- Resim 2 -->
                <div class="mb-3">
                  <label class="form-label"> Fotoğraf 2: </label>

                  <input
                    ref="imageInput2"
                    type="file"
                    class="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    @change="handleImageChange($event, 2)"
                  />

                  <div v-if="imagePreview2" class="image-preview">
                    <img :src="imagePreview2" alt="Fotoğraf 2" />
                  </div>
                </div>

                <!-- Resim 3 -->
                <div class="mb-3">
                  <label class="form-label"> Fotoğraf 3: </label>

                  <input
                    ref="imageInput3"
                    type="file"
                    class="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    @change="handleImageChange($event, 3)"
                  />

                  <div v-if="imagePreview3" class="image-preview">
                    <img :src="imagePreview3" alt="Fotoğraf 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-success w-100" type="submit">
              Ürün Ekle
            </button>

            <label>{{ productMessage }}</label>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--! TOPLU FİYAT MODALI -->
  <div
    class="modal fade"
    id="bulkPriceModal"
    tabindex="-1"
    aria-labelledby="bulkPriceModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bulkPriceModalLabel">
            <i class="bi bi-percent me-2"></i>
            Toplu Fiyat Güncelleme
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Kapat"
          ></button>
        </div>

        <div class="modal-body">
          <!-- ÜRÜN TİPİ -->
          <div class="mb-3">
            <label class="form-label"> Ürün Tipi </label>

            <select class="form-select" v-model="bulkPrice.type">
              <option value="Tümü">Tümü</option>
              <option value="Gozluk">Gözlük</option>
              <option value="Saat">Saat</option>
              <option value="Aksesuar">Aksesuar</option>
            </select>
          </div>

          <!-- İŞLEM -->
          <div class="mb-3">
            <label class="form-label"> İşlem </label>

            <select class="form-select" v-model="bulkPrice.action">
              <option value="zam">Zam</option>
              <option value="indirim">İndirim</option>
            </select>
          </div>

          <!-- YÜZDE -->
          <div class="mb-3">
            <label class="form-label"> Yüzde </label>

            <div class="input-group">
              <input
                type="number"
                class="form-control"
                min="1"
                max="100"
                step="0.01"
                v-model.number="bulkPrice.percent"
                placeholder="Örn. 20"
              />

              <span class="input-group-text"> % </span>
            </div>
          </div>

          <!-- UYARI -->
          <div class="alert alert-warning small mb-0">
            <i class="bi bi-exclamation-triangle me-1"></i>

            <span v-if="bulkPrice.action === 'zam'">
              Seçilen ürünlerin normal fiyatları değişecektir.
            </span>

            <span v-else> Seçilen ürünlerin indirim oranı değişecektir. </span>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Vazgeç
          </button>

          <button type="button" class="btn btn-warning" @click="applyBulkPrice">
            <i class="bi bi-check-lg me-1"></i>
            Uygula
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
      newProduct: [
        {
          p_name: "",
          p_model: "",
          p_type: "",
          p_category: "",
          p_stock: 0,
          p_price: 0,
        },
      ],
      gozlukDetail: {
        g_camOlcusu: "",
        g_cerceveRengi: "",
        g_cerceveMateryali: "",
        g_camRengi: "",
        g_camMateryali: "",
      },

      saatDetail: {
        s_kordonMateryali: "",
        s_kordonRengi: "",
        s_kasaMateryali: "",
        s_kasaRengi: "",
        s_suGecirmezlik: "",
      },

      aksesuarDetail: {
        a_urunMateryali: "",
        a_urunRengi: "",
        a_urunTipi: "",
      },

      products: [],

      activeProductType: "Tümü",
      bulkPrice: {
        type: "Tümü",
        action: "zam",
        percent: 0,
      },

      productMessage: null,

      selectedProduct: null,

      baseUrl: "http://localhost:3001",

      p_image1: null,
      p_image2: null,
      p_image3: null,

      imagePreview1: null,
      imagePreview2: null,
      imagePreview3: null,
    };
  },

  mounted() {
    this.getProducts();
  },

  watch: {},

  computed: {
    filteredProducts() {
      if (this.activeProductType === "Tümü") {
        return this.products;
      }

      return this.products.filter(
        (product) => product.p_type === this.activeProductType,
      );
    },
  },

  methods: {
    // Fotoğraf seçme motodu
    handleImageChange(event, imageNumber) {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      if (imageNumber === 1) {
        this.p_image1 = file;

        this.imagePreview1 = URL.createObjectURL(file);
      }

      if (imageNumber === 2) {
        this.p_image2 = file;

        this.imagePreview2 = URL.createObjectURL(file);
      }

      if (imageNumber === 3) {
        this.p_image3 = file;

        this.imagePreview3 = URL.createObjectURL(file);
      }
    },

    //Ürün Ekleme
    async addProduct() {
      try {
        const formData = new FormData();
        formData.append("name", this.newProduct[0].p_name);
        formData.append("model", this.newProduct[0].p_model);
        formData.append("type", this.newProduct[0].p_type);
        formData.append("category", this.newProduct[0].p_category);
        formData.append("stock", this.newProduct[0].p_stock);
        formData.append("price", this.newProduct[0].p_price);

        // GÖZLÜK D
        if (this.newProduct[0].p_type === "Gozluk") {
          formData.append("g_camOlcusu", this.gozlukDetail.g_camOlcusu);

          formData.append("g_cerceveRengi", this.gozlukDetail.g_cerceveRengi);

          formData.append(
            "g_cerceveMateryali",
            this.gozlukDetail.g_cerceveMateryali,
          );

          formData.append("g_camRengi", this.gozlukDetail.g_camRengi);

          formData.append("g_camMateryali", this.gozlukDetail.g_camMateryali);
        }

        // SAAT DETAYLARI
        if (this.newProduct[0].p_type === "Saat") {
          formData.append(
            "s_kordonMateryali",
            this.saatDetail.s_kordonMateryali,
          );

          formData.append("s_kordonRengi", this.saatDetail.s_kordonRengi);

          formData.append("s_kasaMateryali", this.saatDetail.s_kasaMateryali);

          formData.append("s_kasaRengi", this.saatDetail.s_kasaRengi);

          formData.append("s_suGecirmezlik", this.saatDetail.s_suGecirmezlik);
        }

        // AKSESUAR DETAYLARI
        if (this.newProduct[0].p_type === "Aksesuar") {
          formData.append(
            "a_urunMateryali",
            this.aksesuarDetail.a_urunMateryali,
          );

          formData.append("a_urunRengi", this.aksesuarDetail.a_urunRengi);

          formData.append("a_urunTipi", this.aksesuarDetail.a_urunTipi);
        }

        // FOTOĞRAFLAR
        if (this.p_image1) {
          formData.append("image1", this.p_image1);
        }

        if (this.p_image2) {
          formData.append("image2", this.p_image2);
        }

        if (this.p_image3) {
          formData.append("image3", this.p_image3);
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturumunuz bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/products`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Ürün eklenirken hata oluştu.");
        }

        this.productMessage = data.message;

        await this.getProducts();

        this.newProduct[0].p_name = "";
        this.newProduct[0].p_model = "";
        this.newProduct[0].p_type = "";
        this.newProduct[0].p_category = "";
        this.newProduct[0].p_stock = 0;
        this.newProduct[0].p_price = 0;

        // GÖZLÜK  TEMİZLE

        this.gozlukDetail = {
          g_camOlcusu: "",
          g_cerceveRengi: "",
          g_cerceveMateryali: "",
          g_camRengi: "",
          g_camMateryali: "",
        };

        // SAAT TEMİZLE

        this.saatDetail = {
          s_kordonMateryali: "",
          s_kordonRengi: "",
          s_kasaMateryali: "",
          s_kasaRengi: "",
          s_suGecirmezlik: "",
        };

        // AKSESUAr TEMİZLE

        this.aksesuarDetail = {
          a_urunMateryali: "",
          a_urunRengi: "",
          a_urunTipi: "",
        };

        // FOTOĞRAFLARI TEMİZLE

        this.p_image1 = null;
        this.p_image2 = null;
        this.p_image3 = null;

        this.imagePreview1 = null;
        this.imagePreview2 = null;
        this.imagePreview3 = null;

        this.$refs.imageInput1.value = "";
        this.$refs.imageInput2.value = "";
        this.$refs.imageInput3.value = "";
      } catch (e) {
        this.productMessage = e.message;
      }
    },

    //Ürün Çekme Güncelleme Silme

    async getProducts() {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Giriş yapmanız gerekiyor.");
        }

        const res = await fetch(`${this.baseUrl}/api/products/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Ürünler alınamadı.");
        }

        this.products = data;
      } catch (e) {
        console.error("Ürünleri getirme hatası:", e.message);
      }
    },

    async updateProduct(
      p_id,
      p_name,
      p_model,
      p_type,
      p_category,
      p_stock,
      p_price,
      p_disc,
    ) {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            p_name: p_name,
            p_model: p_model,
            p_type: p_type,
            p_category: p_category,
            p_stock: p_stock,
            p_price: p_price,
            p_disc: p_disc,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Ürün güncellenirken hata oluştu.");
        }

        this.toast(
          "Ürün başarıyla güncellendi.",
          "success",
          "Ürün Güncellendi",
        );

        await this.getProducts();
      } catch (e) {
        console.error("Ürün güncelleme hatası:", e.message);
        this.toast(e.message, "danger", "Güncelleme Hatası");
      }
    },

    async updateAllProducts() {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        for (const product of this.products) {
          const res = await fetch(
            `${this.baseUrl}/api/products/${product.p_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                p_name: product.p_name,
                p_model: product.p_model,
                p_type: product.p_type,
                p_category: product.p_category,
                p_stock: product.p_stock,
                p_price: product.p_price,
                p_disc: product.p_disc,
              }),
            },
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || `${product.p_name} güncellenemedi.`);
          }
        }

        await this.getProducts();

        this.toast(
          "Tüm ürünler başarıyla güncellendi.",
          "success",
          "Toplu Güncelleme",
        );
      } catch (e) {
        console.error("Toplu güncelleme hatası:", e.message);
        this.toast(e.message, "danger", "Toplu Güncelleme Hatası");
      }
    },

    async applyBulkPrice() {
      const percent = Number(this.bulkPrice.percent);

      if (!percent || percent <= 0 || percent > 100) {
        this.toast("Geçerli bir yüzde giriniz.", "warning", "Hatalı Değer");
        return;
      }

      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/products/toplu-fiyat`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: this.bulkPrice.type,
            action: this.bulkPrice.action,
            percent: percent,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Fiyatlar güncellenemedi.");
        }

        await this.getProducts();

        this.toast(data.message, "success", "Fiyatlar Güncellendi");

        this.bulkPrice.percent = 0;

        const modalElement = document.getElementById("bulkPriceModal");

        if (modalElement) {
          modalElement.classList.remove("show");
          modalElement.style.display = "none";
          modalElement.setAttribute("aria-hidden", "true");
          document.body.classList.remove("modal-open");

          const backdrop = document.querySelector(".modal-backdrop");

          if (backdrop) {
            backdrop.remove();
          }
        }
      } catch (e) {
        console.error("TOPLU FİYAT HATASI:", e);

        this.toast(e.message || "Fiyat işlemi başarısız.", "danger", "Hata");
      }
    },

    async deleteProduct(p_id) {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Ürün silinirken hata oluştu.");
        }

        this.toast("Ürün başarıyla silindi.", "success", "Ürün Silindi");

        await this.getProducts();
      } catch (e) {
        console.error("Ürün silme hatası:", e.message);
        this.toast(e.message, "danger", "Silme Hatası");
      }
    },

    //Gözlük Detay Çekme Güncelleme
    async getGlassDetail(product) {
      try {
        this.selectedProduct = product;

        const res = await fetch(
          `${this.baseUrl}/api/gozlukdetail/${product.p_id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Gözlük detayları alınamadı.");
        }

        this.gozlukDetail = data;
      } catch (e) {
        console.log("Gözlük detay GET hatası:", e.message);
      }
    },

    async uptadeGlass(
      p_id,
      g_camOlcusu,
      g_cerceveRengi,
      g_cerceveMateryali,
      g_camRengi,
      g_camMateryali,
    ) {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/gozlukdetail/${p_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            g_camOlcusu,
            g_cerceveRengi,
            g_cerceveMateryali,
            g_camRengi,
            g_camMateryali,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Gözlük detayları güncellenemedi.");
        }

        this.toast(
          "Gözlük detayları başarıyla güncellendi.",
          "success",
          "Gözlük Güncellendi",
        );
      } catch (e) {
        console.error("Gözlük güncelleme hatası:", e.message);
        this.toast(e.message, "danger", "Güncelleme Hatası");
      }
    },

    //Saat Detay Çekme Güncelleme

    async uptadeWatch(
      p_id,
      s_kordonMateryali,
      s_kordonRengi,
      s_kasaMateryali,
      s_kasaRengi,
      s_suGecirmezlik,
    ) {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/saatdetail/${p_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            s_kordonMateryali,
            s_kordonRengi,
            s_kasaMateryali,
            s_kasaRengi,
            s_suGecirmezlik,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Saat detayları güncellenemedi.");
        }

        this.toast(
          "Saat detayları başarıyla güncellendi.",
          "success",
          "Saat Güncellendi",
        );
      } catch (e) {
        console.error("Saat güncelleme hatası:", e.message);
        this.toast(e.message, "danger", "Güncelleme Hatası");
      }
    },

    async getWatchDetail(product) {
      try {
        this.selectedProduct = product;

        const res = await fetch(
          `${this.baseUrl}/api/saatdetail/${product.p_id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Saat detayları alınamadı.");
        }

        this.saatDetail = data;
      } catch (e) {
        console.error("Saat detay GET hatası:", e.message);
      }
    },

    //Aksesuar Detay Çekme Güncelleme
    async getAccaDetail(product) {
      try {
        this.selectedProduct = product;

        const res = await fetch(
          `${this.baseUrl}/api/aksesuar_detail/${product.p_id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Aksesuar detayları alınamadı.");
        }

        this.aksesuarDetail = data;
      } catch (e) {
        console.log("Aksesuar detay GET hatası:", e.message);
      }
    },

    async updateAcca(p_id, a_urunMateryali, a_urunRengi, a_urunTipi) {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const res = await fetch(`${this.baseUrl}/api/aksesuar_detail/${p_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            a_urunMateryali,
            a_urunRengi,
            a_urunTipi,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Aksesuar detayları güncellenemedi.");
        }

        this.toast(
          "Aksesuar detayları başarıyla güncellendi.",
          "success",
          "Aksesuar Güncellendi",
        );
      } catch (e) {
        console.error("Aksesuar güncelleme hatası:", e.message);
        this.toast(e.message, "danger", "Güncelleme Hatası");
      }
    },
  },
};
</script>

<style scoped>
.image-preview {
  margin-top: 10px;

  width: 100%;

  height: 150px;

  border: 1px solid #ddd;

  border-radius: 8px;

  background: #f7f7f7;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;
}

.image-preview img {
  width: 100%;

  height: 100%;

  object-fit: contain;

  padding: 10px;
}

.admin-table {
  min-width: 1000px;
}
.admin-table input {
  min-width: 50px;
}
</style>
