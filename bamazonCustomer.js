const inquirer = require('inquirer');
const bamazon = require('./bamazon.js');

// ask user for product they would like to buy + quantity
const getUserInput = () => {
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_id',
			message: 'Enter the product id number that you would like to buy.',
			validate: bamazon.validateNum
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to buy?',
			validate: bamazon.validateNum
		}
	]).then(answer => {
		let product_id = answer.product_id;
		let quantity = answer.quantity;
		
		buyProduct(product_id, quantity);
	});	
}

// Checks if you can buy the product
const buyProduct = (id, quantity) => {
	bamazon.db.query(
		'SELECT * FROM products WHERE ?', 
		{
			id: id
		},
		(err, res) => {
			if(err) throw err;

			if(res[0] == undefined) {
				console.log("Item does not exists");
				getUserInput();
			} else {
				let itemsAvailable = res[0].stock_quantity; // stores available items

				if(itemsAvailable < quantity){
					console.log("Insufficient Quantity!!");
				}
				else {
					let updatedQuantity = itemsAvailable - quantity;

					bamazon.updateQuantity(id, updatedQuantity);
					console.log(`Your're total is ${(res[0].price * quantity).toFixed(2)}`);
					bamazon.db.end();
				}
			}
		});
}

// functions logs each item on the products table
const displayProducts = () => {
	bamazon.printData(null, getUserInput);
}

// connect to database
bamazon.db.connect(err => {
	if (err) throw err;
	// if connected display all the products
	displayProducts();
});