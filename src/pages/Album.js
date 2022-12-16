import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicsArray: [],
      didItGetAllMusics: false,
      loading: false,
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.getMusics();
    this.getFavorites();
  }

  componentDidUpdate() {
    this.getFavorites();
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  getMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicas = await getMusics(id);
    this.setState({
      musicsArray: musicas,
      didItGetAllMusics: true,
    });
  }

  getFavorites = async () => {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteMusics });
  }

  putLoadingOnSave = (e) => {
    this.setState({ loading: true, [e.target.name]: e.target.checked });
  }

  removeLoading = () => {
    this.setState({ loading: false });
  }

  render() {
    const { musicsArray, didItGetAllMusics, loading, favoriteMusics } = this.state;
    if (didItGetAllMusics === false || loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album" className="musicsPage">
        <h1 className="albumH1">Album</h1>
        {
          didItGetAllMusics
            ? (
              <div className="albumDetailsInfoContainer">
                <img
                  src={ musicsArray[0].artworkUrl100 }
                  alt={ `Imagem do album ${musicsArray[0].collectionName}` }
                />
                <div className="artistAndAlbumNameContainer">
                  <h1 data-testid="album-name">{musicsArray[0].collectionName}</h1>
                  <h2 data-testid="artist-name">{musicsArray[0].artistName}</h2>
                </div>
              </div>)
            : null
        }
        <div className="albumMusicsContainer">
          {
            musicsArray.slice(1).map((musica) => {
              const verifyFavorites = favoriteMusics
                .some((nome) => nome.trackName === musica.trackName);
              return (
                <MusicCard
                  key={ musica.trackId }
                  value={ !!verifyFavorites }
                  putLoading={ this.putLoadingOnSave }
                  removeLoading={ this.removeLoading }
                  musicObj={ musica }
                  previewUrl={ musica.previewUrl }
                  trackName={ musica.trackName }
                  trackId={ musica.trackId }
                />
              );
            })
          }
        </div>
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
