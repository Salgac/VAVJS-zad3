const app = require('express')();
const mysql = require('mysql');
const Sequalize = require('sequelize')

let connectionMade = false;
let connection = null;

function connectDB() {
	if (connectionMade === false) {
		connection = mysql.createConnection({
			host: 'db',
			user: 'root',
			password: 'root',
			database: 'produkty'
		});
		connection.connect(err => {
			if (!err) {
				connectionMade = true;
			}
		});
	}
}

app.get('/api', (req, res) => {
	console.log("GET '/api'");
	connectDB();
	console.log("connection? " + connectionMade);
	res.json({ hello: "world" });
});

app.listen(8080, () => {
	console.log("App listening!");
})