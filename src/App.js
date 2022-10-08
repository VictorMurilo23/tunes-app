import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/album/:id"
          render={ (props) => (
            <>
              <Header />
              <Album { ...props } />
            </>) }
        />
        <Route
          path="/profile/edit"
          render={ (props) => (
            <>
              <Header />
              <ProfileEdit { ...props } />
            </>) }
        />
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route path="/favorites">
          <Header />
          <Favorites />
        </Route>
        <Route path="/search">
          <Header />
          <Search />
        </Route>
        <Route path="/" component={ Login } exact />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
