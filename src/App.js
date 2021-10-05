import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const Countries = (props) => {
  const languages = props.languages
  const langArray = Object.values(languages);
  const languageItems = langArray.map((language) =>
    <li>{language}</li>
  );
  if(props.filtered.length === 1) {
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
  } else {
    console.log(props)
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
    console.log(showCountry)
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
        handleShowView={handleShowView()} 
        />)}
      </div>
    )
  }
}

export default App;
