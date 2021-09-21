import React from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import s from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainContainer from './pages/Main/MainContainer';
import LobbyContainer from './pages/Lobby/LobbyContainer';


function App(props: any ) {
  console.log('App', props)
  return (
    <div className={s.wrapper}>
      <Header />
      <Switch>
      <Route exact path="/" render={() => <MainContainer history={props.history} />} />
    
      <Route exact path="/:game_nice_id" render={() => <LobbyContainer />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
