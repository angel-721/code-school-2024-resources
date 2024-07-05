# Challenge! 🤩

1) Make a POST and GET endpoint for both /companies and /employees.
2) Make a PUT for a single employee aka /employee/:id

Company should accept raw JSON data like this:

MAKE SURE YOU PUT VALID EMPLOYEE ID's! The one's in the example are just test ones! So you might want to make /employees first then company
``` JavaScript
{
  "name": "Zonos",
  "employees": ["60d5ecb8b6e8c03a3c5e5d7a", "60d5ecb8b6e8c03a3c5e5d7b"],
  "owner": "60d5ecb8b6e8c03a3c5e5d7c"
}
```
Owner and employees are objectRef ID's. This is a clear HINT to use populate(). 

Employee should accept raw JSON data like this:
```JavaScript
{
  "email": "dj.holt@test.com",
  "name": "DJ",
  "jobTitle": "Programmer",
  "pay": 75000
}
```

### Make sure to have server side validation! 
Look at the model.js to see the cool rules on the schema
