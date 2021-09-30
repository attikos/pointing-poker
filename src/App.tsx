import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import s from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PlayGame from './pages/PlayGame/PlayGame';
import Main from './pages/Main/Main';
import useRestoreSession from './controllers/useRestoreSession';
import useGameRouter from './controllers/useGameRoute';

function App() {
  const [restoreSession] = useRestoreSession();

  useEffect(() => {
    restoreSession();
  }, []);

  useGameRouter();

  return (
    <div className={s.wrapper}>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/:gameNiceId" render={() => <PlayGame />} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default withRouter(App);
