require('./Models/db')
const express = require('express');
const app = express();
const userRoute = require('./Routes/userRoute')
const blogRoute = require('./Routes/blogRoute')
const { verifyAccessToken } = require('./Middlewares/jwt_helper')


const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());


app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.use('/hello',verifyAccessToken,(req,res) => {
    res.send(req.userId);
})
const PORT=process.env.PORT || 5000 ;
app.listen(PORT,() => console.log(`Listening to PORT ${PORT}`));