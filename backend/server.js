const app = require('express')();
const bodyParser = require('body-parser');

// database
class Product {
	constructor(id, name, image, price) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.price = price;
	}
}

class Customer {
	constructor(id, email, name, address, city, postcode) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.address = address;
		this.city = city;
		this.postcode = postcode;
	}
}

class Order {
	constructor(customer, products) {
		this.customer = customer;
		this.products = products;
		this.state = "Created";
	}
}

class Advert {
	constructor(image, href) {
		this.image = image;
		this.href = href;
		this.counter = 0;
	}
}

var products = [];
var customers = [];
var orders = [];
var advert;

function initDatabase() {
	// 3 products
	products.push(new Product(0, "Kábel", "kabel.jpg", 4.99));
	products.push(new Product(1, "Slúchadlá", "phones.jpg", 12.59));
	products.push(new Product(2, "Telefon", "phone.jpg", 39.99));

	advert = new Advert("advert.jpg", "https://github.com/Salgac/");
}

// api
app.get('/api', (req, res) => {
	console.log("GET '/api'");
	res.json({ hello: "world" });
});

// products
app.get('/api/products', (req, res) => {
	console.log("GET '/api/products'");

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json({ products: products });
});

app.get('/api/products/:id', (req, res) => {
	console.log("GET '/api/products/:id'");

	res.setHeader('Access-Control-Allow-Origin', '*');
	var product = products[req.params.id];
	if (product != undefined)
		res.json(product);
	else
		res.json({ error: `Product with id ${req.params.id} does not exist.` }).status(404);
});

app.get('/api/products/:id/image', (req, res) => {
	console.log("GET '/api/products/:id/image'");

	res.setHeader('Access-Control-Allow-Origin', '*');
	const path = require('path');
	var product = products[req.params.id];

	if (product != undefined)
		res.sendFile(path.join(__dirname, "images/" + product.image));
	else
		res.status(404).json({ error: `Product with id ${req.params.id} does not exist.` });
});

// customers
app.get('/api/customers', (req, res) => {
	console.log("GET '/api/customers'");

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json({ customers: customers });
});

// order
app.get('/api/orders', (req, res) => {
	console.log("GET '/api/orders'");

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json({ orders: orders });
});

app.post('/api/order', bodyParser.json(), (req, res) => {
	console.log("POST '/api/order'");

	var customer = req.body.customer;
	var products = req.body.products;

	var newCustomer = new Customer(
		customers.length,
		customer.email,
		customer.name,
		customer.address,
		customer.city,
		customer.postcode,
	);

	customers.push(newCustomer);
	var newOrder = new Order(
		newCustomer.id,
		products,
	)

	orders.push(newOrder);

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.status(201).json({});
});

app.put('/api/order/:id', bodyParser.json(), (req, res) => {
	console.log("PUT '/api/order/:id'");

	res.setHeader('Access-Control-Allow-Origin', '*');
	var order = orders[req.params.id];
	if (order != undefined) {
		order.state = req.body.state;
		res.json({});
	}
	else
		res.status(404).json({ error: `Order with id ${req.params.id} does not exist.` });
});

// advert
app.get('/api/advert', (req, res) => {
	console.log("GET '/api/advert'");

	advert.counter++;
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(advert);
});

app.get('/api/advert/image', (req, res) => {
	console.log("GET '/api/advert/image'");

	const path = require('path');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.sendFile(path.join(__dirname, "images/" + advert.image));
});

app.put('/api/advert', bodyParser.json(), (req, res) => {
	console.log("PUT '/api/advert'");

	advert.href = req.body.href;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json({});
});

app.put('/api/advert/image', bodyParser.raw({
	type: 'image/jpeg',
	limit: '10mb',
}), (req, res) => {
	console.log("PUT '/api/advert/image'");

	const fs = require("fs");
	fs.writeFile("images/advert.jpg", req.body, (err) => {
		if (err)
			console.log(err);
	})
	advert.image = "advert.jpg";

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json({});
});

// start app
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
})

module.exports = app.listen(8081, () => {
	console.log("App listening!");

	//init database
	initDatabase();
})
