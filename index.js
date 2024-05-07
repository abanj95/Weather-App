import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import 'dotenv/config';

//creating app
const app = express();
const port = 3000;

// weather API key from my .env file. you can generate yours by reading openweathermap.org
const API_KEY = process.env.API_KEY;


// for parsing application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index.ejs',{content: null, country: null, weather: null, feels: null, description: null,humidity: null, temp: null});
});

app.post('/getWeather',async(req,res)=>{
    const city = req.body.city;
    try{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const content = response.data;
    console.log(content);
    const country = content.sys.country;
    const feels = content.main.feels_like;
    const humidity = content.main.humidity;
    const temp = content.main.temp;
    const description = content.weather[0].description;
    // console.log("log here: "+content.name+" | visibility: "+content.visibility+" | country:"+content.sys.country+" | description: "+description+" | feel like: "+feels);
    const weather = updateWeatherImage(description);
    
    res.render('index.ejs',{content: content.name, country: country, weather:weather,feels: feels, description: description, humidity: humidity, temp: temp});
    }
    catch(error){
        res.render('index.ejs',{content: JSON.stringify(error.response), country: null, weather: null, feels:null, description: null,humidity: null, temp: null});
    }
})


// weather image handler funtion
function updateWeatherImage(weatherDescription) {
    let imageName;
    
    switch(weatherDescription.toLowerCase()) {
        case 'clear sky':
            imageName = 'clearsky.svg';
            break;
        case 'few clouds':
            imageName = 'fewcloudy.svg';
            break;
        case 'scattered clouds':
            imageName = 'scatteredclouds.svg';
            break;
        case 'broken clouds':
            imageName = 'brokenclouds.svg';
            break;
        case 'shower rain':
            imageName = 'showerrain.svg';
            break;
        case 'rain':
            imageName = 'rain.svg';
            break;
        case 'thunderstorm':
            imageName = 'thunderstorm.svg';
            break;
        case 'snow':
            imageName = 'snow.svg';
            break;
        case 'mist':
            imageName = 'mist.svg';
            break;
        
        default:
            imageName = 'default.svg'; // a default image when the weather description is not recognized
    }

    return imageName;
}




app.listen(port, ()=>{
    console.log("App is listening from Port: "+port);
})
