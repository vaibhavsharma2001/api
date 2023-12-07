// app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const passportjs=require('../middleware/authenticate');
const app = express();
const PORT =  process.env.PORT || 4000

app.use(express.json());//0.0.0.0

const db =mongoose.connect('mongodb://0.0.0.0:27017/taskdata',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})//o.o.o.o:27017
db.then(()=>{console.log("db connected")})
db.catch((err) => console.error('Error connecting to MongoDB', err));

// Passport configuration
// require('./config/passport')(passport);
app.use(passport.initialize());

// Routes
const authRoutes = require('../routes/authroutes');
const postRoutes = require('./routes/postroutes');
const dashboardRoutes = require('./routes/dashboardroutes');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});

