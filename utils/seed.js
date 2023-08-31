const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [
    {
      username: "ShootingStar",
      email: "blue@aberrantgirls.com"
    },
    {
      username: "LadyBug",
      email: "orange@aberrantgirls.com"
    },
    {
      username: "Queen_Pheonix",
      email: "red@aberrantgirls.com"
    },
    {
      username: "MerryGold",
      email: "yellow@aberrantgirls.com"
    },
  ];


  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
