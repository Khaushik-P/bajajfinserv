// src/TextInput.js
import React, { useState } from 'react';

const TextInput = ({ onSubmit }) => {
  const [json, setJson] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      JSON.parse(json);
      setError('');
      await onSubmit(JSON.parse(json));
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='Enter JSON'
        rows='5'
        cols='40'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextInput;
