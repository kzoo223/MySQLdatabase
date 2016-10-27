var inquirer = require("inquirer")
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
})

function begin(){
  //displays the current products
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    for(var i = 0; i<res.length; i++){
      console.log("Id: " + res[i].id + " | ", "Name: " + res[i].productName + " | ", "Department: " + res[i].departmentName + " | ","Price: " + res[i].price + " | ","Stock: " + res[i].stockQuantity)
    }
  
  
    console.log("\n------------------------------------------------------")  
    //inquirer prompt asking what the customer would like to purchase
    inquirer.prompt([
      {
        type: "input",
        name: "itemId",
        message: "Please type the item ID of the product you are looking to purchase"
      },
      
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?"
      }
    ]).then(function(answer){
        //updated to connection query
        connection.query('SELECT * from PRODUCTS where id ='+answer.itemId, function(err, response){
          var howMany = answer.quantity

          if(res[0].stockQuantity>=howMany){
            console.log("\n------------------------------------------------------")
            console.log("Your total is $"+res[0].price * howMany);
            console.log("\n------------------------------------------------------")
            
            //update the quantity of the item
            connection.query("UPDATE Products SET ? WHERE ?", [{stockQuantity: (res[0].stockQuantity - howMany)}, {id: answer.itemId}], function (err, res){
                if(err) throw err;
                begin();
              })
          }else{
            console.log("\n------------------------------------------------------")
            console.log("Not enough inventory!  Please try again!")
            console.log("\n------------------------------------------------------")
            begin();
          }
        })
      });
  })
}


begin();
