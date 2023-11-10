// import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Button, Checkbox } from '@mui/material';

import MainCard from 'components/MainCard';
import { PAGE_ROWS } from 'config';
// assets
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router";
import { detailRapport_req } from 'store/reducers/rapports/detailRapportReducer';
import { activerRapport_req } from 'store/reducers/rapports/activerRapportReducer';
import { rejeterRapport_req } from 'store/reducers/rapports/rejeterRapportReducer';
import { PopupTransition } from 'components/@extended/Transitions';
import DetailUnRapport from './detailUnRapport';
import { Dialog } from '@mui/material';
import { format } from 'date-fns';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';



export default function ListDetailRapport() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    // const [listeDetailRaps, setListeDetailRaps] = useState([])
    const [add, setAdd] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [changePage, setChangePage] = useState(1);
    const [rapport, setRapport] = useState({})
    const [selectedItems, setSelectedItems] = useState([]);
    const { loading:loadR, ListdetailRapport, error:errR, nbPages } = useSelector((state) => state.detailRapport);

    useEffect(() => {
        
        dispatch(detailRapport_req({ page: currentPage, nbre_ligne: PAGE_ROWS, date: state.heure, id_agent: state.id_agent }));
        // setListeDetailRaps(ListdetailRapport)
  
    }, [currentPage, changePage]);

    const handleChangePage = (event, newPage) => {setCurrentPage(newPage);};

    const handleActivate = () => {
        setChangePage(changePage+1)
        dispatch(activerRapport_req({date: state.heure, id_agent: state.id_agent}));
    };

    const handleDesactivate = () => {
        setChangePage(changePage+1)
        setSelectedItems([])
        dispatch(rejeterRapport_req({ids: selectedItems}));
    };

    const handleSelect = (id, isSelected) => {
        if (isSelected) {
          setSelectedItems([...selectedItems, id]);
        } else {
          setSelectedItems(selectedItems.filter(item => item !== id));
        }
      };


      const handleDetail = (event) => {
        if (event != '')  {
          setRapport(event)
        } else{
          setRapport({})
        }
        setAdd(!add);
        console.log("rapport dans detail", rapport);
    };

    console.log("rapport", rapport);
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
      title={<><FormattedMessage id='detailrapport-Detail-rapports-du' /> {format(new Date(state.heure), 'dd/MM/yyyy')}</>}
      content={false}
      secondary={
        selectedItems.length > 0 ? (
          <Button variant="contained" color="primary" onClick={handleDesactivate}>
            <FormattedMessage id='detailrapport-rejeter' />
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleActivate}>
            <FormattedMessage id='detailrapport-valider' />
          </Button>
        )
      }
    >
      <TableContainer>

        <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox />
                </TableCell>
                <TableCell sx={{ pl: 3 }}><FormattedMessage id='detailrapport-utilisateur' /></TableCell>
                <TableCell><FormattedMessage id='detailrapport-ville-destination' /></TableCell>
                <TableCell><FormattedMessage id='detailrapport-ville-provenance' /></TableCell>
                <TableCell><FormattedMessage id='detailrapport-Validateur' /></TableCell>
                <TableCell align="right"><FormattedMessage id='detailrapport-matricule' /></TableCell>
                <TableCell align="center"><FormattedMessage id='detailrapport-date' /></TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                    Action
                </TableCell>
            </TableRow>
        </TableHead>
        {ListdetailRapport.length > 0 ?
        <TableBody>
            {ListdetailRapport.map((row, index) => {
            const isSelected = selectedItems.includes(row.id);
            return (
                <TableRow hover key={index}>
                    <TableCell padding="checkbox">
                        <Checkbox
                        checked={isSelected}
                        onChange={(event) => handleSelect(row.id, event.target.checked)}
                        />
                    </TableCell>
                    <TableCell sx={{ pl: 3 }} onClick={() => handleDetail(row)}>{row.agent}</TableCell>
                    <TableCell onClick={() => handleDetail(row)}>{row.delivery.ville}</TableCell>
                    <TableCell onClick={() => handleDetail(row)}>{row.delivery.ville}</TableCell>
                    <TableCell onClick={() => handleDetail(row)}>{row.validateur}</TableCell>
                    <TableCell align="right" onClick={() => handleDetail(row)}>{row.matricule}</TableCell>
                    <TableCell align="right" onClick={() => handleDetail(row)}>{new Date(row.heure).toLocaleDateString()}</TableCell>
                    <TableCell align="center" onClick={() => handleDetail(row)}>
                    <Chip color={row.status == 'VALIDE'?'success':'warning'} label={row.status} size="small" />
                    </TableCell>
                </TableRow>
            );
            })}
        </TableBody>
        :
        <TableBody>
          <EmptyUserCard title={<FormattedMessage id='no-detail-rapport' />} />
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

      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleDetail}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
        >
            {/* {rapport.length > 0 ? <DetailUnRapport data={rapport} onCancel={handleDetail} /> : null} */}
            {Object.keys(rapport).length > 0 ? <DetailUnRapport data={rapport} onCancel={handleDetail} /> : null}
        </Dialog>
    </MainCard>

  );
}