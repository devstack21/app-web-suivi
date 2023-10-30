import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import {  LockOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

import { FormattedMessage } from 'react-intl';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/apps/profiles/user/habilitations':
      selectedTab = 1;
      break;
    case '/apps/profiles/user/password':
      selectedTab = 2;
      break;
    case '/apps/profiles/user/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/apps/profiles/user/personal')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id='personnal-information' />} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(2, '/apps/profiles/user/habilitations')}>
        <ListItemIcon>
          <TeamOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id='habilitations' />} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '/apps/profiles/user/password')}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id='change-password' />} />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
