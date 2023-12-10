import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Grid,
} from '@mui/material';

// project import
import StatImportBetail from 'sections/dashboard/StatImportBetail';
import StatApproBetailRegion from 'sections/dashboard/StatsBetailRegion';
import StatIndicateurVille from 'sections/dashboard/StatIndicateurVille';
import StatGeneral from 'sections/dashboard/StatGeneral';
import StatApproDistricRegion from 'sections/dashboard/StatsBetailDistrct';
import StatSupplyCity from 'sections/dashboard/StatSupplyCity';


// assets
import { REQUEST_STATUS } from 'utils/apiConfig';
import Loader from 'components/Loader';
import { getRegions } from 'store/reducers/location/regionSlice';
import DateSelector from 'components/cards/statistics/DateSelector';
import { formatDateToYYYYMMDD, getEndOfWeek, getStartOfWeek } from 'utils/function';
import { getListBetail } from 'store/reducers/betail/listBetailSlice';
import { getListVille } from 'store/reducers/location/villeSlice';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {

  const dispatch = useDispatch()
  const componentRef = useRef(null);

  const [type, setType] = useState({})
  const [start, setStart] = useState(formatDateToYYYYMMDD(getStartOfWeek()))
  const [end, setEnd] = useState(formatDateToYYYYMMDD(getEndOfWeek()))


  const { betailTab } = useSelector((state) => state.betail.list);
  const statutsRegion = useSelector((state) => state.location.region.status);
  const statutsVilles = useSelector((state) => state.location.villes.status);
  const statusTypeBetail = useSelector((state) => state.betail.list.listStatus);


  useEffect(() => {
    dispatch(getListBetail())
    dispatch(getRegions())
    dispatch(getListVille())
  }, [])



  useEffect(() => {
    if (statusTypeBetail == REQUEST_STATUS.succeed) setType(betailTab[0])
  }, [statusTypeBetail])

  if (
    statusTypeBetail == REQUEST_STATUS.loading ||
    statutsRegion == REQUEST_STATUS.loading || statutsVilles == REQUEST_STATUS.loading) {
    return <Loader />
  }


  return (
    <Box id="print" ref={componentRef} paddingX={2} bgcolor={"marron"}>

      <Grid container rowSpacing={4.5} columnSpacing={3}>
        <DateSelector
          startDate={start}
          setStartDate={setStart}
          endDate={end}
          setEndDate={setEnd}
          componentRef={componentRef}
        />

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        <StatSupplyCity type={type} isLocal={false} />
        <StatGeneral start={start} end={end} />
        <StatIndicateurVille start={start} end={end} />
        <StatApproBetailRegion type={type} setType={setType} start={start} end={end} />
        <StatApproDistricRegion type={type} setType={setType} start={start} end={end} />
        <StatImportBetail type={type} isLocal={true} />
        <StatImportBetail type={type} isLocal={false} />
      </Grid>
    </Box>
  );
};

export default DashboardAnalytics;
