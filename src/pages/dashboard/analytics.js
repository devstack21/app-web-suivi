import { useEffect, useState } from 'react';

// material-ui
import {
  Grid,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import DashbaordAnalytics from 'sections/dashboard/Analytics';
import StatImportBetail from 'sections/dashboard/StatImportBetail';
import StatApproBetailRegion from 'sections/dashboard/StatsBetailRegion';

// assets

import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getAnalytics } from 'store/reducers/dashboard/analyticsSlice';
import Loader from 'components/Loader';
import { getListTypeBetail } from 'store/reducers/Betail/listeTypeBetailSlice';
import { getRegions } from 'store/reducers/Location/regionSlice';
import OrdersList from 'sections/dashboard/analytics/minepia/OrdersList';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {

  const dispatch = useDispatch()
  const [type, setType] = useState({})
  const [start, setStart] = useState()
  

  const { typeBetail } = useSelector((state) => state.betail.type);
  const analyticStatus = useSelector((state) => state.dashboard.analytics.status);
  const statutsRegion = useSelector((state) => state.location.region.status);
  const statusTypeBetail = useSelector((state) => state.betail.type.status);


  useEffect(() => {
    dispatch(getAnalytics())
    dispatch(getListTypeBetail())
    dispatch(getRegions())
  }, [])


  
  useEffect(() => {
    setType(typeBetail[0])
  },[statusTypeBetail])

  if (analyticStatus == REQUEST_STATUS.loading ||
    statusTypeBetail == REQUEST_STATUS.loading ||
    statutsRegion == REQUEST_STATUS.loading) {
    return <Loader />
  }


  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        {/* row 1 */}

        {analyticStatus == REQUEST_STATUS.succeed && <DashbaordAnalytics />}



        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <StatApproBetailRegion type={type} setType={setType} start={start} setStart={setStart} />
        <StatImportBetail type={type} start={start} />




        {/* row 3 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Tendance des alertes par ville</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersList ListTendanceVille={[]} />
          </MainCard>
        </Grid>
        



      </Grid>
    </>
  );
};

export default DashboardAnalytics;
