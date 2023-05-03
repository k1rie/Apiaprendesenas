import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from "mongodb"

const {Schema} = mongoose



const urlConnect = "mongodb+srv://lenguajesenasfree:dwY6tV5qCVgrDKGn@cursosdb.now8332.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(urlConnect,{useNewUrlParser: true, useUnifiedTopology: true})

const client = new MongoClient(urlConnect, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(model,name){
    try{
        await client.connect();
        console.log("conectado")

            const resultados = await model.find({name : name} )
            return resultados

    }finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}



const videoUrlSchema = new Schema({
    url: String,
    description: String,
    name: String
})

const Video = mongoose.model("videos",videoUrlSchema)



export {Video,run}