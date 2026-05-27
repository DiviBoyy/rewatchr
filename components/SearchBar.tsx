"use client";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="search-wrap">
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search anime, vibes, genres..." />
      <button type="button">Search</button>
    </div>
  );
}
