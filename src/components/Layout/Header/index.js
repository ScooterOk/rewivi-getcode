import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../HeaderSearch';
import LangSelect from '../../LangSelect';
import IconNotifications from '../../../assets/img/icon-notifications.svg';

import './style.scss';

const Header = ({ isLogged }) => {
  if (isLogged) {
    return (
      <header>
        <Search />
        <LangSelect />
        <Link to="" className="header__notifications unread">
          <img src={IconNotifications} alt="" />
        </Link>
      </header>
    );
  }

  return (
    <header>
      <div className="pssearch"></div>
      <div className="psmenu">
        <Link to="">About the project</Link>
        <Link to="">Pricing</Link>
        <Link to="/contact-us/">Contact</Link>
      </div>
    </header>
  );
};

export default Header;
