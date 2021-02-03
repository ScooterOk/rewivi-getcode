import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { IconLibrary, IconSettings, IconCandidates, IconClients, IconPostings, IconReplies } from '../../icons/';

import MainLogo from '../../../assets/img/logo-white.svg';
import ProfilePhoto from '../../../assets/img/profile-photo.png';

import './style.scss';
import { useEffect, useState } from 'react';

const { SubMenu, Item } = Menu;

export default function Aside({ isLogged }) {
  let location = useLocation();
  const [currentMenu, setCurrentMenu] = useState('');

  useEffect(() => {
    switch (true) {
      case location.pathname.includes('job-list') || location.pathname.includes('create-job-posting'):
        setCurrentMenu('postings');
        break;
      default:
        setCurrentMenu('');
        break;
    }
  }, [location]);
  if (isLogged) {
    return (
      <aside className="nav-left">
        <div className="nav__logo">
          <Link to="/">
            <img src={MainLogo} alt="" />
          </Link>
        </div>
        <div className="nav__scroll">
          <Menu mode="inline" selectedKeys={[currentMenu]}>
            <Item key="postings" icon={<IconPostings />}>
              <Link to="/job-list/">Job postings</Link>
            </Item>
            <Item key="replies" icon={<IconReplies />}>
              <Link to="">Replies</Link>
            </Item>
            <Item key="candidates" icon={<IconCandidates />}>
              <Link to="">Candidates</Link>
            </Item>
            <Item key="clients" icon={<IconClients />}>
              <Link to="">Clients</Link>
            </Item>
            <SubMenu key="library" title="Library" icon={<IconLibrary />}>
              <Item key="library-questions">
                <Link to="">Questions</Link>
              </Item>
              <Item key="library-replies">
                <Link to="">Replies</Link>
              </Item>
            </SubMenu>
            <Item icon={<IconSettings />}>
              <Link to="">Settings</Link>
            </Item>
          </Menu>
          <div className="nav__profile">
            <img src={ProfilePhoto} alt="" />
            <Link to="">Maria Dotsenko</Link>
          </div>
          <Menu mode="inline" className="nav__footer" defaultSelectedKeys={['']}>
            <Item key="help">
              <Link to="">Help</Link>
            </Item>
            <Item key="about">
              <Link to="">About Rewivi</Link>
            </Item>
          </Menu>
        </div>
      </aside>
    );
  }

  return (
    <aside className="nav-left ligth">
      <div className="nav__logo">
        <Link to="/">
          <img src={MainLogo} alt="" />
        </Link>
      </div>
      <ul className="nav__psmenu">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="nav__scroll">
        <div className="nav__psprofile">
          <i></i>
          <span></span>
        </div>
      </div>
    </aside>
  );
}
