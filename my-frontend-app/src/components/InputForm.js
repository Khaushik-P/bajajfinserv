import React, { useState } from 'react';

function InputForm({ onSubmit }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.parse(input);
            onSubmit(jsonData);
        } catch (err) {
            alert('Invalid JSON format');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON data here'
                rows={5}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default InputForm;
