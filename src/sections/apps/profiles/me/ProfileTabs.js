import PropTypes from 'prop-types';

// material-ui
import { FormLabel, Grid, Stack, Typography } from '@mui/material';

// project import
import ProfileTab from './ProfileTab';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
         
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatarImage(`./default.png`)} sx={{ width: 124, height: 124, border: '1px dashed' }} />
             
                
            </FormLabel>
            
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">Stebin Ben</Typography>
              <Typography color="secondary">Full Stack Developer</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  focusInput: PropTypes.func
};

export default ProfileTabs;
