import React from "react";

// Components
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "47dfc9e97cd04b9f27681ca5d86fc375"

class App extends React.Component {
  // Initialize states

  // These will be our features for our outfit-recommender algorithm
  state = {
    // INFORMATION
    city: undefined,
    country: undefined,

    // FEATURES
    temperature: undefined,
    wind: undefined, // speed of wind
    humidity: undefined,
    description: undefined,
    
    // MISC.
    error: undefined
  }

  // Methods
  getWeather = async (e) => {
    e.preventDefault();
    // Extract constants
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    // Call from API
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    // Convert to JSON format
    const data = await api_call.json();
    if (city && country) { // Checks that user has inputted values
      // Check if values are in right format
      if (data.cod === 404) {
        this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "Input doesn't match any known location!"
        }); 
      } else {
        // Parse JSON into usable values
        this.setState({
          city: data.name,
          country: data.sys.country,

          temperature: data.main.temp,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      }
    } else {
      this.setState({
        city: undefined,
        country: undefined,

        temperature: undefined,
        wind: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city and country."
      });
    }
  }

  // Render
  render() {
    return (
      // Everything lives inside this div
      // The goal is to create all of our components separately and then place them inside of this main App page
      <div> 
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    city={this.state.city}
                    country={this.state.country}

                    temperature={this.state.temperature} 
                    wind={this.state.wind} 
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ML 
const brain = require("brain.js");
const network = new brain.NeuralNetwork();

// Simple Demo

// 0 (go_eskimo) = temp is cold, it's windy, wear a lot of layers like an Eskimo.
// 1 (go_moderate_eskimo) = temp is moderately cold, it may be a bit windy, wear something that will keep you very warm.
// 2 (go_comfort) = temp is moderate in general. this will be our "midpoint". dress comfortably in pants and maybe a sweater for the morning. 
// 3 (go_moderate_nude) = temp is a bit warmer. maybe some wind, maybe not. a bit humid. i would just stick to a shirt and pants. 
// 4 (go_nude) = super hot, it might be windy, probably really humid. definitely wear as little as possibly without getting thrown in jail for public nudity

// Training with Data

// Some notes
// We need to do mean normalization and a hell of a lot more data. We also should test which features to keep and which to trade or discard. 

network.train([
  {input: {temperature: 18.31, humidity: 64, wind: 3}, output: {go_moderate_nude: 1}},
  {input: {temperature: 7, humidity: 81, wind: 3}, output: {go_eskimo: 1}},
  {input: {temperature: 17.2, humidity: 48, wind: 7.2}, output: {go_comfort: 1}},
  {input: {temperature: 26.52, humidity: 100, wind: 5.7}, output: {go_nude: 1}},
  {input: {temperature: 9.64, humidity: 58, wind: 6.2}, output: {go_moderate_eskimo: 1}},
  {input: {temperature: 17.48, humidity: 36, wind: 2}, output: {go_comfort: 1}},
  {input: {temperature: 18.31, humidity: 64, wind: 4.6}, output: {go_comfort: 1}},
  {input: {temperature: 17.61, humidity: 77, wind: 3.6}, output: {go_comfort: 1}},
  {input: {temperature: 21.18, humidity: 72, wind: 3.1}, output: {go_moderate_nude: 1}},
  {input: {temperature: 27.67, humidity: 74, wind: 2.6}, output: {go_nude: 1}},
  {input: {temperature: 9.28, humidity: 70, wind: 1}, output: {go_moderate_eskimo: 1}},
  {input: {temperature: 13.75, humidity: 66, wind: 4.1}, output: {go_moderate_eskimo: 1}},
  {input: {temperature: 6.83, humidity: 93, wind: 5.7}, output: {go_eskimo: 1}},
]);

// Test: if I'm in Miami, Florida right now, what should I wear? 

const result = network.run({temperature: 29.43, humidity: 66, wind: 3.6});

console.log(result);

export default App;