import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  saveInfo = async () => {
    this.setState({ loading: true });
    const { history } = this.props;
    const { userName } = this.state;
    await createUser({ name: userName });
    history.push('/search');
  }

  render() {
    const { userName, loading } = this.state;
    const minLength = 3;
    if (loading) return <Loading />;
    return (
      <div className="loginContainer">
        <div data-testid="page-login" className="loginBox">
          <div className="loginForm">
            <input
              type="text"
              data-testid="login-name-input"
              className="loginInput"
              placeholder="nome"
              onChange={ (e) => {
                this.setState({ userName: e.target.value });
              } }
            />
            <button
              type="button"
              className="loginInput"
              disabled={ minLength > userName.length }
              onClick={ this.saveInfo }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]), // https://stackoverflow.com/questions/47551211/reactjs-validating-proptypes <-- me ajudou a validar o history
}.isRequired;

export default Login;
