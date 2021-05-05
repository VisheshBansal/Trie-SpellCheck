const router = require('express').Router();
const multer = require("multer");
var uploads = multer({dest: '../uploads'});
const shell = require("shelljs");
require("dotenv").config();
var fs = require('fs-extra');

const ocrSpace = require('ocr-space-api-wrapper')
router.post('/', uploads.single('file'), (req, res, next) => {
    //  console.log(req.file);
    if (req.file === undefined) {
        var err = new Error('error');
        next(err);
    }
    fs.renameSync(req.file.path, "uploads/temp");

    let filepath = "uploads/temp";


})

module.exports = router;