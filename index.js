import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import 'dotenv/config';

//creating app
const app = express();
const port = 3000;

// weather API key from my .env file. you can generate yours by reading openweathermap.org
const API_KEY = process.env.API_KEY;
// const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';

//// for parsing application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index.ejs',{content: 'City will be shown here'});
});

app.post('/getWeather', async (req,res) => {
    const cityId = req.body.city;
    try{
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}`);
    const content = JSON.stringify(response.data.city.name);
    console.log("log here: "+content);
    res.render('index.ejs',{content:content});
    }
    catch(error){

        res.render('index.ejs',{ content: JSON.stringify(error.response)});
    }
});







app.listen(port, ()=>{
    console.log("App is listening from Port: "+port);
})
