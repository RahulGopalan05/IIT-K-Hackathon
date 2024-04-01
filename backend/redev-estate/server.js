const cors = require('cors');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const propertiesRouter = require('./routes/properties');
const newsGetRouter = require('./routes/news-get');
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const registerRouter = require('./routes/register');    
const keys = require('../config/keys'); 
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');
const upload = require('./middleware/upload');
const http = require('http');
const socketIo = require('socket.io');
const geocodingRouter = require('./routes/geocoding');
const feedbackRoutes = require('./routes/feeback1'); 

// Connect to MongoDB
mongoose.connect(`mongodb+srv://rahul:${keys.mongoPassword}@cluster0.l64qjos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Initialize Express.js app
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Configure Passport.js
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return(err);
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    if (!bcrypt.compareSync(password, user.password)) return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
  });
}));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(upload);    

// Define routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', auth, logoutRouter);
app.use('/properties', auth, propertiesRouter);
app.use('/news', newsGetRouter);
app.use('/', geocodingRouter);

app.use(feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Create an HTTP server and a Socket.IO server
const server = http.createServer(app);
const io = socketIo(server);

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});