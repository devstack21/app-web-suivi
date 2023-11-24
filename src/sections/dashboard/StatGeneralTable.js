// material-ui
import { Grid } from '@mui/material';

// project import
import TypeAnimalTable from './StatGeneralTableChart';

// assets
import { getStatTypeBetail } from 'store/reducers/dashboard/statTypeBetailSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const StatGeneralTables = ({ start, end }) => {
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
      
        <Grid container item xs={12} spacing={5} justifyContent="center" alignItems="center" style={{marginTop: '8px'}} >
          <TypeAnimalTable type={"animals"} />
          <TypeAnimalTable type={"transport"} />
        </Grid>
     
  );
};

export default StatGeneralTables;
