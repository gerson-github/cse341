const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Welcome to the API!");
  res.send(`<h1>Ola !! Click on the link bellow to get logged again ;-)</h1>
    <p><a href="/github">Login with GitHub</a>
</p>`);
});

router.get("/about", (req, res) => {
  res.send("About this app.");
});

module.exports = router;
