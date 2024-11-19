const express = require("express")

const dotenv = require('dotenv').config();

const morgan = require('morgan');

const userRouter = require("./Routes/userRoute.js");

/*  Information: 

    1. Get ( Retrieve )
    2. Post ( Store )
    3. Patch
    4. Put ( Update )
    5. Delete ( Remove )

    - URL Sends request to the server and server sends back response.
    
    Versions : 4.21.1

    First Part - 4  Major Updates / Breaking update
    Second Part - 21    Feature change, Bug Fixes (Recommended) such as new route added
    Third Part - 1  Minor Fixes (Optional) such as (request,res) =>{}

    1.0.1 -> 1.0.2 ( Minor changes )
    1.0.1 -> 1.1.0 ( Feature Added )

    Major Releases : 1st Part
        - (^4.21.1) carrot symbol denotes if i run 'npm update' do not update major change or like not change the version so that my code doesn't get stucked, can update minor changes, bug fixes but no major change.
        
    ~ only minor update ( 4.21.1 -> 4.21.2 )    in the package.json

    "express":"latest" in the package.json

    ----------------------------------------------------------------------------
    REST API - Representational State Transfer Application Programming Interface.
    ----------------------------------------------------------------------------

    GET / users - means html response
    GET / api / users - API tells we have to send json data.
    
    GET / getUser -> not a good practice to write this way.

    Server Side Rendering - SSR ()
        - Fast as compared to CSR.

    Client Side Rendering - CSR ( React.js )


    --------------------------------------------------------------------------------------------
    Lecture+8 - Friday ( 1-Nov-2024 )

    Dynamic Path Parameter

    POSTMAN -> Use to Test API

    - browser performs get method by default.
    
    Lecture : 10

    REST Architecture

    REST - Representational State Transfer
    
        - an architectual style that provides standards to communicate b/w computer systems.

        1. Separate API's into logical resources (must be Noun)-> an object  or representation which has data associated with it.
        2. Expose structure resource-based URL
        3. http methods 
            -> GET/api/users/1 , GET/users , GET/api/users |-> Read in CRUD
            -> POST/api/users |-> Create in CRUD  ( POST = Verb, /api/users = Noun )
            -> PUT/api/users/id -> if we have to update everything |-> Update
            -> PATCH/api/users/id -> if we have to update only one thing of the data e.g just email. |-> Update
            -> DELELTE/api/users/id -> to delete any user |-> Delete in CRUD

            GraphQL API -> only one API endpoint
    
        4. JSON Data:
            [{id=1,hostname="",..... }, { }, ...]

        JSEND JSON Data:
            - Can pass object within an object. 
            - {
                "states": "success/Failure" //used here res.json({success})
                "data": {[{ },{ },{ }]}
                }

        5. API must be state-less:
            - All state is handled on the client side. e.g what is next page. 1,2,3,4, next page.
            - 


        Lecture 12:

        Middleware:
            - manipulates the request and the response object before sending the response.
            - app.use(express.json()); -> rturns a middleware function. (req, res, next) |=> 3rd party middleware
            - app.use(logger) -> here no parenthesis so, it means this one is a custom middlware.
            - In custom built middleware , its mandatory to pass next.
            - morgan (3rd party middleware) -> allows us to see the request data in console. [npm i morgan] -> app.use(morgan()) , parenthesis shows 3rd part middleware
            - At the last is the Router handler.
            - if only one middleware it has to be a route handler.
        
        Mounting:
            - apply middleware on a certain routes.
            - create a route for each resource i.e ( users , products, books, movies, .....). 
            - Can attach different routers to different resources.


*/

const app = express();
const path=require('path')
// routers:

// returns a middleware function.
// const movieRouter = express.Router(); 

// middlewares : 
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'));    // lecture 12

// app.use(express.static('./public/'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter); //attached router
app.use('/api/users/:id', userRouter);

// Lecture # 8 

// app.route('/api/users/:id') -> Can merge the similar ones using this approach.



// const server = http.createServer(app);
// server.listen......

module.exports = app;
