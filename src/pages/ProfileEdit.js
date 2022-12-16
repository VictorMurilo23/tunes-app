import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
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

  componentWillUnmount() {
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component <-- me ajudou a resolver o problema de memory leak que estava acontecendo.
    this.setState = () => {};
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.verifyFormInfo();
    });
  }

  updateUserInfo = async () => {
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

  verifyFormInfo = () => {
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
      loading: false });
  }

  render() {
    const { loading,
      nomeUsuario,
      emailUsuario,
      descricaoUsuario,
      fotoUsuario,
      botaoDesativado } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile-edit">
        <h1 className="formEditH1">Edit</h1>
        <form className="editProfileContainer">
          <label htmlFor="nomeUsuario">
            Nome
            <input
              value={ nomeUsuario }
              className="editInput"
              name="nomeUsuario"
              type="text"
              id="nomeUsuario"
              onChange={ this.handleChange }
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="emailUsuario">
            Email
            <input
              className="editInput"
              value={ emailUsuario }
              name="emailUsuario"
              type="text"
              id="emailUsuario"
              onChange={ this.handleChange }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="descricaoUsuario">
            Descrição
            <input
              value={ descricaoUsuario }
              className="editInput"
              name="descricaoUsuario"
              type="text"
              id="descricaoUsuario"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
            />
          </label>
          <label htmlFor="fotoUsuario">
            Foto
            <input
              value={ fotoUsuario }
              className="editInput"
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
            onClick={ this.updateUserInfo }
            className="saveProfileInfoBtn"
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
}.isRequired;

export default ProfileEdit;
