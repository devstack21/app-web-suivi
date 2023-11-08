import { useEffect } from 'react';

// material-ui
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import PageViews from 'sections/dashboard/analytics/PageViews';
import ReportChart from 'sections/dashboard/analytics/ReportChart';
import TransactionHistory from 'sections/dashboard/analytics/TransactionHistory';

// assets

import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS } from 'utils/apiConfig';
import DashbaordAnalytics from 'sections/dashboard/Analytics';
import { getAnalytics } from 'store/reducers/dashboard/analyticsSlice';
import Loader from 'components/Loader';
import StatApproBetailRegion from 'sections/dashboard/StatsBetailRegion';
import { getListTypeBetail } from 'store/reducers/Betail/listeTypeBetailSlice';
import { getRegions } from 'store/reducers/Location/regionSlice';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {

  const dispatch = useDispatch()


  const analyticStatus = useSelector((state) => state.dashbaord.analytics.status);
  const statutsRegion = useSelector((state) => state.location.region.status);
  const statusTypeBetail = useSelector((state) => state.betail.type.status);


  useEffect(() => {
    dispatch(getAnalytics())
    dispatch(getListTypeBetail())
    dispatch(getRegions())
  }, [])


  if (analyticStatus == REQUEST_STATUS.loading ||
    statusTypeBetail == REQUEST_STATUS.loading ||
    statutsRegion == REQUEST_STATUS.loading) {
    return <Loader />
  }




  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        {/* row 1 */}

        <DashbaordAnalytics />



        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />




        <StatApproBetailRegion />
        <Grid item xs={12} md={5} lg={4}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Company Finance Growth" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Company Expenses Ratio" />
                <Typography variant="h5">0.58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Business Risk Cases" />
                <Typography variant="h5">Low</Typography>
              </ListItemButton>
            </List>
            <ReportChart />
          </MainCard>
        </Grid>




        {/* row 3 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Tendance des alertes par ville</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            {/* <OrdersList ListTendanceVille={ListTendanceVille} /> */}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Analytics Report</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Company Finance Growth" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Company Expenses Ratio" />
                <Typography variant="h5">0.58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Business Risk Cases" />
                <Typography variant="h5">Low</Typography>
              </ListItemButton>
            </List>
            <ReportChart />
          </MainCard>
        </Grid>




        {/* row 4 */}

        <Grid item xs={12} md={5} lg={4}>
          <TransactionHistory />
        </Grid>

        <PageViews />

      </Grid>
    </>
  );
};

export default DashboardAnalytics;

/*
 <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Comparaison par region</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                size="small"
                select
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                value={value}
                onChange={(e) => handleChangeperiodeComparaison(e.target.value)}
                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
              >
                {PERIODS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <SalesChart dataRegion={dataStatTypeBetail} />
        </Grid>*/