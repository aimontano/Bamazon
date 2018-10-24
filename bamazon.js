const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

// function check if you have entered a numeric value
const validateNum = num => {
	let reg = /[0-9]/
	num = parseFloat(num.trim());

	let hasNum = reg.test(num);

	if(hasNum && num >= 0) return true;

	console.log("\nYou must enter a numeric value");
	return false;	
};

// functions checks if the input has a string value
const validateString = (str) => {
	let reg = /[a-zA-Z]/;
	str = str.trim().toString();

	let hasLetters = reg.test(str);

	if(str.length >= 2 && hasLetters) return true;

	console.log("\nYou must enter a valid string");
	return false;
};

// functions displays data results by given query
const printData = (query, func) => {
	if(query == null) query = 'SELECT * FROM products';
	db.query(query, (err, res) => {
		if (err) throw err;	

		let tableItems = [];	

		// push each product as an object to tableItems 
		res.forEach(item => {
			tableItems.push({
				id: item.id,
				name: item.product_name,
				department: item.department_name,
				price: item.price,
				quantity: item.stock_quantity
			});
		})
		// logs each item as a table
		console.table(tableItems);	
		
		// if user sends a call back function call it here	
		if(func) func();
	});	
};


// function updates quantity on item if exists
const updateQuantity = (id, quantity, func) => {
	db.query('UPDATE products SET ? WHERE ?', 
		[
			{
				stock_quantity: quantity
			},
			{
				id: id
			}
		],
		(err, res) => {
			if(err) {
				throw new Error("Item does not exist");
			}

			// if user passes function
			if(func) func();
		}
	)			
}

module.exports = {
	validateNum,
	validateString,
	db,
	printData,
	updateQuantity
}