import React from "react";
import s from './Header.module.scss';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}><img className={s.logoImg} src="../assets/logo.png" alt='logo' /></div>
            <div className={s.headerTop}></div>
            <div className={s.headerBottom}></div>
        </header>
    )
}
export default Header
