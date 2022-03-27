require("dotenv").config();
const { google } = require("googleapis");
var jwt = require("jsonwebtoken");

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_API_CLIENT_ID,
    process.env.GOOGLE_API_CLIENT_SECRET,
    process.env.GOOGLE_API_REDIRECT_SIGNUP
);

exports.openSignupGoogle = (req, res) => {
    const url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/gmail.readonly"
        ]
    });
    res.json({ url });
};


//Handle Redirect URL
exports.singupGoogle = (req, res) => {

    const { code } = req.query;
    const { tokens } = oAuth2Client.getToken(code);
    oAuth2Client.credentials = tokens;
    const oauth2 = google.oauth2("v2");
    // Get Google User
    const { 
    data: { email, id: google_open_id } 
    } = oauth2.userinfo.v2.me.get({
    auth: oAuth2Client
    });
    // Upsert User
    const { rows } = client.query(`
        insert into 
        user (email, google_open_id) 
        values ($1, $2) 
        on conflict (google_open_id) 
        do update set email=$1 
        returning *`,
        [email, google_open_id]
        );
    const user = rows[0];
    // Create JWT
    var token = jwt.sign(user, secret);
    // Login Redirect to Frontend
    //res.redirect(`${process.env.WEB_BASE_URL}/login/google?token=${token}`);
};