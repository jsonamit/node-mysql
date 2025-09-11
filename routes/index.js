const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");


router.use("/users", userRoutes);


/* 
    Password decryption can be used in the development environment if a user forgets their password.
    {
        @mobile // is required
    }
*/
router.post('/encrypt',(req, res, next) => {
    if(process.env.NODE_ENV == 'development' && process.env.DEBUG == 'True') {
        if(!req.body) {
            res.json({
                resp: 0,
                msg: 'Missing body'
            });
        }
        const { mobile } = req.body;
        
        res.json({
            resp: 1,
            msg: 'Passowrd encrypt successfully',
            password: mobile
        });
    } else {
        res.json({
            resp: 0,
            msg: 'You do not have enough permissions to decrypt the password.'
        });
    }
});

module.exports = router;