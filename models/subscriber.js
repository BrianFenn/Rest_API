const mongoose = require('mongoose') //we will be using mongoose, so we will require mongoose
                                        //this will allow us to create a model that will allow us
                                        // to interact with our database in a "very easy way"

const subscriberSchema = new mongoose.Schema( {
                                    //Create Schema that will take in a Javascript
                                    //Object that will have keys for all of the 
                                    //properties for our subscriber (name,channel they subscribe to, and date subscribed to channel)

    name: {
        //define our different properties for our Schema
        type: String,
        required: true //required to subscribe


    },
    subscribedToChannel: {
        type: String,
        required: true

    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema) //now we want to export this so we can set it modules
                            //this will allow us to call a 'Subscriber' and our schema that corresponds to that model
                            //in our case Subscriber Schema
                        // we need .model because when we export this and import this in a different
                        // file, this model allows us to interact directly with the database using
                        // using this schema, which is perfect
                        