// import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Grid, TextField, Button } from '@mui/material';

import MainCard from 'components/MainCard';
import { PAGE_ROWS } from 'config';
// assets
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { listeRapport_req } from 'store/reducers/minepia/rapports/listeRapportReducer';
import {  useNavigate } from 'react-router-dom';
import moment from 'moment';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';


export default function ListRapport() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [listeRaps, setListeRaps] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const lastWeek = moment().subtract(1, 'weeks');
    const [startDate, setStartDate] = useState(lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss"));
    const [endDate, setEndDate] = useState(lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss"));

    const { loading:loadR, ListRapport, error:errR, nbPages } = useSelector((state) => state.listeRapport);

    useEffect(() => {
        dispatch(listeRapport_req({ page: currentPage, nbre_ligne: PAGE_ROWS, start_date: startDate, end_date: endDate }));
        // setListeRaps(ListRapport)
  
    }, [currentPage]);

    const handleChangePage = (event, newPage) => {setCurrentPage(newPage);};

    const goToDetail=(row)=>{
      navigate(`/apps/reports/details/${row.id}`,{state:row});
    }

    const handleSubmit = async (startDate, endDate) => {
      setCurrentPage(1);
      dispatch(listeRapport_req({ page: currentPage, nbre_ligne: PAGE_ROWS, start_date: startDate, end_date: endDate }));
      
    }

    console.log("ListAlerte", ListRapport, loadR, errR);

    if (loadR) {
      return (
        <EmptyUserCard title={<FormattedMessage id='loading' />} />
      )
    }
  
    if (errR) {
      return (
        <EmptyUserCard title={<FormattedMessage id={errR} />} />
      )
    }

  return (
    <MainCard
      // title="Liste des rapports de la semaine"
      title={<><FormattedMessage id='detailrapport-liste-rapports-semaine' /></>}
      content={false}
      secondary={
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <TextField
              // label="Date de début"
              label={<FormattedMessage id='detailrapport-dateDebut' />}
              type="date"
              defaultValue={moment(startDate).format('YYYY-MM-DD')}
              onChange={(e) => {
                const date = moment(e.target.value);
                const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
                setStartDate(formattedDate);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              // label="Date de fin"
              label={<FormattedMessage id='detailrapport-dateFin' />}
              type="date"
              defaultValue={moment(endDate).format('YYYY-MM-DD')}
              onChange={(e) => {
                const date = moment(e.target.value);
                const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
                setEndDate(formattedDate);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={()=>handleSubmit(startDate, endDate)}>
              <FormattedMessage id='detailrapport-valider' />
            </Button>
          </Grid>
        </Grid>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}><FormattedMessage id='detailrapport-utilisateur' /></TableCell>
              <TableCell><FormattedMessage id='detailrapport-ville-destination' /></TableCell>
              <TableCell><FormattedMessage id='detailrapport-ville-provenance' /></TableCell>
              <TableCell><FormattedMessage id='detailrapport-Validateur' /></TableCell>
              <TableCell align="right"><FormattedMessage id='detailrapport-matricule' /></TableCell>
              <TableCell align="center"><FormattedMessage id='detailrapport-date' /></TableCell>
              {/* <TableCell align="center" sx={{ pr: 3 }}>
                Action
              </TableCell> */}
            </TableRow>
          </TableHead>
          {ListRapport.length > 0 ?
            <TableBody>
            {ListRapport.map((row, index) => (
              <TableRow hover key={index} onClick={()=>{goToDetail(row)}} >
                <TableCell sx={{ pl: 3 }}>{row.agent}</TableCell>
                <TableCell>{row.delivery.ville}</TableCell>
                <TableCell>
                <TableCell>{row.supply.ville}</TableCell>
                </TableCell>
                <TableCell>{row.validateur}</TableCell>
                <TableCell align="right">{row.matricule}</TableCell>
                <TableCell align="center">
                  <Chip color={'success'} label={new Date(row.heure).toLocaleDateString()} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          :
          <TableBody>
            <EmptyUserCard title={<FormattedMessage id='no-rapport' />} />
          </TableBody>
            
          }
          
        </Table>

        <Grid sx={{ p: 2, py: 3 }} colSpan={9} >
        <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
          <Pagination
            count={nbPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            variant="combined"
          />
        </Grid>
      </Grid>

      </TableContainer>

      {/* <Dialog
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
        </Dialog> */}
    </MainCard>

  );
}