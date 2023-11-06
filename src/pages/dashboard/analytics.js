import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import IncomeChart from 'sections/dashboard/analytics/minepia/IncomeChart'

import PageViews from 'sections/dashboard/analytics/PageViews';
import ReportChart from 'sections/dashboard/analytics/ReportChart';
import SalesChart from 'sections/dashboard/analytics/minepia/SalesChart';
import TransactionHistory from 'sections/dashboard/analytics/TransactionHistory';

// assets
import { DownloadOutlined, CaretDownOutlined } from '@ant-design/icons';


import { useSelector, useDispatch } from 'react-redux';
import { listeTypeBetail_req } from 'store/reducers/minepia/listeTypeBetailReducer';
import { statTypeBetail_req } from 'store/reducers/dashboard/statTypeBetailReducer';
import { API_URL } from 'utils/apiConfig';
import { BASE_URL } from 'config';
import moment from 'moment';
import axios from 'utils/axios';
import { listeRegion_req } from 'store/reducers/dashboard/listRegionReducer';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { listeHaut_req } from 'store/reducers/dashboard/listDashboardReducer';
import { statCheckpoint_req } from 'store/reducers/dashboard/statCheckpointReducer';

// sales report status
const status = [
  {
    value: 'week',
    label: 'This week'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  // {
  //   value: 'year',
  //   label: 'This Year'
  // }
];

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = useState('week');
  const [slot, setSlot] = useState('week');
  const [id_type_betail, setIdTypeAnimal] = useState(1);
  const [dataStatTypeBetail, setDataStatTypeBetail] = useState([]);
  const [dataStatTypeBetailRegion, setDataStatTypeBetailRegion] = useState({});
  


  // const { loading:loadT, error:errT, ListTendanceVille } = useSelector((state) => state.tendanceVille);
  const { loading:loadTB, error:errTB, ListTypeBetail } = useSelector((state) => state.listeTypeBetail);
  const { loading:loadST, statTypeBetailList, error:errST } = useSelector((state) => state.statTypeBetail);
  const { loading:loadR, ListRegion, error:errR } = useSelector((state) => state.listeRegion);
  const { loading:loadH, ListHaut, error:errH } = useSelector((state) => state.listeHaut);
  const { loading:loadSC, ListStatChpt, error:errSC } = useSelector((state) => state.statCheckpoint);

  const [nameRegion, setnameRegion] = useState("Centre");
  
  const lastWeek = moment().subtract(1, 'weeks');
  const [dateDebut1, setDateDebut1] = useState(lastWeek.startOf('week').format("DD-MM-YYYY"));
  const [dateFin2, setDateFin2] = useState(lastWeek.endOf('week').format("DD-MM-YYYY"));

  const [lastObjectStatChpt, setLastObjectStatChpt] = useState();



  const handleTypeBetail = (e) => {
    setIdTypeAnimal(e.target.value);
    fetchData();
 
  };

  const handleChange = (event, newAlignment) => {
    setSlot(newAlignment);
    fetchData(newAlignment);
    
  };


  const handleRegion = (e) => {
    // console.log("ddddd", e.target.value)
    setnameRegion(e.target.value);
    setDataStatTypeBetailRegion(dataStatTypeBetail.find(item => item.name === e.target.value));
    // setDataStatTypeBetailRegion(dataStatTypeBetailRegion.find(item => item.name === e.target.value));
  };



  const fetchData = async (periode) => {
    
    try {
      // const config = {
      //   headers: {
      //     'Authorization ': 'Token ' + getToken(),
      //     'Content-Type': 'application/json'
      //   }
      // };

      const now = moment();
      const last = (periode == 'week') ?  moment().subtract(1, 'weeks') : moment().subtract(1, 'months');
      const heure_debut1 = (periode == 'week') ? last.startOf('week').format("YYYY-MM-DD HH:mm:ss") : last.startOf('month').format("YYYY-MM-DD HH:mm:ss");
      setDateDebut1(moment(heure_debut1).format("DD-MM-YYYY"))
      const heure_fin1 = (periode == 'week') ? last.endOf('week').format("YYYY-MM-DD HH:mm:ss") :last.endOf('month').format("YYYY-MM-DD HH:mm:ss");
      const heure_debut2 = (periode == 'week') ? now.startOf('week').format("YYYY-MM-DD HH:mm:ss") :now.startOf('month').format("YYYY-MM-DD HH:mm:ss");
      const heure_fin2 = (periode == 'week') ? now.endOf('week').format("YYYY-MM-DD HH:mm:ss") :now.endOf('month').format("YYYY-MM-DD HH:mm:ss");
      setDateFin2(moment(heure_fin2).format("DD-MM-YYYY"))

      const urlSuite = `?heure_debut1=${heure_debut1}&heure_fin1=${heure_fin1}&heure_debut2=${heure_debut2}&heure_fin2=${heure_fin2}&id_type_betail=${id_type_betail}`;
      const URL = BASE_URL + API_URL.statTypeBetail + urlSuite;
      const response = await axios.get(URL, { withCredentials: true });
      if(response.data[0].success == 1){
        // const res = getResult(response.data)
        // setDataStatTypeBetail(response.data[0].results);
        setDataStatTypeBetailRegion(response.data[0].results.find(item => item.name === nameRegion));
      }else {
        console.error('Erreur :', response.data[0].errors[0].error_msg);
      }
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };


  
  const handleChangeperiodeComparaison = async (event) => {
    setValue(event)
    try {
      // const config = {
      //   headers: {
      //     'Authorization ': 'Token ' + getToken(),
      //     'Content-Type': 'application/json'
      //   }
      // };

      const now = moment();
      const last = (event == 'week') ?  moment().subtract(1, 'weeks') : moment().subtract(1, 'months');
      const heure_debut1 = (event == 'week') ? last.startOf('week').format("YYYY-MM-DD HH:mm:ss") : last.startOf('month').format("YYYY-MM-DD HH:mm:ss");
      
      const heure_fin1 = (event == 'week') ? last.endOf('week').format("YYYY-MM-DD HH:mm:ss") :last.endOf('month').format("YYYY-MM-DD HH:mm:ss");
      const heure_debut2 = (event == 'week') ? now.startOf('week').format("YYYY-MM-DD HH:mm:ss") :now.startOf('month').format("YYYY-MM-DD HH:mm:ss");
      const heure_fin2 = (event == 'week') ? now.endOf('week').format("YYYY-MM-DD HH:mm:ss") :now.endOf('month').format("YYYY-MM-DD HH:mm:ss");
    
      const urlSuite = `?heure_debut1=${heure_debut1}&heure_fin1=${heure_fin1}&heure_debut2=${heure_debut2}&heure_fin2=${heure_fin2}`;
      const URL = BASE_URL + API_URL.statTypeBetail + urlSuite;
      const response = await axios.get(URL, { withCredentials: true });
      
      if(response.data[0].success == 1){
        // const res = getResult(response.data)
        setDataStatTypeBetail(response.data[0].results);
      }else {
        console.error('Erreur :', response.data[0].errors[0].error_msg);
      }
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };



useEffect(() => {
      // dispatch(listTendanceVille_req());
      dispatch(listeTypeBetail_req());
      dispatch(statTypeBetail_req());
      dispatch(listeRegion_req());
      dispatch(listeHaut_req());
      dispatch(statCheckpoint_req())

      if(statTypeBetailList.length != 0) {
        setDataStatTypeBetail(statTypeBetailList);
        setDataStatTypeBetailRegion(statTypeBetailList.find(item => item.name === nameRegion));
      }

      if(ListStatChpt.length != 0){
        setLastObjectStatChpt(ListStatChpt[ListStatChpt.length - 1]);
      }
      

  }, []);




  // console.log("ville des villes", loadT, errT, ListTendanceVille)
  console.log("ListTypeBetail", loadTB, errTB, ListTypeBetail)
  console.log("statTypeBetailList", loadST, errST, statTypeBetailList)
  // console.log("dataStatTypeBetail", dataStatTypeBetail, statTypeBetailList.length)
  console.log("obStatForRegion", dataStatTypeBetailRegion, dataStatTypeBetail)
  console.log("ListRegion", ListRegion, loadR, errR)
  console.log("ListRegion", ListHaut, loadH, errH)
  console.log("stat checkpoint", ListStatChpt, loadSC, errSC)



  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        {/* row 1 */}
       
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Camion" count={lastObjectStatChpt? lastObjectStatChpt['total_generale']['descomptes_camions']: 0} percentage="." extra={lastObjectStatChpt? lastObjectStatChpt['total_generale']['descomptes_wagons']-lastObjectStatChpt['total_generale']['descomptes_camions']: 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Train" count={lastObjectStatChpt? lastObjectStatChpt['total_generale']['descomptes_wagons']: 0} percentage="." color="success" extra={lastObjectStatChpt? lastObjectStatChpt['total_generale']['descomptes_camions']-lastObjectStatChpt['total_generale']['descomptes_wagons']: 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total notification" count={ListHaut.nbrNotif} percentage="." isLoss color="warning" extra={ListHaut.nbrNotif} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Rapport" count={ListHaut.nbrRap} percentage="." isLoss color="error" extra={ListHaut.nbrRap} />
        </Grid>


        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />


        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Grid item>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Stack sx={{ ml: 2, mt: 3 }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                    <Stack direction="row" alignItems="center">
                      <CaretDownOutlined style={{ color: theme.palette.error.main, paddingRight: '4px' }} />
                      <Typography color={theme.palette.error.main}>({((dataStatTypeBetailRegion.eff_emb2 -dataStatTypeBetailRegion.eff_emb1)/dataStatTypeBetailRegion.eff_emb1)*100} %) </Typography>
                    </Stack>
                    <Typography color="textSecondary" sx={{ display: 'block' }}>
                      Compare to : {dateDebut1} / {dateFin2}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent={{ xs: 'center', sm: 'flex-end' }}
                    sx={{ mt: 3, mr: 2 }}
                  >
                    <Select value={nameRegion} onChange={handleRegion} size="small">
                      {ListRegion.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>

                    <ToggleButtonGroup exclusive onChange={handleChange} size="small" value={slot}>
                      <ToggleButton disabled={slot === 'week'} value="week" sx={{ px: 2, py: 0.5 }}>
                        Week
                      </ToggleButton>
                      <ToggleButton disabled={slot === 'month'} value="month" sx={{ px: 2, py: 0.5 }}>
                        Month
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {/* <Select value={id_type_betail} onChange={handleTypeBetail} size="small">
                      <MenuItem value="By volume">By Volume</MenuItem>
                      <MenuItem value="By margin">By Margin</MenuItem>
                      <MenuItem value="By sales">By Sales</MenuItem>
                    </Select> */}
                    <Select value={id_type_betail} onChange={handleTypeBetail} size="small">
                      {ListTypeBetail.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                          {item.libelle}
                        </MenuItem>
                      ))}
                    </Select>
                    <IconButton
                      size="small"
                      sx={{
                        border: `1px solid ${theme.palette.grey[400]}`,
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                    >
                      <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ pt: 1 }}>
              <IncomeChart slot={slot} quantity={id_type_betail} dataRegion={dataStatTypeBetailRegion} />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <PageViews />
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
                onChange={(e) =>handleChangeperiodeComparaison(e.target.value)}
                sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <SalesChart dataRegion={dataStatTypeBetail} />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <TransactionHistory />
        </Grid>

        
      </Grid>
    </>
  );
};

export default DashboardAnalytics;
