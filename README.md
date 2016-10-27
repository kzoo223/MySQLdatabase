# AMAZON NODE APP

Inventory/Stock app that allows for inventory management and item management.

### BamazonCustomer.js

Allows for viewing of current items/stock as well as ordering by id number

* Displays current stock
* Asks customer which item they wish to purchase by ID
* Asks how many they would like to buy
* Checks to see if stock is sufficient
* If stock is sufficient, calculates total and checks out, updating stock in database
* If not enough stock, notify customer


![customer js example](https://github.com/kzoo223/MySQLdatabase/blob/master/images/cust1.png)

### BamazonManager.js

Allows management of current inventory allowing for updates to stock for specific items as well as viewing low inventory items.

* Displays options to view products, view low inventory, add inventory, and add new product
  * View products displays products like BamazonCustomer
  * View low inventory displays current products with inventory of 5 or less
  * Add inventory prompts the user to select Id of product and how many they would like to add then updates the quantity of that item
  * Add new product prompts user to input details for new item and inserts this into the table
  
![manager js example](https://github.com/kzoo223/MySQLdatabase/blob/master/images/manager1.png)
![manager js example](https://github.com/kzoo223/MySQLdatabase/blob/master/images/manager2.png)
![manager js example](https://github.com/kzoo223/MySQLdatabase/blob/master/images/manager3.png)

## Technologies used

* Node.js
* npm inquirer (https://www.npmjs.com/package/inquirer)
* npm mysql (https://www.npmjs.com/package/mysql)

## prereq

Package.json


