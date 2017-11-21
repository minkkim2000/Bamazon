DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL
  stock_quantity INTEGER (11) NOT NULL,
  PRIMARY KEY (item_id)
);

-- Mock data
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("What Do You Meme? Adult Party Game", "Toys & Games", 29.99, 300),
("XDesign Fidget Cube Focus Fidget Toy", "Toys & Games", 5.99, 200),
("Fire TV Stick with Alexa Voice Remote", "Electronics", 39.99, 500),
("Echo Dot", "Electronics", 49.99, 500),
("Obama: An Intimate Portrait", "Books", 28.99, 300),
("Milk and Honey", "Books", 28.99, 500),
("Horizon Zero Dawn - PlayStation 4", "Video Games", 35.00, 600),
("Super Mario Odyssey - Nintendo Switch", "Video Games", 58.88, 400),
("GE RPWFE Refrigerator Water Filter", "Appliances", 49.99, 300),
("Opal Nugget Ice Maker", "Appliances", 449.99, 350)


