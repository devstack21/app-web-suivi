import React from 'react';
import TransportTable from '../../../sections/apps/itineraire/TransportList';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid, Pagination } from '@mui/material';

import {  REQUEST_STATUS } from 'utils/apiConfig';
import { PAGE_ROWS } from 'config';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { formatDateToYYYYMMDD, getStartOfWeek } from 'utils/function';
import { getListTransport } from 'store/reducers/itineraire/transportListSlice';
import { FormattedMessage } from 'react-intl';
import DateSelector from 'components/cards/date/DateSelector';
import MainCard from 'components/MainCard';


const ListeCamion = () => {
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(formatDateToYYYYMMDD(getStartOfWeek()));
  const [endDate, setEndDate] = useState(formatDateToYYYYMMDD(new Date()));

  const { status, nbPages } = useSelector((state) => state.transport.list);


  useEffect(() => {
    dispatch(getListTransport({ page: currentPage, nb: PAGE_ROWS, start: startDate, end: endDate }));
  }, [currentPage,startDate, endDate]);

  const handleChangePage = (event, newPage) => { setCurrentPage(newPage); };

  return (
    <>
      <Grid container spacing={3}>


        <Grid item xs={12}>
          <MainCard
            style={{ width: '100%' }}
            title={<FormattedMessage id='transport-list' />}
            secondary={<DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />}
          >
            {status == REQUEST_STATUS.loading && <EmptyUserCard title={<FormattedMessage id='loading' />} />}
            {status == REQUEST_STATUS.succeed && <TransportTable />}
            {status == REQUEST_STATUS.error && <EmptyUserCard title={<FormattedMessage id='error-network' />} />}
          </MainCard>
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
    </>
  );
};

export default ListeCamion;