import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';
import logo from '../../assets/logo.png';


const Header = (): JSX.Element => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <Link to="/">
          <img className={s.logoImg} src={logo} alt="logo" />
        </Link>
      </div>

      <div className={s.headerTop} />

      
    </header>
  );
};


export default Header;
