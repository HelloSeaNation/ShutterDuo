const express = require('express');
const router = express.Router();

const Users = require('./mongo').collection;

router.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const users = await Users.find({
      $or: [
        { firstName: new RegExp(query, 'i') },
        { surname: new RegExp(query, 'i') },
        { location: new RegExp(query, 'i') },
        { job: new RegExp(query, 'i') },
      ]
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching search results", error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;