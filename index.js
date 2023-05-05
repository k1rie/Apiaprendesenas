import express from "express"
import {findCourse, findAllCoursesComunity, createVideo, findCourseComunity} from "./mongoConfig/mongoConfig.js"
import cors from "cors"
import Nodemailer from "nodemailer"
const app = express()
const PORT = process.env.PORT || 3001

async function sendsugerencia(name,text) {
    const transporter = Nodemailer.createTransport(({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "lenguajesenasfree@gmail.com", // generated ethereal user
            pass: "knpnzwthxjceopai", // generated ethereal password
        }
    }))

    let info = await transporter.sendMail({
        from: '<foo@example.com>', // sender address
        to: "lenguajesenasfree@gmail.com", // list of receivers
        subject: name, // Subject line
        text:text, // plain text body// html body
    });

console.log("correo enviado")
}

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/curso/:id",async (req,res)=>{
    console.log(req.params.id)
    let videos = await findCourse(req.params.id)
    res.send(videos)
    console.log(videos)
} )

app.get("/cursocomunity/:id",async (req,res)=>{
    console.log(req.params.id)
    let videos = await findCourseComunity(req.params.id)
    res.send(videos)
    console.log(videos)
} )

app.get("/cursoscomunity/",async (req,res)=>{
    let videos = await findAllCoursesComunity()
    res.send(videos)
    console.log(videos)
})


app.post("/sendsugerencia",async (req,res)=>{
    sendsugerencia(req.body.name,req.body.sugerencia)
    console.log(req.body)
    res.send("se envio la sugerencia")
})


app.post("/createvideo",async (req,res)=>{
    const body = req.body

await createVideo(body.url,body.urlportada,body.name,body.aprendizajes,body.description,body.language,body.isaprove)
    res.send("enviado")
})

app.get("/hola",(req,res)=>{
    res.send("HOLAAAAAAA")
})

app.listen(PORT,(req,res)=>{
    console.log("servidor corriendo")
})