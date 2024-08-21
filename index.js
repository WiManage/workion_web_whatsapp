const express = require("express");
var mysql = require('mysql');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.json());

// var con = mysql.createConnection({
//   host: process.env.DB_HOST, // || "127.0.0.1",
//   port: process.env.DB_PORT, // || 8889,
//   database: process.env.DB_DATABASE, // || 'manuveluniv_v3_db',
//   user: process.env.DB_USERNAME, // || "root",
//   password: process.env.DB_PASSWORD// || "root",

// });

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: 8889,
  database: 'manuveluniv_v3_db',
  user: "root",
  password: "root",

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

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


client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    con.query("UPDATE settings SET value = \"" + qr + "\" where settings.key = \"whatsapp-qrcode\""  , function (err, result) {
      if (err) throw err;
      console.log(result)
      console.log("QR Code Updated: " + qr);
    });
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