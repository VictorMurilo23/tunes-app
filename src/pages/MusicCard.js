import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  salvarMusica = async (e) => {
    const { colocaLoading, tiraLoading, objetoInteiro } = this.props;
    colocaLoading(e);
    if (e.target.checked !== true) {
      await removeSong(objetoInteiro);
    } else {
      await addSong(objetoInteiro);
    }
    tiraLoading();
  }

  render() {
    const { previewUrl, trackName, trackId, value } = this.props;
    return (
      <>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackName }>
          <input
            id={ trackName }
            checked={ value }
            name={ trackName }
            type="checkbox"
            onChange={ this.salvarMusica }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  objetoInteiro: PropTypes.oneOfType([PropTypes.object]),
  colocaLoading: PropTypes.func,
  tiraLoading: PropTypes.func,
  value: PropTypes.bool,
};

MusicCard.defaultProps = {
  previewUrl: 'Url da música',
  trackName: 'Nome da música',
  trackId: 123,
  objetoInteiro: {},
  colocaLoading: null,
  tiraLoading: null,
  value: false,
};

export default MusicCard;
