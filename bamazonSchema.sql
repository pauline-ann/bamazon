DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Face Mask", "Beauty & Health", 5, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bath Bomb", "Beauty & Health", 7, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vans", "Clothing, Shoes & Jewelry", 30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Backpack", "Clothing, Shoes & Jewelry", 40, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Television & Video", 1000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Television & Video", 700, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Sports & Outdoors", 400, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BBQ Grill", "Sports & Outdoors", 200, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Furniture", 800, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed", "Furniture", 600, 10);

SELECT * from products;