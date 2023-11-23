import React, { useState, useEffect } from 'react';
import { Chip, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Dialog } from '@mui/material';

import MainCard from 'components/MainCard';
import { PAGE_ROWS } from 'config';
// assets
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DateSelector from 'components/cards/date/DateSelector';
import { formatDateToYYYYMMDD, getStartOfWeek, getEndOfWeek } from 'utils/function';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { EmptyTable } from 'components/third-party/ReactTable';
import RapportFrom from './rapportForm';
import { PopupTransition } from 'components/@extended/Transitions';
import { initGetPdf } from 'store/reducers/rapports/rapportPdfSlice';
import CheckpointFilters from 'sections/dashboard/checkpointFilter';
import { getAllReportsCheckpoint } from 'store/reducers/rapports/listeRapportCheckpoint';



export default function ListRapportCheckpoint() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(formatDateToYYYYMMDD(getStartOfWeek()))
  const [end, setEnd] = useState(formatDateToYYYYMMDD(getEndOfWeek()))
  const [add, setAdd] = useState(false)
  const [chkp, setChkp] = useState({})


  const { ListRapport, nbPages, status } = useSelector((state) => state.rapport.checkpoint);

  const { listStatus } = useSelector((state) => state.checkpoint.list)


  useEffect(() => {
    dispatch(getAllReportsCheckpoint({ page: currentPage, nbre_ligne: PAGE_ROWS, start: start, end: end, chkpt_id: chkp.id }));
  }, [currentPage, start, end, chkp]);


  const handleChangePage = (event, newPage) => { setCurrentPage(newPage); };

  const goToDetail = (row) => {
    navigate(`/apps/reports/details/${row.date}`, { state: row });
  }

  const handleClose = () => {
    dispatch(initGetPdf())
    setAdd(!add);
  }


  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClose}>
        <FormattedMessage id='alerte-formRap-titre' />
      </Button>


      <MainCard
        title={<FormattedMessage id='report-list' />}
        content={false}
        secondary={
            <>
                <DateSelector startDate={start} setStartDate={setStart} endDate={end} setEndDate={setEnd} />
                <CheckpointFilters chkp={chkp} setChkp={setChkp} />
            </>
            }
            
    >
        {status == REQUEST_STATUS.loading || listStatus == REQUEST_STATUS.loading
         && <EmptyUserCard title={<FormattedMessage id='loading' />} />}
        {status == REQUEST_STATUS.error && <EmptyUserCard title={<FormattedMessage id='error-network' />} />}

        {
          status == REQUEST_STATUS.succeed &&
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><FormattedMessage id='date' /></TableCell>
                  <TableCell align="center"><FormattedMessage id='id-agent' /></TableCell>
                  <TableCell sx={{ pl: 3 }}><FormattedMessage id='agent-collecte' /></TableCell>
                  <TableCell><FormattedMessage id='effectif' /></TableCell>
                  <TableCell><FormattedMessage id='validateur' /></TableCell>
                  <TableCell><FormattedMessage id='status' /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  ListRapport.length > 0 ?
                    <>
                      {ListRapport.map((row, index) => (
                        <TableRow hover key={index} onClick={() => { goToDetail(row) }} >
                          <TableCell align="center">
                            <Chip color={'info'} label={new Date(row.date).toLocaleDateString()} size="small" />
                          </TableCell>
                          <TableCell sx={{ pl: 3 }}>{row.id_agent}</TableCell>
                          <TableCell sx={{ pl: 3 }}>{row.agent}</TableCell>
                          <TableCell>{row.effectif} <FormattedMessage id='heads' /> </TableCell>
                          <TableCell>{row.validateur}</TableCell>


                          <TableCell align="center">
                            <Chip color={row.status == 'VALIDE' ? 'success' : 'error' } label={row.status} size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                    : <EmptyTable msg={<FormattedMessage id='no-reports' />} colSpan={6} />
                }

              </TableBody>
            </Table>

            <Grid sx={{ p: 2, py: 3 }} colSpan={9} >
              <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
                <Pagination
                  count={nbPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  color="alert"
                  variant="combined"
                />
              </Grid>
            </Grid>

          </TableContainer>
        }
      </MainCard>
      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleClose}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <RapportFrom handleClose={handleClose} />
      </Dialog>
    </>
  );
}