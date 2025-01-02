const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.) from the "public" directory
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission
app.post('/', async (req, res) => {
  const { access_token, post_link, reaction_type } = req.body;

  if (!access_token || !post_link || !reaction_type) {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'), {
      message: 'Please fill out all fields.',
    });
  }

  try {
    const response = await axios.get('https://fbapi-production.up.railway.app/reaction', {
      params: {
        token: access_token,
        post: post_link,
        react: reaction_type,
      },
    });

    let message = '';
    if (response.data?.success) {
      message = `Successfully reacted with ${reaction_type}!`;
    } else {
      message = `Failed to react: ${response.data?.message || 'Unknown error.'}`;
    }

    res.sendFile(path.join(__dirname, 'views', 'index.html'), { message });
  } catch (error) {
    console.error('Error:', error.message);
    res.sendFile(path.join(__dirname, 'views', 'index.html'), {
      message: 'An error occurred. Please try again.',
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});