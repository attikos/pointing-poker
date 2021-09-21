import React from "react";
import s from './Header.module.scss';
import { Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}><Link to='/'><img className={s.logoImg} src="../assets/logo.png" alt='logo' /></Link></div>
            <div className={s.headerTop}></div>
            <div className={s.headerBottom}></div>
        </header>
    )
}
export default Header
