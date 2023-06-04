<img src="frontimg.png">

# Shopping List app

This app has been made to allow myself and my family members to access a unified shopping list. Any member can add items and delete them once they are bought.

## Contents

Backend project: This consists of a server that connects to a MongoDB database and post them to an API
Frontend project: This is a React app that fetches the API, displays the items and then allows the user to add or delete items.

## Notes for upgrades

This app will be upgraded in the future to allow for more functionalities.
Example of upgrades are:

- erase input after clicking on add

## Start app

- start first the server by typing npm start in the terminal. It will open in port 3001.
- Navigate to the client folder by typing cd client in the terminal, then type npm start to start the react app.

## Inspiration

This app was constructed in react but deployement has been inspired by the following blog post: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

## Note for deployment

this app was deployed to Heroku and as such the build commands in the package.json in this version are correct. However, since Heroku canceled all free plans, the app was migrated to onrender. The deployment commands in onrender are different, and the build command in onrender should be: "npm install && npm run build && cd client && npm install && npm run build". By using this command, we can install the npm packages and build in the root file, before navigating to client and install the packages and build in the client folder. We can write this command either in package.json or in onrender. I chose to do it in onrender and override this command here.
