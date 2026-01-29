API Documentation
1. Authentication:
These endpoints handle user access and security.

•	Register User: POST /auth/register - Create a new account with email and password. 

•	Login: POST /auth/login - Authenticate and receive a JWT token. 

________________________________________

2. Product Management:
All endpoints below are Protected and require a valid JWT in the Authorization header.

•	Create Product: POST /products - Add a new product (Name, SKU, Price, Stock). 

•	List All Products: GET /products - Retrieve a list of all products. 

•	Update Product: PATCH /products/:id - Modify details of an existing product using its ID. 

•	Delete Product: DELETE /products/:id - Remove a product from the system. 

________________________________________

3. Sales System:
These endpoints manage transactions and inventory levels.

•	Create Sale: POST /sales - Processes a sale, validates stock availability, and deducts quantity. 

•	List Sales: GET /sales - View the history of all completed sales. 
