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
        .then(async function (parsedResult) {
            const detections = parsedResult.parsedText;
            let text = detections.toLowerCase();
            console.log(text);
            shell.cd("./Trie");
            await fs.writeFileSync("ocrData.txt",text);
            var data = shell.exec("./checker ocrData.txt").toString();

            //fs.unlinkSync("./ocrData.txt");
            //fs.unlinkSync("../" + filepath);
            var array = data.split("\n");
            if (array.length <= 1)
                return res.send("Some problem occurred <a href='/'>go back</a>");
            res.render("display", {data: array, text, tone: null});
        }).catch(function (err) {
        console.log('ERROR:', err);
    });

})

module.exports = router;