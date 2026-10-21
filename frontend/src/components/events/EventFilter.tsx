import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  resultCount: number;
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  resultCount,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <>
      <form className="filtre" onSubmit={(e) => e.preventDefault()}>
        <p>
          <label htmlFor="arama">Etkinlik ara</label>
          <input
            type="search"
            id="arama"
            placeholder="atölye, kariyer..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="kategori-filtre">Kategori</label>
          <select
            id="kategori-filtre"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as Category | "")}
          >
            <option value="">Tümü</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </p>
      </form>
      {resultCount > 0 && (
        <p className="sonuc" aria-live="polite">
          {resultCount} etkinlik listeleniyor.
        </p>
      )}
    </>
  );
}

export default EventFilter;
