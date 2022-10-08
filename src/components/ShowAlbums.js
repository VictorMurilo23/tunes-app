import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShowAlbums extends React.Component {
  render() {
    const { artistName, collectionName, albumImage, collectionId } = this.props;
    return (
      <>
        <div className="albumImageContainer">
          <img
            className="albumImage"
            src={ albumImage }
            alt={ `${collectionName} de ${artistName}` }
          />
        </div>
        <div className="albumInfo">
          <p className="searchCollectionName">{collectionName}</p>
          <p className="searchArtistName">{artistName}</p>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Ir para o Album
          </Link>
        </div>
      </>
    );
  }
}

ShowAlbums.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  albumImage: PropTypes.string,
  collectionId: PropTypes.number,
}.isRequired;

export default ShowAlbums;
