// index.html ve etkinlikler.html bu modülü yükler.
// Ana sayfada container'da data-limit varsa sadece en yakın N etkinlik gösterilir.

import { events, isoTarih, okunurTarih } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  return `<article class="kart">
    <h2>${event.title}</h2>
    <p>${event.category}</p>
    <p><time datetime="${isoTarih(event.date)}T${event.time}">${okunurTarih(event.date)}</time> · ${event.time}</p>
    <p>${event.location}</p>
    <p>${event.description}</p>
    <a class="buton detay" href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// ---------- Ana sayfa: yaklaşan N etkinlik ----------
if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => isoTarih(a.date).localeCompare(isoTarih(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// ---------- Liste sayfası: arama + kategori filtresi ----------
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    kategoriSecimi.append(opt);
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const kategori = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.description} ${e.location}`.toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = kategori === "" || e.category === kategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
      sonucSatiri.classList.add("bos");
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
      sonucSatiri.classList.remove("bos");
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  filtrele();
}
