const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const bamazon = require('./bamazon.js'); 

// ask user for product they would like to buy + quantity
const getUserInput = () => {
	inquirer.prompt([
		{
			type: 'list',
			name: 'command',
			choices: [
				'View products for sale',
				'View low inventory',
				'Add to inventory',
				'Add new product',
				'Exit'
			],
			message: 'What would you like to do?'
		}
	]).then(answer => {
		let command = answer.command;
		switch (command) {
			case 'View products for sale':
				displayProducts();
				break;
			case 'View low inventory':
				printData("SELECT  * FROM products WHERE (products.stock_quantity < 5)");
				break;
			case 'Add to inventory':
				// printData("SELECT * FROM products");
				addInventory();
				break;
			case 'Add new product':
				addProduct();
				break;
			case 'Exit':
				bamazon.db.end();
				break;
		}
	});	
}

// functions asks what item to update on database
const addInventory = () => {
	inquirer.prompt([
		{
			type: 'input',
			name: 'productId',
			message: 'Enter product id',
			validate: bamazon.validateNum
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many items would you like to add?',
			validate: bamazon.validateNum
		}
	]).then(answer => {
		updateQuantity(answer.productId, answer.quantity);
	});
}

// function updates quantity on item if exists
const updateQuantity = (id, quantity) => {
	// load item from database by given id
	bamazon.db.query('SELECT * FROM products WHERE ?', {id: id}, (err, res) => {
		if (err) 
			throw err;
		// if item not found notify user
		if (res[0] === undefined) {
			displayProducts();
		 	console.log("Item does not exist try again...");
		}
		else { // otherwise
			// store new product quantity and update database
			let newQuantity = (parseInt(res[0].stock_quantity) + parseInt(quantity));
			bamazon.db.query('UPDATE products SET ? WHERE ?', 
				[
					{
						stock_quantity: newQuantity
					},
					{
						id: id
					}
				],
				(err, res) => {
					if(err) {
						throw new Error("Item does not exist");
					}
					console.log("Item updated");
					displayProducts();
				}
			)			
		}
	})
}

// function gets user input for new product
const addProduct = () => {
	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: "Name of product",
			validate: validateString
		},
		{
			type: 'input',
			name: 'department',
			message: 'What department does this item belong to?',
			validate: validateString
		},
		{
			type: 'input',
			name: 'price',
			message: "How much does this item cost?",
			validate: validateNum
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many items on hand?',
			validate: validateNum
		}
	]).then(answer => {
		insertProduct(answer.name, answer.department, answer.price, answer.quantity);
	})
}

// function inserts item to database table
const insertProduct = (name, department, price, quantity) => {
	bamazon.db.query("INSERT INTO products SET ?",
		{
			product_name: name,
			department_name: department,
			price: price,
			stock_quantity: quantity
		}, 
		(err, res) => {
			if (err) throw err;
			displayProducts();
			console.log("Item Added...");
		}
	)
}

// functions displays data results by given query
const printData = (query) => {
	bamazon.db.query(query, (err, res) => {
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
		getUserInput();
	})	
}

const displayProducts = () => {
	printData("SELECT * FROM products");
}

// connect to database
bamazon.db.connect(err => {
	if (err) throw err;
	// if connected display all the products
	getUserInput();
});

process.on('SIGINT', () => {
	console.log("Connection ended..");
	bamazon.db.end();
	process.exit();
})
