//set up connection
var inquirer = require("inquirer")
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
})

//set up beginning prompts

var prompts = [
{
  type: "list",
  name: "options",
  message: "PLEASE MAKE A SELECTION",
  choices: [
  "VIEW PRODUCTS",
  "VIEW LOW INVENTORY ITEMS",
  "ADD INVENTORY",
  "ADD NEW PRODUCT"]
}
];

function start(){
  //use inquirer prompt for prompts defined above
  inquirer.prompt(prompts).then(function(answers){
    //set up switch case for selection
    switch (answers.options){
      //view products
      case "VIEW PRODUCTS":
        connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for(var i = 0; i<res.length; i++){
          console.log("Id: " + res[i].id + " | ", "Name: " + res[i].productName + " | ", "Department: " + res[i].departmentName + " | ","Price: " + res[i].price + " | ","Stock: " + res[i].stockQuantity)
        }
        start();
        });
      break;
      //view low inventory
      case "VIEW LOW INVENTORY ITEMS":
        connection.query("SELECT * FROM products where stockQuantity<=5", function(err, res){
        if(err) throw err;
        for(var i = 0; i<res.length; i++){
          console.log("Id: " + res[i].id + " | ", "Name: " + res[i].productName + " | ", "Department: " + res[i].departmentName + " | ","Price: " + res[i].price + " | ","Stock: " + res[i].stockQuantity)
        }
        start();
        });
      
      break;
      //add inventory
      case "ADD INVENTORY":
          inquirer.prompt([
          {
            type: "input",
            name: "itemId",
            message: "Please type the item ID of the product you are looking to update"
          },
          
          {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?"
          }
        ]).then(function(answer){
            var howMany = answer.quantity
            
            //updated to connection query
            connection.query('SELECT * from PRODUCTS where id ='+answer.itemId, function(err, res){
              if(err) throw err;
              console.log(answer.itemId)
              console.log(howMany)
              console.log(res)

              if(howMany >= 0){
                //update the quantity of the item
                console.log("\n------------------------------------------------------")
                console.log("Quantity updated for:");
                console.log("\n------------------------------------------------------")
                // connection.query("UPDATE Products SET ? WHERE ?", [{stockQuantity: updatedQuantity}, {id: answer.itemId}], function (err, res){
                //     console.log(res)
                //     if(err) throw err;
                //     start();
                //   })
              }else{
                console.log("\n------------------------------------------------------")
                console.log("You did not select a valid quantity!")
                console.log("\n------------------------------------------------------")
                start();
              }
            })
          });
      break;
      //add new products
      case "VIEW PRODUCTS":
        connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for(var i = 0; i<res.length; i++){
          console.log("Id: " + res[i].id + " | ", "Name: " + res[i].productName + " | ", "Department: " + res[i].departmentName + " | ","Price: " + res[i].price + " | ","Stock: " + res[i].stockQuantity)
        }
        });
      break;
    }
  })
}
start();