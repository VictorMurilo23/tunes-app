import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valorInput: '',
    };
  }

  render() {
    const { valorInput } = this.state;
    const lengthMinimo = 2;
    return (
      <div data-testid="page-search">
        <form>
          <input
            onChange={ (e) => {
              this.setState({ valorInput: e.target.value });
            } }
            type="text"
            placeholder="Nome da banda ou artista"
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ lengthMinimo > valorInput.length }
            onClick={ (e) => { e.preventDefault(); } }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
