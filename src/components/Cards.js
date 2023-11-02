import './Cards.css';

function Cards({ pokemon, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card-container'>
      {pokemon.map((poke) => {
        const name = poke.name[0].toUpperCase() + poke.name.slice(1);
        const type =
          poke.types[0].type.name[0].toUpperCase() +
          poke.types[0].type.name.slice(1);
        return (
          <label key={poke.id}>
            <input type='checkbox' />
            <article>
              <div className='front'>
                <header>
                  <div className='text-name'>{name}</div>
                </header>
                <img src={poke.sprites.front_default} alt='Pokemon'></img>
                <div className='text-info'>#{poke.id}</div>
                <div className='text-info'>{type}</div>
              </div>
              <div className='back'>
                <header>
                  <div className='text-name'>{name}</div>
                </header>
                <img src={poke.sprites.back_default} alt='Pokemon'></img>
                <div className='text-info'>
                  Height: {Math.round(poke.height / 4.41)} ft
                </div>
                <div className='text-info'>
                  Weight: {Math.floor(poke.weight / 4.41)} lbs
                </div>
              </div>
            </article>
          </label>
        );
      })}
    </div>
  );
}

export default Cards;
