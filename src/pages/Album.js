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
      carregando: false,
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

  colocaLoadingAoSalvarMusica = (e) => {
    this.setState({ carregando: true, [e.target.name]: true });
  }

  tiraLoadingAoTerminarDeSalvarMusica = () => {
    this.setState({ carregando: false });
  }

  render() {
    const { arrayDeMusicas, pegouTudo, carregando } = this.state;
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
          carregando ? <Loading />
            : arrayDeMusicas.slice(1).map((musica) => {
              const { [musica.trackName]: valor } = this.state;
              return (
                <div key={ musica.trackId }>
                  <MusicCard
                    value={ valor }
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
