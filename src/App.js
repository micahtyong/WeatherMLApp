import React from "react";

// Components
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "47dfc9e97cd04b9f27681ca5d86fc375"

class App extends React.Component {
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
    console.log(data);
    // Parse JSON into usable values
  }

  // Render
  render() {
    return (
      // Everything lives inside this div
      // The goal is to create all of our components separately and then place them inside of this main App page
      <div> 
        <Titles></Titles>
        <Form getWeather={this.getWeather} />
        <Weather />
      </div>
    );
  }
}

export default App;