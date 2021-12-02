var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../server.js');

chai.should();
chai.use(chaiHttp);

describe('Test: create new order', () => {
	// enter index page
	describe("", () => {
		it('returns a list of all 3 default products', (done) => {
			chai.request(app)
				.get('/api/products')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('products');
					res.body.products.should.be.a('array');
					res.body.products.length.should.be.eq(3);
					done(err);
				});
		});
	});

	//see a specific item
	describe("", () => {
		it('returns a default product', (done) => {
			const id = 1;
			chai.request(app)
				.get('/api/products/' + id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('id');
					res.body.should.have.property('id').eq(id);
					res.body.should.have.property('name');
					res.body.should.have.property('price');
					done(err);
				});
		});
	});

	//load an image of a product
	describe("", () => {
		it('returns an image of a default product', (done) => {
			const id = 2;
			chai.request(app)
				.get('/api/products/' + id + '/image')
				.end((err, res) => {
					res.should.have.status(200);
					res.should.have.header('content-type');
					res.header['content-type'].should.be.equal('image/jpeg');
					done(err);
				});
		});
	});

	//create order
	describe("", () => {
		it('creates a new order', (done) => {
			chai.request(app)
				.post('/api/order/')
				.send({
					"customer": {
						"email": "janko@hrasko.sk",
						"name": "Janko Hrasko",
						"address": "Pekna 12",
						"city": "Bratiska",
						"postcode": "84101"
					},
					"products": [
						{
							"id": 1,
							"pcs": 1
						},
						{
							"id": 2,
							"pcs": 3
						}
					]
				})
				.end((err, res) => {
					res.should.have.status(201);
					done(err);
				});
		});
	});

	//view order
	describe("", () => {
		it('returns the created order', (done) => {
			chai.request(app)
				.get('/api/orders/')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('orders');
					res.body.orders.should.be.a('array');
					res.body.orders.length.should.be.eq(1);
					res.body.orders[0].should.have.property('state');
					res.body.orders[0].state.should.eq('Created');
					done(err);
				});
		});
	});

	//update order
	describe("", () => {
		it('updates the state of an order', (done) => {
			chai.request(app)
				.put('/api/order/0')
				.send({
					"state": "Paid"
				})
				.end((err, res) => {
					res.should.have.status(200);
					done(err);
				});
		});
	});

	//view modified order
	describe("", () => {
		it('returns modified order', (done) => {
			chai.request(app)
				.get('/api/orders/')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('orders');
					res.body.orders.should.be.a('array');
					res.body.orders.length.should.be.eq(1);
					res.body.orders[0].should.have.property('state');
					res.body.orders[0].state.should.eq('Paid');
					done(err);
				});
		});
	});
});