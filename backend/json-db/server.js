const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//! Ürün resimlerinin bulunduğu klasörü erişilebilir yap
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//! Ürün resimleri için multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads/products");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1000000000) + extension;

    cb(null, fileName);
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

//! get hello endpointi
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Merhaba! Backend çalışıyor.",
    time: new Date().toISOString(),
  });
});

//ADMİN-PRODUCTS KODLARII
//! get products endpointi
app.get("/api/products", (req, res) => {
  const data = fs.readFileSync("products.json", "utf-8");
  res.status(200).json(JSON.parse(data));
});

//!PRODUCTS Ürün Ekleme
app.post(
  "/api/products",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const { name, model, stock, price } = req.body;

      if (!name || !model || !stock || !price) {
        return res.status(400).json("Hatalı Veri Geldi");
      }

      const data = JSON.parse(fs.readFileSync("products.json", "utf-8"));

      const image1 = req.files?.image1?.[0];
      const image2 = req.files?.image2?.[0];
      const image3 = req.files?.image3?.[0];

      const newProduct = {
        id: Number(data[data.length - 1]?.id || 0) + 1,
        name: name,
        model: model,
        stock: Number(stock),
        price: Number(price),
        image1: image1 ? `/uploads/products/${image1.filename}` : null,
        image2: image2 ? `/uploads/products/${image2.filename}` : null,
        image3: image3 ? `/uploads/products/${image3.filename}` : null,
      };

      data.push(newProduct);

      fs.writeFileSync("products.json", JSON.stringify(data, null, 2));

      res.status(201).json("Ürün Başarıyla Eklendi..");
    } catch (e) {
      console.log(e);
      res.status(500).json("Sunucuda Hata Oldu...");
    }
  },
);

//!PRODUCTS Ürün Güncelle
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, model, stock, price } = req.body;

  if (!name || !model || !stock > 0 || !price) {
    return res.status(400).json("Hatalı Veri Geldi");
  }

  const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Güncellenecek ürün bulunamadı.",
    });
  }

  product.name = name.trim();
  product.model = model;
  product.stock = stock;
  product.price = Number(price);

  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

  res.status(200).json(product);
});

//!PRODUCTS Ürün Silme
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Silinecek ürün bulunamadı.",
    });
  }

  products.splice(products.indexOf(product), 1);

  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

  res.status(200).json(product);
});

//ADMİN-USERS KODLARII
//! get users endpointi
app.get("/api/users", (req, res) => {
  const data = fs.readFileSync("users.json", "utf-8");
  res.status(200).json(JSON.parse(data));
});

//!USERS kullanıcı Ekleme
app.post("/api/users", (req, res) => {
  try {
    const { firstName, lastName, email, tel, pass } = req.body;

    if (!firstName || !lastName || !email || !tel || !pass) {
      res.status(400).json("Hatalı veri geldi.");
    } else {
      const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));

      const newUser = {
        id: Number(data[data.length - 1]?.id || 0) + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        tel: tel,
        pass: pass,
      };

      data.push(newUser);

      fs.writeFileSync("users.json", JSON.stringify(data, null, 2));

      res.status(201).json("Kullanıcı Başarıyla Eklendi..");
    }
  } catch (e) {
    res.status(500).json("Sunucuda Hata Oldu...");
  }
});

//!USERS Kullanıcı Güncelle
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { firstName, lastName, email, tel, pass } = req.body;

  if (!firstName || !lastName || !email || !tel || !pass) {
    return res.status(400).json("Hatalı Veri Geldi");
  }

  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Güncellenecek kullanıcı bulunamadı.",
    });
  }

  user.firstName = firstName.trim();
  user.lastName = lastName;
  user.email = email;
  user.tel = tel;
  user.pass = pass;

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.status(200).json(user);
});

//!USERS Kullanıcı Silme
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Silinecek ürün bulunamadı.",
    });
  }

  users.splice(users.indexOf(user), 1);

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.status(200).json(user);
});

