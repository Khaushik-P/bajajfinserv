// src/ResponseDisplay.js
import React from 'react';

const ResponseDisplay = ({ data, filterOptions }) => {
  const filteredData = {
    Alphabets: data.alphabets || [],
    Numbers: data.numbers || [],
    'Highest lowercase alphabet': data.highest_lowercase_alphabet || []
  };

  let result = [];
  filterOptions.forEach(option => {
    if (filteredData[option]) {
      result = result.concat(filteredData[option]);
    }
  });

  return (
    <div>
      {result.length > 0 ? result.join(', ') : 'No data to display'}
    </div>
  );
};

export default ResponseDisplay;
