import { useEffect, useState } from 'react';
import Cards from './Cards';

function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [prevUrl, setPrevUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');

  const fetchPokeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPrevUrl(data.previous);
      setNextUrl(data.next);
      fetchAllPokemon(data.results);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllPokemon = async (pokeData) => {
    pokeData.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemon((state) => {
        state = [...state, data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    fetchPokeData();
  }, [url]);

  return (
    <div className='page-container'>
      {loading ? <div>Loading...</div> : <Cards pokemon={pokemon} />}
      {prevUrl && (
        <button
          onClick={() => {
            setPokemon([]);
            setUrl(prevUrl);
          }}
        >
          Previous
        </button>
      )}
      {nextUrl && (
        <button
          onClick={() => {
            setPokemon([]);
            setUrl(nextUrl);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default PokemonPage;
