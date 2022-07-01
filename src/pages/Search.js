import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import ExibirMusicas from './ExibirMusicas';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valorInput: '',
      carregando: false,
      buscaFeita: '',
      arrayDeMusicas: [],
    };
  }

  pesquisar = async (e) => {
    this.setState({ carregando: true });
    e.preventDefault();
    const { valorInput } = this.state;
    const albumMusicas = await searchAlbumsAPI(valorInput);
    this.setState({
      carregando: false,
      buscaFeita: valorInput,
      arrayDeMusicas: albumMusicas,
      valorInput: '' });
  }

  resultadosPesquisa = () => {
    const { buscaFeita, arrayDeMusicas } = this.state;
    if (arrayDeMusicas.length === 0) {
      return (
        <p>
          Nenhum álbum foi encontrado
        </p>);
    }
    return (
      <main>
        <p>
          Resultado de álbuns de:
          {' '}
          {buscaFeita}
        </p>
        {arrayDeMusicas.map((musica) => {
          const { collectionId,
            artistName,
            collectionName,
            artworkUrl100 } = musica;
          return (
            <div key={ collectionId }>
              <ExibirMusicas
                nomeArtista={ artistName }
                musica={ collectionName }
                imagemAlbum={ artworkUrl100 }
                collectionId={ collectionId }
              />
            </div>);
        })}
      </main>
    );
  }

  render() {
    const {
      valorInput, carregando, buscaFeita,
    } = this.state;

    const lengthMinimo = 2;

    if (carregando) {
      return (<Loading />);
    }
    return (
      <div data-testid="page-search">
        <form>
          <input
            value={ valorInput }
            onChange={ (e) => {
              this.setState({ valorInput: e.target.value });
            } }
            type="text"
            placeholder="Nome do artista"
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ lengthMinimo > valorInput.length }
            onClick={ this.pesquisar }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        {
          buscaFeita !== '' ? this.resultadosPesquisa() : null
        }
      </div>
    );
  }
}

export default Search;
