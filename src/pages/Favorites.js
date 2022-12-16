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

  // componentWillUnmount() {
  //   // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component <-- me ajudou a resolver o problema de memory leak que estava acontecendo.
  //   this.setState = () => {};
  // }

  putLoading = (e) => {
    const { musicasFavoritas } = this.state;
    const tirarMusicaDoArray = musicasFavoritas
      .filter((element) => element.trackName !== e.target.name);
    this.setState({ carregando: true, musicasFavoritas: tirarMusicaDoArray });
  }

  removeLoading = () => {
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
      <div data-testid="page-favorites" className="musicsPage">
        <h1 className="favoritesH1">Favoritos</h1>
        <div className="albumMusicsContainer">
          {
            musicasFavoritas.map((musica) => (
              <MusicCard
                key={ Number(musica.trackId) }
                value
                putLoading={ this.putLoading }
                removeLoading={ this.removeLoading }
                musicObj={ musica }
                previewUrl={ musica.previewUrl }
                trackName={ musica.trackName }
                trackId={ Number(musica.trackId) }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
