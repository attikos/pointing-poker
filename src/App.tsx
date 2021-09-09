import React from 'react';
import { Route, Switch } from "react-router-dom";
import s from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainContainer from './pages/Main/MainContainer';


function App() {
  return (
    <div className={s.wrapper}>
      <Header />
      <Switch>
      <Route exact path="/" render={() => <MainContainer />} />
      {/* <Route exact path="/lobby-master" render={() => <LobbyForMaster />} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
