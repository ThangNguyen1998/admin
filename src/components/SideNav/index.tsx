import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import classNames from 'classnames';
import {
  HomeOutlined,
  TableOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './styles.module.scss';
import useToggleSideNav from '../../hooks/useToggleSideNav';

const { SubMenu } = Menu;

export default function SideNav() {
  const collapsed = useToggleSideNav();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('1');

  const routes = [
    {
      key: '1',
      text: 'List Accounts',
      url: '/accounts',
      // icon: <HomeOutlined />,
    },
    {
      key: '2',
      text: 'List Song',
      url: '/songs',
      // icon: <TableOutlined />,
    },
  ];

  useEffect(() => {
    routes.forEach((route) => {
      if (location.pathname.startsWith(route.url || '###')) {
        setSelectedKey(route.key);
      }
    });
  }, [location.pathname]);

  return (
    <div
      className={classNames({
        [styles.sideNav]: true,
        [styles.sideNavCollapsed]: collapsed,
      })}
      style={{ width: collapsed ? 80 : 250, transition: 'width 0.3s' }}>
      <Link className={styles.logo} to="/accounts">
        HOME
      </Link>
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[]}
        mode="inline"
        inlineCollapsed={collapsed}>
        {routes.map((route) => {
          return (
            <Menu.Item key={route.key}>
              <Link to={route.url}>{route.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}
