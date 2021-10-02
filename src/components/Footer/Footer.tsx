import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import s from './Footer.module.scss';
import rs from '../../assets/rs_school_js.svg';

const Footer = (): JSX.Element => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContainer}>
        <div className={s.footerGithub}>
        <a className={s.link} href='https://github.com/attikos'>
            <AiOutlineGithub /> attikos
          </a>
          <a className={s.link} href='https://github.com/KsenNeko'>
            <AiOutlineGithub /> KsenNeko
          </a>
          <a className={s.link} href='https://github.com/AnnaKoliada'>
            <AiOutlineGithub /> AnnaKoliada
          </a>
         
          
        </div>
        <div className={s.year}>2021 ©</div>
        <div className={s.footerLogo}>
          <a href='https://rs.school/react/'>
            <img
              className={s.footerLogoSvg}
              src={rs}
              alt='RS'
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
