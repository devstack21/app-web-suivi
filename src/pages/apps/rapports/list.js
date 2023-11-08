import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Chip, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';

import MainCard from 'components/MainCard';
import { PAGE_ROWS } from 'config';
// assets
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { listeRapport_req } from 'store/reducers/minepia/rapports/listeRapportReducer';
import {  useNavigate } from 'react-router-dom';



export default function ListRapport() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [listeRaps, setListeRaps] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const { loading:loadR, ListRapport, error:errR, nbPages } = useSelector((state) => state.listeRapport);

    useEffect(() => {
        dispatch(listeRapport_req({ page: currentPage, nbre_ligne: PAGE_ROWS }));
        // setListeRaps(ListRapport)
  
    }, [currentPage]);

    const handleChangePage = (event, newPage) => {setCurrentPage(newPage);};

    const goToDetail=(row)=>{
      navigate(`/apps/reports/details/${row.id}`,{state:row});
    }

    console.log("ListAlerte", ListRapport, loadR, errR);
  return (
    <MainCard
      title="Liste des rapports de la semaine"
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
              <TableCell sx={{ pl: 3 }}>Utilisateur</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Provenance</TableCell>
              <TableCell>Validateur</TableCell>
              <TableCell align="right">Matricule</TableCell>
              <TableCell align="center">Date</TableCell>
              {/* <TableCell align="center" sx={{ pr: 3 }}>
                Action
              </TableCell> */}
            </TableRow>
          </TableHead>
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