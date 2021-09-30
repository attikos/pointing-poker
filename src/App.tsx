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
  const [userRole, setUserRole] = useState('');
  const [restoreSession] = useRestoreSession();

  useEffect(() => {
    restoreSession();
  }, []);

  useGameRouter();

  return (
    <div className={s.wrapper}>
      <Header />

      <Switch>
        <Route exact path="/" render={() => <Main setUserRole={setUserRole}/>} />
        <Route exact path="/:gameNiceId" render={() => <PlayGame  userRole={userRole} />} />
      </Switch>

      <Footer />
    </div>
  );
}

export default withRouter(App);
