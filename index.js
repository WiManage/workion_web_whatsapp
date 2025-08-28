const express = require("express");
const mongoose = require('mongoose');
const connectDB = require('./db');
const appSettings = require('./models/app_settings');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const port = 3002;



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.json());


// Connexion à MongoDB
connectDB();

const client = (this._client = new Client({
    restartOnAuthFail: true,
    takeoverOnConflict: true,
    authStrategy: new LocalAuth({
        // dataPath: process.env.WHATSAPP_DATA_PATH,
        clientId: 'vv2',
    }),

    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--unhandled-rejections=strict',
      ],
      // userDataDir: ${process.env.WHATSAPP_DATA_PATH},
    },
  }));


client.on('qr', async (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);

    const settings = await appSettings.findOneAndUpdate({}, { qr }, { new: true });
    
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.initialize();


// Create a route and a handler for POST /posts
app.post('/send-message', async (req, res) => {

  try {
    let body = req.body;

    const number = body.telephone;


    const sanitized_number = number.toString().replace(/[- )(]/g, "");
    const final_number = `${sanitized_number.substring(sanitized_number.length - 12)}`;

    const number_details = await client.getNumberId(`${final_number}@c.us`); 

    if (number_details) {
        const sendMessageData = await client.sendMessage(number_details._serialized, body.message); 
    } else {
        console.log(final_number, "Mobile number is not registered");
    }
    res.status(200).send("Sent successfully");
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
  
});