const User = require('../models/user')
const seedData = require('./userSeeds.json')

User.deleteMany({})
  .then(() => {
    return User.insertMany(seedData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });