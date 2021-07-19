const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const express = require("express");
const path = require('path'); //a node native module
const {Restaurant, Menu, Item} = require('./models/index');

const app = express();
//Setup Templating Engine 
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

const port = 3000;

// Add this boilerplate middleware to successfully use req.body
app.use(express.json())

//New Code 
app.use(express.static(path.join(__dirname, 'public')))



app.get('/item', async (req, res) => {
    const allItems = await Item.findAll();
    res.json(allItems);
})
app.get('/flipcoin', async (req, res) => {
    const coinflip = !Math.floor(Math.random() * 2) ? 'Heads' : 'Tails'
    res.send(coinflip);
})
app.get('/item/:id', async (req, res) => {
    const allItems = await Item.findByPk(req.params.id, {include:Menu });
    res.json(allItems);
})
app.get('/restaurant', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    // res.json(item);
    res.render('restaurants', { restaurants })
});
app.get('/restaurant/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {include:Menu });
    res.render('restaurant', { restaurant });
});
app.get('/menu/:id', async (req, res) => {
    const menu = await Menu.findByPk(req.params.id, {include:Item });
    res.json(menu);
});

app.get('/menu', async (req, res) => {
    const menu = await Menu.findAll(req.params.id, {include:Item });
    res.json(menu);
    res.render('sauces', { sauces })
});

// Add new restaraunt
app.post('/restaurant', async (req, res) => {
	let newRestaurant = await restaurant.create(req.body);
	res.send('Created!')
})

// Delete a restaraunt

app.delete('/restaraunt/:id', async (req, res) => {
	await Restaraunt.destroy({
		where : {id : req.params.id} // Destory an Restaraunt where this object matches
	})
	res.send("Deleted!!")
})

// Update a Restaraunt
app.put("/restaraunt/:id", async (req, res) => {
	let updated = await restaraunt.update(req.body, {
		where : {id : req.params.id} // Update a restaraunt where the id matches, based on req.body
	})
	res.send("Updated!!")
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


//New Code - Brought in at 1504 - 7.15
app.use(express.static(path.join(__dirname, 'public')))

