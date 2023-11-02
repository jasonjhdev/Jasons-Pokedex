function Pagination({ perPage, totalPokemon, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemon / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((num) => (
          <li key={num}>
            <a onClick={() => paginate(num)} href='!#'>
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
