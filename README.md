# Habit-Tracker

###Hosted Link- "https://habit-app-qcri.onrender.com"

 ##DESCRIPTION - 
 A habit tracker project is a web application that enables users to sign in and sign out. This intuitive platform empowers users to seamlessly perform CRUD operations—Create, Read, Update, Delete—on their daily habits. This includes functionalities like effortlessly adding new habits, swiftly accessing and reviewing their current habits, smoothly modifying or editing habits, and conveniently deleting habits they no longer wish to track.


 ## Folder Structure
```bash

Habit Tracker
    |
    |               |--->css
    |--->assets---->|--->images
    |               |---> js
    |
    |               |--->mongoose.js
    |--->config---->|
    |               |--->passport-local-Stradegy.js
    |
    |                  |-->habbit_controller.js
    |--->controllers-->|-->home_controller.js
    |                  |-->user_controller.js
    |
    |               |-->habit.js
    |--->models---->|
    |               |-->user.js
    |
    |              
    |               |-->user.js
    |--->routes---->|-->habit.js
    |               |--index.js
    |
    |              |--->user_sign_up.ejs
    |--->views---->|--->user_sign_in.ejs
    |              |--->home.ejs
    |              
    |
    |-->node_modules
    |-->.gitignore
    |-->package.json
    |
```

##How to create this project-
1. Create a Habit Tracker folder and open this in VS-Code
2. Create a index.js file , its our entry point of the project
3. Open new terminal and write command "npm init", after it fill the all details
4. install the nodemon, express, ejs express-ejs-layout
5. create a server on a specific port
6. create  MVC structure(create folder of Models/ Contrller/ assests / routes/ config)
7. In routes create a index.js file , its main file of routes.
8. the main indxe.js are connected to routes index.js
9. In main index,js require all the useful libraries.
10. for storing data and persistance storage we use the mongodb and its library "mongoose".config folder have the mongoose.js file(we are using the online mongodb atlas)
11. how data is storing in our data base so we create the schema in models. userSchema and habitSchema are created.
12. for Authentication we are using passport , so in config we create a pasport-local-strategy.js file.
13. all routes are connected to each other and the give the path of controllers.
14. in routes we are using passport authentication
15. we also use the flash middleware for flash msg
16. assets file are have the css and js files
17. controller have the three controller userConroller , have all the signIn signUp modules and it have all the functionality of it.
18. homeController have home module which have the home page functionality
19. habitController have all the habits related functionalities like, createhabit/ favHabit, destroyHabit/ statusUpdate
20. In views folder contains all the ejs file which have the structure of our project.

    
