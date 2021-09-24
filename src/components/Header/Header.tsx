import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

const Header = (): JSX.Element => {
  return (
    <header className={s.header}>
      <div className={s.logo}><Link to="/"><img className={s.logoImg} src="../assets/logo.png" alt="logo" /></Link></div>
      <div className={s.headerTop} />
      <div className={s.headerBottom} />
    </header>
  );
};


export default Header;
