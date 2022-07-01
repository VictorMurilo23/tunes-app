import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      nomeUsuario: '',
    };
  }

  componentDidMount() {
    this.pegaNomeUsuario();
  }

  pegaNomeUsuario = async () => {
    this.setState({ carregando: true });
    const informacoesUsuario = await getUser();
    this.setState({ nomeUsuario: informacoesUsuario.name, carregando: false });
  }

  render() {
    const { carregando, nomeUsuario } = this.state;
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
          {nomeUsuario}
        </p>
      </header>
    );
  }
}

export default Header;
