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
	constructor() {
		this.image;
		this.href;
		this.counter;
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
}

// api
app.get('/api', (req, res) => {
	console.log("GET '/api'");
	res.json({ hello: "world" });
});

// products
app.get('/api/products', (req, res) => {
	console.log("GET '/api/products'");

	res.json({ products: products });
});

app.get('/api/products/:id', (req, res) => {
	console.log("GET '/api/products/:id'");

	var product = products[req.params.id];
	if (product != undefined)
		res.json(product);
	else
		res.json({ error: `Product with id ${req.params.id} does not exist.` }).status(404);
});

app.get('/api/products/:id/image', (req, res) => {
	console.log("GET '/api/products/:id/image'");

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

	res.json({ customers: customers });
});

// order
app.get('/api/orders', (req, res) => {
	console.log("GET '/api/orders'");

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

	res.status(201).json({});
});

app.put('/api/order/:id', bodyParser.json(), (req, res) => {
	console.log("PUT '/api/order/:id'");

	var order = orders[req.params.id];
	if (order != undefined) {
		order.state = req.body.state;
		res.json({});
	}
	else
		res.status(404).json({ error: `Order with id ${req.params.id} does not exist.` });
});

// start app
app.listen(8080, () => {
	console.log("App listening!");

	//init database
	initDatabase();
})