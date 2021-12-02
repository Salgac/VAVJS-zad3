const app = require('express')();

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
	constructor() {
		this.id;
		this.email;
		this.name;
		this.address;
		this.city;
		this.postcode;
	}
}

class Order {
	constructor() {
		this.customer;
		this.products;
		this.state;
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
	products.push(new Product(1, "Kábel", "kabel.jpg", 4.99));
	products.push(new Product(2, "Slúchadlá", "phones.jpg", 12.59));
	products.push(new Product(3, "Telefon", "phone.jpg", 39.99));
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

	var product = products[req.params.id - 1];
	if (product != undefined)
		res.json(product);
	else
		res.json({ error: `Product with id ${req.params.id} does not exist.` }).status(404);
});

app.get('/api/products/:id/image', (req, res) => {
	console.log("GET '/api/products/:id/image'");

	const path = require('path');
	var product = products[req.params.id - 1];

	if (product != undefined)
		res.sendFile(path.join(__dirname, "images/" + product.image));
	else
		res.json({ error: `Product with id ${req.params.id} does not exist.` }).status(404);
});

// start app
app.listen(8080, () => {
	console.log("App listening!");

	//init database
	initDatabase();
})