// material-ui
import { Grid } from '@mui/material';

import { getStatTypeBetail } from 'store/reducers/dashboard/statTypeBetailSlice';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import StatGenralChart from './StatGeneralChart';
import StatGeneralTables from './StatGeneralTable';

const StatGeneral = ({ start, end }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (start && end) {
      dispatch(
        getStatTypeBetail({
          debut: start,
          end: end,
        })
      );
    } else {
      console.log('Not entering condition');
    }
  }, [start, end]);

  return (
    <Grid container item xs={12}>
      
      {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
      {status === REQUEST_STATUS.succeed && (
        <>
          <StatGenralChart />
          <StatGeneralTables />
        </>

      )}
      {status === REQUEST_STATUS.error && <EmptyUserCard title="error-network" />}

    </Grid>
  );
};

export default StatGeneral;
