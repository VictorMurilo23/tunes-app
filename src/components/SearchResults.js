import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShowAlbums from './ShowAlbums';

export default class SearchResults extends Component {
  render() {
    const { musicsArray, searchName } = this.props;
    if (musicsArray.length === 0) {
      return (
        <p>
          Nenhum álbum foi encontrado
        </p>);
    }
    return (
      <div className="albumResultsContainer">
        <h1>
          Resultados do artista:
          {' '}
          {searchName}
        </h1>
        <div className="albumCardsContainer">
          {
            musicsArray.map((musica) => {
              const { collectionId,
                artistName,
                collectionName,
                artworkUrl100 } = musica;
              return (
                <div key={ collectionId } className="albumCard">
                  <ShowAlbums
                    artistName={ artistName }
                    collectionName={ collectionName }
                    albumImage={ artworkUrl100 }
                    collectionId={ collectionId }
                  />
                </div>);
            })
          }
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  musicsArray: PropTypes.array,
  searchName: PropTypes.any,
}.isRequired;
