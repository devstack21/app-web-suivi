
// material-ui
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';


import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

const StatItem = ({ item, type, total}) => (
  <ListItemButton divider>
    <ListItemText
      primary={<Typography variant="subtitle1">  {item.name}</Typography>}
      secondary={
        
            <Typography color="textSecondary" sx={{ display: 'inline' }}>
             {Math.round((item.effectif / total) * 100)}% <FormattedMessage id='current-effectif' />
            </Typography>
      }
    />
    <Stack alignItems="flex-end">
      <Typography variant="h5" color="primary">
        {item.effectif} {type?.unit}
      </Typography>
    </Stack>
  </ListItemButton>
)


const StatDistrictDelivery = ({ type, data }) => {


  const {  result } = useSelector((state) => state.dashboard.supply);

  const appro = result?.approvisionement?.total_effectif_embarque ?? 0

  return (

    <Grid item xs={12} md={12} style={{ marginTop: 20 }}>
      {
        data?.length > 0 ?
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            {data?.map((item, index) => (
              <StatItem key={index} item={item} type={type} total={appro} />
            ))}

          </List>

          :
          <>
            <Typography style={{ textAlign: 'center' }} variant="h6">
              <FormattedMessage id={'no-data'} />
            </Typography>
          </>
      }
    </Grid>
  );
};

export default StatDistrictDelivery;

