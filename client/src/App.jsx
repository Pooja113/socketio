import { useEffect, useMemo } from 'react'
import io from 'socket.io-client'
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from 'react';


function App() {
  const socket = useMemo(() => io('http://localhost:3000'), [])
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message)
    setMessage("")
  }
  useEffect(() => {
    socket.on("connect", () => {
      console.log('socket.id', socket.id)
    })

    socket.on("recieve-message", (data) => {
      console.log('data', data)
    })

    return ()=>{
      socket.disconnect()
    }
  }, [])
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 500 }} />
      <Typography variant="h6" component="div" gutterBottom>
        {/* {socketID} */}
        Welcome
      </Typography>

      {/* <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form> */}

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        {/* <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        /> */}
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {/* {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))} */}
      </Stack>
    </Container>
  )
}

export default App
