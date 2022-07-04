import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      nomeUsuario: '',
      emailUsuario: '',
      descricaoUsuario: '',
      fotoUsuario: '',
      botaoDesativado: true,
    };
  }

  async componentDidMount() {
    await this.pegaInformacoesDoUsuario();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.verificarInformacoes();
    });
  }

  atualizarInformacoes = async () => {
    const {
      nomeUsuario,
      emailUsuario,
      fotoUsuario,
      descricaoUsuario,
    } = this.state;
    const { history } = this.props;
    const infoUsuario = {
      name: nomeUsuario,
      email: emailUsuario,
      image: fotoUsuario,
      description: descricaoUsuario,
    };
    await updateUser(infoUsuario);
    history.push('/profile');
  }

  verificarInformacoes = () => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // Achei aqui => https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const { nomeUsuario, emailUsuario, descricaoUsuario, fotoUsuario } = this.state;
    if (nomeUsuario.length > 0
      && emailUsuario.match(regex)
      && descricaoUsuario.length > 0
      && fotoUsuario.length > 0) {
      this.setState({ botaoDesativado: false });
    } else {
      this.setState({ botaoDesativado: true });
    }
  }

  pegaInformacoesDoUsuario = async () => {
    const objetoInformacoes = await getUser();
    this.setState({
      nomeUsuario: objetoInformacoes.name,
      emailUsuario: objetoInformacoes.email,
      descricaoUsuario: objetoInformacoes.description,
      fotoUsuario: objetoInformacoes.image,
      carregando: false });
  }

  render() {
    const { carregando,
      nomeUsuario,
      emailUsuario,
      descricaoUsuario,
      fotoUsuario,
      botaoDesativado } = this.state;
    if (carregando) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile-edit">
        <h1>Edit</h1>
        <form>
          <label htmlFor="nomeUsuario">
            Nome:
            <input
              value={ nomeUsuario }
              name="nomeUsuario"
              type="text"
              id="nomeUsuario"
              onChange={ this.handleChange }
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="emailUsuario">
            Email:
            <input
              value={ emailUsuario }
              name="emailUsuario"
              type="text"
              id="emailUsuario"
              onChange={ this.handleChange }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="descricaoUsuario">
            Descrição:
            <input
              value={ descricaoUsuario }
              name="descricaoUsuario"
              type="text"
              id="descricaoUsuario"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
            />
          </label>
          <label htmlFor="fotoUsuario">
            Foto:
            <input
              value={ fotoUsuario }
              name="fotoUsuario"
              type="text"
              id="fotoUsuario"
              onChange={ this.handleChange }
              placeholder="Insira um link"
              data-testid="edit-input-image"
            />
          </label>
          <button
            type="button"
            disabled={ botaoDesativado }
            onClick={ this.atualizarInformacoes }
            data-testid="edit-button-save"
          >
            Editar perfil
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]), // https://stackoverflow.com/questions/47551211/reactjs-validating-proptypes <-- me ajudou a validar o history
};

ProfileEdit.defaultProps = {
  history: {},
};

export default ProfileEdit;
