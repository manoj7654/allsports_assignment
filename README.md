 # E-commerce API

An e-commerce API with user registration and login manages user accounts, while category and product endpoints handle the organization and details of merchandise. It supports secure user authentication, CRUD operations on categories and products, and facilitates smooth management and retrieval of store data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger)
- [Deployed Link](#deployed-link)

## Installation

1. Clone the repository:
    
            git clone https://github.com/manoj7654/allsports_assignment.git
            
            cd allsports_assignment
    

2. Install the dependencies:
    
            npm install
    

3. Set up the environment variables:

    - Create a `.env` file in the root directory with the following content:
        
            host=your database hostname
            port=your server port no 
            mySqlPassword=your database password
            SECRET_KEY=JWT secret
            dataBaseName= your database name
            redis_user=your redis user
            redis_password=your redis password
            mysql port=your database port no
          


## Usage

1. Start the server:
 
    npm run server
    

2. The server will run at `http://localhost:4500`.

## API Endpoints

### User Routes

- `POST /register` - For Registration
- `POST /login` - For Login
- `PUT /update` - For update user date
- `DELETE /delete` - For delete user date

### Product Routes

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create a new product
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID

### Category Routes

- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create a new category
- `PUT /categories/:id` - Update category by ID
- `DELETE /categories/:id` - Delete category by ID

### Swagger

[swagger Link](#https://allsports-j86j.onrender.com/api-docs/)
### Deployed Link
[Live](#https://allsports-j86j.onrender.com/)