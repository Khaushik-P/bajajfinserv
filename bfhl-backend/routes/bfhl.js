const express = require('express');
const router = express.Router();

// Helper function to determine if a string is a number
const isNumber = (str) => /^\d+$/.test(str);

// POST /bfhl - Process JSON data
router.post('/', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (isNumber(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    res.status(200).json({
        is_success: true,
        user_id: "your_full_name_ddmmyyyy",  // Replace with actual user ID format
        email: "your_email@domain.com",      // Replace with actual email
        roll_number: "your_roll_number",     // Replace with actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET /bfhl - Return a fixed operation code
router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = router;
