const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const app = express();
const port = 5028;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Define a route for the root ("/")
app.get('/', (req, res) => {
  res.render('index', { message: 'Hello, this is the root route!' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { message: 'Hello, this is the root route!' });
});

app.get('/mira', (req, res) => {
  res.render('mira', { message: 'Hello, this is the root route!' });
});

// Generate a random session secret
const SESSION_SECRET = crypto.randomBytes(32).toString('hex');

// Configure session
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


const crypto = require('crypto');

// Configure Discord strategy
passport.use(new DiscordStrategy({
   clientID: CLIENT_ID,
   clientSecret: CLIENT_SECRET,
   callbackURL: CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
   // In a real app, you would save the user's info to a database here
   return done(null, profile);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((obj, done) => {
   done(null, obj);
});

// Authentication routes
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
   passport.authenticate('discord', { failureRedirect: '/' }),
   (req, res) => {
      res.redirect('/dashboard'); // Redirect to your dashboard
   }
);

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
   if (req.isAuthenticated()) return next();
   res.redirect('/');
};

// Dashboard route
app.get('/dashboard', isLoggedIn, (req, res) => {
   res.send(`Welcome to the dashboard, ${req.user.username}!`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});