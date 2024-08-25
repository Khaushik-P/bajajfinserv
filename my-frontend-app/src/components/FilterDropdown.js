import React from "react";

function FilterDropdown({ options, onFilterChange }) {
  return (
    <div className="filter-dropdown">
      <h3>Select Filters:</h3>
      <label>
        <input
          type="checkbox"
          checked={options.alphabets}
          onChange={() => onFilterChange("alphabets")}
        />
        Alphabets
      </label>
      <label>
        <input
          type="checkbox"
          checked={options.numbers}
          onChange={() => onFilterChange("numbers")}
        />
        Numbers
      </label>
      <label>
        <input
          type="checkbox"
          checked={options.highestLowercaseAlphabet}
          onChange={() => onFilterChange("highestLowercaseAlphabet")}
        />
        Highest Lowercase Alphabet
      </label>
    </div>
  );
}

export default FilterDropdown;
