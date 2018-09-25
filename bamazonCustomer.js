const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("~*~*~*~* Products Available For Sale *~*~*~*~")
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ") " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " left");
        }
        console.log("~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~~*~*~*~*");
        promptUser();
    });
};

function promptUser() {
    inquirer
        .prompt([
            {
                name: "item_id",
                type: "input",
                message: "What is the item number of the product you'd like to purchase?"
            },
            {
                name: "unitsBought",
                type: "input",
                message: "How many units would you like to buy?",
            }
        ]).then(function (answer) {

            var item_id = parseInt(answer.item_id);
            var unitsBought = parseInt(answer.unitsBought);

            connection.query("SELECT * FROM products", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Product #" + item_id)
                    var product = res[item_id - 1];
                    if (product.item_id === item_id && product.stock_quantity >= unitsBought) {

                        console.log("Purchasing " + unitsBought + " units of " + product.product_name);
                        var newQuantity = product.stock_quantity - unitsBought;

                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newQuantity
                                },
                                {
                                    item_id: product.item_id
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log("Product purchased successfully!");
                                console.log("Total cost: $" + (unitsBought * product.price));
                                buyAgainPrompt();
                            });
                        break;
                    }
                    else if (product.item_id !== item_id && product.stock_quantity < unitsBought) {
                        console.log("Please choose a valid item ID and quantity.")
                        promptUser();
                        break;
                    }
                    else if (product.item_id !== item_id) {
                        console.log("Please choose a valid item ID.")
                        promptUser();
                        break;
                    }
                    else if (product.stock_quantity < unitsBought) {
                        console.log("Insufficient quantity. Please choose again.")
                        promptUser();
                        break;
                    }
                }
            });
        });
};

function buyAgainPrompt() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "Would you like to purchase another product?",
                choices: ["Yes", "No"]
            }
        ]).then(function (answer) {
            if (answer.choice === "Yes") {
                queryAllProducts();
            }
            else {
                console.log("Thanks for using Bamazon :-)")
            }
        });
};