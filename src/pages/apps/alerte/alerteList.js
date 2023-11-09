// import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// material-ui
import { Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { PopupTransition } from 'components/@extended/Transitions';
import { Dialog } from '@mui/material';
import EditAlert from './alerteEdit';
// import { BASE_URL } from 'config';
import {  REQUEST_STATUS } from 'utils/apiConfig'; //API_URL,
// import axios from 'utils/axios';
import { getListAlerts } from 'store/reducers/alerte/listeAlerteSlice';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { deleteAlert } from 'store/reducers/alerte/deleteAlerteSlice';
import { FormattedMessage } from 'react-intl';
// import AlertAccountDelete from 'sections/apps/users/accounts/AlertAccountDelete';
import AlertDelete from './AlertDelete';
import AlertConfirmeActive from './AlertConfirmeActive';
import { activeAlert } from 'store/reducers/alerte/activeAlerteSlice';




export default function ListAlerte() {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false)
  const [alert, setAlerte] = useState({})
  const [open, setOpen] = useState(false);
  const [idAlert, setIdAlerte] = useState();
  const [active, setActive] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [pageChange, setPageChange] = useState(1);


  const { ListAlerte, status } = useSelector((state) => state.alert.list);
  const { deleteStatus } = useSelector((state) => state.alert.delete);


  useEffect(() => { dispatch(getListAlerts()) }, [pageChange])

  const handleEdit = (event) => {
    setAdd(!add);
    if (event != '') setAlerte(event);
  };


  const handleDelete = async (row) => {
    // const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?');
    // if (confirmDelete) {
    //   dispatch(deleteAlert({ 'pk': row.pk }))
    // }
    setIdAlerte(row.pk);
    setOpen(!open);
  };

  const handleClose = (e) => {
    if (e) dispatch(deleteAlert({ 'pk': idAlert }))
    setOpen(!open);
  };



  const handleCloseActive = (e) => {
    if (e) dispatch(activeAlert({ 'pk': alert.pk, 'status': !alert.status })); setPageChange(pageChange+1);
    
    setOpenActive(!openActive);
  };


  const handleActivateDeactivate = async (row) => {
    // let confirmDelete;
    // if (!row.status) confirmDelete = window.confirm('Êtes-vous sûr de vouloir activer cette alerte ?');
    // if (row.status) confirmDelete = window.confirm('Êtes-vous sûr de vouloir désactiver cette alerte ?');
    // if (confirmDelete) {
    //   try {
    //     const URL = BASE_URL + API_URL.activeDesactiveAlerte;
    //     const response = await axios.post(URL, { 'pk': row.pk, 'status': !row.status });
    //     if (response.data[0].success === 1) {
    //       const res = response.data[0].results[0];
    //       console.log(res)
    //       //  let list = ListAlerte.map(item => item.pk === res.pk ? res : item);
    //       //  setListeDesAlertes(list);
    //     }

    //   } catch (error) {
    //     console.error('Erreur lors de la suppression :', error);
    //   }
    // }



    if (!row.status) setActive(true)
    setAlerte(row)
    setOpenActive(!openActive);

  };



  if (status == REQUEST_STATUS.loading || deleteStatus == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }


  return (
    <MainCard
      title="Liste des alertes"
      content={false}
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}><FormattedMessage id='alerte-tableau-bornInf' /></TableCell>
              <TableCell><FormattedMessage id='alerte-tableau-bornSup' /></TableCell>
              <TableCell><FormattedMessage id='alerte-tableau-ville' /></TableCell>
              <TableCell><FormattedMessage id='alerte-tableau-animal' /></TableCell>
              <TableCell align="right"><FormattedMessage id='alerte-tableau-typeCanal' /></TableCell>
              <TableCell align="center"><FormattedMessage id='alerte-tableau-tatus' /></TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListAlerte.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.min_animal}</TableCell>
                <TableCell>{row.max_animal}</TableCell>
                <TableCell>
                  <TableCell>{row.ville}</TableCell>
                </TableCell>
                <TableCell>{row.animal}</TableCell>
                <TableCell align="right">{row.type_canal}</TableCell>
                <TableCell align="center" onClick={() => handleActivateDeactivate(row)}>
                  <Chip color={row.status ? 'success' : 'warning'} label={row.status ? "Activé" : "Désactivé"} size="small" />
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

      <AlertDelete title={<FormattedMessage id='alerte-confirm-suppression' />} open={open} handleClose={handleClose} />
      {active ?
        <AlertConfirmeActive title={<FormattedMessage id='alerte-confirm-active' />} open={openActive} handleClose={handleCloseActive} />
        :
        <AlertConfirmeActive title={<FormattedMessage id='alerte-confirm-deactive' />} open={openActive} handleClose={handleCloseActive} />
        }
            
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
        {alert.lenght != 0 ? <EditAlert alert={alert} onCancel={handleEdit} /> : null}
      </Dialog>
    </MainCard>

  );
}