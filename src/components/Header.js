import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.saveUserInfo();
  }

  componentDidUpdate() {
    this.saveUserInfo();
  }

  componentWillUnmount() {
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component <-- me ajudou a resolver o problema de memory leak que estava acontecendo.
    this.setState = () => {};
  }

  saveUserInfo = async () => {
    const getUserInfo = await getUser();
    this.setState({ userInfo: getUserInfo, loading: false });
  }

  render() {
    const { loading, userInfo } = this.state;
    if (loading) {
      return (<Loading />);
    }
    return (
      <header data-testid="header-component">
        <div className="headerInfo">
          <div>
            <span>Tunes App</span>
          </div>
          <div className="headerUser">
            <span data-testid="header-user-name">{userInfo.name}</span>
          </div>
        </div>
        <nav className="pagesNav">
          <div className="link">
            <Link to="/search" data-testid="link-to-search">Buscar</Link>
          </div>
          <div className="link">
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          </div>
          <div className="link">
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
