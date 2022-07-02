import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayDeMusicas: [],
      pegouTudo: false,
    };
  }

  componentDidMount() {
    this.pegaMusicas();
  }

  pegaMusicas = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicas = await getMusics(id);
    this.setState({
      arrayDeMusicas: musicas,
      pegouTudo: true,
    });
  }

  render() {
    const { arrayDeMusicas, pegouTudo } = this.state;
    if (pegouTudo === false) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        {
          pegouTudo
            ? (
              <>
                <h1 data-testid="album-name">{arrayDeMusicas[0].collectionName}</h1>
                <h2 data-testid="artist-name">{arrayDeMusicas[0].artistName}</h2>
              </>)
            : null
        }
        {

          arrayDeMusicas.slice(1).map((musica) => (
            <div key={ musica.trackId }>
              <MusicCard
                previewUrl={ musica.previewUrl }
                trackName={ musica.trackName }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
