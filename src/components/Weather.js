import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const WEATHER_API_KEY = "2bee39b50204646ade284a30dd02f6c9";
const cityName = 'Seoul';


function Weather() {
    const [weather, setWeather] = useState("");
    const [icon, setIcon] = useState("");
    const [main, setMain] = useState("");
    const [temp, setTemp] = useState("");

    const weatherInfo = async () => {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`)
            .then((res) => {
                    setWeather(res.data)
                    console.log(res.data)
                    setIcon(res.data.weather[0].icon)
                    setMain(res.data.weather[0].main)
                    setTemp(res.data.main.temp)
                }
            ).catch((err) => {
                if (err.response.status === 401) {
                    console.log(err);
                }
            });
    }



    let imgSrc = "https://openweathermap.org/img/w/" + icon + ".png";

    useEffect(() => {
            weatherInfo()
    }, [])

    return (
        <WeatherText>
            <Text>Region: </Text> {weather.name}
            {/*<div style={{height:"50px", lineHeight:"50px"}}>*/}
            {/*   <img src={imgSrc}/>*/}
            {/*</div>*/}
            <Text>Weather: </Text> {main}
            <Text>temp: </Text> {Math.round(temp - 273.15)}℃
        </WeatherText>
    );
}

const WeatherText = styled.div`
    display: flex;
    flex-direction: wrap;
    flex-wrap: wrap;
 
    margin: 10px;
    padding:5px 5px;
 
    position: absolute;
    top: -32em;
    right: 20px;
    
    width: 200px;
    height: 81px;
    
    font-size: 22px;
    font-weight: bold;
  
    color: white;
   
    
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    
    @media screen and (max-width: 2000px) {
        margin:0;
        width: 140px;
        font-size: 15px;
        line-height: 28px;
        
        top: -28.4em;
    }
`;

const Text = styled.div`
    width: 90px;
    text-align: right;
    padding: 0 12px;
    
     @media screen and (max-width: 2000px) {
        margin:0;
        width: 60px;
        font-size: 15px
    }
`;

export default Weather;