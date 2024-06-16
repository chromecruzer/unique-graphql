const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

async function startServer() {
  const { default: chalk } = await import('chalk');

  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);

  const SECRET_KEY = process.env.SECRET_KEY; // JWT secret key from environment variables

  app.set('view engine', 'pug');
  app.set('views', './views');
  app.use(express.static('public'));
  app.use(express.json()); // To parse JSON bodies 

  // Dynamic users from environment variables
  const users = JSON.parse(process.env.USERS);

  // User colors
  const userColors = {};
  const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'];

  // Function to get color for a user
  const getColorForUser = (username) => {
    if (!userColors[username]) {
      userColors[username] = chalk[colors[Object.keys(userColors).length % colors.length]];
    }
    return userColors[username];
  };

  // Chat messages storage
  let chatMessages = [];

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Send collected chat messages via email 
  const sendChatMessages = () => {
    if (chatMessages.length > 0) {
      const emailBody = chatMessages.map(msg => {
        const color = getColorForUser(msg.user);
        return color(`${msg.user}: ${msg.msg}`);
      }).join('\n');

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'Collected Chat Messages',
        text: emailBody
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
          chatMessages = []; // Clear messages after sending
        }
      });
    }
  };

  // Interval to send chat messages every 10 minutes
  setInterval(sendChatMessages, 10 * 60 * 1000);

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
      // User authenticated, generate a token
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.username = decoded.username;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userColor = getColorForUser(socket.username);
    console.log(userColor(`${socket.username} connected`));

    socket.on('chat message', (msg) => {
      const chatMessage = { user: socket.username, msg };
      chatMessages.push(chatMessage);
      io.emit('chat message', chatMessage);
      console.log(userColor(`${socket.username}--> ${msg}`));
    });

    socket.on('disconnect', () => {
      console.log(userColor(`${socket.username} disconnected`));
    });
  });

  const PORT = process.env.PORT || 3000;
  const HOST = "0.0.0.0" || process.env.HOST;
  server.listen(PORT, HOST, () => {
    console.log(`Server running @-->🔥 http://localhost:${PORT}/`);
  });
}

startServer();
