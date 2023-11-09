import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  Grid,
} from '@mui/material';

// project import
import DashbaordAnalytics from 'sections/dashboard/Analytics';
import StatImportBetail from 'sections/dashboard/StatImportBetail';
import StatApproBetailRegion from 'sections/dashboard/StatsBetailRegion';
import StatIndicateurVille from 'sections/dashboard/StatIndicateurVille';

// assets
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getAnalytics } from 'store/reducers/dashboard/analyticsSlice';
import Loader from 'components/Loader';
import { getListTypeBetail } from 'store/reducers/betail/listeTypeBetailSlice';
import { getRegions } from 'store/reducers/location/regionSlice';


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

        {analyticStatus == REQUEST_STATUS.succeed && <DashbaordAnalytics />}
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        <StatApproBetailRegion type={type} setType={setType} start={start} setStart={setStart} />
        <StatImportBetail type={type} start={start} />
        <StatIndicateurVille/>        
        
      </Grid>
    </>
  );
};

export default DashboardAnalytics;
