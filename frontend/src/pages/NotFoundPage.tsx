import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <div className="kutu kutu-hata" role="alert">
        <p>Aradığınız sayfa yok ya da adres hatalı.</p>
        <Link className="buton" to="/">
          ← Ana sayfaya dön
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
