import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// material-ui
import { Chip, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { listeAlerte_req } from 'store/reducers/minepia/alerte/listeAlerteReducer';
import { PopupTransition } from 'components/@extended/Transitions';
import { Dialog } from '@mui/material';
import EditAlert from './editAlerte';
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
import axios from 'utils/axios';




export default function ListAlerte() {
    const dispatch = useDispatch();
    const [add, setAdd] = useState(false)
    const [alert, setAlerte] = useState({})
    const [listeDesAlertes, setListeDesAlertes] = useState([])
    const { loading:loadA, ListAlerte, error:errA } = useSelector((state) => state.listeAlerte);

    useEffect(() => {
        dispatch(listeAlerte_req());
        setListeDesAlertes(ListAlerte)
  
    }, []);

    const handleEdit = (event) => {
        setAdd(!add);
        if (event != '') 
          setAlerte(event); 
          let list = ListAlerte.map(item => item.pk === event.pk ? event : item);
          setListeDesAlertes(list)
    };


    const handleDelete = async (row) => {
      console.log("mon row", row)
      const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?');
      if (confirmDelete) {
        try {
          const URL = BASE_URL + API_URL.listeAlerte;
          const response = await axios.delete(URL, { data: { 'pk': row.pk } });
          if(response.data[0].success ===1) setListeDesAlertes(listeDesAlertes.filter(item => item.pk !== row.pk));
        } catch (error) {
          console.error('Erreur lors de la suppression :', error);
        }
      }
    };


    const handleActivateDeactivate = async (row) => {
      let confirmDelete;
      if (!row.status) confirmDelete = window.confirm('Êtes-vous sûr de vouloir activer cette alerte ?');
      if (row.status) confirmDelete = window.confirm('Êtes-vous sûr de vouloir désactiver cette alerte ?');
      if (confirmDelete) {
        try {
          const URL = BASE_URL + API_URL.activeDesactiveAlerte;
          const response = await axios.post(URL, {'pk': row.pk, 'status': !row.status});
          if(response.data[0].success ===1){
            const res = response.data[0].results[0];
            let list = ListAlerte.map(item => item.pk === res.pk ? res : item);
            setListeDesAlertes(list);
          }
           
        } catch (error) {
          console.error('Erreur lors de la suppression :', error);
        }
      }
    };
    

    console.log("ListAlerte", ListAlerte, loadA, errA);
  return (
    <MainCard
      title="Liste des alertes"
      content={false}
      secondary={
        <Link component={RouterLink} to="#" color="primary">
          View all
        </Link>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Borne min.</TableCell>
              <TableCell>Borne max.</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Animal</TableCell>
              <TableCell align="right">Type canal</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listeDesAlertes.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.min_animal}</TableCell>
                <TableCell>{row.max_animal}</TableCell>
                <TableCell>
                <TableCell>{row.ville}</TableCell>
                </TableCell>
                <TableCell>{row.animal}</TableCell>
                <TableCell align="right">{row.type_canal}</TableCell>
                <TableCell align="center" onClick={() => handleActivateDeactivate(row)}>
                  <Chip color={row.status? 'success': 'warning'} label={row.status ? "Activé": "Désactivé"} size="small" />
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="primary" size="large" onClick={() => handleEdit(row)}>
                      <EditOutlined />
                    </IconButton>
                    <IconButton color="inherit" size="large" onClick={() => handleDelete(row)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleEdit}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
        >
            {alert.lenght !=0 ? <EditAlert alert={alert} onCancel={handleEdit} /> : null}
        </Dialog>
    </MainCard>

  );
}