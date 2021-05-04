const router = require('express').Router();
const multer = require("multer");
var multer = require('multer');
var upload = multer({ dest: '../uploads' });
const shell = require("shelljs");
require("dotenv").config();
var fs = require('fs-extra');

const ocrSpace = require('ocr-space-api-wrapper')
fs.writeFile("../uploads", "temp", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

async function main () {
    try {
        // Using your personal token + local file
        const result = await ocrSpace('../uploads/temp', { apiKey: process.env.API_KEY })

    } catch (error) {
        console.log(error)
    }
}

module.exports = router;