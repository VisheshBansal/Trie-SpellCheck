const router = require('express').Router();
const multer = require("multer");
var uploads = multer({dest: '../uploads'});
const shell = require("shelljs");
require("dotenv").config();
var fs = require('fs-extra');
const ocrSpaceApi = require('ocr-space-api');

var options =  {
    apikey: process.env.API_KEY,
    language: 'eng', // English
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
};


const ocrSpace = require('ocr-space-api-wrapper')
router.post('/', uploads.single('file'), (req, res, next) => {
    if (req.file === undefined) {
        var err = new Error('error');
        next(err);
    }
    fs.renameSync(req.file.path, "uploads/temp");

    let filepath = "uploads/temp";

// Run and wait the result
    ocrSpaceApi.parseImageFromLocalFile(filepath, options)
        .then(function (parsedResult) {
            console.log(parsedResult.parsedText);
        }).catch(function (err) {
        console.log('ERROR:', err);
    });

})

module.exports = router;