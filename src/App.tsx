import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import s from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PlayGame from './pages/PlayGame/PlayGame';
import Main from './pages/Main/Main';

function App() {
  // const {allData} = props.state;
  // const {status} = allData?.game || {};
  const [userRole, setUserRole] = useState('');
  console.log('userRoleApp', userRole);
  return (
    <div className={s.wrapper}>
      <Header />

      {/* { status
        ? <PlayGame />
        : <MainContainer history={props.history} />
      } */}
      <Switch>
        <Route exact path="/" render={() => <Main setUserRole={setUserRole}/>} />
        <Route exact path="/:gameNiceId" render={() => <PlayGame  userRole={userRole} />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
