# Week 4

### Express.js
Refer to this link for more [info](https://expressjs.com/en/starter/basic-routing.html)!

### Setting up Node:
*Note: You don't need to follow this if you are using a classroom Mac, the classroom Mac's already have Node installed.

## For Mac Devices:
Step 1) Download [Homebrew](https://brew.sh/) with this command 
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Step 2) Use brew to install the latest version of Node
```bash
brew install node
```


Step 3) Run this command to test if you have Node set up right!

```bash
echo "console.log('Hello From Node')" >> app.js && node app.js
```


## For WSL:
Step 1) [Download Node Version Manager](https://nodejs.org/en/download/package-manager) with this command 
```bash
# install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

```
Step 2) Use NVM to install the LTS version of Node(v20) - THIS CHAN BE WHATEVER THE LATEST VERSION OF NODE IS
```bash
# download and install Node.js (you may need to restart the terminal)
nvm install 20
```


Step 3) Run this command to test if you have Node set up right!

```bash
echo "console.log('Hello From Node')" >> app.js && node app.js
```
