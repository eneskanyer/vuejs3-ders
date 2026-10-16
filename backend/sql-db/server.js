require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const app = express();
const { error } = require("console");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
app.use(cors());
const db = require("./db");
app.use(express.json({ limit: "10mb" }));
const path = require("path");
const fs = require("fs");

// JWT ayarları
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET .env dosyasında tanımlanmalıdır.");
}
// Token doğrulama middleware'i
async function tokenKontrol(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Giriş yapmanız gerekiyor.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
//!İptal edilen token veri tabanında revoked_tokens tablosunda tutulur. altttaki kodda ise bu tokenin iptal edilen token tablosunda olup olmadığı kontrol edilir
//!İptal edilmiş token tablosunda varsa istedği reddeeder.
    const [rows] = await db.query(
      `SELECT token_hash
       FROM revoked_tokens
       WHERE token_hash = ?
         AND expires_at > NOW()`,
      [tokenHash],
    );

    if (rows.length > 0) {
      return res.status(401).json({
        error: "Bu oturum kapatılmış. Lütfen tekrar giriş yapın.",
      });
    }

    req.user = decoded;
    //!Sıradaki endpoibte geçerr
    next();

    //!Hata Kontrol kısmı
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError" ||
      err.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        error: "Token geçersiz veya süresi dolmuş.",
      });
    }

    console.error("Token kontrol hatası:", err);

    return res.status(500).json({
      error: "Oturum kontrolü sırasında sunucu hatası oluştu.",
    });
  }
}
// Admin yetki kontrolü
function adminKontrol(req, res, next) {
  if (Number(req.user.u_role) !== 1) {
    return res.status(403).json({
      error: "Bu işlem için admin yetkisi gerekiyor.",
    });
  }

  next();
}
//!TOKEN ÇIKIŞ
app.post("/api/logout", tokenKontrol, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return res.status(400).json({
        error: "Token geçerlilik süresi bulunamadı.",
      });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const expiresAt = new Date(decoded.exp * 1000);

    await db.query(
      `INSERT INTO revoked_tokens (token_hash, expires_at)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at)`,
      [tokenHash, expiresAt],
    );

    return res.status(200).json({
      message: "Oturum başarıyla kapatıldı.",
    });
  } catch (err) {
    console.error("LOGOUT HATASI:", err);

    return res.status(500).json({
      error: "Oturum kapatılırken sunucu hatası oluştu.",
    });
  }
});

//!Burada multer paketini Node.js'e dahil ediyoruz.
const multer = require("multer");
//! Ürün resimlerinin bulunduğu klasörü erişilebilir yapıypruz.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//! Ürün resimleri için multer ayarları (diskStorage, dosyaların bilgisayarındaki klasöre fiziksel olarak kaydedilmesini sağlar).
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const model = req.body.model?.trim();

    if (!model) {
      return cb(new Error("Ürün modeli bulunamadı."));
    }

    const uploadPath = path.join(__dirname, "uploads", "products", model);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === "image1") {
      cb(null, "1" + extension);
    } else if (file.fieldname === "image2") {
      cb(null, "2" + extension);
    } else if (file.fieldname === "image3") {
      cb(null, "3" + extension);
    } else {
      cb(new Error("Geçersiz resim alanı."));
    }
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extension = path.extname(file.originalname).toLowerCase();
    const mimeType = allowedTypes.test(file.mimetype);

    if (mimeType && allowedTypes.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Sadece JPG, JPEG, PNG ve WEBP resimler yüklenebilir."));
    }
  },
});

//PRODUCTS KODLARII
//!Products Detay Çekme
app.get("/api/product-detail/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Geçersiz ürün ID",
      });
    }

    const [rows] = await db.query(
      `SELECT
        p.*,

        g.g_camOlcusu,
        g.g_cerceveRengi,
        g.g_cerceveMateryali,
        g.g_camRengi,
        g.g_camMateryali,

        s.s_kordonMateryali,
        s.s_kordonRengi,
        s.s_kasaMateryali,
        s.s_kasaRengi,
        s.s_suGecirmezlik,

        a.a_urunMateryali,
        a.a_urunRengi,
        a.a_urunTipi

      FROM products p

      LEFT JOIN gozlukdetail g
        ON p.p_id = g.p_id

      LEFT JOIN saatdetail s
        ON p.p_id = s.p_id

      LEFT JOIN aksesuar_detail a
        ON p.p_id = a.p_id

      WHERE p.p_id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Ürün bulunamadı",
      });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.log("ÜRÜN DETAY HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
//! GET products-Anasayfa Genel ÇEKME
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.*,

        g.g_camOlcusu,
        g.g_cerceveRengi,
        g.g_cerceveMateryali,
        g.g_camRengi,
        g.g_camMateryali,

        s.s_kordonMateryali,
        s.s_kordonRengi,
        s.s_kasaMateryali,
        s.s_kasaRengi,
        s.s_suGecirmezlik,

        a.a_urunMateryali,
        a.a_urunRengi,
        a.a_urunTipi

      FROM products p

      LEFT JOIN gozlukdetail g
        ON p.p_id = g.p_id

      LEFT JOIN saatdetail s
        ON p.p_id = s.p_id

      LEFT JOIN aksesuar_detail a
        ON p.p_id = a.p_id

      ORDER BY p.p_id ASC
    `);

    return res.status(200).json(rows);
  } catch (err) {
    console.error("ÜRÜNLERİ GETİRME HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
//! GET products - Admin / Kullanıcıya Özel Listeleme
app.get("/api/products/me", tokenKontrol, async (req, res) => {
  try {
    // Kullanıcı ID'si artık URL'den değil JWT'den alınıyor.
    const id = Number(req.user.u_id);
    const role = Number(req.user.u_role);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı ID'si geçersiz.",
      });
    }

    let rows;

    if (role === 1) {
      // Admin bütün ürünleri görebilir.
      [rows] = await db.query("SELECT * FROM products ORDER BY p_id ASC");
    } else {
      // Normal kullanıcı yalnızca kendi ürünlerini görebilir.
      [rows] = await db.query(
        "SELECT * FROM products WHERE u_id = ? ORDER BY p_id ASC",
        [id],
      );
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error("ÜRÜNLERİ GETİRME HATASI:", err);

    return res.status(500).json({
      error: "Ürünler getirilirken sunucu hatası oluştu.",
    });
  }
});

