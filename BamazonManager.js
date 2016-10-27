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
                var updatedQuantity = res[0].stockQuantity + howMany

              if(howMany >= 0){
                //update the quantity of the item
                console.log("\n------------------------------------------------------")
                console.log("Quantity updated for:" + res[0].productName);
                console.log("\n------------------------------------------------------")
                  connection.query("UPDATE Products SET ? WHERE ?", [{stockQuantity: updatedQuantity}, {id: answer.itemId}], function (err, res){
                  if(err) throw err;
                  start();
                  })
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
      case "ADD NEW PRODUCT":
        inquirer.prompt([
          {
            type: "input",
            name: "newProdName",
            message: "Please add the name of the new product"
          },
          
          {
            type: "input",
            name: "newProdDept",
            message: "Please add the department for the product"
          },
          {
            type: "input",
            name: "newProdPrice",
            message: "Please add the price for the product"
          },
          {
            type: "input",
            name: "newProdQuant",
            message: "Please add the quantity for the product"
          }
        ]).then(function(answer){

          if(answer.newProdQuant >= 0){
              connection.query("INSERT INTO PRODUCTS(productName, departmentName, price, stockQuantity) VALUES ("+ "'" +answer.newProdName+ "'" + "," + "'" +answer.newProdDept+ "'" + "," + "'"+answer.newProdPrice+ "'" + ","+ "'" + answer.newProdQuant+ "'" + ");", function(err, respo){
                        console.log("INSERT INTO PRODUCTS(productName, departmentName, price, stockQuantity) VALUES ("+ "'" +answer.newProdName+ "'" + "," + "'" +answer.newProdDept+ "'" + "," + "'"+answer.newProdPrice+ "'" + ","+ "'" + answer.newProdQuant+ "'" + ");")
                console.log("\n------------------------------------------------------")
                console.log("New Product Added!")
                console.log("\n------------------------------------------------------")
                start();
              })
          }
          else{
            console.log("\n------------------------------------------------------")
                console.log("You did not select a valid quantity!")
                console.log("\n------------------------------------------------------")
                start();
          }
          });
      break;
    }
  })
}
start();