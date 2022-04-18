exports.userBoard = (req, res) => {
    res.status(200).send({userid : req.userId});
};