import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import s from './Footer.module.scss';

const Footer = (): JSX.Element => (
  <footer className={s.footer}>
    <div className={s.footerContainer}>
      <div className={s.footerGithub}>
        <a className={s.link} href="https://github.com/AnnaKoliada"><AiOutlineGithub /></a>
        <a className={s.link} href="https://github.com/attikos"><AiOutlineGithub /></a>
        <a className={s.link} href="a"><AiOutlineGithub /></a>
      </div>
      <div className={s.year}>2021 ©</div>
      <div className={s.footerLogo}>
        <a href="https://rs.school/react/"><img className={s.footerLogoSvg} src="./assets/rs_school_js.svg" alt="RS" /></a>
      </div>
    </div>
  </footer>
);
export default Footer;
