import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Grid,
  List,
  ListItem,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets

// ==============================|| CUSTOMER - VIEW ||============================== //

const UserView = ({ data }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` }, overflow: 'hidden' }}>
      <TableCell colSpan={8} sx={{ p: 2.5, overflow: 'hidden' }}>
        <Transitions type="slide" direction="down" in={true}>
          <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
            
            <Grid item xs={12} sm={7} md={8} lg={8} xl={9}>
              <Stack spacing={2.5}>
                <MainCard title="Personal Details">
                  <List sx={{ py: 0 }}>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Full Name</Typography>
                            <Typography>{data.username}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Country</Typography>
                            <Typography>{data.role}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Zip Code</Typography>
                            <Typography>
                            <PatternFormat displayType="text" format="+237 # ## ## ## ##" mask="_" defaultValue={data.phone} />
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Address</Typography>
                        <Typography>{data.address}</Typography>
                      </Stack>
                    </ListItem>
                  </List>
                </MainCard>
                <MainCard title="About me">
                  <Typography color="secondary">
                    Hello, I’m {data.username} {data.role} based in international company
                  </Typography>
                </MainCard>
              </Stack>
            </Grid>
          </Grid>
        </Transitions>
      </TableCell>
    </TableRow>
  );
};

UserView.propTypes = {
  data: PropTypes.object
};

export default UserView;
