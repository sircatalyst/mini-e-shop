# mini-e-shop

A mini e-commerce api app

## About

Mini-e-Shop is an app built with restify, knex, bookshelf, jsonwebtoken and joi.

Restify is used for building the RESTful api
Knex is used for SQL query builder
Bookshelf is used in querying the database
Jsonwebtoken is used to authentication
Joi is used for validating inputs

## Requirements

A running mysql server
Globally installed knex node module (`npm i -g knex`)
Ensure nodemon is globally installed on your system `npm i -g nodemon`

## To test remotely 
 Please, visit <a href="https://mini-e-shop.herokuapp.com" target="_blank">Mini-e-shop</a>


## Getting Started to test locally
1. Clone/Fork the master branch of this repo. In your terminal run `git clone https://github.com/sircatalyst/mini-e-shop.git`

2. CD (change directory) into the app folder by running `cd mini-e-shop`.

3. In your terminal run `npm install` to install the dependencies.

4. Create a database name in your running server, you will need to input the database name in your .env file

5. Check .envsample file in the mini-e-shop folder, copy the content, create a .env file, then change the values of the copied contents to appropriate fit your environment. This is necessary for your app to run properly

6. Still in the mini-e-shop directory (../mini-e-shop), in your terminal, run `npm run dev` to run the app.
  If all goes fine, you show see <b>server running on port 1111</b> in your console
  
7. In your terminal, open a new tab, CD to mini-e-shop directory (../mini-e-shop), then run `knex migrate:latest` to migrate the app tables into your database

8. THIS IS OPTIONAL: In your terminal, still in the mini-e-shop directory (../mini-e-shop) run `knex seed:run` to migrate sample data into the tables into your database

9. In your API test tool (Postman), visit GET `http://localhost:3306/api/v1/`
      If all goes well, you should see: <b>"Hi there, welcome to mini-e-shop built with Restify, Knex, Bookshelf and Joi"</b>
      
10. NOTE: Once your token is generated upon login, add `jwt ` with a whitespace, then copy and paste the generated token in the checked Authorization section of the Headers of your postman tab. Set the Content-Type to application/json.

    SAMPLE:
    
    <b>Authorization</b>   jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiVG9
                           wZSIsImxhc3ROYW1lIjoiQmFtaWRlbGUiLCJlbWFpbCI6InRlbWliYW1pQGdtYWlsLmNvbSI
                           sInBhc3N3b3JkIjoiJDJhJDEwJGw3NTA2eGltMTBLM0lhYlNYcVNpWC5qMjlSdGtyYVoxR2Q
                           uQnlZdUNZaXpPaXVnaE1tZ2pDIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkX2F0IjoiMjAxOS0
                           i0wOFQyMjo0NjoyNC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMTktMDYtMDhUMjI6NDY6MjQuM
                           DAwWiIsImlhdCI6MTU2MDAzNDEzMSwiZXhwIjoxNTYwMDM3NzMxfQ.YvhRVyt0meFSLUM_mX
                                      
    <b>Content-Type</b>    application/json
                                      

##      End Points                     Accessibility                     Function

### index
    get /api/v1/                      Available to the public            Display homepage
    
### users
    post /api/v1/adminRegister        Available to Admin                 To register as admin

    post /api/v1/register             Available to the public/Users      To register as user

    post /api/v1/login                Accessible to only Admin/Users     To login

    get /api/v1/logout                Accessible to only Admin/Users     To logout

### categories

    post /api/v1/categories           Accessible to only Admin           To add categories

    put /api/v1/categories/:id        Accessible to only Admin           To edit added category

    get /api/v1/categories            Accessible to only Admin/Users     To view all added categories
 
    get /api/v1/categories/:id        Accessible to only Admin/Users     To view one added category

    delete /api/v1/categories/:id     Accessible to only Admin           To delete one added category
  
### products

    post /api/v1/products             Accessible to only Admin         To add a product

    put /api/v1/products/:id          Accessible to only Admin         To edit an added product

    get /api/v1/products              Accessible to only Admin/Users   To view all added products

    get /api/v1/products/:id          Accessible to only Admin/Users   To view one added product

    del /api/v1/products/:id          Accessible to only Admin         To delete one added product
    
### carts

    post /api/v1/carts                 Accessible to only Users        To add a product to cart

    put /api/v1/carts/:id              Accessible to only Users        To edit an added product

    get /api/v1/carts                  Accessible to only Users        To view all added products in cart 

    get /api/v1/carts/:id              Accessible to only Users        To view one added product in cart 

    del /api/v1/carts/:id              Accessible to only Users        To delete one added product in cart
     
### orders 

    get /api/v1/ordersProduct/id       Accessible to only Users        To order a product in cart

    get /api/v1/orders                 Accessible to only Users        To view all ordered products 

    get /api/v1/adminOrders            Accessible to only Admin        To view all ordered products 

    get /api/v1/orders/:id             Accessible to only Admin/Users  To view one ordered product

    del /api/v1/orders/:id             Accessible to only Users        To delete one ordered products 
  