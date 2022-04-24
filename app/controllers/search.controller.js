require("dotenv").config();

const {searchUserByName, searchMentions,searchUserByUserName , searchTweetText} = require("../utils/search.js");

exports.searchTop =  async (req, res) =>{
    if(req.query.text[0]=="@"){
        let username=req.query.text.substring(1);
        const userName = await  searchUserByUserName(username);
        const Mentioned = await searchMentions(req.query.text);
       res.status(200).send({message: "okay!",  usernames: userName , mentions : Mentioned});  

    }
    else {
       const users = await  searchUserByName(req.query.text);
       const tweets = await  searchTweetText(req.query.text);
       res.status(200).send({message: "okay!", user: users  , tweets: tweets });  
     }
    
}

exports.searchPeople =  async (req, res) =>{
    if(req.query.text[0]=="@"){
        let username=req.query.text.substring(1);
        const userName = await  searchUserByUserName(username);
        if((!userName)||(userName.length==0)){
    
            res.status(404).send({message: "Failed! name or user name not found"});
             
        }
        else{
        res.status(200).send({message: "okay!", usernames:userName });
        }
    }
    else{
    const users = await  searchUserByName(req.query.text);
        
        
    
    if((!users)||(users.length==0)){
    
        res.status(404).send({message: "Failed! name or user name not found"});
         
    }
    else{
    res.status(200).send({message: "okay!", user: users});
    }
}
}

exports.seachLatest =  async (req, res) =>{
    const tweets = await  searchTweetText(req.query.text);
    

    if(tweets.length==0){ 
        res.status(404).send({message: "Failed! tweet text not found"});  
    }
    else{
       // tweets.sort((a,b)=> {a.createdAt <= b.createdAt});
       //tweets.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
       //for(let i=0;i<tweets.length;i++){
          // tweets[i].createdAt=tweets[i].createdAt.toString().substring(0,10);
          //   tweet=tweets.sort((created_at1, created_at2) => created_at1 - created_at2);
      // }
       

        res.status(200).send({message: "okay!", tweets: tweets});
    }    
}