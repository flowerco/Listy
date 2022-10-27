# Listy

A social media app that allows you to share movies you have watched and rated with your friends.
It was born out of the desire to make getting recommendations from friends easier, as opposed to <br>impersonal algorithm suggestions. It also allows you to keep track of what you have watched previously, as well as what<br> you would like to watch in the future. This app was initially designed for mobile view, but has since been updated for desktop too. 

## Features
* Create an account and recieve a cookie

* Search for films with API calls to TMDB

* Update your feed with your choices and ratings

## Getting Started
### Client
1. Go to the ``client`` folder
2. Run ``npm install`` from the *client root folder* to install all the necessary dependencies
3. Fill in the ``.env`` with the environmental variables, as per the ``.env-example`` file in the ``client`` folder
4. Run ``npm start`` from the *client root folder* to start the client app at ``http://localhost:3000/``

### Server
1. Go to the ``server`` folder 
2. Run ``npm install`` from the *server root folder* to install all the necessary dependencies
3. Fill in the ``.env`` file with the environmental variables, as per the ``.env-example`` file in the ``server`` folder
4. Run ``npm start`` from the *server root folder* to start the server app at ``http://localhost:3030/``

## Tech Stack

| Front End     | Back End      |     Testing   |        APIs      |
| ------------- | ------------- | ------------- |------------- |
| React         | MongoDB       |    Jest       |     TMDB         |
| Tailwind      | Bcrypt        |   Cypress     |
| Typescript    |    Axios      |               |   
| Redux         |     JWT       |
|               | Koa           |
