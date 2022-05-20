// const { authJwt } = require("../middleware");
// const controller = require("../controllers/user.controller");
const multer = require('multer');
const path = require('path');
const { relations } = require("../models");
const db = require("../models");
ObjectId = require('mongodb').ObjectId;
const User = db.user;
const tweet = db.tweet;
const Relation = db.relations;
require("dotenv").config();
// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       " x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
exports.uploadPhotos = async(req, res,count) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './upload/images');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
    );
    const upload = multer({
        storage: storage
    }
    );
    
    if (count==1)
    {
        if(req.file)
        {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                res.status(409).send(
                    err
                    );
                    // status: false,
                    // message: 'Error Occured!',
                    // error: err
            } else {
                await User.updateOne({_id:ObjectId(req.userId)},{profile_image_url:req.file.path});
                res.status(200).send(
                    req.file
                    // status: true,
                    // message: 'File Uploaded Successfully!',
                    // file: req.file

                );
            }
        }
        );
    }
    else{
        res.status(404).send({message:"not found"})
    }
    }
    else{
        if(req.files){
    upload.array('image')(req, res, (err) => {
        if (err) {
            res.status(409).send(
                err
                // status: false,
                // message: 'Error Occured!',
                // error: err
            );
        } else {
            res.status(200).send(
                req.files
                // status: true,
                // message: 'File Uploaded Successfully!',
                // file: req.files
            );
        }
    }
    );
    }
    else{
        res.status(404).send({message:"not found"})
    }
}
};
// const upload = multer({
//     dest: './upload/images'
// });

// app.post('/upload',upload.single('image'),(req, res)=> {
//    console.log(req.file);
// });
// }
