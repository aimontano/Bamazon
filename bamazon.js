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


module.exports = {
	validateNum,
	validateString,
	db
}