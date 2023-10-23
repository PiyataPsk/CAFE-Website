const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

let admin_user = 'root';
let admin_pass = '123'

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', (req, res) => {
    res.render('admin_login.ejs',{status: true})
});

router.post('/login-submit',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(admin_user === username && admin_pass === password){
        res.render('admin-create.ejs')
    }else{
        res.render('admin_login.ejs',{status: false});
    }
    
});

module.exports = router;