//! PRODUCTS - Ürün Ekleme
app.post(
  "/api/products",
  tokenKontrol,
  adminKontrol,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        model,
        type,
        category,
        stock,
        price,

        // Gözlük
        g_camOlcusu,
        g_cerceveRengi,
        g_cerceveMateryali,
        g_camRengi,
        g_camMateryali,

        // Saat
        s_kordonMateryali,
        s_kordonRengi,
        s_kasaMateryali,
        s_kasaRengi,
        s_suGecirmezlik,

        // Aksesuar
        a_urunMateryali,
        a_urunRengi,
        a_urunTipi,
      } = req.body;

      // Kullanıcı bilgileri doğrulanmış JWT'den alınır.
      const userId = Number(req.user.u_id);
      const role = Number(req.user.u_role);

      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(401).json({
          error: "Token içindeki kullanıcı bilgisi geçersiz.",
        });
      }

      // Yalnızca admin ürün ekleyebilir.
      if (role !== 1) {
        return res.status(403).json({
          error: "Ürün eklemek için admin yetkisi gerekiyor.",
        });
      }

      if (
        !name?.trim() ||
        !model?.trim() ||
        !type?.trim() ||
        !category?.trim() ||
        stock === undefined ||
        stock === "" ||
        price === undefined ||
        price === "" ||
        !Number.isFinite(Number(stock)) ||
        Number(stock) < 0 ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
      ) {
        return res.status(400).json({
          error: "Ürün bilgileri eksik veya hatalı.",
        });
      }

      if (!["Gozluk", "Saat", "Aksesuar"].includes(type)) {
        return res.status(400).json({
          error: "Geçersiz ürün türü.",
        });
      }

      const image1 = req.files?.image1?.[0];
      const image2 = req.files?.image2?.[0];
      const image3 = req.files?.image3?.[0];

      // Birinci görsel zorunlu.
      if (!image1) {
        return res.status(400).json({
          error: "Birinci ürün görseli zorunludur.",
        });
      }

      const p_image1 = `/uploads/products/${model}/${image1.filename}`;
      const p_image2 = image2
        ? `/uploads/products/${model}/${image2.filename}`
        : null;
      const p_image3 = image3
        ? `/uploads/products/${model}/${image3.filename}`
        : null;

      const [result] = await db.query(
        `INSERT INTO products
        (
          u_id,
          p_name,
          p_model,
          p_type,
          p_category,
          p_stock,
          p_price,
          p_image1,
          p_image2,
          p_image3
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          name.trim(),
          model.trim(),
          type.trim(),
          category.trim(),
          Number(stock),
          Number(price),
          p_image1,
          p_image2,
          p_image3,
        ],
      );

      const p_id = result.insertId;

      if (type === "Gozluk") {
        await db.query(
          `INSERT INTO gozlukdetail
          (
            p_id,
            g_camOlcusu,
            g_cerceveRengi,
            g_cerceveMateryali,
            g_camRengi,
            g_camMateryali
          )
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            p_id,
            g_camOlcusu,
            g_cerceveRengi,
            g_cerceveMateryali,
            g_camRengi,
            g_camMateryali,
          ],
        );
      } else if (type === "Saat") {
        await db.query(
          `INSERT INTO saatdetail
          (
            p_id,
            s_kordonMateryali,
            s_kordonRengi,
            s_kasaMateryali,
            s_kasaRengi,
            s_suGecirmezlik
          )
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            p_id,
            s_kordonMateryali,
            s_kordonRengi,
            s_kasaMateryali,
            s_kasaRengi,
            s_suGecirmezlik,
          ],
        );
      } else if (type === "Aksesuar") {
        await db.query(
          `INSERT INTO aksesuar_detail
          (
            p_id,
            a_urunMateryali,
            a_urunRengi,
            a_urunTipi
          )
          VALUES (?, ?, ?, ?)`,
          [p_id, a_urunMateryali, a_urunRengi, a_urunTipi],
        );
      }

      const [rows] = await db.query("SELECT * FROM products WHERE p_id = ?", [
        p_id,
      ]);

      return res.status(201).json({
        message: `${name} adlı ürün eklendi.`,
        product: rows[0],
      });
    } catch (err) {
      console.error("ÜRÜN EKLEME HATASI:", err);

      return res.status(500).json({
        error: "Ürün eklenirken sunucu hatası oluştu.",
      });
    }
  },
);
//! PRODUCTS Toplu Fiyat Güncelleme
app.put(
  "/api/products/toplu-fiyat",
  tokenKontrol,
  adminKontrol,
  async (req, res) => {
    try {
      const { type, action, percent } = req.body;

      const oran = Number(percent);

      // Kontroller
      if (!["Tümü", "Gozluk", "Saat", "Aksesuar"].includes(type)) {
        return res.status(400).json({
          error: "Geçersiz ürün tipi.",
        });
      }

      if (!["zam", "indirim"].includes(action)) {
        return res.status(400).json({
          error: "Geçersiz işlem türü.",
        });
      }

      if (isNaN(oran) || oran <= 0 || oran > 100) {
        return res.status(400).json({
          error: "Yüzde 0 ile 100 arasında olmalıdır.",
        });
      }

      // Ürün tipi için WHERE şartı
      let where = "";
      let params = [];

      if (type !== "Tümü") {
        where = " WHERE p_type = ?";
        params.push(type);
      }

      // ZAM
      if (action === "zam") {
        const [result] = await db.query(
          `UPDATE products
         SET p_price = ROUND(p_price * (1 + ? / 100), 2)
         ${where}`,
          [oran, ...params],
        );

        return res.status(200).json({
          message: `${type} ürünlerine %${oran} zam uygulandı.`,
          affectedRows: result.affectedRows,
        });
      }

      // İNDİRİM
      if (action === "indirim") {
        const [result] = await db.query(
          `UPDATE products
         SET p_disc = ?
         ${where}`,
          [oran, ...params],
        );

        return res.status(200).json({
          message: `${type} ürünlerine %${oran} indirim uygulandı.`,
          affectedRows: result.affectedRows,
        });
      }
    } catch (err) {
      console.error("TOPLU FİYAT GÜNCELLEME HATASI:", err);

      return res.status(500).json({
        error: "Toplu fiyat güncelleme sırasında sunucu hatası.",
      });
    }
  },
);
//! PRODUCTS Ürün Güncelle
app.put("/api/products/:id", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { p_name, p_model, p_type, p_category, p_stock, p_price, p_disc } =
      req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Geçersiz ID",
      });
    }

    if (
      !p_name ||
      !p_model ||
      !p_type ||
      !p_category ||
      p_stock === undefined ||
      p_price === undefined ||
      p_disc === undefined
    ) {
      return res.status(400).json({
        error: "Hatalı Veri Geldi",
      });
    }

    const discount = Number(p_disc);

    if (isNaN(discount) || discount < 0 || discount > 100) {
      return res.status(400).json({
        error: "İndirim oranı 0 ile 100 arasında olmalıdır.",
      });
    }

    const [result] = await db.query(
      `UPDATE products
       SET
         p_name = ?,
         p_model = ?,
         p_type = ?,
         p_category = ?,
         p_stock = ?,
         p_price = ?,
         p_disc = ?
       WHERE p_id = ?`,
      [
        p_name.trim(),
        p_model.trim(),
        p_type.trim(),
        p_category.trim(),
        Number(p_stock),
        Number(p_price),
        discount,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Ürün bulunamadı",
      });
    }

    return res.status(200).json({
      message: "Ürün başarıyla güncellendi.",
      id: id,
    });
  } catch (err) {
    console.error("ÜRÜN GÜNCELLEME HATASI:", err);

    return res.status(500).json({
      error: "Sunucu hatası",
    });
  }
});
//! PRODUCTS Ürün Silme
app.delete(
  "/api/products/:id",
  tokenKontrol,
  adminKontrol,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          error: "Geçersiz ürün ID'si.",
        });
      }

      const [products] = await db.query(
        "SELECT p_model FROM products WHERE p_id = ?",
        [id],
      );

      if (products.length === 0) {
        return res.status(404).json({
          error: "Ürün bulunamadı.",
        });
      }

      const model = products[0].p_model;

      const imageFolder = path.join(
        __dirname,
        "uploads",
        "products",
        String(model),
      );

      const [result] = await db.query("DELETE FROM products WHERE p_id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Ürün silinemedi.",
        });
      }

      try {
        await fs.promises.rm(imageFolder, {
          recursive: true,
          force: true,
        });

        console.log("KLASÖR SİLİNDİ:", imageFolder);
      } catch (folderError) {
        console.error("KLASÖR SİLME HATASI:", folderError);
      }

      return res.status(200).json({
        message: "Ürün silindi.",
      });
    } catch (err) {
      console.error("ÜRÜN SİLME HATASI:", err);

      return res.status(500).json({
        error: "Ürün silinirken sunucu hatası oluştu.",
      });
    }
  },
);

//ADMİN-USERS KODLARII
//! get users endpointi
app.get("/api/users", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
//!USERS kullanıcı Ekleme
app.post("/api/users", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const { firstName, lastName, email, tel, pass, role } = req.body;

    if (!firstName || !lastName || !email || !tel || !pass) {
      return res.status(400).json({
        error: "Tüm alanlar doldurulmalıdır.",
      });
    }

    if (role !== 0 && role !== 1) {
      return res.status(400).json({
        error: "Geçersiz kullanıcı rolü.",
      });
    }

    const [result] = await db.query(
      `INSERT INTO users
      (u_firstName, u_lastName, u_email, u_tel, u_pass, u_role)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        Number(tel),
        pass.trim(),
        role,
      ],
    );

    return res.status(201).json({
      message: "Kullanıcı başarıyla eklendi.",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("USERS INSERT HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
//!USERS Kullanıcı Güncelle
app.put("/api/users/:id", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { firstName, lastName, email, tel, pass, role } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Geçersiz ID." });
    }

    if (!firstName || !lastName || !email || !tel || !pass) {
      return res.status(400).json({ error: "Hatalı veri geldi." });
    }

    if (role !== 0 && role !== 1) {
      return res.status(400).json({
        error: "Geçersiz kullanıcı rolü.",
      });
    }

    const [result] = await db.query(
      `UPDATE users
       SET u_firstName=?, u_lastName=?, u_email=?, u_tel=?, u_pass=?, u_role=?
       WHERE u_id=?`,
      [
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        Number(tel),
        pass.trim(),
        role,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Güncellenecek kullanıcı bulunamadı.",
      });
    }

    return res.status(200).json({
      message: "Kullanıcı başarıyla güncellendi.",
    });
  } catch (err) {
    console.error("USER UPDATE HATASI:", err);

    return res.status(500).json({
      error: "Sunucu hatası",
      detail: err.message,
    });
  }
});
//!USERS Kullanıcı Silme
app.delete("/api/users/:id", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Geçersiz kullanıcı ID'si.",
      });
    }

    const [result] = await db.query("DELETE FROM users WHERE u_id=?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Silinecek kullanıcı bulunamadı.",
      });
    }

    return res.status(200).json({
      message: "Kullanıcı silindi.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//ADMİN-ORDERS KODLARI
//! get orders endpointi
app.get("/api/orders", tokenKontrol, async (req, res) => {
  try {
    const userId = Number(req.user.u_id);
    const userRole = Number(req.user.u_role);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı ID'si geçersiz.",
      });
    }

    if (userRole === 1) {
      const [rows] = await db.query("SELECT * FROM orders ORDER BY o_id ASC");

      return res.status(200).json(rows);
    }

    const [rows] = await db.query(
      "SELECT * FROM orders WHERE u_id = ? ORDER BY o_id ASC",
      [userId],
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("ORDERS GET HATASI:", err);

    return res.status(500).json({
      error: "Siparişler alınırken sunucu hatası oluştu.",
    });
  }
});
//!ORDERS Sipariş Silme
app.delete("/api/orders/:id", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({
        error: "Geçersiz sipariş ID.",
      });
    }

    const [result] = await db.query("DELETE FROM orders WHERE o_id = ?", [
      orderId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Silinecek sipariş bulunamadı.",
      });
    }

    return res.status(200).json({
      message: "Sipariş başarıyla silindi.",
    });
  } catch (err) {
    console.error("SİPARİŞ SİLME HATASI:", err);

    return res.status(500).json({
      error: "Sipariş silinirken sunucu hatası oluştu.",
    });
  }
});
//!ORDERS Sipariş Güncelle
app.put("/api/orders/:id", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const orderId = Number(req.params.id);
    const { o_status } = req.body;

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({
        error: "Geçersiz sipariş ID.",
      });
    }

    if (!o_status) {
      return res.status(400).json({
        error: "Sipariş durumu gönderilmedi.",
      });
    }

    const [result] = await db.query(
      `UPDATE orders
       SET o_status = ?
       WHERE o_id = ?`,
      [o_status, orderId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Sipariş bulunamadı veya durum değişmedi.",
      });
    }

    return res.status(200).json({
      message: "Sipariş durumu güncellendi.",
    });
  } catch (err) {
    console.error("SİPARİŞ UPDATE HATASI:", err);

    return res.status(500).json({
      error: "Sipariş güncellenirken sunucu hatası oluştu.",
    });
  }
});
//!ORDERS Checkout tan Sipariş Gönder
app.post("/api/orders", tokenKontrol, async (req, res) => {
  try {
    const userId = Number(req.user.u_id);
    const { sepet, order, o_amount } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı ID'si geçersiz.",
      });
    }

    if (!Array.isArray(sepet) || sepet.length === 0) {
      return res.status(400).json({
        error: "Sepet boş.",
      });
    }

    if (!order) {
      return res.status(400).json({
        error: "Sipariş bilgileri eksik.",
      });
    }

    const {
      TC,
      firstName,
      lastName,
      email,
      phone,
      address,
      country,
      state,
      zip,
    } = order;

    if (
      !TC ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !country ||
      !state ||
      !zip
    ) {
      return res.status(400).json({
        error: "Tüm sipariş bilgileri doldurulmalıdır.",
      });
    }

    const o_products = sepet.map((item) => ({
      p_name: item.p_name,
      p_model: item.p_model,
      adet: item.adet || 1,
    }));

    const o_pids = sepet.map((item) => item.p_id).join(",");

    // Ad + soyad + email
    const o_person = `${firstName.trim()} ${lastName.trim()}, ${email.trim()}`;

    // Adres + ülke + şehir + posta kodu
    const o_address = `${address.trim()}, ${country.trim()}, ${state.trim()}, ${zip.trim()}`;

    const o_no = "ORD-" + Math.floor(1000 + Math.random() * 9000);

    // Siparişi kullanıcı ID'siyle kaydet
    const [result] = await db.query(
      `INSERT INTO orders
      (
        u_id,
        o_no,
        o_products,
        o_pids,
        o_person,
        o_phone,
        o_tc,
        o_address,
        o_amount,
        o_date,
        o_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
      [
        userId,
        o_no,
        JSON.stringify(o_products),
        o_pids,
        o_person,
        phone.trim(),
        TC.trim(),
        o_address,
        Number(o_amount),
        "Hazırlanıyor",
      ],
    );

    // Sipariş kaydı başarılı olduktan sonra stok düşür
    for (const item of sepet) {
      const adet = Number(item.adet) || 1;

      await db.query(
        `UPDATE products
         SET p_stock = p_stock - ?
         WHERE p_id = ?`,
        [adet, item.p_id],
      );
    }

    return res.status(201).json({
      message: "Sipariş başarıyla oluşturuldu.",
      orderId: result.insertId,
      orderNo: o_no,
    });
  } catch (err) {
    console.error("ORDER INSERT HATASI:", err);

    return res.status(500).json({
      error: "Sipariş oluşturulurken sunucu hatası oluştu.",
    });
  }
});

//ADMİN-MESSAGES KODLARI
//! get messages endpointi
app.get("/api/messages", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM messages ORDER BY m_id DESC");

    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
//!MESSAGES Mesaj Silme
app.delete(
  "/api/messages/:id",
  tokenKontrol,
  adminKontrol,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Geçersiz mesaj ID'si." });
      }

      const [result] = await db.query("DELETE FROM messages WHERE m_id=?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Mesaj bulunamadı." });
      }

      return res.status(200).json({ message: "Mesaj silindi." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
);
//!MESSAGES Durum Güncelleme
app.put("/api/messages/:id", tokenKontrol, adminKontrol, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { m_status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Geçersiz mesaj ID'si." });
    }

    if (m_status !== 0 && m_status !== 1) {
      return res.status(400).json({ error: "Geçersiz durum." });
    }

    const [result] = await db.query(
      "UPDATE messages SET m_status=? WHERE m_id=?",
      [m_status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mesaj bulunamadı." });
    }

    return res.status(200).json({
      message: "Mesaj durumu güncellendi.",
    });
  } catch (err) {
    console.error("MESSAGE UPDATE HATASI:", err);

    return res.status(500).json({
      error: "Sunucu hatası",
      detail: err.message,
    });
  }
});
//CONTACT KODLARI
//!Send Messages
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, code, tel, subject, message } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !code ||
      !tel ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        error: "Tüm alanlar doldurulmalıdır.",
      });
    }
    // 0 = Yanıtlanmadı
    const m_status = 0;

    const [result] = await db.query(
      `INSERT INTO messages
      (m_firstName, m_lastName, m_email, m_code, m_tel, m_subject, m_messages, m_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        code.trim(),
        tel.trim(),
        subject.trim(),
        message.trim(),
        m_status,
      ],
    );

    return res.status(201).json({
      message: "Mesaj başarıyla eklendi.",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("USERS INSERT HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

//USER SET
//!Çekme
app.post("/api/getUsersset", tokenKontrol, async (req, res) => {
  try {
    const id = Number(req.user.u_id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı ID'si geçersiz.",
      });
    }

    const [rows] = await db.query(
      `SELECT 
        u_id,
        u_firstName,
        u_lastName,
        u_email,
        u_tel
       FROM users
       WHERE u_id = ?`,
      [id],
    );

    if (rows.length > 0) {
      return res.status(200).json({
        u_id: rows[0].u_id,
        u_firstName: rows[0].u_firstName,
        u_lastName: rows[0].u_lastName,
        u_email: rows[0].u_email,
        u_tel: rows[0].u_tel,
      });
    }

    return res.status(404).json({
      error: "Kullanıcı bulunamadı.",
    });
  } catch (err) {
    console.error("KULLANICI BİLGİSİ HATASI:", err);

    return res.status(500).json({
      error: "Kullanıcı bilgileri alınırken sunucu hatası oluştu.",
    });
  }
});
//!Güncelleme
app.put("/api/updateUsersset", tokenKontrol, async (req, res) => {
  const id = Number(req.user.u_id);
  const { firstName, lastName, email, tel } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(401).json({
      error: "Token içindeki kullanıcı ID'si geçersiz.",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE users
       SET
         u_firstName = ?,
         u_lastName = ?,
         u_email = ?,
         u_tel = ?
       WHERE u_id = ?`,
      [firstName, lastName, email, tel, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Kullanıcı bulunamadı veya bilgilerde değişiklik yapılmadı.",
      });
    }

    return res.status(200).json({
      message: "Kullanıcı başarıyla güncellendi.",
    });
  } catch (err) {
    console.error("UPDATE HATASI:", err);

    return res.status(500).json({
      error: "Kullanıcı güncellenirken sunucu hatası oluştu.",
    });
  }
});

//!ADMİN-USER - UserName Getir
app.post("/api/getUserName", tokenKontrol, async (req, res) => {
  try {
    const id = Number(req.user.u_id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı ID'si geçersiz.",
      });
    }

    const [rows] = await db.query(
      `SELECT
        u_firstName,
        u_lastName,
        u_email
       FROM users
       WHERE u_id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Kullanıcı bulunamadı.",
      });
    }

    return res.status(200).json({
      firstName: rows[0].u_firstName,
      lastName: rows[0].u_lastName,
      email: rows[0].u_email,
    });
  } catch (err) {
    console.error("KULLANICI BİLGİSİ HATASI:", err);

    return res.status(500).json({
      error: "Kullanıcı bilgileri alınırken sunucu hatası oluştu.",
    });
  }
});
app.get("/api/me", tokenKontrol, async (req, res) => {
  try {
    const id = Number(req.user.u_id);

    const [rows] = await db.query(
      `SELECT u_id, u_role
       FROM users
       WHERE u_id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Kullanıcı bulunamadı.",
      });
    }

    return res.status(200).json({
      u_id: rows[0].u_id,
      u_role: rows[0].u_role,
    });
  } catch (err) {
    console.error("OTURUM BİLGİSİ HATASI:", err);

    return res.status(500).json({
      error: "Oturum bilgileri alınamadı.",
    });
  }
});

//REGİSTER - POST - Sql Sorgusu İNSERT İNTO
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, tel, pass } = req.body;

    if (!firstName || !lastName || !email || !tel || !pass) {
      return res.status(400).json({
        error: "Tüm alanlar doldurulmalıdır.",
      });
    }
    const hashedPass = await bcrypt.hash(pass.trim(), 12);
    const [result] = await db.query(
      `INSERT INTO users
      (u_firstName, u_lastName, u_email, u_tel, u_pass, u_role)
      VALUES (?, ?, ?, ?, ?,?)`,
      [
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        Number(tel),
        hashedPass,
        0,
      ],
    );
    return res.status(201).json({
      message: "Kullanıcı başarıyla eklendi.",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("USERS INSERT HATASI:", err);

    // MySQL: Duplicate entry
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Bu e-posta adresi zaten kayıtlı.",
      });
    }

    return res.status(500).json({
      error: "Kayıt sırasında sunucu hatası oluştu.",
    });
  }
});

//LOGİN - POST - Sql Sorgusu SELECT
app.post("/api/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({
        error: "Email ve şifre gereklidir.",
      });
    }

    const [users] = await db.query(
      `SELECT
        u_id,
        u_firstName,
        u_lastName,
        u_email,
        u_tel,
        u_pass,
        u_role
       FROM users
       WHERE u_email = ?
       LIMIT 1`,
      [email.trim()],
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: "Email veya şifre yanlış.",
      });
    }

    const user = users[0];
    const enteredPass = pass.trim();
    const storedPass = user.u_pass;

    let passwordCorrect = false;

    // Bcrypt ile hashlenmiş şifre
    if (/^\$2[aby]\$/.test(storedPass)) {
      passwordCorrect = await bcrypt.compare(enteredPass, storedPass);
    } else {
      // Eski, düz metin şifreler için geçiş
      passwordCorrect = enteredPass === storedPass;

      if (passwordCorrect) {
        const hashedPass = await bcrypt.hash(enteredPass, 12);

        await db.query(`UPDATE users SET u_pass = ? WHERE u_id = ?`, [
          hashedPass,
          user.u_id,
        ]);
      }
    }

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Email veya şifre yanlış.",
      });
    }

    const token = jwt.sign(
      {
        u_id: user.u_id,
        u_role: user.u_role,
      },
      JWT_SECRET,
      {
        expiresIn: "20m",
      },
    );

    const { u_pass, ...safeUser } = user;

    return res.status(200).json({
      ...safeUser,
      token,
    });
  } catch (err) {
    console.error("LOGIN HATASI:", err);

    return res.status(500).json({
      error: "Giriş sırasında sunucu hatası oluştu.",
    });
  }
});

//!ADRES KODLARI
//Adres Ekle POST
app.post("/api/addresses", tokenKontrol, async (req, res) => {
  try {
    const u_id = Number(req.user.u_id);

    if (!Number.isInteger(u_id) || u_id <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı ID'si geçersiz.",
      });
    }

    const {
      a_title,
      a_person,
      a_email,
      a_phone,
      a_city,
      a_district,
      a_neighborhood,
      a_address,
      a_zip,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO addresses
      (
        u_id,
        a_title,
        a_person,
        a_email,
        a_phone,
        a_city,
        a_district,
        a_neighborhood,
        a_address,
        a_zip
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        u_id,
        a_title,
        a_person,
        a_email,
        a_phone,
        a_city,
        a_district,
        a_neighborhood,
        a_address,
        a_zip,
      ],
    );

    return res.status(201).json({
      message: "Adres başarıyla eklendi.",
      a_id: result.insertId,
    });
  } catch (err) {
    console.error("ADRES EKLEME HATASI:", err);

    return res.status(500).json({
      error: "Adres eklenirken sunucu hatası oluştu.",
    });
  }
});
//ADRESS Get
app.get("/api/addresses", tokenKontrol, async (req, res) => {
  try {
    const userId = Number(req.user.u_id);

    const [rows] = await db.query(
      `SELECT
        a_id,
        u_id,
        a_title,
        a_person,
        a_email,
        a_phone,
        a_city,
        a_district,
        a_neighborhood,
        a_address,
        a_zip
       FROM addresses
       WHERE u_id = ?
       ORDER BY a_id DESC`,
      [userId],
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("ADRES GET HATASI:", err);

    return res.status(500).json({
      error: "Adresler alınırken sunucu hatası oluştu.",
    });
  }
});
// ADRES GÜNCELLE PUT
app.put("/api/addresses/:id", tokenKontrol, async (req, res) => {
  try {
    const addressId = Number(req.params.id);
    const userId = Number(req.user.u_id);

    const {
      a_title,
      a_person,
      a_email,
      a_phone,
      a_city,
      a_district,
      a_neighborhood,
      a_address,
      a_zip,
    } = req.body;

    if (
      !Number.isInteger(addressId) ||
      addressId <= 0 ||
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return res.status(400).json({
        error: "Geçersiz adres veya kullanıcı ID.",
      });
    }

    if (
      !a_title?.trim() ||
      !a_person?.trim() ||
      !a_email?.trim() ||
      !a_phone?.trim() ||
      !a_city?.trim() ||
      !a_district?.trim() ||
      !a_neighborhood?.trim() ||
      !a_address?.trim() ||
      !a_zip?.trim()
    ) {
      return res.status(400).json({
        error: "Tüm adres alanları doldurulmalıdır.",
      });
    }

    const [result] = await db.query(
      `UPDATE addresses
       SET
         a_title = ?,
         a_person = ?,
         a_email = ?,
         a_phone = ?,
         a_city = ?,
         a_district = ?,
         a_neighborhood = ?,
         a_address = ?,
         a_zip = ?
       WHERE a_id = ?
       AND u_id = ?`,
      [
        a_title.trim(),
        a_person.trim(),
        a_email.trim(),
        a_phone.trim(),
        a_city.trim(),
        a_district.trim(),
        a_neighborhood.trim(),
        a_address.trim(),
        a_zip.trim(),
        addressId,
        userId,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Adres bulunamadı veya bilgilerde değişiklik yapılmadı.",
      });
    }

    return res.status(200).json({
      message: "Adres başarıyla güncellendi.",
    });
  } catch (err) {
    console.error("ADRES GÜNCELLEME HATASI:", err);

    return res.status(500).json({
      error: "Adres güncellenirken sunucu hatası oluştu.",
    });
  }
});
// ADRES SİL
app.delete("/api/addresses/:id", tokenKontrol, async (req, res) => {
  try {
    const addressId = Number(req.params.id);
    const userId = Number(req.user.u_id);

    if (
      !Number.isInteger(addressId) ||
      addressId <= 0 ||
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return res.status(400).json({
        error: "Geçersiz adres veya kullanıcı ID.",
      });
    }

    const [result] = await db.query(
      `DELETE FROM addresses
       WHERE a_id = ?
       AND u_id = ?`,
      [addressId, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Adres bulunamadı.",
      });
    }

    return res.status(200).json({
      message: "Adres başarıyla silindi.",
    });
  } catch (err) {
    console.error("ADRES SİLME HATASI:", err);

    return res.status(500).json({
      error: "Adres silinirken sunucu hatası oluştu.",
    });
  }
});

//!GÖZLÜKDETAY
//Çekme
app.get("/api/gozlukdetail/:p_id", async (req, res) => {
  try {
    const p_id = Number(req.params.p_id);

    if (!p_id) {
      return res.status(400).json({
        error: "Geçersiz ürün ID",
      });
    }

    const [rows] = await db.query(
      `SELECT
        p_id,
        g_camOlcusu,
        g_cerceveRengi,
        g_cerceveMateryali,
        g_camRengi,
        g_camMateryali
       FROM gozlukdetail
       WHERE p_id = ?`,
      [p_id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Gözlük detayı bulunamadı",
      });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.log("GÖZLÜK DETAY GET HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
//Güncelle
app.put(
  "/api/gozlukdetail/:p_id",
  tokenKontrol,
  adminKontrol,
  async (req, res) => {
    try {
      const p_id = Number(req.params.p_id);

      const {
        g_camOlcusu,
        g_cerceveRengi,
        g_cerceveMateryali,
        g_camRengi,
        g_camMateryali,
      } = req.body;

      if (isNaN(p_id)) {
        return res.status(400).json({
          error: "Geçersiz ürün ID.",
        });
      }

      if (
        !g_camOlcusu ||
        !g_cerceveRengi ||
        !g_cerceveMateryali ||
        !g_camRengi ||
        !g_camMateryali
      ) {
        return res.status(400).json({
          error: "Tüm gözlük detayları doldurulmalıdır.",
        });
      }

      const [result] = await db.query(
        `UPDATE gozlukdetail
       SET
         g_camOlcusu = ?,
         g_cerceveRengi = ?,
         g_cerceveMateryali = ?,
         g_camRengi = ?,
         g_camMateryali = ?
       WHERE p_id = ?`,
        [
          g_camOlcusu,
          g_cerceveRengi.trim(),
          g_cerceveMateryali.trim(),
          g_camRengi.trim(),
          g_camMateryali.trim(),
          p_id,
        ],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Gözlük detayı bulunamadı.",
        });
      }

      return res.status(200).json({
        message: "Gözlük detayları başarıyla güncellendi.",
      });
    } catch (err) {
      console.log("GÖZLÜK DETAY UPDATE HATASI:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },
);

//!SAATDETAY
//Çekme
app.get("/api/saatdetail/:p_id", async (req, res) => {
  try {
    const p_id = Number(req.params.p_id);

    if (!p_id || isNaN(p_id)) {
      return res.status(400).json({
        error: "Geçersiz ürün ID",
      });
    }

    const [rows] = await db.query(
      `SELECT
        p_id,
        s_kordonMateryali,
        s_kordonRengi,
        s_kasaMateryali,
        s_kasaRengi,
        s_suGecirmezlik
       FROM saatdetail
       WHERE p_id = ?`,
      [p_id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Saat detayı bulunamadı",
      });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.log("SAAT DETAY GET HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
//Güncelle
app.put(
  "/api/saatdetail/:p_id",
  tokenKontrol,
  adminKontrol,
  async (req, res) => {
    try {
      const p_id = Number(req.params.p_id);

      const {
        s_kordonMateryali,
        s_kordonRengi,
        s_kasaMateryali,
        s_kasaRengi,
        s_suGecirmezlik,
      } = req.body;

      if (isNaN(p_id)) {
        return res.status(400).json({
          error: "Geçersiz ürün ID.",
        });
      }

      if (
        !s_kordonMateryali ||
        !s_kordonRengi ||
        !s_kasaMateryali ||
        !s_kasaRengi ||
        !s_suGecirmezlik
      ) {
        return res.status(400).json({
          error: "Tüm saat detayları doldurulmalıdır.",
        });
      }

      const [result] = await db.query(
        `UPDATE saatdetail
       SET
         s_kordonMateryali = ?,
         s_kordonRengi = ?,
         s_kasaMateryali = ?,
         s_kasaRengi = ?,
         s_suGecirmezlik = ?
       WHERE p_id = ?`,
        [
          s_kordonMateryali.trim(),
          s_kordonRengi.trim(),
          s_kasaMateryali.trim(),
          s_kasaRengi.trim(),
          s_suGecirmezlik.trim(),
          p_id,
        ],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Saat detayı bulunamadı.",
        });
      }

      return res.status(200).json({
        message: "Saat detayları başarıyla güncellendi.",
      });
    } catch (err) {
      console.log("SAAT DETAY UPDATE HATASI:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },
);

//!AKSESUARDETAY
//Çekme
app.get("/api/aksesuar_detail/:p_id", async (req, res) => {
  try {
    const p_id = Number(req.params.p_id);

    if (!Number.isInteger(p_id) || p_id <= 0) {
      return res.status(400).json({
        error: "Geçersiz ürün ID.",
      });
    }

    const [rows] = await db.query(
      `SELECT
        p_id,
        a_urunMateryali,
        a_urunRengi,
        a_urunTipi
       FROM aksesuar_detail
       WHERE p_id = ?`,
      [p_id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Aksesuar detayı bulunamadı.",
      });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("AKSESUAR DETAY GET HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

//Güncelle
app.put(
  "/api/aksesuar_detail/:p_id",
  tokenKontrol,
  adminKontrol,
  async (req, res) => {
    try {
      const p_id = Number(req.params.p_id);

      const { a_urunMateryali, a_urunRengi, a_urunTipi } = req.body;

      if (!Number.isInteger(p_id) || p_id <= 0) {
        return res.status(400).json({
          error: "Geçersiz ürün ID.",
        });
      }

      if (!a_urunMateryali || !a_urunRengi || !a_urunTipi) {
        return res.status(400).json({
          error: "Tüm aksesuar detayları doldurulmalıdır.",
        });
      }

      const [result] = await db.query(
        `UPDATE aksesuar_detail
         SET
           a_urunMateryali = ?,
           a_urunRengi = ?,
           a_urunTipi = ?
         WHERE p_id = ?`,
        [a_urunMateryali.trim(), a_urunRengi.trim(), a_urunTipi.trim(), p_id],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Aksesuar detayı bulunamadı veya değişiklik yapılmadı.",
        });
      }

      return res.status(200).json({
        message: "Aksesuar detayları başarıyla güncellendi.",
      });
    } catch (err) {
      console.error("AKSESUAR DETAY UPDATE HATASI:", err);

      return res.status(500).json({
        error: "Aksesuar detayları güncellenirken sunucu hatası oluştu.",
      });
    }
  },
);

//!GÖZLÜKFİLTRELEMEÖZELLİKLER
//Çekme
app.get("/api/gozluk-filtreleri", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT
        g_camOlcusu,
        g_cerceveRengi,
        g_cerceveMateryali,
        g_camRengi,
        g_camMateryali
      FROM gozlukdetail
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

//! SAAT FİLTRELERİ
//Çekme
app.get("/api/saat-filtreleri", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT
        s_kordonMateryali,
        s_kordonRengi,
        s_kasaMateryali,
        s_kasaRengi,
        s_suGecirmezlik
      FROM saatdetail
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

//! AKSESUAR FİLTRELERİ
//Çekme
app.get("/api/aksesuar-filtreleri", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT
        a_urunTipi,
        a_urunMateryali,
        a_urunRengi
      FROM aksesuar_detail
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("AKSESUAR FİLTRE HATASI:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

//!FAVORİLER
//Post
app.post("/api/favoriler", tokenKontrol, async (req, res) => {
  try {
    const u_id = Number(req.user.u_id);
    const { p_id } = req.body;

    if (!Number.isInteger(u_id) || u_id <= 0) {
      return res.status(401).json({
        error: "Token içindeki kullanıcı bilgisi geçersiz.",
      });
    }

    const productId = Number(p_id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        error: "Geçerli bir ürün ID'si gereklidir.",
      });
    }

    const [result] = await db.query(
      `INSERT INTO favoriler (u_id, p_id)
       VALUES (?, ?)`,
      [u_id, productId],
    );

    return res.status(201).json({
      message: "Ürün favorilere eklendi.",
      f_id: result.insertId,
    });
  } catch (err) {
    console.error("FAVORİ EKLEME HATASI:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Bu ürün zaten favorilerinizde.",
      });
    }

    return res.status(500).json({
      error: err.message,
    });
  }
});

//Silme
app.delete("/api/favoriler/:p_id", tokenKontrol, async (req, res) => {
  try {
    const u_id = Number(req.user.u_id);
    const p_id = Number(req.params.p_id);

    if (!Number.isInteger(p_id) || p_id <= 0) {
      return res.status(400).json({
        error: "Geçersiz ürün ID'si.",
      });
    }

    const [result] = await db.query(
      `DELETE FROM favoriler
       WHERE u_id = ? AND p_id = ?`,
      [u_id, p_id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Favori bulunamadı.",
      });
    }

    return res.status(200).json({
      message: "Ürün favorilerden çıkarıldı.",
    });
  } catch (err) {
    console.error("FAVORİ SİLME HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

//Get Çekme
app.get("/api/favoriler", tokenKontrol, async (req, res) => {
  try {
    const u_id = Number(req.user.u_id);

    const [rows] = await db.query(
      `SELECT
        p.*,
        f.f_id,
        f.created_at
       FROM favoriler f
       INNER JOIN products p
         ON p.p_id = f.p_id
       WHERE f.u_id = ?
       ORDER BY f.created_at DESC`,
      [u_id],
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("FAVORİLER GETİRME HATASI:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});



const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));
