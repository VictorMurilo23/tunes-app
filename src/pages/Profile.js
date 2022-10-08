import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      informacoesUsuario: {},
    };
  }

  componentDidMount() {
    this.pegaInformacoesDoUsuario();
  }

  componentWillUnmount() {
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component <-- me ajudou a resolver o problema de memory leak que estava acontecendo.
    this.setState = () => {};
  }

  pegaInformacoesDoUsuario = async () => {
    const objetoInformacoes = await getUser();
    this.setState({ informacoesUsuario: objetoInformacoes, carregando: false });
  }

  render() {
    const { carregando, informacoesUsuario } = this.state;
    const { image, name, email, description } = informacoesUsuario;

    if (carregando) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile">
        <img src={ image } alt="Foto usuario" data-testid="profile-image" />
        <h2>Nome</h2>
        <p>
          {name}
        </p>
        <h2>email</h2>
        <p>
          {email}
        </p>
        <h2>Descrição</h2>
        <p>
          {description}
        </p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
