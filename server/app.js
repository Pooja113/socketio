import express from 'express'
import dotenv from 'dotenv'
import { Server } from "socket.io";
import { createServer } from 'http';
const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})
dotenv.config()

app.get('/', (req, res) => {
    res.json({
        message: "Hello world!"
    })
})

io.on("connection", (socket) => {
    console.log('connected', socket.id)

    socket.on("message", (data) => {
        io.emit("recieve-message", data)
    })

    socket.on("disconnect", ()=>{
        console.log('disconnected', disconnected)
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})

