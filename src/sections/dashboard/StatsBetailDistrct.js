import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets


import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { TendanceComponent } from './Tendance';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import StatDistrictDelivery from './BetailDistrictTable';



// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const StatApproDistricRegion = ({ type }) => {


  const { status, result } = useSelector((state) => state.dashboard.supply);
  const { regionTab } = useSelector((state) => state.location.region);


  const [region, setRegion] = useState(regionTab[5])
  const [data, setData] = useState([])


  useEffect(() => {

    let regionData = []

    if (result?.appro_distric){
      const tmp = result.appro_distric.find((obj) => obj.region_approvisionement == region.name)
      if (tmp) regionData = tmp
    }
    setData(regionData)

  }, [region])


  return (

    <Grid item xs={5} md={6}>
      <Grid container alignItems="center" justifyContent="space-between">

        <Typography variant="h5"><FormattedMessage id='statistics-supply' /> {type?.name} / {type?.name_english} </Typography>
        <Grid item>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Grid item>
          <Grid container>
            <TendanceComponent percentage={data ? data.tendance_regionale : 0} total={data ? data.effectif_embarque : 0} type={type} />
            <Grid item xs={12} sm={6}>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={{ xs: 'center', sm: 'flex-end' }}
                sx={{ mt: 3, mr: 2 }}
              >
                <Typography>
                  <FormattedMessage id='provenance' /> : 
                </Typography>
                <Select size="small" value={region} onChange={(e) => setRegion(e.target.value)}>
                  {regionTab?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}

                </Select>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ pt: 1 }}>
          {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
          {status === REQUEST_STATUS.succeed && result && <StatDistrictDelivery type={type} data={data.ville_destination} />}
          {status === REQUEST_STATUS.succeed && result == undefined &&
            <>
              <Typography style={{ textAlign: 'center' }} variant="h6">
                <FormattedMessage id='no-data' />
              </Typography>
            </>
          }

          {status === REQUEST_STATUS.error && <EmptyUserCard title={<FormattedMessage id='error-network' />} />}

        </Box>
      </MainCard>
    </Grid>

  );
};

export default StatApproDistricRegion;

