import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import s from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainContainer from './pages/Main/MainContainer';
import PlayGame from './pages/PlayGame/PlayGame';

function App(props: { history: History<> }) {
  // const {allData} = props.state;
  // const {status} = allData?.game || {};

  return (
    <div className={s.wrapper}>
      <Header />

      {/* { status
        ? <PlayGame />
        : <MainContainer history={props.history} />
      } */}
      <Switch>
        <Route exact path="/" render={() => <MainContainer history={props.history} />} />

        <Route exact path="/:gameNiceId" render={() => <PlayGame />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
