# Pet Adoption App

- NOTE: I use pets as the resource but you are welcome to get creative with that - just make sure you have something similar the minimum requirements below

Work should be split fairly evenly within the group. Each individual will handle their own database but make sure the schemas are all the same. The 2 overall jobs:

1. Frontend team who builds the user interface. This includes browsing the pet list, searching, and filtering.
2. Backend team who builds the server that handles requests to create listings, delete listings, and submit applications.

Recommended way to do this:

- Backend team builds out server and tests with Postman.
- Frontend team works on interface using sample data set until database and server is ready.
- Collab using GitHub and Live Share - share server code (once it's working) among team so everyone has a local copy and can run it on their own computer.
- EVERY team member should be in charge of their own database unless y'all want to share your API keys (not recommended) - just make sure EVERY MODEL/SCHEMA is the same.

Requirements:

1. The database model/schema should include a minimum of these features:

   - A pets collection where each pet has a name, species, breed, age, and gender.
   - An adoption application where each application has a name, phone number, email, and pet ID number. This is what people will submit if they want to adopt a specific pet. The ID number will reference a pet from the pets collection.

2. The server, at a minimum, should have these endpoints:

   - GET /pets = get a list of all pets from the database
   - POST /pets = create a pet listing
   - GET /applications = get a list of all applications
   - POST /applications = create an application to adopt a pet

3. The interface should have at least 2 "pages":

   1. A page for browsing all pet listings. The user should be able to search by pet breed, name, or species.

      - Display key information about each pet, including name, species, breed, age, and gender. You can but aren't required to include additional details such as temperament, medical history, and any special requirements or considerations.
      - Each pet listing should have a delete option.
      - Each pet listing should have an apply for adoption listing option. If a user wants to apply for adoption, they need to be able to submit a form that includes all the fields mentioned in the database model above.
      - There should be the ability to add a listing, whether the form is on this same page or you make it separate.

   2. A page where all adoption applications can be seen.

4. A basic listing of some of the app.js Vue methods you might use to help out:

   - getListings(): makes a GET request to the server for all pet listings
   - createListing(): makes a POST request to the server from a "create listing" form
   - deleteListing(listingId): makes a DELETE request to the server based on the ID number of the pet being deleted
   - getApplications(): makes a GET request for all adoption applications
   - createApplication(): makes a POST request to the server from a "new adoption" application form
   - changePage(page): goes to a different "page" - a.k.a. changes a page data property that hides and shows specific sections

5. Make sure that the interface is responsive on different screen sizes and easy to use.

To get more complicated / go beyond:

1. Edit pet listings - you would need an edit function and form on the frontend and a server endpoint PUT /pets.
2. Allow for an image of the pet to be uploaded and saved in your database when creating a pet
