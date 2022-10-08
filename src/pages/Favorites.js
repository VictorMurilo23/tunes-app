import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      musicasFavoritas: [],
    };
  }

  componentDidMount() {
    this.pegaMusicasFavoritas();
  }

  componentWillUnmount() {
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component <-- me ajudou a resolver o problema de memory leak que estava acontecendo.
    this.setState = () => {};
  }

  colocaLoadingAoSalvarMusica = (e) => {
    const { musicasFavoritas } = this.state;
    const tirarMusicaDoArray = musicasFavoritas
      .filter((element) => element.trackName !== e.target.name);
    this.setState({ carregando: true, musicasFavoritas: tirarMusicaDoArray });
  }

  tiraLoadingAoTerminarDeSalvarMusica = () => {
    this.setState({ carregando: false });
  }

  pegaMusicasFavoritas = async () => {
    this.setState({ carregando: true });
    const arrayFavoritas = await getFavoriteSongs();
    this.setState({ carregando: false, musicasFavoritas: arrayFavoritas });
  }

  render() {
    const { carregando, musicasFavoritas } = this.state;
    if (carregando) {
      return <Loading />;
    }
    return (
      <div data-testid="page-favorites">
        <h1>Favoritos</h1>
        {
          musicasFavoritas.map((musica) => (
            <div key={ Number(musica.trackId) }>
              <MusicCard
                value
                colocaLoading={ this.colocaLoadingAoSalvarMusica }
                tiraLoading={ this.tiraLoadingAoTerminarDeSalvarMusica }
                objetoInteiro={ musica }
                previewUrl={ musica.previewUrl }
                trackName={ musica.trackName }
                trackId={ Number(musica.trackId) }
              />
            </div>))
        }
      </div>
    );
  }
}

export default Favorites;
