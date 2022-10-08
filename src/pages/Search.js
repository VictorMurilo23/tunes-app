import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import SearchResults from '../components/SearchResults';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInputValue: '',
      loading: false,
      search: '',
      albumsArray: [],
    };
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  searchAlbum = async () => {
    this.setState({ loading: true });
    const { searchInputValue } = this.state;
    const albums = await searchAlbumsAPI(searchInputValue);
    this.setState({
      loading: false,
      search: searchInputValue,
      albumsArray: albums,
      searchInputValue: '' });
  }

  render() {
    const {
      searchInputValue, loading, search,
      albumsArray,
    } = this.state;

    const minLength = 2;

    if (loading) {
      return (<Loading />);
    }
    return (
      <div data-testid="page-search" className="pageSearch">
        <div className="searchInputsContainer">
          <input
            value={ searchInputValue }
            onChange={ (e) => {
              this.setState({ searchInputValue: e.target.value });
            } }
            type="text"
            className="inputSearch"
            placeholder="Nome do artista"
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            className="searchBtn"
            disabled={ minLength > searchInputValue.length }
            onClick={ this.searchAlbum }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
        {
          search !== '' && <SearchResults
            musicsArray={ albumsArray }
            searchName={ search }
          />
        }
      </div>
    );
  }
}

export default Search;
