db.createUser(
    {
        user: "hem",
        pwd: "drtamerbasha",
        roles: [
            {
                role: "readWrite",
                db: "Twitter_db"
            }
        ]
    }
);
