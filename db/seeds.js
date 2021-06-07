const Property = require('../models/property')
const seedData = require('./seeds.json')

Property.deleteMany({})
  .then(() => {
    return Property.insertMany(seedData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });