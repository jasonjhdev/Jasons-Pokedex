import { useEffect, useState } from 'react';
import Cards from './Cards';
import Pagination from './Pagination';

function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=151');
  const [prevUrl, setPrevUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
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

    fetchPokeData();
  }, [url]);

  const indexOfLastPoke = currentPage * perPage;
  const indexOfFirstPoke = indexOfLastPoke - perPage;
  const currentPokemon = pokemon.slice(indexOfFirstPoke, indexOfLastPoke);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='page-container'>
      <Pagination
        perPage={perPage}
        totalPokemon={pokemon.length}
        paginate={paginate}
      />
      <Cards pokemon={currentPokemon} loading={loading} />
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
