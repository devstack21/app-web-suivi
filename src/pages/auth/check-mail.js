import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';


// material-ui
import { Box, Button, Grid, Typography } from '@mui/material';

// project import
import useAuth from 'hooks/useAuth';
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'sections/auth/AuthWrapper';

// ================================|| CHECK MAIL ||================================ //

const CheckMail = () => {

  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3"><FormattedMessage id="check-email-pwd" /></Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
              <FormattedMessage id="password-recovered" />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              component={Link}
              to={isLoggedIn ? '/auth/login' : '/login'}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
                <FormattedMessage id="login" />
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default CheckMail;
