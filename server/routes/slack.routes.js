import express from 'express'
import { slackDelete, slackEdit, slackMessages, slackSchedule, slackSend } from '../controllers/slack.controller.js'

const router = express()

router.post("/send", slackSend)
router.post("/schedule",slackSchedule)
router.get("/messages", slackMessages)
router.put("/edit", slackEdit)
router.delete("/delete/:ts",slackDelete)

export default router