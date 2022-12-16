import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  saveMusic = async (e) => {
    const { putLoading, removeLoading, musicObj } = this.props;
    putLoading(e);
    if (e.target.checked !== true) {
      await removeSong(musicObj);
    } else {
      await addSong(musicObj);
    }
    removeLoading();
  }

  render() {
    const { previewUrl, trackName, trackId, value } = this.props;
    return (
      <div className="musicCard">
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
            onChange={ this.saveMusic }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  musicObj: PropTypes.oneOfType([PropTypes.object]),
  putLoading: PropTypes.func,
  removeLoading: PropTypes.func,
  value: PropTypes.bool,
}.isRequired;

export default MusicCard;
