import React from 'react';
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
    const teste = await getUser();
    this.setState({ nomeUsuario: teste.name, carregando: false });
  }

  render() {
    const { carregando, nomeUsuario } = this.state;
    if (carregando) {
      return (<Loading />);
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{nomeUsuario}</p>
      </header>
    );
  }
}

export default Header;
