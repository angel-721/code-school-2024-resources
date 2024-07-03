### Step 1 Create a new model.js for these objects: ```Artist```, ```Song```, ```Playlist```

Artist Raw JSON - Keep the model simple, it only needs a string name that should be required:
```JavaScript
{
  "name": "Queen"
}
```

Song Raw JSON - Notice that artist is an id. This means on the GET you should call ????() that starts with a p :
```JavaScript
{
  "name": "Bohemian Rhapsody",
  "artist": "60d5ecb8b6e8c03a3c5e5d7a",
  "length": 354,
  "streams": 1500000000,
  "genre": "Rock"
}
```

I want you to learn something on your own. Look at [mongoose enums](https://mongoosejs.com/docs/validation.html) and make sure that a genre can only be either Rock, Pop, Rap, Indie, and Country.

Playlist Raw JSON - Notice that songs is a list of object id's. Think back to members for the Discord server. Also you should call ???() on a GET:
```JavaScript
{
  "name": "Classic Rock Hits",
  "songs": [
    "60d5ecb8b6e8c03a3c5e5d7b",
    "60d5ecb8b6e8c03a3c5e5d7c",
    "60d5ecb8b6e8c03a3c5e5d7d"
  ]
}
```

### Step 2) Create a new index.js that has a GET and POST endpoint for ```/songs``` ```/artists``` ```and ```/playlists```. Your server MUST have server side validation. Each endpoint should be able to accept the raw json examples(BE AWARE I give fake ID's. When testing, use real ids)
Hints:
  - songs and playlists will have to call a function after you call find()
  - Look for the model that doesn't have any nest objects. You will probably want to set up that endpoint first
