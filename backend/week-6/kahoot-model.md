Step 1)

```
{
    "email":"a@a.com",
    "password": "123"
    "name": angel
}
```
For the HTTP request above, create a mongoose schema. The schema name should be ``UserSchema`` and model name should be ```User```

Hints: 
  - Everything is a string
  - Only password and email are required.

Step 2)

- Create a schema method for UserSchema called ```setPassword(password)``` that set's the password field to the hash using bcrypt
- Create a schema method for UserSchema called ```verifyPassword(password)``` that set's the password field to the hash using bcrypt compare function that returns if the param password can be hashed into the stored password

- HINT: Look at the discord code or talk to me 

Step 3)

Create a simple POST endpoint for /users. This GET might be neat when it comes to debugging your GET

```
app.get("/users", async function (req, res) {
  try {
    let users = await model.User.find();
    res.send(users);
  } catch (error) {
    res.status(404).send("Users not found.");
  }
});
```JavaScript
