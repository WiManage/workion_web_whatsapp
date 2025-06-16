const express = require("express");
const mongoose = require('mongoose');
const connectDB = require('./db');
const appSettings = require('./models/appSettings');
const admin = require('./models/admin');
const offres = require('./models/offres');
const user = require('./models/user');

const { Client, LocalAuth } = require('whatsapp-web.js');
const abonnements = require("./models/Abonnements");
const app = express();
const port = 3001;



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
    
    // con.query("UPDATE settings SET value = \"" + qr + "\" where settings.key = \"whatsapp-qrcode\""  , function (err, result) {
    //   if (err) throw err;
    //   console.log(result)
    //   console.log("QR Code Updated: " + qr);
    // });
});

// client.on('message', async msg => {
//     if (msg.body.includes('orion renew')) {
//         await msg.reply('pong');
//     }
// });

client.on('message_create', async (msg) => {

  if (msg.fromMe && msg.to === '221776614662@c.us') {
    console.log('Tu as envoyé :', msg.body);

    if (msg.body.toLowerCase().startsWith('abonn.')) {
      const parts = msg.body.toLowerCase().split('.');

      if (parts.length !== 4) {
        await msg.reply('Format invalide. Utilise : abonn.email.duree.tarif');
        console.log('Format invalide. Utilise : abonn.email.duree.tarif');
        return;
      }

      const [, numero, duree, tarif] = parts;
      const parsedTarif = parseInt(tarif);
      if (isNaN(parsedTarif)) {
        await msg.reply('Tarif invalide');
        console.log('Tarif invalide.');
        return;
      }

      const adminData = await admin.findOne({ email: numero }).populate('userId', 'store');
      if (!adminData || !adminData.userId) {
        await msg.reply('Admin introuvable ou pas lié à un utilisateur');
        console.log('Admin introuvable ou pas lié à un utilisateur.');
        return;
      }

      const offreItem = await offres.findOne({ tarif: parsedTarif });
      if (!offreItem) {
        await msg.reply('Offre introuvable pour ce tarif');
        console.log('Offre introuvable pour ce tarif.');
        return;
      }

      const start = new Date();
      const end = new Date();
      end.setMonth(end.getMonth() + parseInt(duree));

      await abonnements.create({
        userId: adminData.userId._id,
        offre: offreItem._id,
        duree,
        start,
        end,
        active: true
      });

       await msg.reply('Abonnement créé avec succès');
      console.log('Abonnement créé avec succès');
    }
  }
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


    const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
    // console.log('sanitized_number', sanitized_number)
    const final_number = `${sanitized_number.substring(sanitized_number.length - 12)}`;

    const number_details = await client.getNumberId(`${final_number}@c.us`); // get mobile number details

    if (number_details) {
        const sendMessageData = await client.sendMessage(number_details._serialized, body.message); // send message
    } else {
        console.log(final_number, "Mobile number is not registered");
    }
    res.status(200).send("Sent successfully");
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
  



  // app.use(express.json());

  // // Get the data from the request body
  // const data = req.body;

  // // Validate the data
  // if (data.title && data.content && data.author) {
  //   // If the data is valid, create a new post object with a new id
  //   const newId = posts.length + 1;
  //   const newPost = new Post(newId, data.title, data.content, data.author);

  //   // Add the new post to the posts array
  //   posts.push(newPost);

  //   // Send a 201 status code and the new post as a JSON response
  //   res.status(201).json(newPost);
  // } else {
  //   // If the data is invalid, send a 400 status code and a message
  //   res.status(400).send('Invalid data');
  // }
});