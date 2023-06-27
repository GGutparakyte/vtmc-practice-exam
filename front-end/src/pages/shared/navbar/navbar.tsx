import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ButtonSmall from 'pages/shared/buttonSmall/buttonSmall';

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
`;

const Navigation = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-left: 10px;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    font-size: 16px;
  }
`;

const LanguageButtons = styled.div`
  display: flex;

  .btn-lang {
    margin-left: 10px;
  }
`;

const Navbar: FC = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState<string>('en');
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <NavbarWrapper>
      <Navigation>
        <li><a href="/home">{t('navbar.home')}</a></li>
        <li><a href="/services">{t('navbar.masters')}</a></li>
        <li><a href="/login">{t('navbar.login')}</a></li>
      </Navigation>
      <LanguageButtons>
        <ButtonSmall className="btn btn-lang" value={lang} onClick={() => changeLanguage('lt')} text="LT" />
        <ButtonSmall className="btn btn-lang" value={lang} onClick={() => changeLanguage('en')} text="EN" />
        <ButtonSmall className="btn btn-lang" value={lang} onClick={() => changeLanguage('ru')} text="RU" />
      </LanguageButtons>
    </NavbarWrapper>
  );
};

export default Navbar;
