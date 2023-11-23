// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import TypeBetailPieChart from './StatTypeBetailPieChart';
import TypeAnimalTable from './StatTypeBetailTableChart';

// assets
import { getStatTypeBetail } from 'store/reducers/dashboard/statTypeBetailSlice';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';

const StatTypeBetail = ({ start, end }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.dashboard.type);

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
      <Grid container alignItems="center" justifyContent="space-between">

        <Typography variant="h5"><FormattedMessage id='statistics-animals' /></Typography>
        <Grid item>
        </Grid>
      </Grid>
      {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
      {status === REQUEST_STATUS.succeed && (
        <Grid container item xs={12} justifyContent="center" alignItems="center">
          <TypeBetailPieChart />
          <TypeAnimalTable />
        </Grid>
      )}
      {status === REQUEST_STATUS.error && <EmptyUserCard title="error-network" />}

    </Grid>
  );
};

export default StatTypeBetail;
