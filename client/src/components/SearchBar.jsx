import { Search, Filter } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="search-container">

      <div className="search-box">

        <Search
          size={18}
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search tracked products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="filter-box">

        <Filter
          size={17}
          className="filter-icon"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="all">
            All Products
          </option>

          <option value="Watching">
            Watching
          </option>

          <option value="Price Dropped">
            Price Dropped
          </option>

        </select>

      </div>

    </div>
  );
}

export default SearchBar;