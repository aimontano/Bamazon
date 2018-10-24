# Bamazon
This is a node and mysql program allows you to buy products from a store named `Bamazon`

### Installation
#### 1. Clone Repo
```
git clone https://github.com/aimontano/Bamazon.git
```
#### 2. Install Dependencies
You must have [NodeJS](http://nodejs.org) installed on your local computer to run this program.
To install the node dependencies you must be in Bamazon folder then you can run the following command:
```
npm i
```
#### 3. Create database
On MySql Workbench you will need to create a new database. To do this you must copy everything in `bamazon.sql` and paste it on your workbench and run the query

#### 4. Add MySql credentials
Open bamazon.js file and add your server credentials
```javascript
// connect to database
const db = mysql.createConnection({
	host: 'localhost', // add your host
	port: 3306, // port
	user: 'root', // your username information
	password: '', // and password
	database: 'bamazon' // this should not change
});
```
#### 5. Run Customer Version
To run customer version to view and buy products run the following node command and follow instructions
```
node bamazonCustomer.js
```
#### 6. Run Manager Version
In the manager version you're able to do the following
- View products
- View low inventory
- Add to inventory
- Add new product
To run this version, run the following node command:
```
node bamazonManager.js
```