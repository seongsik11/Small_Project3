import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const WEATHER_API_KEY = "2bee39b50204646ade284a30dd02f6c9";
const cityName = 'Seoul';


function Weather() {
    const [weather, setWeather] = useState("");
    const [icon, setIcon] = useState("");
    const [temp, setTemp] = useState("");

    const weatherInfo = async () => {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`)
            .then((res) => {
                    setWeather(res.data)
                    console.log(res.data)
                    setIcon(res.data.weather[0].icon)
                    setTemp(res.data.main[0].temp)
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
            {weather.name}
            {weather && weather.weather.map((i, key) => {
                return (
                    <div key={key}>
                        {i.main}
                        <img src={imgSrc}/>
                    </div>
                )
            })}
        </WeatherText>
    );
}

const WeatherText = styled.div`
    position: absolute;
    padding:5px 5px;
    top: -32em;
    left: 20px;
    width:125px;
    height:120px;
    line-height: 50px;
    font-size: 25px;
    font-weight:bold;
    color: white;
    
    background: lightgray;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default Weather;