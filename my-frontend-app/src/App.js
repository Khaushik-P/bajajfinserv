import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const data = JSON.parse(jsonInput);
      const result = await axios.post('http://localhost:8082/bfhl', data);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or server error');
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return <p>No data to display</p>;

    const { Numbers = [], Alphabets = [], HighestLowercaseAlphabet = [] } = response;

    let dataToDisplay = [];

    if (selectedOptions.includes('Numbers')) {
      dataToDisplay = dataToDisplay.concat(Numbers);
    }
    if (selectedOptions.includes('Alphabets')) {
      dataToDisplay = dataToDisplay.concat(Alphabets);
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      dataToDisplay = dataToDisplay.concat(HighestLowercaseAlphabet);
    }

    if (dataToDisplay.length === 0) {
      return <p>No data to display</p>;
    }

    return (
      <ul>
        {dataToDisplay.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <h1>21BPS1537</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Paste JSON input here'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <select multiple={true} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
