# Students challenge

The students.zip file contains a Vue project that connects to a backend. You can look at this simple Vue project if you want. You will be making both GET and POST to the ```/students``` endpoint.

Make a server that 
 - contains a collections of students that have both a name and major field
 - has a GET to get the entire collection as a JSON file
 - has a POST to add a single student to the collection
 - Refer to the example from yesterday and ask me for help :)

Some useful hints:
  - For GET and maybe POST you might want to review how we set the "Access-Control-Allow-Origin" header in yesterday's example
  - For POST you might want to look at the middleware we used to so that express can read urlencoded data
  - Make sure you restart your changes after a change
  - Make sure to run the server
  - All of your code should be added to index.js, you shouldn't touch the Vue unless you are done and want to style it a bit :)
