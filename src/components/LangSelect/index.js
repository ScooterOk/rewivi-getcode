import { useState } from "react";
import { Menu, Dropdown } from "antd";

import "./style.scss";

const LangSekect = () => {
  const [buttonActive, setBbuttonActive] = useState(false);

  const onClick = () => {
    setBbuttonActive(false);
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={onClick}></Menu.Item>
      <Menu.Item key='ru' onClick={onClick}>
        Ru
      </Menu.Item>
      <Menu.Item key='ua' onClick={onClick}>
        Ua
      </Menu.Item>
    </Menu>
  );

  const onVisibleChange = (e) => {
    setBbuttonActive(e);
  };

  return (
    <Dropdown
      overlay={menu}
      overlayClassName='lang-select-overlay'
      trigger={["click"]}
      onVisibleChange={onVisibleChange}
      onSw
    >
      <button className={`lang-select ${buttonActive ? "active" : ""}`}>
        En {buttonActive}
      </button>
    </Dropdown>
  );
};

export default LangSekect;
