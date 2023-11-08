
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


import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getApproTypeBetail } from 'store/reducers/dashboard/statApproTypeBetailSlice';
import { formatDateToYYYYMMDD } from 'utils/function';
import { TendanceComponent } from './Tendance';
import ApproBetailRegionChart from './BetailRegionChart';
import {SpinnLoader} from 'components/cards/SpinnLoader';



// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const StatApproBetailRegion = () => {

  const dispatch = useDispatch()

  const { status, result } = useSelector((state) => state.dashbaord.supply);
  const { typeBetail } = useSelector((state) => state.betail.type);

  
  const [type, setType] = useState(typeBetail[0])
  const [period, setPeriod] = useState('week')
  const [start, setStart] = useState()


  useEffect(() => {
    if (type?.id  && start) {
    
      dispatch(getApproTypeBetail({
        debut: formatDateToYYYYMMDD(start),
        end: formatDateToYYYYMMDD(new Date()),
        betail: type.id,
      }));
    } else {
      console.log('Not entering condition');
    }


  }, [type, start])

  useEffect(() => {
    if (period === 'week') {
      const now = new Date();
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      setStart(startOfWeek);
    } else if (period === 'month') {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      setStart(startOfMonth);
    }
  }, [period]);



  return (

    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
        </Grid>
        <Typography variant="h5"><FormattedMessage id='statistics-supply' /> {type?.libelle} </Typography>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Grid item>
          <Grid container>
            { result &&  <TendanceComponent percentage={result?.tendance_generale} total={result?.total_effectif_embarque} /> }
            <Grid item xs={12} sm={6}>
              <StatFilters
                type={type}
                setType={setType}
                period={period}
                setPeriod={setPeriod}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ pt: 1 }}>
          {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
          {status === REQUEST_STATUS.succeed && <ApproBetailRegionChart period={period} />}
        </Box>
      </MainCard>
    </Grid>

  );
};

export default StatApproBetailRegion;

