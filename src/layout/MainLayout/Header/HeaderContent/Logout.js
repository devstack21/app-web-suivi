import { useNavigate } from 'react-router';

// material-ui
import { Box, Tooltip } from '@mui/material';

import IconButton from 'components/@extended/IconButton';

import useAuth from 'hooks/useAuth';

// assets
import { LogoutOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';



// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };




  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      
        <Tooltip title={<FormattedMessage id='logout' />}>
          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Tooltip>
    </Box>
  );
};

export default Profile;
