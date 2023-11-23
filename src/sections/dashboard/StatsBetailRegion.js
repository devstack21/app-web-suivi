import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Grid,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import StatFilters from './StatFilter';

// assets


import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { TendanceComponent } from './Tendance';
import ApproBetailRegionChart from './BetailRegionChart';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { getStatApproTypeBetail } from 'store/reducers/dashboard/statApproTypeBetailSlice';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';



// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const StatApproBetailRegion = ({ type, setType, start, end }) => {

  const dispatch = useDispatch()

  const { status, result } = useSelector((state) => state.dashboard.supply);


  useEffect(() => {
    if (type?.id && start && end) {

      dispatch(getStatApproTypeBetail({
        debut: start,
        end: end,
        betail: type.id,
      }));
    } else {
      console.log('Not entering condition');
    }


  }, [type, start, end])


  return (

    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">

        <Typography variant="h5"><FormattedMessage id='statistics-supply' /> {type?.libelle} </Typography>
        <Grid item>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Grid item>
          <Grid container>
            <TendanceComponent percentage={result ? result?.approvisionement?.tendance_generale : 0} total={result ? result?.approvisionement?.total_effectif_embarque : 0} />
            <Grid item xs={12} sm={6}>
              <StatFilters
                type={type}
                setType={setType}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ pt: 1 }}>
          {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
          {status === REQUEST_STATUS.succeed && result && <ApproBetailRegionChart />}
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

export default StatApproBetailRegion;

