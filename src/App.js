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
  console.log(props.count)
  if(props.count === 1) {
    return (
      <div>
        <h1>{props.name.common}</h1>
        <div>capital {props.capital[0]}</div>
        <div>population {props.population}</div>
        <h2>languages</h2>
        {props.languages.map(language => {
          <ul>{language}</ul>
        })}
        {props.flag}
      </div>
    )
  } else if (props.count <= 10) {
    return (
      <div>
        {props.name.common}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      {countries.filter(country => country.name.common.toUpperCase()
      .includes(newFilter.toUpperCase()))
      .map(country => 
      <Countries key={country.area} name={country.name}/>)}
    </div>
  )
}

export default App;
