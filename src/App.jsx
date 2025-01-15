import React, { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);

  useEffect(() => {
    const storedPokemonList = localStorage.getItem('pokemonList');

    if (storedPokemonList) {
      setPokemonList(JSON.parse(storedPokemonList));
      getRandomPokemon(); 
    } else {
      fetchAllPokemon()
        .then(list => {
          setPokemonList(list);
          localStorage.setItem('pokemonList', JSON.stringify(list)); 
          getRandomPokemon(); 
        });
    }
  }, []); 

  const fetchAllPokemon = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => data.results); 
  };

  const getRandomPokemon = () => {
    if (pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = pokemonList[randomIndex];

      fetch(randomPokemon.url)
        .then(response => response.json())
        .then(data => {
          setCurrentPokemon(data);
        })
        .catch(error => {
          console.error('Error fetching random Pokémon data:', error);
        });
    }
  };

  return (
    <div className='container'>
      <div>
        <button className='button' onClick={getRandomPokemon}>RANDOMIZE</button>
      </div>

      <div className="character-info">
        {currentPokemon ? (
          <>
            <div className="image-container">
              <img
                src={currentPokemon.sprites.front_default}
                alt={currentPokemon.name}
              />
            </div>
            <p><strong>{currentPokemon.name.toUpperCase()}</strong></p> 
            <div className="specific-data">
              <p><strong>Type:</strong> {currentPokemon.types.map(type => type.type.name).join(', ')}</p>
              <p><strong>Abilities:</strong> {currentPokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
              <p><strong>Height:</strong> {currentPokemon.height / 10} m</p> 
              <p><strong>Weight:</strong> {currentPokemon.weight / 10} kg</p>  
            </div>
          </>
        ) : (
          <p>CLICK THE BUTTON TO DISPLAY A CHARACTER</p>
        )}
      </div>
    </div>
  );
}





