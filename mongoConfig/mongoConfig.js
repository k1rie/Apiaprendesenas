import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from "mongodb"

const {Schema} = mongoose



const urlConnect = "mongodb+srv://lenguajesenasfree:dwY6tV5qCVgrDKGn@cursosdb.now8332.mongodb.net/?retryWrites=true&w=majority"


const cursoSchema = new Schema({
    url: String,
    name: String,
    aprendizajes: Array,
    description: String,
    language: String
})


const cursoComunitySchema = new Schema({
    url: String,
    urlportada: String,
    name: String,
    aprendizajes: Array,
    description: String,
    language: String,
    isaprove: Boolean
})

const model = mongoose.model("cursos",cursoSchema)

const modelComunity = mongoose.model("cursos-comunity",cursoComunitySchema)


async function findCourse(id){
    try{
        await mongoose.connect(urlConnect,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("conectado")

            const resultados = await model.find({_id : id} )
            return resultados

    }catch (e) {
        console.log(e)
    }
}

async function findCourseComunity(id){
    try{
        await mongoose.connect(urlConnect,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("conectado")

        const resultados = await modelComunity.find({_id : id} )
        return resultados

    }catch (e) {
        console.log(e)
    }
}

async function findAllCoursesComunity(name){
    try {
        await mongoose.connect(urlConnect,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("conectado")
        const resultados = await modelComunity.find({isaprove: true} )
        return resultados
    }catch (e) {
        console.log(e)
    }
}

async function createVideo(url,urlportada,name,aprendizajes,description,language,isaprove){
try {
    await mongoose.connect(urlConnect,{useNewUrlParser: true, useUnifiedTopology: true});
    const newvideo = await new modelComunity({
        url: url,
        urlportada: urlportada,
        name: name,
        aprendizajes: aprendizajes,
        description: description,
        language: language,
        isaprove: isaprove
    })
    newvideo.save()

}catch (e) {
    console.log(e)
}
}







export {findCourse,findAllCoursesComunity,createVideo,findCourseComunity}