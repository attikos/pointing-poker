import React from "react";
import s from './Footer.module.scss';
import { AiOutlineGithub } from "react-icons/ai"

const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.footerContainer}>
                <div className={s.footerGithub}>
                    <a className={s.link} href="https://github.com/AnnaKoliada"><AiOutlineGithub /></a>
                    <a className={s.link} href="https://github.com/attikos"><AiOutlineGithub /></a>
                    <a className={s.link} href="a"><AiOutlineGithub /></a>
                </div>
                <div className={s.year}>2021 ©</div>
                <div className={s.footerLogo}>
                    <a href="https://rs.school/react/"><img className={s.footerLogoSvg} src='./assets/rs_school_js.svg' alt="RS" /></a>
                </div>
            </div>
        </footer>
    )
}
export default Footer
