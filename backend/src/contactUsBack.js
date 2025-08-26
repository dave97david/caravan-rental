const express = require('express');
const routerC = express.Router();
const contactUs = require('../models/Caravan');


// Add ContactUs
routerC.post('/api/contactUs', async (req, res) => {
  try {
    const { nameC, phone, email, message } = req.body;

    // Check if any required fields are missing
    if (!nameC || !phone || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation using a regular expression
    /*var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'The email form is incorrectly' });;
    }*/

    const newContactUs = new contactUs({ nameC, phone, email, message });
    await newContactUs.save();

    // Send the newly created document as the response
    res.status(201).json(newContactUs.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Contact forms
routerC.get('/api/contactUs', (req, res) => {
  contactUs.find()
    .then((contactUs) => {
      res.json(contactUs);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});



routerC.put('/api/contactUs/:id', async (req, res) => {
  try{
    const contactUsId = req.params.id;
    const { nameC, phone, email, message } = req.body;

    // Check if at least one field to update is provided
    if (!nameC && !phone && !email && !message) {
      return res.status(400).json({ error: 'At least one field to update is required' });
    }

    // Find the contactUs by ID
    const existingContactUs = await contactUs.findById(contactUsId);

    if (!existingContactUs) {
      return res.status(404).json({ error: 'contactUs not found' });
    }

    // Update only the provided fields
    if (nameC) existingContactUs.nameC = nameC;
    if (phone) existingContactUs.phone = phone;
    if (email) existingContactUs.email = email;
    if (message) existingContactUs.message = message;

    // Save the updated contactUs
    await existingContactUs.save();

    res.json(existingContactUs.toObject());
  } catch (error) {
  res.status(400).json({ error: error.message });
  }

});

// Delete a Contact us form by ID
routerC.delete('/api/contactUs/:id', async (req, res) => {
  try {
    const contactUsId = req.params.id;

    // Find the Contact us form by ID and delete it
    const deletedContactUsId = await contactUs.findByIdAndDelete(contactUsId);

    if (!deletedContactUsId) {
      return res.status(404).json({ error: 'Contact us form not found' });
    }

    res.json({ message: 'Contact us form deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerC;