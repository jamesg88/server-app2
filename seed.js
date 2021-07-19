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
    cuisine: 'DineIn',
    image: 'https://theculturetrip.com/wp-content/uploads/2017/02/canlispenthousea_54961.jpg'
  },
  {
    name: 'LittleSheep',
    location: 'Dallas',
    cuisine: 'Mediterranean',
    image: 'https://cdn.vox-cdn.com/thumbor/LxPPZ3M7j0KMYBwedx_yg_QxC5I=/0x0:1920x1238/1400x1050/filters:focal(799x700:1105x1006):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/63294545/aquashard_ldn_experience_1a_x4.0.jpg'
  },
  {
    name: 'SpiceGrill',
    location: 'Houston',
    cuisine: 'Indian',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnFKp2OMZEx9s99tBVKFhP9Pau7N28tfizNw&usqp=CAU'
  },
  {
    name: 'BurgerKing',
    location: 'Dallas',
    cuisine: 'American',
    image: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/10/Restaurant-dining-room-overlooking-Chicago.jpg'
  },
  {
    name: 'McDonalds',
    location: 'Dallas',
    cuisine: 'American',
    image: 'https://www.glimpsecorp.com/wp-content/uploads/2018/04/iStock-509934928.jpg'
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

