const express = require('express');
const routerB = express.Router();
const Caravan = require('/Users/Samai/Desktop/finalProject/back-end/models/Caravan');

// Add caravans
routerB.post('/api/caravans', async (req, res) => {
  try {
    const { title, price, location, name, date } = req.body;

    // Check if any required fields are missing
    if (!title || !price || !location || !name || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newCaravan = new Caravan({ title, location, price, name, date });
    await newCaravan.save();

    // Send the newly created document as the response
    res.status(201).json(newCaravan.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all caravans
routerB.get('/api/caravans', (req, res) => {
  Caravan.find()
    .then((caravans) => {
      res.json(caravans);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update a caravan by ID with specific fields
routerB.put('/api/caravans/:id', async (req, res) => {
  try {
    const caravanId = req.params.id;
    const { title, price, location, name, date } = req.body;

    // Check if at least one field to update is provided
    if (!title && !price && !location && !name && !date) {
      return res.status(400).json({ error: 'At least one field to update is required' });
    }

    // Find the caravan by ID
    const existingCaravan = await Caravan.findById(caravanId);

    if (!existingCaravan) {
      return res.status(404).json({ error: 'Caravan not found' });
    }

    // Update only the provided fields
    if (title) existingCaravan.title = title;
    if (price) existingCaravan.price = price;
    if (location) existingCaravan.location = location;
    if (name) existingCaravan.name = name;
    if (date) existingCaravan.date = date;

    // Save the updated caravan
    await existingCaravan.save();

    res.json(existingCaravan.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a caravan by ID
routerB.delete('/api/caravans/:id', async (req, res) => {
  try {
    const caravanId = req.params.id;

    // Find the caravan by ID and delete it
    const deletedCaravan = await Caravan.findByIdAndDelete(caravanId);

    if (!deletedCaravan) {
      return res.status(404).json({ error: 'Caravan not found' });
    }

    res.json({ message: 'Caravan deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerB;
