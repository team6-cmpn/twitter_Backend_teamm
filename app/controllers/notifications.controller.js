const db = require("../models");
const config = require("../config/auth.config");
const Notification = db.notification;
const User = db.user;
const Tweet = db.tweet;

exports.showNotifications= async(req,res)=>{


await Notification.find({userRecivedNotification:req.userId}).populate('notificationContent').sort({created_at:-1}).exec( async (err, notifications) => {
if (err){
  res.status(500).send({ message: err });
  return;
}
if (notifications){

res.status(200).send(notifications)
}})}



exports.showFavouritesNotifications= async(req,res)=>{

await Notification.find({userRecivedNotification:req.userId, notificationType: 'favourite'}).populate('notificationContent').sort({created_at:-1}).exec( async (err, notifications) => {
if (err){
  res.status(500).send({ message: err });
  return;
}
if (notifications){
res.status(200).send(notifications)
}})}
