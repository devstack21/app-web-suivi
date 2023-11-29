// material-ui
import { Grid, Typography } from '@mui/material';

import { getStatGeneral } from 'store/reducers/dashboard/statTypeBetailSlice';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StatGenralChart from './StatGeneralChart';
import StatGeneralTables from './StatGeneralTable';
import { FormattedMessage } from 'react-intl';

const StatGeneral = ({ start, end }) => {
  const dispatch = useDispatch();

  const { status , result, error} = useSelector((state) => state.dashboard.type);


  useEffect(() => {
    if (start && end) {
      dispatch(
        getStatGeneral({
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
      {status === REQUEST_STATUS.succeed && result.result.transport?.length > 0 && (
        <>
          <StatGenralChart />
          <StatGeneralTables />
        </>

      )}
      {status === REQUEST_STATUS.error && 

       <>
           <Typography style={{ textAlign: 'center', padding: 10 }} variant="h6">
               <FormattedMessage id={error} />
           </Typography>
       </>
      }

    </Grid>
  );
};

export default StatGeneral;
