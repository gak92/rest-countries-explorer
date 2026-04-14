import React from "react";

function SelectMenu({ setQuery }) {
  return (
    <select
      className="filter-by-region"
      onChange={(e) => setQuery(e.target.value)}
    >
      <option hidden>Filter by Region</option>
      <option value="">All</option>
      <option value="africa">Africa</option>
      <option value="america">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
  );
}

export default SelectMenu;
