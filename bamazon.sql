DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Potato", "groceries", 1.50, 2),
("Rubber Bands", "office", 0.75, 20),
("5w20 Motor Oil", "automotive", 22.78, 6),
("Adjustable Wrench", "tools", 15, 10),
("3.0 16GB USB Flash ", "technology", 12.45, 23),
("Digital Watch", "accessories", 120, 4),
("26oz Hammer", "tools", 28.00, 14),
("Chair", "Home Improvement", 35.87, 6),
("Cellphone", "Electronics", 15, 10),
("Men T-Shirt", "men", 12.45, 23);