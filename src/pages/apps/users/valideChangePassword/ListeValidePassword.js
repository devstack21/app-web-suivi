import React, { useState, useEffect } from 'react';

// material-ui
import { Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Pagination } from '@mui/material';

import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { UserSwitchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {  REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import { PAGE_ROWS } from 'config';
import { getListValidatePassword_req } from 'store/reducers/validatePassword/listeValidatePasswordSlice';
import { validatePassword_req } from 'store/reducers/validatePassword/validatePasswordSlice';
import AlertConfirmeActive from 'pages/apps/alerte/AlertConfirmeActive';
import EffectComponentValideResetPwd from 'sections/auth/EffectComponentValideResetPwd';




export default function ListAlerte() {
  const dispatch = useDispatch();

  const [userChangepassword, setUserChangepassword] = useState({})
  const [openActive, setOpenActive] = useState(false);


  const { ListVP, status, nbPages } = useSelector((state) => state.validatePassword.list);
  const { resetStatus, restError } = useSelector((state) => state.validatePassword.reset);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => { dispatch(getListValidatePassword_req({ page: currentPage, nbre_ligne: PAGE_ROWS})) },
   [currentPage])

  const handleCloseValidate = (e) => {
    if (e) dispatch(
      validatePassword_req({ 'email': userChangepassword.email})); 
    setOpenActive(!openActive);
  };


  const handleValidate = async (row) => {
    setUserChangepassword(row)
    setOpenActive(!openActive);

  };


  const handleChangePage = (event, newPage) => {setCurrentPage(newPage);};

  if (status == REQUEST_STATUS.loading || resetStatus == REQUEST_STATUS.loading) { 
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
      // <SpinnLoader title={<FormattedMessage id='loading' />} />
    )
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
                  <TableCell>{row.phone}</TableCell>
                </TableCell>
                <TableCell>
                  {/* {row.status} */}
                  { row.status == "VALIDER" && <Chip color={'success'} label={"VALIDE"} size="small" /> }
                  { row.status == "REJETER" && <Chip color={'danger'} label={"REJETE"} size="small" /> }
                  { row.status == "BROUILLON" && <Chip color={'warning'} label={"BROUILLON"} size="small" /> }
                  
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  { row.status == "BROUILLON"
                  ?
                    <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="primary" size="large" onClick={() => handleValidate(row)}>
                      <UserSwitchOutlined />
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

      <AlertConfirmeActive title={<FormattedMessage id='resetPwd-confirm-active' />} open={openActive} handleClose={handleCloseValidate} />
      

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



