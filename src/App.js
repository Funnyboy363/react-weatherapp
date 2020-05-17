import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import 'weather-icons/css/weather-icons.css';
import Form from './app_component/form.component';

// call api api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key= "f907ce5ae501a0b277cb1d9b01e02e96";

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      farenheit: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false

    };
  
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmoshere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }


  get_WeatherIcon(icons, rangeId) {
    switch(true){
    case rangeId >= 200 && rangeId <= 232:
    this.setState({icon:this.weatherIcon.Thunderstorm});
    break;
      case rangeId >= 300 && rangeId <= 321:
      this.setState({icon:this.weatherIcon.Drizzle});
      break;
      case rangeId >= 500 && rangeId <= 531:
      this.setState({icon:this.weatherIcon.Rain});
      break;
      case rangeId >= 600 && rangeId <= 622:
      this.setState({icon:this.weatherIcon.Snow});
      break;
      case rangeId >= 701 && rangeId <= 781:
      this.setState({icon:this.weatherIcon.Atmoshere});
      break;
      case rangeId === 800:
      this.setState({icon:this.weatherIcon.Clear});
      break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
        default: this.setState({icon:this.weatherIcon.Clouds});
    }
  }


  calCelsius(temp){
    let cell =  Math.floor(temp - 273.15);   
    // 273.15
    return cell;
  }

  calFarenheit(ftemp){
    let fell =  Math.floor(ftemp - 459.67);   
    // 273.15
    return fell;
  }



  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

  if(city && country)    {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

    const response = await api_call.json();

    console.log(response);
    this.setState({
      city : `${response.name}, ${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      farenheit: this.calFarenheit(response.main.ftemp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      ftemp_max: this.calFarenheit(response.main.temp_max),
      ftemp_min: this.calFarenheit(response.main.temp_min),
      description: response.weather[0].description, 
      error: false
    });
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
  } else {
    this.setState({error : true});
  }
  };


  render() {
    return(
      <div className="App">
<Form loadweather={this.getWeather} error={this.state.error} />
    <Weather 
    city={this.state.city} 
    country={this.state.country} 
    temp_celsius={this.state.celsius}
    ftemp_farenheit={this.state.farenheit}
    temp_max={this.state.temp_max}
    temp_min={this.state.temp_min}
    ftemp_max={this.state.ftemp_max}
    ftemp_min={this.state.ftemp_min}
    description={this.state.description}
    weatherIcon={this.state.icon}
    />
    </div>
    );
  }
}

export default App;