//ADMİN-ORDERS KODLARI
//! get orders endpointi
app.get("/api/orders", (req, res) => {
  const data = fs.readFileSync("orders.json", "utf-8");
  res.status(200).json(JSON.parse(data));
});

//!ORDERS Sipariş Silme
app.delete("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);

  const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({
      error: "Silinecek sipariş bulunamadı.",
    });
  }

  orders.splice(orders.indexOf(order), 1);

  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

  res.status(200).json(order);
});

//!ORDERS Sipariş Güncelle
app.put("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const { o_status } = req.body;

  if (!o_status) {
    return res.status(400).json("Hatalı Veri Geldi");
  }

  const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({
      error: "Güncellenecek Sipariş bulunamadı.",
    });
  }
  order.o_status = o_status;

  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

  res.status(200).json(order);
});

//!ORDERS Checkout tan Sipariş Gönder
app.post("/api/orders", (req, res) => {
  try {
    const { sepet, order, amount } = req.body;

    if (!sepet || !order || !amount) {
      return res.status(400).json("Eksik Veri Geldi");
    } else {
      const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));
      let products = [],
        pids = [];
      for (let i = 0; i < sepet.length; i++) {
        products.push({
          name: sepet[i].name,
          model: sepet[i].model,
          adet: sepet[i].adet || 1,
        });
        pids.push(sepet[i].id);
      }
      const newOrder = {
        id: Number(orders[orders.length - 1]?.id || 0) + 1,
        o_no: "SPR-" + (Number(orders[orders.length - 1]?.id || 0) + 1),
        o_products: products,
        o_pids: pids,
        o_person: order[0].firstName + " " + order[0].lastName,
        o_phone: order[0].phone,
        o_tc: order[0].TC,
        o_address:
          order[0].address + " " + order[0].state + "/" + order[0].country,
        o_amount: amount,
        o_date: new Date().toLocaleString("tr-TR"),
        o_status: "Hazırlanıyor",
      };
      orders.push(newOrder);
      fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

      //!Stok Düşür

      const allproducts = JSON.parse(fs.readFileSync("products.json", "utf-8"));

      for (let i = 0; i < sepet.length; i++) {
        const product = allproducts.find(
          (p) => Number(p.id) === Number(sepet[i].id),
        );

        if (product) {
          const adet = Number(sepet[i].adet || 1);
          const eskiStok = Number(product.stock);

          product.stock = eskiStok - adet;
        }
      }

      fs.writeFileSync("products.json", JSON.stringify(allproducts, null, 2));

      res.status(201).json("Sipariş Alındı");
    }
  } catch (e) {
    res.status(500).json("Sunucuda Hata Oldu...");
  }
});

//ADMİN-MESSAGES KODLARI
//! get messages endpointi
app.get("/api/messages", (req, res) => {
  const data = fs.readFileSync("messages.json", "utf-8");
  res.status(200).json(JSON.parse(data));
});

//!MESSAGES Mesaj Silme
app.delete("/api/messages/:id", (req, res) => {
  const id = Number(req.params.id);

  const messages = JSON.parse(fs.readFileSync("messages.json", "utf-8"));

  const message = messages.find((m) => m.id === id);

  if (!message) {
    return res.status(404).json({
      error: "Silinecek mesaj bulunamadı.",
    });
  }

  messages.splice(messages.indexOf(message), 1);

  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

  res.status(200).json(message);
});

//CONTACT KODLARI
//!Send Messages
app.post("/api/contact", (req, res) => {
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
      res.status(400).json("basarisiz");
    }

    const messages = JSON.parse(fs.readFileSync("messages.json", "utf-8"));

    const newMessage = {
      id: Number(messages[messages.length - 1]?.id || 0) + 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      code: code,
      tel: tel,
      subject: subject,
      message: message,
    };

    messages.push(newMessage);

    fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

    res.status(201).json("basarili");
  } catch (e) {
    res.status(500).json("basarisiz");
  }
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));
