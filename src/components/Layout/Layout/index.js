import { Layout } from 'antd';
import Aside from '../Aside';
import Header from '../Header';

import './style.scss';

const LayoutBoard = ({ children, className, isLogged }) => {
  return (
    <div className={`app ${className}`}>
      <Aside isLogged={isLogged} />
      <Header isLogged={isLogged} />
      <Layout.Content className="main-content">{children}</Layout.Content>
    </div>
  );
};

export default LayoutBoard;
