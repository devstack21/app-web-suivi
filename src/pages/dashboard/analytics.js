import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Grid,
} from '@mui/material';

// project import
import DashbaordAnalytics from 'sections/dashboard/Analytics';
import StatImportBetail from 'sections/dashboard/StatImportBetail';
import StatApproBetailRegion from 'sections/dashboard/StatsBetailRegion';
import StatIndicateurVille from 'sections/dashboard/StatIndicateurVille';
import StatTauxImportation from 'sections/dashboard/StatTauxImportation';
import StatTypeBetail from 'sections/dashboard/StatTypeBetail';


// assets
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getAnalytics } from 'store/reducers/dashboard/analyticsSlice';
import Loader from 'components/Loader';
import { getRegions } from 'store/reducers/location/regionSlice';
import DateSelector from 'components/cards/statistics/DateSelector';
import { formatDateToYYYYMMDD, getEndOfWeek, getStartOfWeek } from 'utils/function';
import { getListBetail } from 'store/reducers/betail/listBetailSlice';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {

  const dispatch = useDispatch()
  const componentRef = useRef(null);

  const [type, setType] = useState({})
  const [start, setStart] = useState(formatDateToYYYYMMDD(getStartOfWeek()))
  const [end, setEnd] = useState(formatDateToYYYYMMDD(getEndOfWeek()))


  const { betailTab } = useSelector((state) => state.betail.list);
  const analyticStatus = useSelector((state) => state.dashboard.analytics.status);
  const statutsRegion = useSelector((state) => state.location.region.status);
  const statusTypeBetail = useSelector((state) => state.betail.list.listStatus);


  useEffect(() => {
    dispatch(getAnalytics({ start: start, end: end }))
    dispatch(getListBetail())
    dispatch(getRegions())
  }, [])

  console.log(betailTab)


  useEffect(() => {
    dispatch(getAnalytics({ start: start, end: end }))
  }, [start,end])


  useEffect(() => {
    setType(betailTab[0])
  }, [statusTypeBetail])

  if (analyticStatus == REQUEST_STATUS.loading ||
    statusTypeBetail == REQUEST_STATUS.loading ||
    statutsRegion == REQUEST_STATUS.loading) {
    return <Loader />
  }


  return (
    <Box id="print" ref={componentRef} paddingX={2}>

      <Grid container rowSpacing={4.5} columnSpacing={3}>


        <DateSelector
          startDate={start}
          setStartDate={setStart}
          endDate={end}
          setEndDate={setEnd}
          componentRef={componentRef}
        />

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        {analyticStatus == REQUEST_STATUS.succeed && <DashbaordAnalytics />}
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        <StatTypeBetail start={start} end={end}/>

        <StatApproBetailRegion type={type} setType={setType} start={start} end={end} />
        <StatImportBetail type={type} start={start} end={end} />


        <StatIndicateurVille start={start} end={end} />
        <StatTauxImportation type={type}/>

      </Grid>
    </Box>
  );
};

export default DashboardAnalytics;
