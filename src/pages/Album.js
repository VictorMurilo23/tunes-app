import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayDeMusicas: [],
      pegouTudo: false,
      carregando: false,
      musicasFavoritas: [],
    };
  }

  componentDidMount() {
    this.pegaMusicas();
    this.pegaFavoritos();
  }

  componentDidUpdate() {
    this.pegaFavoritos();
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

  pegaFavoritos = async () => {
    const favoritas = await getFavoriteSongs();
    this.setState({ musicasFavoritas: favoritas });
  }

  colocaLoadingAoSalvarMusica = (e) => {
    this.setState({ carregando: true, [e.target.name]: e.target.checked });
  }

  tiraLoadingAoTerminarDeSalvarMusica = () => {
    this.setState({ carregando: false });
  }

  render() {
    const { arrayDeMusicas, pegouTudo, carregando, musicasFavoritas } = this.state;
    if (pegouTudo === false || carregando) {
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
          arrayDeMusicas.slice(1).map((musica) => {
            const verificaSeTem = musicasFavoritas
              .some((nome) => nome.trackName === musica.trackName);
            const { [musica.trackName]: valor } = this.state;
            return (
              <div key={ musica.trackId }>
                <MusicCard
                  value={ verificaSeTem ? true : valor }
                  colocaLoading={ this.colocaLoadingAoSalvarMusica }
                  tiraLoading={ this.tiraLoadingAoTerminarDeSalvarMusica }
                  objetoInteiro={ musica }
                  previewUrl={ musica.previewUrl }
                  trackName={ musica.trackName }
                  trackId={ musica.trackId }
                />
              </div>);
          })
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
