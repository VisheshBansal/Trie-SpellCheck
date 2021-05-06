const router = require('express').Router();
const multer = require("multer");
var uploads = multer({dest: '../uploads'});
const shell = require("shelljs");
require("dotenv").config();
var fs = require('fs-extra');
const ocrSpaceApi = require('ocr-space-api');

var options = {
    apikey: process.env.API_KEY,
    language: 'eng', // English
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
};

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
            const detections = parsedResult.parsedText;
            var text = '';
            text = detections.split("\n").join(" ").toLowerCase();

            fs.writeFileSync("temp.txt", text);
            shell.cd("./Trie");
            var data = shell.exec("./checker ../temp.txt").toString();

            fs.unlinkSync("../temp.txt");
            fs.unlinkSync("../" + filepath);
            var array = data.split("\n");
            if (array.length <= 1)
                return res.send("Some problem occurred <a href='/'>go back</a>");
            res.render("display", {data: array, text, tone: null});
        }).catch(function (err) {
        console.log('ERROR:', err);
    });

})

module.exports = router;