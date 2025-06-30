import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import slackRoute from './routes/slack.routes.js'
const app = express()

// middleware
app.use(cors())
app.use(express.json())


// end pointes
app.use("/api/slack", slackRoute)



const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is  Running ${PORT}`)
})