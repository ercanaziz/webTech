import type { Category } from "../../types/campus-event";

interface EventFormProps {
  categories: Category[];
  onSubmit: () => void;
}

function EventForm({ categories, onSubmit }: EventFormProps) {
  return (
    <>
      <p className="sonuc">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>
          <label htmlFor="title">Etkinlik adı</label>
          <input type="text" id="title" name="title" maxLength={80} />
        </p>

        <p>
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label htmlFor="date">Tarih</label>
          <input type="date" id="date" name="date" />
        </p>

        <p>
          <label htmlFor="time">Saat</label>
          <input type="time" id="time" name="time" />
        </p>

        <p>
          <label htmlFor="location">Yer</label>
          <input type="text" id="location" name="location" maxLength={80} />
        </p>

        <p>
          <label htmlFor="capacity">Kontenjan</label>
          <input type="number" id="capacity" name="capacity" min={1} max={1000} />
        </p>

        <p>
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" name="description" rows={5} />
        </p>

        <p>
          <button type="submit">Kaydet</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;
