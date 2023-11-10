import React, { useState, useEffect } from 'react';
import { Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';

import MainCard from 'components/MainCard';
import { PAGE_ROWS } from 'config';
// assets
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReports } from 'store/reducers/rapports/listeRapportSlice';
import { useNavigate } from 'react-router-dom';
import DateSelector from 'components/cards/date/DateSelector';
import { formatDateToYYYYMMDD, getStartOfWeek } from 'utils/function';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { EmptyTable } from 'components/third-party/ReactTable';



export default function ListRapport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(formatDateToYYYYMMDD(getStartOfWeek()))
  const [end, setEnd] = useState(formatDateToYYYYMMDD(new Date()))

  const { ListRapport, nbPages, status } = useSelector((state) => state.rapport.listRapport);

  useEffect(() => {
    dispatch(getAllReports({ page: currentPage, nbre_ligne: PAGE_ROWS, start: start, end: end }));
  }, [currentPage, start, end]);

  const handleChangePage = (event, newPage) => { setCurrentPage(newPage); };

  const goToDetail = (row) => {
    navigate(`/apps/reports/details/${row.id}`, { state: row });
  }

  return (
    <MainCard
      title={<FormattedMessage id='report-list' />}
      content={false}
      secondary={<DateSelector startDate={start} setStartDate={setStart} endDate={end} setEndDate={setEnd} />}
    >
      {status == REQUEST_STATUS.loading && <EmptyUserCard title={<FormattedMessage id='loading' />} />}
      {status == REQUEST_STATUS.loading && <EmptyUserCard title={<FormattedMessage id='error-network' />} />}

      {
        status == REQUEST_STATUS.succeed &&
        <TableContainer>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}><FormattedMessage id='user' /></TableCell>
                <TableCell><FormattedMessage id='destination' /></TableCell>
                <TableCell><FormattedMessage id='provenance' /></TableCell>
                <TableCell><FormattedMessage id='validator' /></TableCell>
                <TableCell align="right"><FormattedMessage id='matricule' /></TableCell>
                <TableCell align="center"><FormattedMessage id='date' /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                ListRapport.length > 0 ?
                  <>
                    {ListRapport.map((row, index) => (
                      <TableRow hover key={index} onClick={() => { goToDetail(row) }} >
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
                color="primary"
                variant="combined"
              />
            </Grid>
          </Grid>

        </TableContainer>
      }
    </MainCard>

  );
}