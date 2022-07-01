import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeUsuario: '',
      carregando: false,
    };
  }

  redirecionaESalva = async (e) => {
    e.preventDefault();
    this.setState({ carregando: true });
    const { history } = this.props;
    const { nomeUsuario } = this.state;
    await createUser({ name: nomeUsuario });
    history.push('/search');
  }

  render() {
    const { nomeUsuario, carregando } = this.state;
    const lengthMinimo = 3;
    if (carregando) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="nome"
            onChange={ (e) => {
              this.setState({ nomeUsuario: e.target.value });
            } }
          />
          <button
            type="submit"
            disabled={ lengthMinimo > nomeUsuario.length }
            onClick={ this.redirecionaESalva }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]), // https://stackoverflow.com/questions/47551211/reactjs-validating-proptypes <-- me ajudou a validar o history
};

Login.defaultProps = {
  history: {},
};

export default Login;
