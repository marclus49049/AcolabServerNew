// import { default as mongodb } from 'mongodb';
import {default as Mongoose} from 'mongoose';

// let MongoClient = mongodb.MongoClient;

var url = "mongodb://localhost:27017/";
const initiateMongoServer = () => {
    Mongoose.connect(url,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    );
    console.log('Mongo Connection Success');
}

export default initiateMongoServer;