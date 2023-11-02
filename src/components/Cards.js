import './Cards.css';

function Cards({ pokemon }) {
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
                  <h2>{name}</h2>
                </header>
                <img src={poke.sprites.front_default} alt='Pokemon'></img>
                <h3>{type}</h3>
              </div>
              <div className='back'>
                <header>
                  <h2>{name}</h2>
                </header>
                <img src={poke.sprites.back_default} alt='Pokemon'></img>
                <div>Height: {Math.round(poke.height / 4.41)} ft</div>
                <div>Weight: {Math.floor(poke.weight / 4.41)} lbs</div>
              </div>
            </article>
          </label>
        );
      })}
    </div>
  );
}

export default Cards;
