# How to deploy an ExpressJS App behind an Apache2 reverse proxy with SSL encryption

[Why?](https://medium.com/intrinsic-blog/why-should-i-use-a-reverse-proxy-if-node-js-is-production-ready-5a079408b2ca)

## Contents

1. Setup & Write a simple ExpressJS App
2. Connect to server and setup ExpressJS App
3. Install & Setup apache2
4. Enable SSL with certbot
5. Run App with screen

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

const PORT = 3000;

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
cd how-to-deploy-expressjs-with-apache2
```

No we install node & npm

```
sudo apt udate && sudo apt upgrade
sudo apt install nodejs npm
```

Now we can run our app to test it.

```
sudo npm install
sudo npm start
```

Press CTRL+C to stop the server.

## 3. Install & Setup apache2

Install apache2 & modules.

```
sudo apt install apache2
sudo a2enmod proxy proxy_http
```

Setup VirtualHost for our app.

```
sudo nano /etc/apache2/sites-available/express.conf
```

Copy following config into file and save. (Replace v2.krotesq.com with your domain)

```
<VirtualHost *:80>
      ServerName v2.krotesq.com
 
      ProxyPreserveHost On
      ProxyPass / http://localhost:3000/
      ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

Enable the site.

```
sudo a2ensite express
sudo systemctl restart apache2
```

## 4. Enable SSL with Certbot

```
sudo certbot --apache
```

No we select out VirtualHost (express).
After a short time our app should be HTTPS enabled and HTTP requests are getting redirected to HTTPS

## 5. Run app with screen

Now we can run our ExpressJS app by navigating into the repo and running npm start.
For more info about the screen command: [How to use linux screen](https://linuxize.com/post/how-to-use-linux-screen/)

```
sudo apt install screen
cd /var/www/how-to-deploy-expressjs-with-apache2
sudo screen -S app
sudo npm start
```

