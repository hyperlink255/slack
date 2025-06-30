import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API = 'http://localhost:5000/api/slack';


function App() {
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [messages, setMessages] = useState([]);
  const [editText, setEditText] = useState('');
  const [editTS, setEditTS] = useState('');

   const fetchMessages = async () => {
     const res = await axios.get(`${API}/messages`);
      setMessages(res.data);
      console.log(res.data)
   };

  const sendMessage = async () => {
    await axios.post(`${API}/send`, { message });
    setMessage('');
     fetchMessages();
  };

  const scheduleMessage = async () => {
    await axios.post(`${API}/schedule`, { message, time: scheduleTime });
    setMessage('');
    setScheduleTime('');
     fetchMessages();
  };

  const editMessage = async () => {
    await axios.put(`${API}/edit`, { ts: editTS, newText: editText });
    setEditTS('');
    setEditText('');
     fetchMessages();
  };

  const deleteMessage = async (ts) => {
    await axios.delete(`${API}/delete/${ts}`);
     fetchMessages();
  };

   useEffect(() => {
     fetchMessages();
   }, []);

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='md:w-[500px]  w-full bg-white shadow-2xl rounded  p-5'>
      
      <h2 className='font-semibold  my-2'>Slack Messaging App (MERN)</h2>
      <div className='flex gap-2 mb-4'>
      <input value={message} className='w-full outline-none border border-gray-500 text-black rounded px-2 py-2' 
      onChange={e => setMessage(e.target.value)} placeholder="Enter Message"
       />
      <button className='bg-blue-500 rounded text-white  px-5 cursor-pointer' onClick={sendMessage}>Send</button>
      </div>
      <div className='flex gap-2 mb-4'>
      <input type="datetime-local" className='w-full outline-none border border-gray-500 text-black rounded px-2 py-2'
       value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} />
      <button className='bg-blue-500 rounded text-white  px-5 cursor-pointer' onClick={scheduleMessage}>Schedule</button>
      </div>

      <h3 className=' font-semibold mb-2'>Edit Message</h3>
      <div className='flex gap-2'>
      <div className='w-1/2' >
      <input value={editTS} className='w-full outline-none border border-gray-500 text-black rounded px-2 py-2' onChange={e => setEditTS(e.target.value)} placeholder="Timestamp" />
      </div>
      <div className='w-1/2'>
      <input value={editText} className='w-full outline-none border border-gray-500 text-black rounded px-2 py-2' onChange={e => setEditText(e.target.value)} placeholder="New Text" />
      </div>
      <div className=''>
      <button className='bg-blue-500 rounded text-white  px-5 py-2 cursor-pointer' onClick={editMessage}>Edit</button>
      </div>
      </div>

      <h3 className='mt-2 mb-2 font-semibold'>Messages</h3>

      {
      messages.map((msg) => (
          <div className='bg-gray-300 w-full rounded px-2 py-1'>
           <div className='flex justify-between'>
          <p>{msg.text}</p>
          <button onCanPlay={deleteMessage(msg.ts)} className='text-white bg-rose-500 rounded px-4 py-0.5 cursor-pointer'>Delete</button>
          </div>
        </div>

      ))
      }
      </div>
      </div>
  );
}

export default App;
