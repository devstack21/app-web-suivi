// material-ui
import {
  Box, List, ListItemAvatar, ListItemButton, Grid,
  ListItemSecondaryAction, ListItemText, Stack, Typography, Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import AcquisitionChart from './analytics/AcquisitionChart';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import {  FileTextOutlined, FlagOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| ANALYTICS - ACQUISITION CHANNELS ||============================== //

function StatTauxImportation({ type }) {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={5} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item />
        <Grid item>
          <Typography variant="h5"><FormattedMessage id='statistics-import' /> {type?.libelle} </Typography>
        </Grid>
      </Grid>
      <MainCard content={false}>
        <Stack>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { pt: 2, pb: 0 } }}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'transparent' }, cursor: 'text' }}>
              <ListItemText
                primary={<Typography variant="subtitle1">Acquisition Channels</Typography>}
                
              />
              <Tooltip title={<FormattedMessage id='taux' />}>

                <Typography variant="h5" color="primary">
                  -128
                </Typography>

              </Tooltip>
            </ListItemButton>
          </List>
          <Box sx={{ pr: 2 }}>
            <AcquisitionChart />
          </Box>

          <List
            component="nav"
            sx={{
              p: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: `${theme.palette.grey[900]}`,
                    bgcolor: `${theme.palette.grey[200]}`
                  }}
                >
                  <FlagOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Top Channels</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    35%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <FileTextOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Top Pages</Typography>} secondary="Today 6:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    - $1430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    35%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <FileTextOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Top Pages</Typography>} secondary="Today 6:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    - $1430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    35%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </Stack>
      </MainCard>
    </Grid>

  );
}

export default StatTauxImportation;
