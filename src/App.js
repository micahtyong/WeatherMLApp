import React from "react";

// Components
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "47dfc9e97cd04b9f27681ca5d86fc375"

// ML 
const brain = require("brain.js");
const network = new brain.NeuralNetwork();

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

    // ML
    outfit: undefined,
    
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
            outfit: undefined,
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
          // outfit: "Dress comfortably",
          // We're gonna have to change this because of how unacceptably ugly this is but we just need a quick solution for now. 
          outfit: Object.keys(network.run({temperature: parseFloat(data.main.temp), humidity: parseFloat(data.main.humidity), wind: parseFloat(data.wind.speed)})).reduce(function(a, b){ return network.run({temperature: parseFloat(data.main.temp), humidity: parseFloat(data.main.humidity), wind: parseFloat(data.wind.speed)})[a] > network.run({temperature: parseFloat(data.main.temp), humidity: parseFloat(data.main.humidity), wind: parseFloat(data.wind.speed)})[b] ? a : b}),
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
        outfit: undefined,
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
                    outfit={this.state.outfit}
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

export default App;