import React from 'react';
import RecentTickets from '../../../sections/apps/itineraire/RecentTickets';
import { listeCamion_req } from 'store/reducers/itineraire/listeDesCamionsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';
import { Grid, Dialog } from '@mui/material';
import ItineraireCamion from './itineraireCamions';

import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';




const ListeCamion = () => {
    const dispatch = useDispatch();
    const { loading:load, ListCamion, error:err } = useSelector((state) => state.listeCamion);

    const [add, setAdd] = useState(false)
    const [itineraireList, setItineraireList] = useState([])

    const handleAdd = (event) => {
        setAdd(!add);
        if (event != '') fetchData(event)
    };


    useEffect(() => {
        dispatch(listeCamion_req());
  
    }, []);

    console.log("liste camions", ListCamion, load, err)


    const fetchData = async (matricule) => {
    
        try {
          // const config = {
          //   headers: {
          //     'Authorization ': 'Token ' + getToken(),
          //     'Content-Type': 'application/json'
          //   }
          // };
    
          const URL = BASE_URL + API_URL.itineraireCamion + `?matricule=${matricule}`;
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


  return (
    <>
        <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
            <RecentTickets ListeCamion={ListCamion.lenght != 0 ? ListCamion : []} handleAdd={handleAdd} />
            </Grid>
        </Grid>

        <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
        >
            <ItineraireCamion itineraireList={itineraireList} onCancel={handleAdd} />

        </Dialog>
    </>
  );
};

export default ListeCamion;