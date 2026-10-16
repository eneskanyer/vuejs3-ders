export function validateRegister(user) {
  if (
    !user.firstName ||
    !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(user.firstName.trim())
  ) {
    return "Ad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (
    !user.lastName ||
    !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(user.lastName.trim())
  ) {
    return "Soyad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    return "Geçerli bir email adresi giriniz.";
  }

  if (!/^\d{10}$/.test(user.tel)) {
    return "Telefon numarası 10 haneli olmalıdır.";
  }

  if (user.pass.length < 6) {
    return "Şifre en az 6 karakter olmalıdır.";
  }

  if (user.pass !== user.repeatPass) {
    return "Şifreler eşleşmiyor.";
  }

  if (!user.check) {
    return "Bilgilerinizin doğruluğunu onaylamalısınız.";
  }

  return null;
}

export function validateAdminUser(user) {
  if (
    !user.firstName ||
    !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(user.firstName.trim())
  ) {
    return "Ad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (
    !user.lastName ||
    !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(user.lastName.trim())
  ) {
    return "Soyad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    return "Geçerli bir email adresi giriniz.";
  }

  if (!/^\d{10}$/.test(user.tel)) {
    return "Telefon numarası 10 haneli olmalıdır.";
  }

  if (user.pass.length < 6) {
    return "Şifre en az 6 karakter olmalıdır.";
  }

  if (user.role !== 0 && user.role !== 1) {
    return "Geçersiz kullanıcı rolü.";
  }

  return null;
}

export function validateCheckout(order, payment) {
  if (!/^\d{11}$/.test(order.TC)) {
    return "TC Kimlik numarası 11 haneli olmalıdır.";
  }

  if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(order.firstName.trim())) {
    return "Ad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(order.lastName.trim())) {
    return "Soyad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)) {
    return "Geçerli bir email adresi giriniz.";
  }

  if (!/^\d{10}$/.test(order.phone)) {
    return "Telefon numarası 10 haneli olmalıdır.";
  }

  if (!order.address || order.address.trim().length < 10) {
    return "Geçerli bir teslimat adresi giriniz.";
  }

  if (!order.country) {
    return "Lütfen ülke seçiniz.";
  }

  if (!order.state) {
    return "Lütfen şehir seçiniz.";
  }

  if (!/^\d{5}$/.test(order.zip)) {
    return "Posta kodu 5 haneli olmalıdır.";
  }

  if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(payment.name.trim())) {
    return "Kart üzerindeki isim geçersiz.";
  }

  if (!/^\d{16}$/.test(payment.number)) {
    return "Kredi kartı numarası 16 haneli olmalıdır.";
  }

  if (!/^\d{3}$/.test(payment.cvv)) {
    return "CVC 3 haneli olmalıdır.";
  }

  return null;
}

export function validateContact(message) {
  if (
    !message.firstName ||
    !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(message.firstName.trim())
  ) {
    return "Ad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (
    !message.lastName ||
    !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(message.lastName.trim())
  ) {
    return "Soyad en az 2 karakter olmalı ve sayı içermemelidir.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) {
    return "Geçerli bir email adresi giriniz.";
  }

  if (!/^\d{10}$/.test(message.tel)) {
    return "Telefon numarası 10 haneli olmalıdır.";
  }

  if (!message.subject) {
    return "Lütfen bir konu seçiniz.";
  }

  if (!message.message || message.message.trim().length < 5) {
    return "Mesaj en az 5 karakter olmalıdır.";
  }

  if (!message.check) {
    return "Bilgilerinizin doğruluğunu onaylamalısınız.";
  }

  return null;
}
