import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const SingleCountry = (props) => {
  //console.log(props)
  const languages = props.languages
  const langArray = Object.values(languages);
  const languageItems = langArray.map((language) =>
    <li>{language}</li>
  );
  
  console.log(props.weather)

  if(props.filtered.length === 1) {
    return (
      <div>
        <h1>{props.name.common}</h1>
        <div>capital {props.capital}</div>
        <div>population {props.population}</div>
        <h2>languages</h2>
        <ul>{languageItems}</ul>
        <img src={props.flags.png} alt={props.name.common}/>
        <h2>Weather in {props.capital}</h2>
        <div><b>temperature:</b> {props.weather.temperature} celcius</div>
        <img src={props.weather.weather_icons[0]} alt={props.weather.weather_descriptions}/>
        <div><b>wind:</b> {props.weather.wind_speed} mph direction {props.weather.wind_dir}</div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>{props.name.common}</h1>
        <div>capital {props.capital}</div>
        <div>population {props.population}</div>
        <h2>languages</h2>
        <ul>{languageItems}</ul>
        <img src={props.flags.png} alt={props.name.common}/>
      </div>
    )
  }
  
}

const Countries = (props) => {
  const [weather, setWeather] = useState([]);
  const weatherCopy = {...weather}

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`)
    .then(response => {
      setWeather(response.data.current)
    })
  }, [props.capital])

  if(props.filtered.length === 1) {
    return (
      <SingleCountry 
      name={props.name}
      capital={props.capital}
      population={props.population}
      languages={props.languages}
      flags={props.flags}
      filtered={props.filtered}
      weather={weatherCopy}
      />
    )
  } 
  else {
    return (
      <div>
        {props.name.common}
        <button onClick={props.handleShowView}>show</button>
      </div>
    )
    }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [showCountry, setShowCountry] = useState(false);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const handleShowView = () => {
    setShowCountry(!showCountry)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  var filtered = countries.filter(country => country.name.common.toUpperCase().includes(newFilter.toUpperCase()))

  if (filtered.length > 10) {
    return (
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        Too many matches, specify another filter
      </div>
    )
  } else {
    return (
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        {filtered.map(country => 
        <Countries 
        key={country.cca2} 
        name={country.name} 
        population={country.population} 
        capital={country.capital}
        languages={country.languages}
        flags={country.flags} 
        filtered={filtered} 
        filter={newFilter}
        handleShowView={handleShowView} 
        />)}
      </div>
    )
  }
}

export default App;
