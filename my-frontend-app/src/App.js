import axios from 'axios';
import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';

function App() {
    const [response, setResponse] = useState(null);

    const handleSubmit = (jsonData) => {
        axios.post('http://localhost:3000/bfhl', jsonData)
            .then(res => setResponse(res.data))
            .catch(err => console.error(err));
    };

    return (
        <div className="App">
            <h1 className="title">21BPS1537</h1> {/* Replace with actual roll number */}
            <div className="form-container">
                <InputForm onSubmit={handleSubmit} />
            </div>
            {response && <ResponseDisplay data={response} />}
        </div>
    );
}

export default App;
