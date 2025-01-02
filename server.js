const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// API route to interact with the FB Auto Liker API
app.get('/api/react', async (req, res) => {
  const { cookie, link, react } = req.query;

  if (!cookie || !link || !react) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  try {
    const apiUrl = `https://fbapi-production.up.railway.app/reaction?token=${cookie}&post=${link}&react=${react}`;
    
    const response = await fetch(apiUrl);
    const result = await response.json();
    
    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});