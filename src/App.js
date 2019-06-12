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
      if (data.cod == 404) {
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

export default App;