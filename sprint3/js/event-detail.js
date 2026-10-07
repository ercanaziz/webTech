// etkinlik-detay.html bu modülü yükler.
// Adresteki ?id= değerine göre doğru etkinliği gösterir.

import { events, isoTarih, okunurTarih } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <div class="kutu kutu-hata" role="alert">
      <p><strong>Etkinlik bulunamadı.</strong></p>
      <p>Aradığınız etkinlik yok ya da adres hatalı${id ? ` (id: ${id})` : ""}.</p>
      <a class="buton" href="etkinlikler.html">← Listeye dön</a>
    </div>`;
} else {
  document.title = event.title;
  baslik.textContent = event.title;

  container.innerHTML = `
    <div class="detay-icerik">
      <figure>
        <img src="img/afis.svg" alt="${event.title} etkinlik afişi" width="600" height="360">
        <figcaption>Şekil 1: etkinlik afişi</figcaption>
      </figure>

      <div>
        <dl>
          <dt>Tarih</dt>
          <dd><time datetime="${isoTarih(event.date)}T${event.time}">${okunurTarih(event.date)}, ${event.time}</time></dd>

          <dt>Yer</dt>
          <dd>${event.location}</dd>

          <dt>Kategori</dt>
          <dd>${event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>${event.capacity}</dd>
        </dl>

        <p>${event.description}</p>

        <p class="detay-butonlar">
          <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
          <a class="buton buton-ikincil" href="etkinlikler.html">← Listeye dön</a>
        </p>
      </div>
    </div>`;
}
