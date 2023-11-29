// material-ui
import { Grid } from '@mui/material';

// project import
import StatGeneralPieChart from './StatGeneralPieChart';

// assets
import { getStatGeneral } from 'store/reducers/dashboard/statTypeBetailSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const StatGenralChart = ({ start, end }) => {
  const dispatch = useDispatch();

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
      
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        
        <StatGeneralPieChart type={"animals"}/>
        <StatGeneralPieChart type={"transports"}/>

      </Grid>

  );
};

export default StatGenralChart;
