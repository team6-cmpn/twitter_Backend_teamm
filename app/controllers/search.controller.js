require("dotenv").config();
const {searchUserByName} = require("../utils/search.js");

exports.searchName =  async (req, res) =>{
    const users = await  searchUserByName(req.query.name);
    //console.log(searchUserByName(req.query.name));
    console.log(users)
    res.status(200).send({message: "okay!", user: users});
}