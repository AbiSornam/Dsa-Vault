require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

console.log(`URI (first 20 chars): ${uri.substring(0, 20)}...`);
console.log(`Checking for whitespace... |${uri}|`);

mongoose.connect(uri)
  .then(() => {
    console.log('Connected successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed details:', err);
    process.exit(1);
  });
