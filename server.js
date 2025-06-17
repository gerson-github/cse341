require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const studentsRouter = require("./routes/students");
// const coursesRouter = require("./routes/courses");

const ordersRouter = require("./routes/ecom_orders");
const productsRouter = require("./routes/ecom_products");
const reviewsRouter = require("./routes/ecom_reviews");
const usersRouter = require("./routes/ecom_users");

const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_URI;

const { isLoggedIn } = require("./middlewares/auth");

// Connect to MongoDB
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  next();
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Z-Key",
      "Authorization",
    ],
  })
);

// Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile); // opcional: salvar no DB
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 1. Iniciar login com GitHub
app.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// 2. Callback do GitHub
app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // ou qualquer rota protegida que você quiser
  }
);

// 4. Página protegida
app.get("/dashboard", isLoggedIn, (req, res) => {
  res.send(`<h1>Bem-vindo, ${req.user.username}!</h1>
    <p><a href="/logout">Logout</a></p>`);
});

// 5. Logout
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Routes
app.use("/", require("./routes/index.js"));
//app.use("/students", studentsRouter); app.use("/courses", coursesRouter); //app.use('/contacts', contactsRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

module.exports = app;

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Server running
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
