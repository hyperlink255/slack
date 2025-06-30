import axios from 'axios';
const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.CHANNEL_ID;

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
};

 export const slackSend = async (req,res) => {

   try {
     const { message } = req.body;
 
     const response = await axios.post(
       'https://slack.com/api/chat.postMessage',
       {
         channel: channel,
         text: message,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
         },
       }
     );
 
     res.status(200).json(response.data);
   } catch (error) {
     res.status(500).json({ error: 'Message send failed' });
   }
 }

export const slackSchedule = async (req,res) => {
   const { message, time } = req.body;
  const post_at = Math.floor(new Date(time).getTime() / 1000);
  try {
    const response = await axios.post('https://slack.com/api/chat.scheduleMessage', { channel, text: message, post_at }, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(501).json({ success:false, message:error.message});
  }

}

export const slackMessages = async (req,res) => {
    try {
    const result = await axios.get(`https://slack.com/api/conversations.history?channel=${channel}`, { headers });
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }

}

export const slackEdit = async (req,res) => {
 const { ts, newText } = req.body;
  try {
    const response = await axios.post('https://slack.com/api/chat.update', { channel, ts, text: newText }, { headers });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit message' });
  }

}

export const slackDelete = async (req,res) => {
      const { ts, newText } = req.body;
  try {
    const response = await axios.post('https://slack.com/api/chat.update', { channel, ts, text: newText }, { headers });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit message' });
  }

}


