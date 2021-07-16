const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') //Q: WHY import these models from index vs. from each separate model file?
//a: because they were updated in the index to have more function or ability
//Q: Why do you think each object inside of the arrays are structured the way that they are?
//A:because they are an object containing value pairs
//Q: What do you think will happen when we 'seed' this file?
//IT will get object array and add them 

const seedRestaurant = [
  {
    name: 'AppleBees',
    location: 'Texas',
    cuisine: 'FastFood'
  },
  {
    name: 'LittleSheep',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
  {
    name: 'Spice Grill',
    location: 'Houston',
    cuisine: 'Indian'
  },
  {
    name: 'burgetking',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
  {
    name: 'MCDS',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
]
const seedMenu = [
  {
    title: 'Breakfast',
    RestaurantId : 1,
  },
  {
    title: 'Lunch',
    RestaurantId : 2,
  },
  {
    title: 'Dinner',
    RestaurantId : 3,
  },
]
const seedItem = [
  {
    name: 'bhindi masala',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: true,
    MenuId : 3,
  },
  {
    name: 'egusi soup',
    image: 'someimage.jpg',
    price: 10.50,
    vegetarian: false,
    MenuId : 2,
  },
  {
    name: 'hamburger',
    image: 'someimage.jpg',
    price: 6.50,
    vegetarian: false,
    MenuId : 1,
  }
]

//Q: Try to decifer the following function.
//A: This will bulk grab each item in the array(s) and add them to the correct table
//Q: Why are we using async and await?
//a: unknown time frame to create or add tables to async 
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true})
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true})
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//Q: What is seed() returning?
//a:Seeding success or error message 
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })

