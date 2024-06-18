# REST & HTTP

## HTTP
Hypertext Transfer Protocol - Allows for the exchange of information on the world-wide web

Request(Mainly what the Client does):
HTTP request is made out of a 
```HTTP
Method /path HTTP/version
Headers(e.g Content-Type)

Body:
Data attached to the request such as JSON, text, urlencoded, image data and more
```

Method is the action you want to do. Method types are
  - GET -> Also known as read in CRUD
  - PUT -> Also known as update in CRUD
  - PATCH -> A different type of update, updating a entire collection
  - DELETE -> Also known as the delete in CRUD
  - POST -> Also known as the create in CRUD
  - There are other method's that we won't talk about but you can read about them [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

```HTTP
POST /expenses HTTP/1.1   -> Method /path HTTP/version
Host: expenses.codeschool.cloud  -> start of headers
Content-Type: application/x-www-form-urlencoded
Content-Length: 133  -> End of headers

Body(Urlencoded data):
category=Gambling%20Debt&description=I%20owe%20the%20mafia%20after%20putting%2010k%20on%20the%20Mavs%20to%20win%20the%20NBA%20Finals.
```

Response - the response to the request:
```HTTP
HTTP/1.1 201 Created
Location: https://expenses.codeschool.cloud/expenses/1
Content-Type: application/json
Access-Control-Allow-Origin: *

{
  "id": 1,
  "category": "Gambling Debt",
  "description": "I owe the mafia after putting 10k on the Mavs to win the NBA Finals.",
  "created_at": "2024-06-17T14:32:21Z"
}
```

