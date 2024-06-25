# API Challenge

Step 1)
Make a GitHub repo: for your API(e.g cat-names-api)

Your resource must have three fields
- Must have one string type
- Must have one number type
- Can not be expense or student
- You must use a .env file to hold your MongoDB connection
- DO NOT INCLUDE the .env in your repo

Step 1.2)
Make a model.js to hold the model of your data. Define a Schema the same way we have done before and export it to your index.js

Step 2)
Make a API with of one or more resources
  - PUT
  - GET
  - GET a single record
  - POST
  - DELETE

GET the data from a MongoDB instance and save it to MongoDB

Ensure sure that you have data validation with try-catch blocks for each endpoint

Step 3 - Friday:
Swap your API with someone and make a Vue frontend for the other person's API

Also, it would be nice in your Github README.md you can look at the code of this file and copy and paste this table for an example of documentation of your endpoint.

Bellow is a example of a past project I made.


## REST Endpoints
Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve savedfights collection| GET   | /savedfights
Create savedfights member| POST   | /savedfights
Delete savedfights member| DELETE  | /savedfights<id>
Update savedfights collection| PATCH  | /savedfights
Create prediction| POST  | /predictions
Create fight| POST  | /fights
Retrieve savedfights collection as csv| GET  | /datasets
