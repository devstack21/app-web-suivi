import React, { useState, useEffect } from 'react';

// material-ui
import { Typography, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Pagination } from '@mui/material';

import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { PlayCircleFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import { PAGE_ROWS } from 'config';
import { getListValidatePassword_req } from 'store/reducers/validatePassword/listeValidatePasswordSlice';
import AlertConfirmeActive from 'pages/apps/alerte/AlertConfirmeActive';
import EffectComponentValideResetPwd from 'sections/auth/EffectComponentValideResetPwd';
import { PatternFormat } from 'react-number-format';
import { format } from 'date-fns';



export default function ListAlerte() {
  const dispatch = useDispatch();

  const [userChangepassword, setUserChangepassword] = useState({})
  const [openActive, setOpenActive] = useState(false);


  const { ListVP, status, nbPages } = useSelector((state) => state.validatePassword.list);
  const { restError } = useSelector((state) => state.validatePassword.reset);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => { dispatch(getListValidatePassword_req({ page: currentPage, nbre_ligne: PAGE_ROWS })) },
    [currentPage])

  const handleCloseValidate = () => {
    setOpenActive(!openActive);
  };


  const handleValidate = async (row) => {
    setUserChangepassword(row)
    setOpenActive(!openActive);
  };


  const handleChangePage = (event, newPage) => { setCurrentPage(newPage); };

  if (status == REQUEST_STATUS.loading ) {
    return (<EmptyUserCard title={<FormattedMessage id='loading' />} />)
  }

  if (restError == REQUEST_STATUS.error) {
    <EmptyUserCard title={<FormattedMessage id={restError} />} />
  }

  return (
    <MainCard
      title={<FormattedMessage id='resetPwd-ListeDemande-titre' />}
      content={false}
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}><FormattedMessage id='name' /></TableCell>
              <TableCell><FormattedMessage id='email' /></TableCell>
              <TableCell><FormattedMessage id='phone' /></TableCell>
              <TableCell><FormattedMessage id='date' /></TableCell>
              <TableCell><FormattedMessage id='date-validation' /></TableCell>
              <TableCell align="center"><FormattedMessage id='alerte-tableau-tatus' /></TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListVP.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <TableCell>
                    <PatternFormat displayType="text" format="+237 # ## ## ## ##" mask="_" defaultValue={row.phone} />
                  </TableCell>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{format(new Date(row.date), 'dd/MM/yyyy')}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{row.date_validation ? format(new Date(row.date_validation), 'dd/MM/yyyy') : 'None'}</Typography>
                </TableCell>
                <TableCell>
                  {/* {row.status} */}
                  {row.status == "VALIDER" && <Chip color={'success'} label={<FormattedMessage id='validated' />} size="small" />}
                  {row.status == "REJETER" && <Chip color={'danger'} label={<FormattedMessage id='rejected' />} size="small" />}
                  {row.status == "BROUILLON" && <Chip color={'warning'} label={<FormattedMessage id='pending' />} size="small" />}
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  {row.status == "BROUILLON"
                    ?
                    <Stack direction="row" justifyContent="center" alignItems="center">
                      <IconButton color="primary" size="large" onClick={() => handleValidate(row)}>
                        <PlayCircleFilled />
                      </IconButton>
                    </Stack>
                    :
                    null
                  }

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AlertConfirmeActive
        open={openActive}
        handleClose={handleCloseValidate}
        user={userChangepassword}
      />


      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          count={nbPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          variant="combined"
        />
      </Grid>

      <EffectComponentValideResetPwd />

    </MainCard>

  );
}



