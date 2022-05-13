const db = require("../models");
const {getListRelations} = require("../utils/user.js")
const multer = require('multer');
const path = require('path');
const User = db.user;
const Relation=db.relations;
const Tweet = db.tweet;
const {uploadPhotos} = require("../utils/image.js");

// const upload = multer({
//     dest: './upload/images'
// });
exports.uploadProfilePhoto=async(req,res)=>{
    //console.log(req.file)
    uploadPhotos(req,res,1);
};

exports.uploadTweetPhotos = async(req,res)=>{
    uploadPhotos(req,res,2)

};
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, './upload/images');
    //     },
    //     filename: (req, file, cb) => {
    //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    //     }
    // }
    // );
    // const upload = multer({
    //     storage: storage
    // }
    // );
    // upload.single('image')(req, res, (err) => {
    //     if (err) {
    //         res.json({
    //             status: false,
    //             message: 'Error Occured!',
    //             error: err
    //         });
    //     } else {
    //         res.json({
    //             status: true,
    //             message: 'File Uploaded Successfully!',
    //             file: req.file
    //         });
    //     }
    // }
    // );

