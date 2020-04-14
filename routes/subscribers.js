//we need to use express so we will say require express

const express = require('express') //because our entire application uses express

const router = express.Router() //we want the router portion of express, this is going to give us the router from express

const Subscriber = require('../models/subscriber') //this will now pull the subscriber which we created from the subscriber.js denitions(model)

//we want to do is expot that so we can say module exprots is going to equal to router

module.exports = router //to fix our connection errors in our terminal, but we have no routes configured yet 

//sense this is going to be a restful API we will use restful endpoints...https://youtu.be/6sUbt-Qp6Pg (for explain of REST)



//We need a route for:
//Getting all subscribers
router.get('/', async (req, res) => {
    //res.send('Hello World') // we can use this to test our function on the server

        // try & catch statement to get all of the different subscribers for our model
    try {
            const subscribers = await Subscriber.find() // .Subscriber is our Subscriber Model, and this is an asynchronous method so we await this, and all of the subscribers will be returned
            res.json(subscribers)  //return all of the subscribers to the user using json
            //
        } catch (err) { //if there is an error we want to catch the error
            res.status(500).json ({ message: err.message }) //res to send the error the user, in json because it is a json API, and we set the status, so the user will know it was a failure
                                                              //with a status code 500, which means error on server, server(database) caused the error (entirely our fault, not the user's fault)
        }                                                                                                                //any errors in the 500 means that it was a server(database) error, or non-user error type
}) // "/ gets all in that directory" and we will need to request "req" and a response "res" for the get function, => means its going to be a function, and inside:

//async await https://www.youtube.com/watch?v=V_Kr9OSfDeU
// {this is where all of our code goes for different routes}


//Getting One Subscriber
router.get('/:id', getSubscriber, (req, res) => { //we called getSubscriber function (our middleware) with from below, and a comma which is used to reduce the (req, res) request & response parameters (see getSubscriber function for more details)
    //our id, with a colon : which means its a parameter, and we can access it by typing:
    //res.send(req.params.id)//which will give us access to whatever they pass in after the first slash
        //now we can replace (req.params.id) with response.send.name(res.subscriber.name)
    //res.send(res.subscriber.name) //gives us the name of the subscriber and send it back to us (instead of the id)
    //res.send is used to send data to Response Terminal (on the Rest Client)

    res.json(res.subscriber) //we call this to get the json version of the subscriber information returned to us
})
//Creating One Subsriber

