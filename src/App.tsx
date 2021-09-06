import React from 'react';
import logo from './logo.svg';
import s from './App.module.scss';

function App() {
  return (
    <div className={s.app}>
      <header className={s.appHeader}>
        <img src={logo} className={s.appLogo} alt="logo" />

        <h1>Установленная версия Bootstrap: 5.1</h1>
        <h2><a href="https://getbootstrap.com/docs/5.0/layout/grid/" target="_blank" rel="noreferrer">Документация</a></h2>

      </header>
    </div>
  );
}

export default App;
