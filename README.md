# how-to-deploy-expressjs-with-apache2
How to deploy an ExpressJS App behind an Apache2 reverse proxy with SSL encryption

## Contents

1. Setup & Write a simple ExpressJS App
2. Connect to the Server and setup ExpressJS App
3. Install & Setup apache2
4. Setup apache2

## 1. Setup & Write a simple ExpressJS App

For demonstration purpose, we're going to write a simple ExpressJS App that returns ```{"msg": "Hello World!"}```.

We first need to create a new project. In our root folder we execute the follwing command.

```
npm init -y
```

After that we install express & morgan (for logging) with npm.

```
npm install express morgan
```

We also install nodemon as a dev dependency for reloading.

```
npm install nodemon -D
```

Now we can add the start & start:dev scripts to our package.json.

```json
  "scripts": {
    "start": "node src/app.js",
    "start:dev": "nodemon src/app.js"
  }
```

We now create a new Folder named ```/src``` and inside the folder a new file called ```app.js```.

Here's the app.js code that we are going to use.

```javascript
const express = require('express');
const morgan = require('morgan');

const PORT = 5000;

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json(
        {
            "msg": "Hello World!"
        }
    )
})

app.all('*', (req, res) => {
    res.json(
        {
            'msg': 'Not found!'
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
})
```

## 2. Connect to the Server and setup ExpressJS App

I will use SSH to connect to a Ubuntu 20.04 Server. (Replace user & ip with your info)

```
ssh root@123.456.789.149
```

Now we need to get our code to run on the server.
I used git & github to publish my code to a remote repository so i can use git clone to download the repository on the server.

```
cd /var/www
sudo git clone https://github.com/aaronlyy/how-to-deploy-expressjs-with-apache2
```

Now we can run our app.

```
sudo npm start
```

## 3. Install & Setup apache2

Install apache2.

```
sudo apt install apache2
```

