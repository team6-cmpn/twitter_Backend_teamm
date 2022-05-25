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
// 

/**
 * 
 * @module Image
 */

/**
 * @global
 * @typedef {object} reqParamuploadProfilePhoto
 * @property {file} image the image to upload
 * 
 */
/**
 *
 * @global
 * @typedef {object}  responseBodyuploadProfilePhoto
 * @property {text} url the url of the image 
 */
/** 
 * this function uploads the profile image of the user
 * 
 * @param {reqParamsuploadProfilePhoto} req request sent from the front
 * @param {responseBodyuploadProfilePhoto} res response sent to the front
 * 
 */ 
exports.uploadProfilePhoto=async(req,res)=>{
    //console.log(req.file)
    await uploadPhotos(req,res,1);
};

/**
 * 
 * @module Image
 */

/**
 * @global
 * @typedef {object} reqParamuploadTweetPhoto
 * @property {file} image the image to upload
 * 
 */
/**
 *
 * @global
 * @typedef {object}  responseBodyuploadTweetPhoto
 * @property {text} url array of the url of the image 
 */
/** 
 * this function uploads images of the tweet
 * 
 * @param {reqParamsuploadTweetPhoto} req request sent from the front
 * @param {responseBodyuploadTweetPhoto} res response sent to the front
 * 
 */

exports.uploadTweetPhotos = async(req,res)=>{
    await uploadPhotos(req,res,2)

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

