import React from 'react';
import RecentTickets from './widgets/RecentTickets';
import { listeCamion_req } from 'store/reducers/minepia/itineraire/listeDesCamionsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';
import { Grid, Dialog, Pagination } from '@mui/material';
import ItineraireCamion from './itineraireCamions';

import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';
import { PAGE_ROWS } from 'config';
import moment from 'moment';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';




const ListeCamion = () => {
    const dispatch = useDispatch();

    const { loading:load, ListCamion, error:err, nbPages } = useSelector((state) => state.listeCamion);

    const [add, setAdd] = useState(false)
    const [itineraireList, setItineraireList] = useState([])
    const [matriculeCamion, setMatriculeCamion] = useState('')
    const [currentPage, setCurrentPage] = useState(1);

    const lastWeek = moment().subtract(1, 'weeks');
    const [startDate, setStartDate] = useState(lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss"));
    const [endDate, setEndDate] = useState(lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss"));

    const handleAdd = (event, id_supply) => {
        setAdd(!add);
        if (event != '') fetchData(event, id_supply)
    };


    const onCancel = () => {
      setAdd(!add);
  };

    useEffect(() => {
      dispatch(listeCamion_req({ page: currentPage, nbre_ligne: PAGE_ROWS, startDate:startDate, endDate:endDate}));
  
    }, [currentPage]);

    const handleChangePage = (event, newPage) => {setCurrentPage(newPage);};

    const fetchData = async (matricule, id_supply) => {
    
        try {
          setMatriculeCamion(matricule, id_supply)
          const URL = BASE_URL + API_URL.itineraireCamion + `?matricule=${matricule}&id_supply=${id_supply}`;
          const response = await axios.get(URL, { withCredentials: true });
          if(response.data[0].success == 1){
            setItineraireList(response.data[0].results);
          }else {
            console.error('Erreur :', response.data[0].errors[0].error_msg);
          }
          
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      };



      const handleSubmit = async (startDate, endDate) => {
        setCurrentPage(1);
        dispatch(listeCamion_req({ page: currentPage, nbre_ligne: PAGE_ROWS, startDate:startDate, endDate:endDate}));
        
      }


      if (load) {
        return (
          <EmptyUserCard title={err} />
        )
      }


  return (
    <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentTickets ListeCamion={ListCamion.lenght != 0 ? ListCamion : []} handleAdd={handleAdd} handleSubmit={handleSubmit} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </Grid>
        </Grid>

        
        <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
          <Pagination
            count={nbPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            variant="combined"
          />
        </Grid>
      {/* </Grid> */}

        <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={onCancel}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
        >
          {itineraireList.length !=0 ? <ItineraireCamion itineraireList={itineraireList} onCancel={onCancel} startDate={startDate} endDate={endDate} matriculeCamion={matriculeCamion} /> :null}  

        </Dialog>
    </>
  );
};

export default ListeCamion;