import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled, {keyframes} from "styled-components";

const WEATHER_API_KEY = "2bee39b50204646ade284a30dd02f6c9";
const cityName = 'Seoul';


function Weather() {
    const [weather, setWeather] = useState("");
    const [icon, setIcon] = useState("");
    const [main, setMain] = useState("");
    const [temp, setTemp] = useState("");
    const weatherTextRef = useRef(null);

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

    useEffect(() => {
        const weatherText = document.getElementById("weatherText");
        weatherText.style.opacity = 1;
    }, [weather]);


    return (
        <WeatherText>
            <Text id="weatherText" ref={weatherTextRef}>Region: </Text>
            <Span id="weatherText" ref={weatherTextRef}>{weather.name}</Span>
            <Text id="weatherText" ref={weatherTextRef}>Weather: </Text>
            <Span id="weatherText" ref={weatherTextRef}>{main}</Span>
            <Text id="weatherText" ref={weatherTextRef}>Temp: </Text>
            <Span id="weatherText" ref={weatherTextRef}>{Math.round(temp - 273.15)}℃</Span>
        </WeatherText>
    );
}

const WeatherText = styled.div`
    display: flex;
    flex-wrap: wrap;

    margin:0;
    padding:5px 5px;
 
    position: absolute;
    top: -32em;
    right: 20px;

    width: 140px;
    height: 81px;
    line-height: 28px;

    font-size: 15px;
    font-weight: bold;
  
    color: white;
   
    
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    
    @media screen and (max-width: 2000px) {
        top: -28.4em;
    }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Text = styled.div`
    margin:0;
    width: 60px;
    text-align: right;
    font-size: 15px;
    padding: 0 12px;
    opacity: 0;
    animation: ${fadeInLeft} 3s forwards;
    
`;

const Span = styled.span`
    opacity: 0;
    animation: ${fadeInLeft} 3s forwards;
`;

export default Weather;