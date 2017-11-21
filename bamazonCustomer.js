var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "michellek",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showItems();
});


function showItems() {
    var query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
    	if (err) throw err;
        console.log("================================");
        console.log("** Best Selling Product List **");
        console.log("================================");

        for (var i = 0; i < res.length; i++) {
            console.log("ID#: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\n----------\n");
        }
        console.log("================================");
        console.log("Number of Results: " + res.length);
        console.log("================================");
        customerOptions();
    });

} 
// end of showItems();


function customerOptions(){
  inquirer.prompt([
  	{	type: "input",
        name: "searchbyID",
        message: "What is the ID # of the item you would like to search?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        type: "input",
        name: "purchaseQtty",
        message: "How many units of the item would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer){

    	var userOrderID = answer.searchbyID;
    	var userOrderQtty = answer.purchaseQtty;

    	console.log("================================");

    	console.log("Item ID to search: " + userOrderID);
    	console.log("Order Quantity: " + userOrderQtty);

		var query = "SELECT * FROM products WHERE ?";
		connection.query(query, {item_id: userOrderID}, function(err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			var stockQuantity = res[i].stock_quantity;
			var leftOverQuantity = stockQuantity - userOrderQtty;
			var orderProduct = res[i].product_name;
			var productPrice = res[i].price;
			var totalPurchasePrice = parseFloat(productPrice * userOrderQtty).toFixed(2);

			if (userOrderQtty <= stockQuantity) {
			console.log("================================");
			console.log("___________Order Item___________\n");
 	    	console.log(" * " + orderProduct);
 	    	console.log(" * Available stock quantity : " + stockQuantity);
 	    	console.log(" * User purchase quantity: " + userOrderQtty);
 	    	console.log(" * Price: $" + productPrice);
	        console.log("================================");
	        console.log("             ***** Order Total: ");
			console.log("                     $" + totalPurchasePrice);
		    console.log("================================");

	        updateProduct();

	        function updateProduct() {

				console.log("\n(Updating " + orderProduct + " quantities...)");
				var query = connection.query(
				    "UPDATE products SET ? WHERE ?",
				    [
				      {stock_quantity: leftOverQuantity},
				      {item_id: userOrderID}
				    ],
				    function(err, res) {
				    	if (err) throw err;
				    console.log("Remaining stock quantity: " + (leftOverQuantity));

				    console.log(orderProduct + " stock quantity updated! \n");

				    orderMoreAsk();
				      

				    }
				  );




				}

		} else{
			console.log("================================");
			console.log("Insufficient quantity! Please order something else :( ");
			console.log("================================");

			orderMoreAsk();
		}
		}
		// end of forloop
	});
	})
}
// end of customer options



// after purchase is through.........
function orderMoreAsk(){
  inquirer.prompt({
  		type: "list",
        name: "orderMoreAsk",
        message: "Would you like to continue purchasing??",
        choices: ["YES", "NO"]
    }).then(function(answer){
    	if (answer.orderMoreAsk === "YES") {
    		showItems();
    	} else {
    		connection.end();
    	}
    });
}
