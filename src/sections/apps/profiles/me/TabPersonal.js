// material-ui
import {
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabPersonal = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (

    <Grid container spacing={3}>

      <Grid item xs={12}>
        <MainCard title="Personal Details">
          <List sx={{ py: 0 }}>
            <ListItem divider={!matchDownMD}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Full Name</Typography>
                    <Typography>Anshan Handgun</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Father Name</Typography>
                    <Typography>Mr. Deepen Handgun</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem divider={!matchDownMD}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Phone</Typography>
                    <Typography>
                      (+1-876) <PatternFormat value={8654239581} displayType="text" type="text" format="#### ### ###" />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Country</Typography>
                    <Typography>New York</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem divider={!matchDownMD}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Email</Typography>
                    <Typography>anshan.dh81@gmail.com</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Zip Code</Typography>
                    <Typography>956 754</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Stack spacing={0.5}>
                <Typography color="secondary">Address</Typography>
                <Typography>Street 110-B Kalians Bag, Dewan, M.P. New York</Typography>
              </Stack>
            </ListItem>
          </List>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Education">
          <List sx={{ py: 0 }}>
            <ListItem divider>
              <Grid container spacing={matchDownMD ? 0.5 : 3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Master Degree (Year)</Typography>
                    <Typography>2014-2017</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Institute</Typography>
                    <Typography>-</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem divider>
              <Grid container spacing={matchDownMD ? 0.5 : 3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Bachelor (Year)</Typography>
                    <Typography>2011-2013</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Institute</Typography>
                    <Typography>Imperial College London</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={matchDownMD ? 0.5 : 3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">School (Year)</Typography>
                    <Typography>2009-2011</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Institute</Typography>
                    <Typography>School of London, England</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default TabPersonal;
