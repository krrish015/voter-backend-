const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/votersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Voter Model
const voterSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  dob: Date,
  address: String,
  email: String,
  phone_number: String
});

const Voter = mongoose.model('Voter', voterSchema);

// Routes
app.post('/voters', async (req, res) => {
  const voter = new Voter(req.body);
  await voter.save();
  res.json(voter);
});

app.get('/voters', async (req, res) => {
  const voters = await Voter.find();
  res.json(voters);
});

app.get('/voters/:id', async (req, res) => {
  const voter = await Voter.findById(req.params.id);
  res.json(voter);
});

app.put('/voters/:id', async (req, res) => {
  const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(voter);
});

app.delete('/voters/:id', async (req, res) => {
  await Voter.findByIdAndDelete(req.params.id);
  res.json({ message: 'Voter record deleted successfully.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
