import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      fetchAllPokemon();
    }
  }, []);

  const fetchAllPokemon = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const pokemonList = data.results;
        setPokemonList(pokemonList);
        localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
        getRandomPokemon(); // Call getRandomPokemon after storing data
      })
      .catch(error => {
        console.error('Error fetching Pokémon data:', error);
      });
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
    <div>
      <div>
        <button onClick={getRandomPokemon}>RANDOMIZE</button>
      </div>

      <div className="character-info">
        <div className="image-container">
          {currentPokemon && (
            <img
              src={currentPokemon.sprites.front_default}
              alt={currentPokemon.name}
            />
          )}
        </div>
        <p>{currentPokemon?.name}</p>
      </div>
    </div>
  );
}
