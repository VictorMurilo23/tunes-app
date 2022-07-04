import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      infoUsuario: {},
    };
  }

  componentDidMount() {
    this.pegaNomeUsuario();
  }

  componentDidUpdate() {
    this.pegaNomeUsuario();
  }

  componentWillUnmount() {
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component <-- me ajudou a resolver o problema de memory leak que estava acontecendo.
    this.setState = () => {};
  }

  pegaNomeUsuario = async () => {
    const informacoesUsuario = await getUser();
    this.setState({ infoUsuario: informacoesUsuario, carregando: false });
  }

  render() {
    const { carregando, infoUsuario } = this.state;
    if (carregando) {
      return (<Loading />);
    }
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Buscar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <p data-testid="header-user-name">
          Olá,
          {' '}
          <span>{infoUsuario.name}</span>
        </p>
      </header>
    );
  }
}

export default Header;
