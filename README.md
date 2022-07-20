# how-to-deploy-expressjs-with-apache2
How to deploy an ExpressJS App behind an Apache2 reverse proxy with SSL encryption

## Contents

1. Setup & Write a simple ExpressJS App
2. SSH into your server
3. Clone your repository
4. Setup the ExpressJS App
5. Install apache2
6. Setup apache2

## Setup & Write a simple ExpressJS App

For demonstration purpose, we're going to write a simple ExpressJS App that returns ```{"msg": "Hello World!"}```.

We first need to create a new project. In our root folder we execute the follwing command.

```
npm init -y
```

After that we install express, morgan (for logging) with npm.

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
    "start": "node /src/app.js",
    "start:dev": "nodemon /src/app.js"
  }
```

We now create a new Folder named ```/src``` and inside the folder a new file called ```app.js```.

Here's the app.js code that we are going to use.

```javascript

```