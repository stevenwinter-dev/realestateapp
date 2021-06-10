// const Property = require('../models/property')
// const seedData = require('./seeds.json')

// Property.deleteMany({})
//   .then(() => {
//     return Property.insertMany(seedData);
//   })
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => {
//     process.exit();
//   });

const Property = require('../models/property')
const Users = require('../models/user')
const seedData = require('./seeds.json')

Property.deleteMany({})
  .then(() => Users.deleteMany({}))
  .then(() => {
    return Users.create({email: 'fake@email.net', password: 'Password123'})

  .then(user => seedData.map(property => ({...property, seller: user._id})))
  .then(bookmarks => Property.insertMany(bookmarks))
  })
  .then(console.log)
  // Log the error if the insert didn't work
  .catch(console.error)
  // Whether it was successful or not, we need to 
  // exit the database.
  .finally(() => {
    // Close the connection to Mongo
    process.exit();
  });