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

## Getting Started
1. Clone app .

2. CD (change directory) into the project folder i.e cd mini-e-shop.

3. In your terminal run `npm install` to install the dependencies.

4. Create a database name in your server, you will need to input this name in your .env file

5. Check .envsample file in mini-e-shop folder, copy the content and fill it will values appropriate to your environment. This is necessary for your app to run properly

6. Check .envsample file in api folder (../mini-e-shop/api), copy the content and fill it will values appropriate to your environment. This is necessary for knex (migration and seeding) to run properly

7. In your terminal, CD one step backward into mini-e-shop directory (`cd ..`) and run `npm run dev` to run the app.
  If all goes fine, you show see <b>server running on port 1111</b> in your console
  
8. In your terminal CD into api directory (`cd api`) (../mini-e-shop/api) from mini-e-shop and run `knex migrate:latest` to migrate the tables into your DB

9. THIS IS OPTIONAL: In your terminal, still in the api directory (../mini-e-shop/api) and run `knex seed:run` to migrate sample data into the tables into your DB
10. In your postman, visit `http://localhost:1111/api/v1`

## Routes
### users
    post /api/v1/adminRegister 

    post /api/v1/register 

    post /api/v1/login

    get /api/v1/logout

### categories

    post /api/v1/categories

    put /api/v1/categories/:id

    get /api/v1/categories

    get /api/v1/categories/:id

    delete /api/v1/categories/:id
  
### products

    post /api/v1/products

    put /api/v1/products/:id

    get /api/v1/products

    get /api/v1/products/:id

    del /api/v1/products/:id
    
### cart

    post /api/v1/cart 

    put /api/v1/cart/:id 

    get /api/v1/cart 

    get /api/v1/cart/:id 

    del /api/v1/cart/:id 
     
### orders 

    get /api/v1/order  

    get /api/v1/order/:id 
    
    put /api/v1/order/:id

    del /api/v1/order/:id 
