// etkinlik-ekle.html ve etkinlik-guncelle.html bu modülü yükler.
// Formu yakalar, doğrular, hata veya başarı mesajı gösterir.
// Veri kaydedilmez; kalıcı kayıt backend sprintinde gelecek.

import { events, isoTarih } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";

// ---------- Kategori seçeneklerini veriden üret ----------
const kategoriSecimi = form.elements.kategori;
[...new Set(events.map((e) => e.category))].forEach((k) => {
  const opt = document.createElement("option");
  opt.value = k;
  opt.textContent = k;
  kategoriSecimi.append(opt);
});

// ---------- Güncelleme modu: formu id ile doldur ----------
let duzenlenen = null;

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  duzenlenen = events.find((e) => e.id === id);

  if (!duzenlenen) {
    form.outerHTML = `
      <div class="kutu kutu-hata" role="alert">
        <p><strong>Güncellenecek etkinlik bulunamadı.</strong></p>
        <p>Bu sayfaya bir etkinliğin detayındaki "Bu etkinliği güncelle" butonuyla gelin.</p>
        <a class="buton" href="etkinlikler.html">Etkinliklere git</a>
      </div>`;
  } else {
    document.title = `Güncelle: ${duzenlenen.title}`;
    form.elements.ad.value = duzenlenen.title;
    form.elements.kategori.value = duzenlenen.category;
    form.elements.tarih.value = isoTarih(duzenlenen.date);
    form.elements.saat.value = duzenlenen.time;
    form.elements.yer.value = duzenlenen.location;
    form.elements.kontenjan.value = duzenlenen.capacity;
    form.elements.aciklama.value = duzenlenen.description;
  }
}

// Form kaldırıldıysa (geçersiz id) geri kalanı çalıştırma
if (document.querySelector("#etkinlik-formu")) {
  // ---------- Yardımcılar ----------
  function hataGoster(alanAdi, metin) {
    const alan = form.elements[alanAdi];
    const hataYeri = document.querySelector(`#${alanAdi}-hata`);
    alan.setAttribute("aria-invalid", "true");
    hataYeri.textContent = metin;
  }

  function hataTemizle(alanAdi) {
    const alan = form.elements[alanAdi];
    const hataYeri = document.querySelector(`#${alanAdi}-hata`);
    alan.removeAttribute("aria-invalid");
    if (hataYeri) hataYeri.textContent = "";
  }

  // Kullanıcı alanı düzeltince eski hatası silinsin
  form.addEventListener("input", (e) => {
    if (e.target.name) hataTemizle(e.target.name);
  });

  // "2026-10-12" -> "12-10-2026" (data.js biçimi)
  function veriTarihi(iso) {
    if (!iso) return "";
    const [yyyy, aa, gg] = iso.split("-");
    return `${gg}-${aa}-${yyyy}`;
  }

  // ---------- Gönderim ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mesaj.innerHTML = "";

    const fd = new FormData(form);
    const kontenjanMetni = fd.get("kontenjan").trim();

    const data = {
      id: duzenlenen ? duzenlenen.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: veriTarihi(fd.get("tarih")),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      description: fd.get("aciklama").trim(),
      capacity: kontenjanMetni === "" ? null : Number(kontenjanMetni),
    };

    // ---------- Doğrulama ----------
    const errors = {};

    if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih boş bırakılamaz.";
    if (!data.time) errors.saat = "Saat boş bırakılamaz.";
    if (!data.location) errors.yer = "Yer boş bırakılamaz.";
    if (
      kontenjanMetni !== "" &&
      (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
    ) {
      errors.kontenjan = "1 ile 1000 arasında bir sayı girin.";
    }

    ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach(hataTemizle);
    Object.entries(errors).forEach(([alan, metin]) => hataGoster(alan, metin));

    if (Object.keys(errors).length > 0) {
      mesaj.innerHTML = `<div class="kutu kutu-hata" role="alert">Formda hatalı alanlar var. Lütfen işaretli alanları düzeltin.</div>`;
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }

    // ---------- Başarı ----------
    const baslik = guncelleModu
      ? `"${data.title}" güncellendi.`
      : `"${data.title}" eklendi.`;

    mesaj.innerHTML = `
      <div class="kutu kutu-basari" role="status">
        <p><strong>${baslik}</strong> Oluşan nesne:</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>`;
    console.log(data);
  });
}
