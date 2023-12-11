// material-ui
import { Grid, Typography } from '@mui/material';

import { getStatGeneral } from 'store/reducers/dashboard/statTypeBetailSlice';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import StatGeneralPieChart from './StatGeneralPieChart';
import TypeAnimalTable from './StatGeneralTableChart';
import { getVisitorStatGeneral } from 'store/reducers/visitor/statTypeBetailSlice';

const StatGeneralItem = ({ type,  visitor}) => {
  return (
    <Grid container item xs={12} justifyContent="center" alignItems="center" marginBottom={5}>
      <Grid item xs={12} sm={6} md={6}>
        <StatGeneralPieChart type={type}  visitor={visitor} />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TypeAnimalTable type={type}  visitor={visitor}/>
      </Grid>
    </Grid>
  )
}

const StatGeneral = ({ start, end, visitor = false }) => {
  const dispatch = useDispatch();

  const { status, result, error } = useSelector((state) => visitor ? state.visitor.type : state.dashboard.type);


  useEffect(() => {
    if (start && end) {
      if (visitor) {
        dispatch(
          getVisitorStatGeneral({
            debut: start,
            end: end,
          })
        );
      } else {
        dispatch(
          getStatGeneral({
            debut: start,
            end: end,
          })
        );
      }
    } else {
      console.log('Not entering condition');
    }
  }, [start, end]);


  return (
    <Grid container item xs={12}>

      {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
      {status === REQUEST_STATUS.succeed && result.result.transport?.length > 0 && (
        <>
          <StatGeneralItem type="animals" visitor={visitor}/>
          <StatGeneralItem type="transports" visitor={visitor}/>

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