router.post('/', async (req, res) => { //we add async because we will be saving that model, which is an asynchronous operation
    //next we want to create our "create route" that will be a "post" instead of a git, so we can say ".post"
    //since we will not have an id, we will not need the :id param, sense we will be creating it, but we will us "/" to give us our general route for creating a subscriber
    const subscriber = new Subscriber ({ //set the constant variable named subscriber to set equal to new subscriber, which will take a javascript object
        name: req.body.name, //1st we set the name in the javascript object, which comes from the request from the body(which is whatever the user sends to us, in JSON) and we want to get the name property of the body
        subscribedToChannel: req.body.subscribedToChannel //we also want to get the what the name of the subscribedToChannel 
    })
        // Now we need to save the created subscriber, we do this by using asynchronous method, by wrapping in a try catch statement
        try {
            const newSubscriber = await subscriber.save() // new subscriber, awaiting the new subscrier, which we just created, dot save, which is going to try to persist that to the database
                                                        // and put that into this new subscriber variable, 
                res.status(201).json(newSubscriber)                 //and if it is successful, we want to send this to our user using json, so we'll say, "newSubscriber",
                                                        //and set a status here, with a status, 201, which means, we successfully created a new object
                                                        //so when using a post route, ALWAYS use a status code 201, to be specific about what you did
                                                       

        } catch (err){ //we want to catch the error of course,
                res.status(400).json({ message: err.message}) //we want to send that status (400), which means the user is providing us with bad input, (and this means there isn't a problem with the server)
                                // and we want that sent to the user using json, assigning it to err.message variable, and we wrap this in an object by using { } syntaxx
            }           
})
//Updating One Subscriber
router.patch('/:id', getSubscriber, async (req, res) => { //we added our middleware getSubscriber function
    //we will use patch insead of put for our update because we will only update the name, and none of the other information(which is used for "put"), and we will need an :id param to know the subscriber's id
    //res.subscriber //and set res.subscriber equal to subscriber, this way inside of all these other functions we can just call res.subscriber and this will be the subscriber we set in our 
                    //getSubscriber function below

                    //we can only update for things that actually are sent to us in the request, so we will want to check the request we can say if the request.body.name is not equal to null
                    //so if the user actually passed a name to us, we want to take that res dot subscriber and we want to set the name = to the request.body.name and (we can do this for the subscribedToChannel too)

        if (req.body.name != null) {
            res.subscriber.name = req.body.name
        }

        if (req.body.subscribedToChannel != null) {
            res.subscriber.subscribedToChannel = req.body.subscribedToChannel
        }
        try {       //now we want to use a try catch statement to post an error message if our update fails
                const updatedSubscriber = await res.subscriber.save() //we will create our variable to call to our response.json function
                res.json(updatedSubscriber)
        } catch (err) {
                res.status(400).json({message: err.message}) //we can call a status 400 which means that the user provided bad input
        }

})
//Deleting One Subscriber (remember CRUD - Create, Retrieve, Update & Delete)
router.delete('/:id', getSubscriber, async (req, res) => { //we added our middleware "getSubscriber" function

    //we will use the "delete" function and then we need to know the id to delete(self-explanatory)
    // we add asynchronous because we will be calling this function with a try catch statement
    try {
        await res.subscriber.remove() // we want to await, and response will be to remove the subscriber and if it fails, we will catch it with the error message below
        res.json({ message: 'Deleted Subscriber'}) //if we successsfully remove our subscriber we should send a resopnse to our user in json saying that we deleted the subscriber
    } catch (error){ //we want to catch our error
            res.status(500).json({ message: err.message }) //which we response with a status code of 500 because this is an error on our fault. this response to the user will be sent to the user in json
                                    //
    }

})

async function getSubscriber (req, res, next ) { //we use a middleware (a function called middleware), which  all of the routes take an /:id (on our get, update & delete)
                                        //which all will use the same exact code in the beginning in order to get to get a subscriber  , so instead of writing that code in all of our routes
                                        //we will use the middleware function getSubscriber
                                        // with the same exact syntax as req, res, and next (next, says, if we call this move on to the next section of our code which is going to be
                                        // (req, res) => {  }) (this code to the right)
                                        // and we will make it asynchronous because we will be accessing the database inside of this code
                                //We want to create our subscriber
    let subscriber        
    try {                               //we want to do this with a try catch statement as usual, incase we have an error, so we can output an error message
          subscriber  = await Subscriber.findById(req.params.id) //now we want to get the subscriber, by awaiting find our Subscriber by our ID, which is remembered by us from 
                                                                    // the request.parameters.id variable which is going to be correlating to the variable that they pass inside of the route
                                                                    // "/:id", which tries to get us a user based on the id that they passed in the "/:id"  parameter
                                                                    //now we can check if that subscriber actually exists
            if (subscriber == null) {                          //if the subscriber isn't returned (or found)
                
                return res.status(404).json({ message: 'Cannot find subscriber'})                         // return a response with a status 404 which means a result was not found
                                                               //and send back a message to the user in json telling the user that 
                                                               //we call return because, if there is no subscriber, we want to leave this function and no longer go any further
            }
                                                                
    } catch (err) {
                return res.status(500)({ message: err.message}) //we are doing the return again to leave this function, set a response with the status 500 because there's something wrong with our server
                                    //that's causing this problem, and we want to send the message back in json to the user with an error message = to err.message
    }
    res.subscriber = subscriber //we want to set our response dot subscriber , which is just a variable we are creating on the response object
                    //and set res.subscriber equal to subscriber, this way inside of all these other functions we can just call res.subscriber and this will be the subscriber we set here

    next()              //the next function we call down here because we successfully completed this entire get subscriber function, so that next will allow us to move on to the
                        //next piece of middleware or the actual request itself, so 
}


module.exports = router
