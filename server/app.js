import express from 'express'
import dotenv from 'dotenv'
import { Server } from "socket.io";
import videoRoute from './routes/videoRoute.js'
//import { createServer } from 'http';
const app = express();
dotenv.config()

//const server = createServer(app)

app.get('/', (req, res) => {
    res.json({
        message: "Hello world!"
    })
})

app.use('/api', videoRoute)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log('connected', socket.id)

    socket.on("message", (data) => {
        //io.emit("recieve-message", data)
        io.to(data.room).emit("recieve-message", data)
    })

    socket.on("room-join", (room) => {
        console.log("Connected to the ", room)
        socket.join(room)
        //io.to(data.room).emit("recieve-message", data)
    })

    socket.on("disconnect", () => {
        console.log('disconnected')
    })
})



