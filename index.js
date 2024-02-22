import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import 'dotenv/config';

//creating app
const app = express();
const port = 3000;

// weather API key
const API_KEY = process.env.API_KEY;

//parsing the body
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index.ejs');
});







app.listen(port, ()=>{
    console.log("App is listening from Port: "+port);
})
