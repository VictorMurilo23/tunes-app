import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ExibirMusicas extends React.Component {
  render() {
    const { nomeArtista, musica, imagemAlbum, collectionId } = this.props;
    return (
      <>
        <h1>{musica}</h1>
        <h2>{nomeArtista}</h2>
        <img src={ imagemAlbum } alt={ `${musica} de ${nomeArtista}` } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Album
        </Link>
      </>
    );
  }
}

ExibirMusicas.propTypes = {
  nomeArtista: PropTypes.string,
  musica: PropTypes.string,
  imagemAlbum: PropTypes.string,
  collectionId: PropTypes.number,
};

ExibirMusicas.defaultProps = {
  nomeArtista: 'Artista',
  musica: 'Musica',
  imagemAlbum: 'Foto',
  collectionId: 123,
};

export default ExibirMusicas;
