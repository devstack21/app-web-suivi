import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

// project import
import Logo from 'components/logo';

import { FormattedMessage } from 'react-intl';
import Localization from 'layout/MainLayout/Header/HeaderContent/Localization';
import useConfig from 'hooks/useConfig';
import Profile from 'layout/MainLayout/Header/HeaderContent/Logout';

// ==============================|| COMPONENTS - APP BAR ||============================== //

// elevation scroll
function ElevationScroll({  children }) {

 

  return React.cloneElement(children, {
    sx: {
      backgroundColor: 'darkColor' , // Set your dark color here
      color: 'text.primary',
      boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
    },
  });
}

const Header = ({ layout = 'landing', ...others }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { i18n } = useConfig();


  const localization = React.useMemo(() => <Localization />, [i18n]);



  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar sx={{ bgcolor: 'black', color: theme.palette.text.primary, boxShadow: 'none' }}>
        <Container disableGutters={matchDownMd}>
          <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 2 }}>
            <Stack
              direction="row"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }} marginRight={2}>
                <Logo reverse to="/" />
              </Typography>
              <Typography variant='h2' sx={{ color: "black", fontWeight: 'bold' }}><FormattedMessage id='title' /></Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                size="small"
                color="warning"
                sx={{ mt: 0.5, height: 28 }}
              >
                <FormattedMessage id='dashboard' />
              </Button>

              {!downLG && localization}
              {!downLG && <Profile />}
            </Stack>

          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

Header.propTypes = {
  handleDrawerOpen: PropTypes.func,
  layout: PropTypes.string
};

export default Header;
