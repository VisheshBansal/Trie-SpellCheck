require("dotenv").config();
const express = require("express");
const fs = require("fs");
const shell = require("shelljs");

const multer = require('multer');
const upload = multer({ dest: './uploads' });

// Defining to use express application
var app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));

// On default render index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

// Requirement to use OCR route
app.use(require("./routes/ocr"));

// Initialize App
app.listen(process.env.PORT || 4000, () => {
    console.log("OK");
});

